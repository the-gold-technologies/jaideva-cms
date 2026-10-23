import { NextResponse } from 'next/server';
import { cloudinary, deleteCloudinaryFileByUrl } from '@/lib/cloudinary';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const folder = (data.get('folder') as string) || 'jaidevaoil-assets/uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const rawBytes = await file.arrayBuffer();
    let buffer = Buffer.from(rawBytes);
    let filename = file.name || 'upload';
    const mimeType = file.type || '';
    let resourceType: 'image' | 'raw' | 'auto' = 'auto';

    const lowerName = filename.toLowerCase();
    const isSvg = mimeType.includes('svg') || lowerName.endsWith('.svg');
    const isPdf = mimeType.includes('pdf') || lowerName.endsWith('.pdf');
    const isImage =
      !isSvg &&
      !isPdf &&
      (mimeType.startsWith('image/') ||
        ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.avif'].some((ext) =>
          lowerName.endsWith(ext)
        ));

    // 1. Image Optimization & WebP Conversion
    if (isImage) {
      try {
        const image = sharp(buffer);
        const metadata = await image.metadata();

        let pipeline = image.rotate(); // Respect EXIF orientation

        // Downscale oversized images (width/height > 2000px) while maintaining aspect ratio
        if (
          (metadata.width && metadata.width > 2000) ||
          (metadata.height && metadata.height > 2000)
        ) {
          pipeline = pipeline.resize({
            width: 2000,
            height: 2000,
            fit: 'inside',
            withoutEnlargement: true,
          });
        }

        // Compress and convert to modern WebP format
        buffer = await pipeline
          .webp({
            quality: 82,
            effort: 6,
          })
          .toBuffer();

        // Update filename extension to .webp
        const baseName = filename.substring(0, filename.lastIndexOf('.')) || filename;
        filename = `${baseName}.webp`;
        resourceType = 'image';
      } catch (imgErr) {
        console.warn('Image optimization skipped, using original buffer:', imgErr);
      }
    } else if (isPdf) {
      // 2. PDF Stream & Object Stream Compression
      try {
        const pdfDoc = await PDFDocument.load(buffer, {
          ignoreEncryption: true,
          updateMetadata: false,
        });

        const pdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });

        const compressed = Buffer.from(pdfBytes);
        if (compressed.length < buffer.length) {
          buffer = compressed;
        }
      } catch (pdfErr) {
        console.warn('PDF compression skipped, using original buffer:', pdfErr);
      }
      resourceType = 'image';
    } else if (isSvg) {
      resourceType = 'image';
    }

    const publicIdBase = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const sanitizedName = publicIdBase.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    const finalPublicId = `${Date.now()}-${sanitizedName}`;

    const result = await new Promise<any>((resolve, reject) => {
      const uploadOptions: Record<string, any> = {
        folder,
        public_id: finalPublicId,
        resource_type: resourceType,
      };

      if (isImage) {
        uploadOptions.format = 'webp';
      } else if (isPdf) {
        uploadOptions.format = 'pdf';
      }

      const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, res) => {
        if (error) reject(error);
        else resolve(res);
      });
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      name: filename,
      size: buffer.length,
      format: result.format || (isPdf ? 'pdf' : isSvg ? 'svg' : 'webp'),
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    let url: string | null = null;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      url = body.url || null;
    } else {
      const { searchParams } = new URL(request.url);
      url = searchParams.get('url');
    }

    if (!url) {
      return NextResponse.json({ success: false, error: 'File URL is required' }, { status: 400 });
    }

    const deleted = await deleteCloudinaryFileByUrl(url);

    return NextResponse.json({
      success: deleted,
      url,
    });
  } catch (error: any) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Delete failed' },
      { status: 500 }
    );
  }
}

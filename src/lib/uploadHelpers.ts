/**
 * Helper to upload images and files via /api/upload
 */
export async function uploadFiles(files: File[] | FileList | (File | string)[]): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (typeof file === 'string') {
      urls.push(file);
      continue;
    }
    if (!(file instanceof File)) continue;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const contentType = res.headers.get('content-type') || '';
    let data: any = null;
    if (contentType.includes('application/json')) {
      data = await res.json().catch(() => null);
    }

    if (res.ok && data?.url) {
      urls.push(data.url);
    } else {
      const errMsg =
        data?.error ||
        (res.status === 413
          ? 'File is too large for server payload limits'
          : `Upload failed with status ${res.status}`);
      throw new Error(errMsg);
    }
  }

  return urls;
}

/**
 * Calls /api/upload with DELETE to delete a file from Cloudinary storage
 */
export async function deleteFileFromCloudinary(url: string): Promise<boolean> {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return false;
  }

  try {
    const res = await fetch('/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json().catch(() => ({}));
    return Boolean(data.success);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return false;
  }
}

export async function deleteFileFromSupabase(url: string): Promise<boolean> {
  try {
    return true;
  } catch {
    return false;
  }
}

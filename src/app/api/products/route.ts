import { NextResponse } from 'next/server';
import { cachedJson, noCacheJson, errorJson, buildSeoObject } from '@/lib/apiHelpers';
import { prisma } from '@/lib/prisma';
import { cleanupReplacedCloudinaryFiles } from '@/lib/cloudinary';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (id) {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      const seo = {
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        targetKeywords: product.targetKeywords,
        canonicalUrl: product.canonicalUrl,
        noIndex: product.noIndex,
        schema: product.schema,
        headingOptions: product.headingOptions,
      };
      return cachedJson({ success: true, data: product, seo }, { maxAge: 60, staleWhileRevalidate: 300 });
    }

    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
      });
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      const seo = {
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        targetKeywords: product.targetKeywords,
        canonicalUrl: product.canonicalUrl,
        noIndex: product.noIndex,
        schema: product.schema,
        headingOptions: product.headingOptions,
      };
      return cachedJson({ success: true, data: product, seo }, { maxAge: 60, staleWhileRevalidate: 300 });
    }

    const where: any = {};
    if (categorySlug && categorySlug !== 'all') {
      where.categorySlug = categorySlug;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
    });

    let seo = null;
    if (categorySlug && categorySlug !== 'all') {
      const seoPage = await prisma.page.findUnique({
        where: { slug: `products/${categorySlug}` },
      });
      if (seoPage) {
        seo = {
          metaTitle: seoPage.metaTitle,
          metaDescription: seoPage.metaDescription,
          targetKeywords: seoPage.targetKeywords,
          canonicalUrl: seoPage.canonicalUrl,
          noIndex: seoPage.noIndex,
          schema: seoPage.schema,
          headingOptions: seoPage.headingOptions,
        };
      }
    }

    return cachedJson({ success: true, data: { products, categories }, seo }, { maxAge: 60, staleWhileRevalidate: 300 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, ...rest } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const highestOrder = await prisma.product.aggregate({
      _max: { order: true },
    });
    const order = (highestOrder._max.order ?? -1) + 1;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        order,
        ...rest,
      },
    });

    return noCacheJson({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (existingProduct) {
      await cleanupReplacedCloudinaryFiles(existingProduct, data);
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (existingProduct) {
      await cleanupReplacedCloudinaryFiles(existingProduct, null);
    }

    await prisma.product.delete({
      where: { id },
    });

    return noCacheJson({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

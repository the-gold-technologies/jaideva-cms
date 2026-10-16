import { NextResponse } from 'next/server';
import { cachedJson, noCacheJson, errorJson, buildSeoObject } from '@/lib/apiHelpers';
import { prisma } from '@/lib/prisma';
import { cleanupReplacedCloudinaryFiles } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'pages') {
      const pages = await prisma.page.findMany({
        orderBy: { order: 'asc' },
      });
      return cachedJson({ success: true, data: pages }, { maxAge: 120, staleWhileRevalidate: 600 });
    }

    const config = await prisma.globalConfig.findFirst();
    return cachedJson({ success: true, data: config }, { maxAge: 120, staleWhileRevalidate: 600 });
  } catch (error) {
    console.error('Error fetching SEO config:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const body = await request.json();

    if (type === 'pages') {
      const { slug, ...seoData } = body;
      if (!slug) {
        return NextResponse.json({ success: false, error: 'slug is required' }, { status: 400 });
      }

      const existingPage = await prisma.page.findUnique({ where: { slug } });
      if (existingPage) {
        await cleanupReplacedCloudinaryFiles(existingPage, seoData);
      }

      const updated = await prisma.page.upsert({
        where: { slug },
        create: {
          slug,
          title:
            seoData.title ||
            slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          ...seoData,
        },
        update: seoData,
      });
      return noCacheJson({ success: true, data: updated });
    }

    const existingConfig = await prisma.globalConfig.findUnique({ where: { id: 'global' } });
    if (existingConfig) {
      await cleanupReplacedCloudinaryFiles(existingConfig, body);
    }

    const updatedConfig = await prisma.globalConfig.upsert({
      where: { id: 'global' },
      create: {
        id: 'global',
        siteTitle: body.siteTitle || 'Jai Deva Oil Co.',
        siteDescription: body.siteDescription || 'HP Lubricants Distributor',
        ...body,
      },
      update: body,
    });

    // Also sync home page headingOptions and metaTitle/metaDescription
    if (body.headingOptions || body.siteTitle || body.siteDescription) {
      await prisma.page.upsert({
        where: { slug: 'home' },
        update: {
          metaTitle: body.siteTitle,
          metaDescription: body.siteDescription,
          headingOptions: body.headingOptions,
        },
        create: {
          slug: 'home',
          title: 'Home',
          metaTitle: body.siteTitle,
          metaDescription: body.siteDescription,
          headingOptions: body.headingOptions,
          visibility: 'published',
        },
      });
    }

    return noCacheJson({ success: true, data: updatedConfig });
  } catch (error) {
    console.error('Error saving SEO config:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

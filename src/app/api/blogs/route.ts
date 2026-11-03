import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cleanupReplacedCloudinaryFiles } from '@/lib/cloudinary';

const BLOGS_SLUG = 'blogs';

type BlogRecord = { title: string; excerpt: string; category: string };
type BlogSEOPage = {
  metaTitle: string | null;
  metaDescription: string | null;
  targetKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  schema: string | null;
  headingOptions: string | null;
} | null;

/**
 * SEO for a single blog article. Uses the saved SEO record (Page `blogs/<slug>`) when one exists;
 * otherwise the article's own title / excerpt / category — the same defaults the CMS
 * "Page SEO" editor shows for an article that has not been saved yet.
 */
function buildBlogSEO(blog: BlogRecord, blogPage: BlogSEOPage) {
  if (blogPage) {
    return {
      metaTitle: blogPage.metaTitle,
      metaDescription: blogPage.metaDescription,
      targetKeywords: blogPage.targetKeywords,
      canonicalUrl: blogPage.canonicalUrl,
      noIndex: blogPage.noIndex,
      schema: blogPage.schema,
      headingOptions: blogPage.headingOptions,
    };
  }
  return {
    metaTitle: blog.title,
    metaDescription: blog.excerpt,
    targetKeywords: blog.category,
    canonicalUrl: '',
    noIndex: false,
    schema: '',
    headingOptions: '',
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      const blog = await prisma.blogPost.findUnique({ where: { id } });
      if (blog) {
        const blogPage = await prisma.page.findUnique({
          where: { slug: `blogs/${blog.slug}` },
        });
        const seo = buildBlogSEO(blog, blogPage);
        return NextResponse.json({ success: true, data: blog, seo });
      }
      return NextResponse.json({ success: true, data: blog, seo: null });
    }

    if (slug && slug !== BLOGS_SLUG) {
      const pureSlug = slug.replace(/^blogs\//, '');
      const blog = await prisma.blogPost.findUnique({ where: { slug: pureSlug } });
      if (blog) {
        const blogPage = await prisma.page.findUnique({
          where: { slug: `blogs/${pureSlug}` },
        });
        const seo = buildBlogSEO(blog, blogPage);
        return NextResponse.json({ success: true, data: blog, seo });
      }
      return NextResponse.json({ success: true, data: blog, seo: null });
    }

    // 1. Fetch blogs list
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // 2. Fetch page sections for Blogs Hero
    const page = await prisma.page.findUnique({
      where: { slug: BLOGS_SLUG },
      include: { sections: true },
    });

    const sectionsMap: Record<string, any> = {};
    if (page?.sections) {
      for (const section of page.sections) {
        sectionsMap[section.type] = section.content;
      }
    }

    const seo = page
      ? {
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          targetKeywords: page.targetKeywords,
          canonicalUrl: page.canonicalUrl,
          noIndex: page.noIndex,
          schema: page.schema,
          headingOptions: page.headingOptions,
        }
      : null;

    return NextResponse.json({
      success: true,
      data: {
        blogs,
        sections: sectionsMap,
      },
      seo,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category,
      publishDate,
      readTime,
      author,
      excerpt,
      coverImage,
      content,
      recommendedProducts,
      isPublished,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const created = await prisma.blogPost.create({
      data: {
        title,
        slug,
        category: category || 'Automotive',
        publishDate: publishDate || new Date().toISOString().split('T')[0],
        readTime: readTime || '5 min read',
        author: author || 'HPCL Technical Team',
        excerpt: excerpt || '',
        coverImage: coverImage || null,
        content: content || {},
        recommendedProducts: recommendedProducts || [],
        isPublished: isPublished !== false,
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug,
      category,
      publishDate,
      readTime,
      author,
      excerpt,
      coverImage,
      content,
      recommendedProducts,
      isPublished,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
    }

    const existingBlog = await prisma.blogPost.findUnique({ where: { id } });
    if (existingBlog) {
      await cleanupReplacedCloudinaryFiles(existingBlog, body);
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        publishDate,
        readTime,
        author,
        excerpt,
        coverImage,
        content,
        recommendedProducts,
        isPublished,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
    }

    const existingBlog = await prisma.blogPost.findUnique({ where: { id } });
    if (existingBlog) {
      await cleanupReplacedCloudinaryFiles(existingBlog, null);
    }

    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { oldCategory, newCategory, brandSlug } = body;

    if (!oldCategory || !newCategory || !newCategory.trim()) {
      return NextResponse.json(
        { success: false, error: 'Both current category and new category name are required' },
        { status: 400 }
      );
    }

    const where: any = {
      subCategoryTitle: oldCategory.trim(),
    };

    if (brandSlug && brandSlug !== 'all') {
      where.categorySlug = brandSlug;
    }

    const result = await prisma.product.updateMany({
      where,
      data: {
        subCategoryTitle: newCategory.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      updatedCount: result.count ?? 0,
      newCategory: newCategory.trim(),
    });
  } catch (error: any) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const deleteProducts = searchParams.get('deleteProducts') === 'true';

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    const where: any = {
      subCategoryTitle: category.trim(),
    };

    if (brand && brand !== 'all') {
      where.categorySlug = brand;
    }

    if (deleteProducts) {
      const result = await prisma.product.deleteMany({
        where,
      });
      return NextResponse.json({ success: true, deletedCount: result.count ?? 0 });
    } else {
      const result = await prisma.product.updateMany({
        where,
        data: {
          subCategoryTitle: null,
        },
      });
      return NextResponse.json({ success: true, clearedCount: result.count ?? 0 });
    }
  } catch (error: any) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

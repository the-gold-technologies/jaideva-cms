-- Product page: custom sections + editable property-column title.
-- Additive only (nullable columns, no data changed), safe on existing production data.
-- IF NOT EXISTS: also safe if the columns were already added earlier via `prisma db push`.

-- AlterTable
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "tablePropertyHeader" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "customSections" JSONB DEFAULT '[]';

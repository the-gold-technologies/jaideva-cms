"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import {
  BrandsHeroSection,
  BrandsStatsBandSection,
  BrandsPillarsSection,
  BrandsProductCategoriesSection,
  BrandsCtaSection,
} from "./components";

export default function BrandsPageEditor() {
  const [brandsData, setBrandsData] = useState<any>(null);

  useEffect(() => {
    async function loadBrandsData() {
      try {
        const res = await fetch("/api/brands");
        const json = await res.json();
        if (json.success && json.data) {
          setBrandsData(json.data);
        }
      } catch (err) {
        console.error("Failed to load brands page data:", err);
      }
    }
    loadBrandsData();
  }, []);

  return (
    <section className="flex flex-col gap-8 pb-12">
      <PageHeader
        title="Brands Page Content"
        description="Manage all live sections of the Brands page: Hero Banner, Key Industry Statistics, Brand Value Pillars, Product Categories Spectrum, and Consultation CTA."
      />

      {/* 1. Hero Section */}
      <BrandsHeroSection initialData={brandsData?.BrandsHero} />

      {/* 2. Key Industry Statistics Band */}
      <BrandsStatsBandSection initialData={brandsData?.BrandsStatsBand} />

      {/* 3. Brand Value Pillars & Refinery Guarantee */}
      <BrandsPillarsSection initialData={brandsData?.BrandsPillarsSection} />

      {/* 4. Product Categories Spectrum */}
      <BrandsProductCategoriesSection
        initialData={brandsData?.BrandsProductCategoriesSection}
      />

      {/* 5. Consultation & Contact CTA */}
      <BrandsCtaSection initialData={brandsData?.BrandsCtaSection} />
    </section>
  );
}

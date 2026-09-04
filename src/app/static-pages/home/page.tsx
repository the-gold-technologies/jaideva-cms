"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { HeroSliderSection } from "./components/HeroSliderSection";
import { AboutSection } from "./components/AboutSection";
import { ProductsServicesSection } from "./components/ProductsServicesSection";
import { MultiBrandSolutionsSection } from "./components/MultiBrandSolutionsSection";
import { IndustriesWeServeSection } from "./components/IndustriesWeServeSection";
import { TrustedClientsSection } from "./components/TrustedClientsSection";
import { WhyJaiDevaSection } from "./components/WhyJaiDevaSection";
import { BrandClosingBannerSection } from "./components/BrandClosingBannerSection";
import { LocateDistributorSection } from "./components/LocateDistributorSection";

export default function HomePageEditor() {
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const res = await fetch("/api/home");
        const json = await res.json();
        if (json.success && json.data) {
          setHomeData(json.data);
        }
      } catch (err) {
        console.error("Failed to load home sections:", err);
      }
    }
    loadHomeData();
  }, []);

  return (
    <section className="flex flex-col gap-8 pb-12">
      <PageHeader
        title="Home Page Content"
        description="Manage the layout sections of your homepage. Expand any section to edit its details."
      />

      <HeroSliderSection initialData={homeData?.HeroSlider} />
      <AboutSection initialData={homeData?.AboutSection} />
      <ProductsServicesSection
        initialData={homeData?.ProductsServicesSection}
      />
      <MultiBrandSolutionsSection
        initialData={homeData?.MultiBrandSolutionsSection}
      />
      <IndustriesWeServeSection
        initialData={homeData?.IndustriesWeServeSection}
      />
      <WhyJaiDevaSection initialData={homeData?.WhyJaiDevaSection} />
      <TrustedClientsSection initialData={homeData?.TrustedClientsSection} />
      <BrandClosingBannerSection
        initialData={homeData?.BrandClosingBannerSection}
      />
      <LocateDistributorSection
        initialData={homeData?.LocateDistributorSection}
      />
    </section>
  );
}

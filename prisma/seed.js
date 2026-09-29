const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting full database seeding with 100% website data...");

  // 1. Admin User
  const adminPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@jaideva.com" },
    update: {},
    create: {
      email: "admin@jaideva.com",
      name: "Jai Deva Admin",
      password: adminPassword,
      role: "admin",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    },
  });
  console.log("✓ Admin user created.");

  // 2. Global Brand Configuration
  await prisma.globalConfig.upsert({
    where: { id: "global" },
    update: {
      siteTitle:
        "Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor",
      siteDescription:
        "Established in 2007, Jai Deva Oil Co. is a trusted Authorized Distributor of Industrial & Automotive Lubricants, offering quality lubrication products from leading brands.",
      phone: "+91 98120 22340",
      email: "sales@jaideva.com",
      address:
        "Industrial Area & Regional Distribution Hub, Haryana / Delhi NCR, India",
      logo: "/jaideva-logo.png",
      socialLinks: {
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        copyrightText: "© 2026 Jai Deva Oil Co. All rights reserved.",
      },
    },
    create: {
      id: "global",
      siteTitle:
        "Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor",
      siteDescription:
        "Established in 2007, Jai Deva Oil Co. is a trusted Authorized Distributor of Industrial & Automotive Lubricants, offering quality lubrication products from leading brands.",
      phone: "+91 98120 22340",
      email: "sales@jaideva.com",
      address:
        "Industrial Area & Regional Distribution Hub, Haryana / Delhi NCR, India",
      logo: "/jaideva-logo.png",
      socialLinks: {
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        copyrightText: "© 2026 Jai Deva Oil Co. All rights reserved.",
      },
    },
  });
  console.log("✓ Global config ready.");

  // 3. Navigation Links
  const navLinks = [
    { label: "Home", title: "HOME", url: "/", order: 0 },
    { label: "About Us", title: "ABOUT US", url: "/about-us", order: 1 },
    {
      label: "Products & Services",
      title: "PRODUCTS & SERVICES",
      url: "/products",
      order: 2,
    },
    {
      label: "Events & Gallery",
      title: "EVENTS & GALLERY",
      url: "/events",
      order: 3,
    },
    { label: "Blogs", title: "BLOGS", url: "/blogs", order: 4 },
    { label: "Contact Us", title: "CONTACT US", url: "/contact-us", order: 5 },
  ];

  for (const n of navLinks) {
    const existing = await prisma.navLink.findFirst({
      where: { url: n.url },
    });
    if (existing) {
      await prisma.navLink.update({
        where: { id: existing.id },
        data: n,
      });
    } else {
      await prisma.navLink.create({ data: n });
    }
  }
  console.log("✓ Navigation links ready.");

  // 4. Home Page & Sections
  const homePage = await prisma.page.upsert({
    where: { slug: "home" },
    update: {
      title: "Home",
      description:
        "Established in 2007, Jai Deva Oil Co. is a trusted Multi-Brand Distributor of Industrial & Automotive Lubricants.",
      metaTitle:
        "Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor",
      metaDescription:
        "Reliable Lubrication Solutions for Every Industry & Application. Authorized Distributors of Engine Oil, Hydraulic Oil, Gear Oil, Greases, and Specialty Lubricants.",
    },
    create: {
      title: "Home",
      slug: "home",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Established in 2007, Jai Deva Oil Co. is a trusted Multi-Brand Distributor of Industrial & Automotive Lubricants.",
      metaTitle:
        "Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor",
      metaDescription:
        "Reliable Lubrication Solutions for Every Industry & Application. Authorized Distributors of Engine Oil, Hydraulic Oil, Gear Oil, Greases, and Specialty Lubricants.",
    },
  });

  const homeSections = [
    {
      type: "HomeHero",
      order: 0,
      content: {
        badge: "MULTI-BRAND LUBRICANT SOLUTIONS",
        heading: "Reliable lubrication for every industry and application.",
        description:
          "Jai Deva Oil Co. is a trusted multi-brand industrial and automotive lubricant distributor, helping businesses choose quality products from leading brands with confidence.",
        primaryBtnLabel: "Explore Products",
        primaryBtnUrl: "#products",
        secondaryBtnLabel: "Become a Partner",
        secondaryBtnUrl: "#contact",
        points: [
          "Engine, hydraulic and gear oils",
          "Grease and specialty lubricants",
          "Reliable supply and guidance",
        ],
        bgImage:
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2200&q=85",
        productImage:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
      },
    },
    {
      type: "ProductsServicesSection",
      order: 2,
      content: {
        title: "OUR PRODUCT RANGE",
        subtitle: "Complete Lubrication Solutions under One Roof",
        items: [
          {
            id: "engine-oil",
            slug: "engine-oil",
            name: "Engine Oil",
            link: "/products/hp-lubricants#subcat-0",
            img: "https://www.hplubricants.in/sites/default/files/automotive-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/automotive-2.png",
          },
          {
            id: "hydraulic-oil",
            slug: "hydraulic-oil",
            name: "Hydraulic Oil",
            link: "/products/hp-lubricants#subcat-2",
            img: "https://www.hplubricants.in/sites/default/files/industrial-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/industrial-2.png",
          },
          {
            id: "gear-oil",
            slug: "gear-oil",
            name: "Gear Oil",
            link: "/products/hp-lubricants#subcat-1",
            img: "https://www.hplubricants.in/sites/default/files/specialities-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/specialities-2.png",
          },
          {
            id: "industrial-grease",
            slug: "industrial-grease",
            name: "Industrial Grease",
            link: "/products/hp-lubricants#subcat-3",
            img: "https://www.hplubricants.in/sites/default/files/greases-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/greases-2.png",
          },
          {
            id: "cutting-oil",
            slug: "cutting-oil",
            name: "Cutting Oil",
            link: "/products/motul-tech#subcat-0",
            img: "https://www.hplubricants.in/sites/default/files/specialities-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/specialities-2.png",
          },
          {
            id: "rust-preventive-oil",
            slug: "rust-preventive-oil",
            name: "Rust Preventive Oil",
            link: "/products/tw-chemin#subcat-2",
            img: "https://www.hplubricants.in/sites/default/files/greases-1.png",
            hoverImg:
              "https://www.hplubricants.in/sites/default/files/greases-2.png",
          },
        ],
      },
    },
    {
      type: "MultiBrandSolutionsSection",
      order: 3,
      content: {
        badge: "MULTI-BRAND LUBRICANT SOLUTIONS",
        title: "Multiple Brands.",
        titleHighlight: "One Reliable Partner.",
        paragraph1:
          "At Jai Deva Oil Co., we bring together a diverse portfolio of leading lubricant and industrial solution brands, making it easier for businesses to source the right products from one trusted distributor.",
        paragraph2:
          "Our multi-brand approach allows us to cater to different industrial, automotive and machinery lubrication requirements with a broad range of products and applications.",
        btnLabel: "Explore Our Brands",
        btnUrl: "#brands",
        steps: [
          {
            num: "1",
            name: "Understand",
            desc: "Analyze machinery and operating conditions to define exact lubrication needs.",
            icon: "Search",
          },
          {
            num: "2",
            name: "Recommend",
            desc: "Suggest the ideal brand, grade, and viscosity for maximum equipment life.",
            icon: "ThumbsUp",
          },
          {
            num: "3",
            name: "Supply",
            desc: "Prompt delivery of 100% genuine lubricants directly from authorized stock.",
            icon: "Truck",
          },
          {
            num: "4",
            name: "Support",
            desc: "Ongoing technical guidance, oil condition monitoring, and customer support.",
            icon: "Headphones",
          },
        ],
      },
    },
    {
      type: "IndustriesWeServeSection",
      order: 4,
      content: {
        title: "INDUSTRIES WE SERVE",
        subtitle: "Lubrication Solutions for Diverse Industries",
        leadText:
          "Our extensive lubricant portfolio serves the requirements of various industries, including:",
        description:
          "We provide lubrication products for industrial machinery, hydraulic systems, gears, bearings, engines, metalworking equipment and other critical applications.",
        btnLabel: "Explore Industries",
        btnUrl: "#industries",
        industries: [
          { name: "Steel", icon: "Factory" },
          { name: "Cement", icon: "Building2" },
          { name: "Power", icon: "Zap" },
          { name: "Textile", icon: "Scissors" },
          { name: "Paper", icon: "FileText" },
          { name: "Manufacturing", icon: "Cog" },
          { name: "Engineering", icon: "Wrench" },
          { name: "Automotive", icon: "Car" },
        ],
      },
    },
    {
      type: "TrustedClientsSection",
      order: 5,
      content: {
        title: "OUR BRANDS",
        subtitle: "Leading Brands for Reliable Lubrication Solutions",
        description: "Leading Brands for Reliable Lubrication Solutions",
        clients: [
          {
            id: "hp-lubricants",
            name: "HP Lubricants",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672222/jaideva/brands/hp-lubricants.png",
          },
          {
            id: "caltex",
            name: "Caltex",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672216/jaideva/brands/caltex.svg",
          },
          {
            id: "motultech",
            name: "MotulTech",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672226/jaideva/brands/motultech.png",
          },
          {
            id: "itw-chemin",
            name: "ITW Chemin",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672224/jaideva/brands/itw-chemin.png",
          },
          {
            id: "valvoline",
            name: "Valvoline",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672228/jaideva/brands/valvoline.png",
          },
          {
            id: "lubricon",
            name: "Lubricon",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672225/jaideva/brands/lubricon.png",
          },
          {
            id: "molygraph",
            name: "Molygraph",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672225/jaideva/brands/molygraph.png",
          },
          {
            id: "gs-caltex",
            name: "GS Caltex",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672221/jaideva/brands/gs-caltex.png",
          },
          {
            id: "idemitsu",
            name: "Idemitsu",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672223/jaideva/brands/idemitsu.png",
          },
          {
            id: "deep-pneumatics",
            name: "Deep Pneumatics",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672218/jaideva/brands/deep-pneumatics.png",
          },
          {
            id: "filtermist",
            name: "Filtermist",
            logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1790672219/jaideva/brands/filtermist.svg",
          },
        ],
      },
    },
    {
      type: "WhyJaiDevaSection",
      order: 6,
      content: {
        title: "WHY JAI DEVA OIL CO.?",
        subtitle: "Your Trusted Lubrication Partner Since 2007",
        points: [
          {
            title: "18+ Years of Experience",
            desc: "Strong industry experience in lubricant distribution and trading since 2007.",
            icon: "Calendar",
          },
          {
            title: "Multi-Brand Portfolio",
            desc: "A diverse range of lubricant products from leading brands.",
            icon: "Layers",
          },
          {
            title: "Wide Product Range",
            desc: "Industrial oils, automotive lubricants, greases and specialty lubrication products.",
            icon: "Boxes",
          },
          {
            title: "Quality-Focused Approach",
            desc: "We focus on supplying quality products suited to customer requirements.",
            icon: "ShieldCheck",
          },
          {
            title: "Experienced Team",
            desc: "Skilled professionals with industry knowledge and understanding of customer needs.",
            icon: "Users",
          },
          {
            title: "Reliable Service",
            desc: "Committed to dependable supply and long-term customer relationships.",
            icon: "Clock",
          },
        ],
      },
    },
    {
      type: "BrandClosingBannerSection",
      order: 7,
      content: {
        badge: "JAI DEVA OIL CO.",
        title: "YOUR TRUSTED PARTNER IN INDUSTRIAL & AUTOMOTIVE LUBRICATION",
        description:
          "With 18+ years of industry experience, a diverse multi-brand portfolio and a customer-focused approach, Jai Deva Oil Co. continues to provide dependable lubrication products and solutions for industries, machinery and automotive applications.",
        highlights: [
          "Quality Products",
          "Multiple Brands",
          "Reliable Supply",
          "Customer-Focused Service",
        ],
        btnLabel: "PARTNER WITH JAI DEVA OIL CO.",
        btnUrl: "/contact-us",
      },
    },
    {
      type: "LocateDistributorSection",
      order: 8,
      content: {
        companyName: "Jai Deva Oil Co.",
        logo: "/jaideva-logo.png",
        address: "Industrial Area & Distribution Hub, India",
        phone: "+91 98765 43210",
        workingHours: "Working Hours: Mon - Sat: 9:00 AM - 6:30 PM",
        email: "sales@jaidevaoil.com",
        btn1Text: "SEND ENQUIRY",
        btn2Text: "BECOME A DISTRIBUTOR",
      },
    },
  ];

  // Clean up any old duplicate or deprecated section names
  await prisma.section.deleteMany({
    where: {
      pageId: homePage.id,
      type: {
        in: [
          "HeroSlider",
          "HeroSliderSection",
          "AboutSection",
          "TestimonialsSection",
          "DistributorBanner",
        ],
      },
    },
  });

  for (const s of homeSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: homePage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: homePage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log("✓ Home page & sections ready.");

  // 5. About Us Page & Sections
  const aboutPage = await prisma.page.upsert({
    where: { slug: "about-us" },
    update: {
      description:
        "Learn more about Jai Deva Oil Co., our mentor Mr. Mayank Goyal, and our multi-brand lubricant distribution network.",
      metaTitle:
        "About Us | Jai Deva Oil Co. - Multi-Brand Lubricant Distributor",
      metaDescription:
        "Established in 2007, Jai Deva Oil Co. is a leading wholesaler, distributor, and trader of industrial and automotive lubricants across India.",
    },
    create: {
      title: "About Us",
      slug: "about-us",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Learn more about Jai Deva Oil Co., our mentor Mr. Mayank Goyal, and our multi-brand lubricant distribution network.",
      metaTitle:
        "About Us | Jai Deva Oil Co. - Multi-Brand Lubricant Distributor",
      metaDescription:
        "Established in 2007, Jai Deva Oil Co. is a leading wholesaler, distributor, and trader of industrial and automotive lubricants across India.",
    },
  });

  // Clean up any old Jai Deva section
  await prisma.section.deleteMany({
    where: { pageId: aboutPage.id, type: "AboutJai DevaContent" },
  });

  // Delete LubesHeadquarterSection if it still exists (no longer used on frontend)
  await prisma.section.deleteMany({
    where: { pageId: aboutPage.id, type: "LubesHeadquarterSection" },
  });

  const aboutSections = [
    // 0. Hero
    {
      type: "AboutHero",
      order: 0,
      content: {
        heading: "BUILT ON TRUST SINCE 2007",
        tagline: "Less You Burn, the More You Earn",
        description:
          "Jai Deva Oil Co. is a multi-brand industrial and automotive lubricant distributor. We source, stock, and supply genuine oils, greases, and specialty fluids for plants, fleets, and workshops — with quality checks and dependable regional delivery.",
        bannerImage:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
        altText: "Jai Deva Oil Co. lubricant warehouse and supply",
      },
    },
    // 1. Story & Mentor Narrative
    {
      type: "AboutJaiDevaContent",
      order: 1,
      content: {
        title: "About Jai Deva Oil Co.",
        mainTitle: "About Jai Deva Oil Co.",
        mentorSubHeader: "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.",
        proprietorSubHeader: "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.",
        subtitle: "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.",
        paragraphs: [
          "Established in the year 2007, Jai Deva Oil Co. is a leading and prominent wholesaler, distributor, and trader of lubricant oil, engine oil, automotive grease, hydraulic oil, cutting oil, gear oil, rust preventive oil and much more. Made using the finest quality inputs alongside superior machinery, our products are highly admired and recommended, and each is tested carefully before delivery to our customers.",
          "Our team of professionals keeps a close watch on clients' evolving requirements, helping us meet them within a defined period of time. Owing to our quality-centric approach, we have been highly proficient in meeting the needs of clients across the marketplace, backed by a team of skilled and dexterous professionals with years of expertise in this business.",
          "We are headed by our mentor Mr. Mayank Goyal, who brings extensive knowledge and experience to the field. Owing to his balanced business plans and policies, we have attained a noteworthy position in the industry.",
        ],
      },
    },
    // 2. Team Structure
    {
      type: "OurTeamStructureSection",
      order: 2,
      content: {
        heading: "Our Team Structure",
        description:
          "A synchronized workforce of <strong>62+ lubricant specialists</strong>, relationship managers, and logistics crew driving dependable supply across India.",
        cards: [
          {
            step: 1,
            title: "Industrial Sales",
            total: "27 Members",
            icon: "Factory",
            roles: [
              { count: "20", label: "Field Sales Officers" },
              { count: "7", label: "CRM (Backend)" },
            ],
          },
          {
            step: 2,
            title: "Digital Leads",
            total: "4 Members",
            icon: "Globe2",
            roles: [{ count: "4", label: "CRM (Backend)" }],
            tagline: "Indiamart & SEO",
          },
          {
            step: 3,
            title: "Automotive Sales",
            total: "8 Members",
            icon: "Bike",
            roles: [
              { count: "5", label: "Field Sales Officers" },
              { count: "2", label: "CRM (Backend)" },
              { count: "1", label: "Team Leader" },
            ],
          },
          {
            step: 4,
            title: "Operations & Support",
            total: "23+ Members",
            icon: "Cog",
            roles: [
              { count: "4", label: "Accounts Team" },
              { count: "3", label: "Warehouse Manager" },
              { count: "16+", label: "Drivers & Staff" },
            ],
          },
        ],
      },
    },
    // 3. Journey Timeline
    {
      type: "OurJourneySection",
      order: 3,
      content: {
        eyebrow: "Our Journey",
        heading: "Building Trust Since 2007",
        intro:
          "Every milestone below reflects a step in how we grew from a single trading desk into a multi-brand lubricant distribution partner.",
        milestones: [
          {
            year: "2007",
            icon: "Calendar",
            title: "Company Founded",
            description:
              "Jai Deva Oil Co. begins trading lubricants, laying the foundation for long-term partnerships built on trust.",
          },
          {
            year: "2012",
            icon: "Layers",
            title: "Multi-Brand Portfolio",
            description:
              "We broaden our range to include industrial and automotive lubrication brands, giving customers more choice under one roof.",
          },
          {
            year: "2016",
            icon: "Boxes",
            title: "Distribution Network Grows",
            description:
              "Our warehousing and logistics footprint expands, so customers across sectors can rely on consistent supply.",
          },
          {
            year: "2021",
            icon: "ShieldCheck",
            title: "Quality-First Standards",
            description:
              "We strengthen sourcing and storage practices to meet stricter industry quality and handling standards.",
          },
          {
            year: "Today",
            icon: "Users",
            title: "A Trusted Industry Partner",
            description:
              "We keep growing alongside our customers, offering industry-focused lubrication solutions and dependable service.",
          },
        ],
      },
    },
    // 4. Why Choose Jai Deva Oil Co.
    {
      type: "AboutWhyChooseSection",
      order: 4,
      content: {
        title: "Why Choose Jai Deva Oil Co.?",
        subtitle: "Dependable multi-brand lubricant supply, proven since 2007.",
        items: [
          {
            icon: "Boxes",
            title: "Multi-Brand Portfolio",
            description:
              "HP, Castrol, Shell, Gulf, Servo, Motul – all under one roof for industrial & automotive needs.",
          },
          {
            icon: "Layers",
            title: "Wide Product Range",
            description:
              "Industrial oils, automotive lubricants, greases, hydraulic fluids, and specialty products.",
          },
          {
            icon: "ShieldCheck",
            title: "Quality-First Sourcing",
            description:
              "100% genuine lubricants with factory test certificates, viscosity verification, and sealed-batch integrity.",
          },
          {
            icon: "Truck",
            title: "Reliable Pan-India Supply",
            description:
              "Consistent inventory with prompt delivery across 40+ cities and industrial clusters.",
          },
          {
            icon: "Users",
            title: "Dedicated Account Team",
            description:
              "Experienced CRM and field officers ensure long-term customer satisfaction.",
          },
          {
            icon: "Calendar",
            title: "18+ Years of Trust",
            description:
              "Operating since 2007 with a proven track record of quality service and industry expertise.",
          },
        ],
        whyChooseTitle: "Why Choose Jai Deva Oil Co.?",
        whyChooseSubtitle: "Dependable multi-brand lubricant supply, proven since 2007.",
        whyChooseItems: [
          {
            icon: "Boxes",
            title: "Multi-Brand Portfolio",
            description:
              "HP, Castrol, Shell, Gulf, Servo, Motul – all under one roof for industrial & automotive needs.",
          },
          {
            icon: "Layers",
            title: "Wide Product Range",
            description:
              "Industrial oils, automotive lubricants, greases, hydraulic fluids, and specialty products.",
          },
          {
            icon: "ShieldCheck",
            title: "Quality-First Sourcing",
            description:
              "100% genuine lubricants with factory test certificates, viscosity verification, and sealed-batch integrity.",
          },
          {
            icon: "Truck",
            title: "Reliable Pan-India Supply",
            description:
              "Consistent inventory with prompt delivery across 40+ cities and industrial clusters.",
          },
          {
            icon: "Users",
            title: "Dedicated Account Team",
            description:
              "Experienced CRM and field officers ensure long-term customer satisfaction.",
          },
          {
            icon: "Calendar",
            title: "18+ Years of Trust",
            description:
              "Operating since 2007 with a proven track record of quality service and industry expertise.",
          },
        ],
      },
    },
    // 4. Facilities / Image Gallery
    {
      type: "AboutImageGallerySection",
      order: 5,
      content: {
        eyebrow: "Infrastructure & Operations",
        heading: "Our Facilities & Operational Hubs",
        description:
          "Take a visual tour inside Jai Deva Oil Co.'s modern logistics infrastructure, warehousing depots, and quality-controlled product staging centers.",
        stockBadge: "Over 500+ SKUs Stocked & Ready for Dispatch",
        bannerEyebrow: "Pan-India Supply Reliability",
        bannerHeading:
          "Equipped for Bulk Industrial Deliveries & Emergency Plant Stoppages",
        bannerDescription:
          "Whether you need a single 210-liter barrel of turbine oil or recurring monthly tanker dispatches of ISO VG 68 hydraulic oil, our infrastructure ensures consistent stock, factory test reports, and prompt handling.",
        bannerButtonText: "Schedule a Supply Consultation",
        facilities: [
          {
            id: "depot",
            title: "Central Logistics & Drum Staging Depot",
            subtitle: "High-Capacity Heavy Lubricant Storage",
            category: "Warehousing & Inventory",
            desc: "Covered, temperature-regulated depot equipped for high-density storage of 210L barrels, 20L pails, and IBC intermediate bulk containers.",
            badges: ["Batch Segregation", "Spill Containment System"],
            image: "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
            icon: "Warehouse",
          },
          {
            id: "hq",
            title: "Corporate Operations & Account Advisory",
            subtitle: "Central Commercial & Customer Coordination",
            category: "Corporate Facility",
            desc: "Our business operations desk coordinating customer procurement, supplier relations, invoicing, and pan-India industrial contracts.",
            badges: ["Dedicated Account Managers", "Real-Time Order Tracking"],
            image:
              "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
            icon: "Building2",
          },
          {
            id: "inspection",
            title: "Quality Verification & Spec Assurance Desk",
            subtitle: "Laboratory & Viscosity Verification",
            category: "Quality Control",
            desc: "Verification protocols ensuring every supplied barrel matches OEM specifications, viscosity standards, and valid refinery test certificates.",
            badges: ["OEM Specification Checks", "Sealed Batch Integrity"],
            image: "https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg",
            icon: "ShieldCheck",
          },
          {
            id: "fleet",
            title: "Regional Dispatch & Transit Network",
            subtitle: "Rapid Pan-India Manufacturing Supply",
            category: "Distribution Logistics",
            desc: "Logistics infrastructure ensuring on-schedule delivery across manufacturing clusters, power plants, and automotive workshops in 40+ cities.",
            badges: ["Fast Dispatch Routes", "Zero In-Transit Contamination"],
            image: "https://res.cloudinary.com/dpa93copz/image/upload/v1790675167/jaideva/about/oil-fleet-logistics.jpg",
            icon: "Truck",
          },
        ],
      },
    },
  ];

    for (const s of aboutSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: aboutPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: aboutPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log("✓ About Us page & sections ready.");

  // 5b. Brands Page & Sections
  const brandsPage = await prisma.page.upsert({
    where: { slug: "brands" },
    update: {
      title: "Brands",
      description:
        "Authorized Multi-Brand Distribution Partner for HP, Castrol, Shell, Gulf, Motul, and world-class lubrication manufacturers.",
      metaTitle:
        "Multi-Brand Lubricants Portfolio | Jai Deva Oil Co.",
      metaDescription:
        "Explore Jai Deva Oil Co.'s authorized multi-brand lubricant portfolio covering industrial oils, automotive fluids, bulk barrels, and specialty greases.",
    },
    create: {
      title: "Brands",
      slug: "brands",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Authorized Multi-Brand Distribution Partner for HP, Castrol, Shell, Gulf, Motul, and world-class lubrication manufacturers.",
      metaTitle:
        "Multi-Brand Lubricants Portfolio | Jai Deva Oil Co.",
      metaDescription:
        "Explore Jai Deva Oil Co.'s authorized multi-brand lubricant portfolio covering industrial oils, automotive fluids, bulk barrels, and specialty greases.",
    },
  });

  const brandsSections = [
    // 0. Hero
    {
      type: "BrandsHero",
      order: 0,
      content: {
        badge: "Authorized Multi-Brand Distribution Partner",
        eyebrowBadge: "Authorized Multi-Brand Distribution Partner",
        heading: "Brands That Power Every Industrial Move.",
        description:
          "Jai Deva Oil Co. brings together the world’s most trusted lubricant manufacturers, application engineering expertise, and dependable regional stock for automotive, manufacturing, and heavy infrastructure plants.",
        bannerImage:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg",
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg",
        ctaPrimaryText: "Explore Brand Portfolio",
        ctaPrimaryUrl: "#brand-showcase",
        ctaSecondaryText: "Consult a Specialist",
      },
    },
    // 1. Stats Band
    {
      type: "BrandsStatsBand",
      order: 1,
      content: {
        stats: [
          { value: "91%", label: "Growth in 3 Years" },
          { value: "24%", label: "CAGR (FY 22-23 to FY 25-26)" },
          { value: "1.9X", label: "Turnover in 3 Years" },
          { value: "60+", label: "Employee Strength" },
        ],
      },
    },
    // 2. Pillars
    {
      type: "BrandsPillarsSection",
      order: 2,
      content: {
        eyebrow: "WHY PARTNER WITH JAI DEVA OIL CO.",
        heading: "Engineered Sourcing. Zero Compromise on Fluid Quality.",
        description:
          "We bridge international lubricant formulation science with ground-level plant reliability, ensuring right oil, right machinery, and zero unplanned downtime.",
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
        sideImage:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
        verifiedBadge: "Authorized Refinery Stocks",
        guaranteeTitle: "REFINERY STOCK GUARANTEE",
        guaranteeTag: "ISO VG 32 to 680",
        guaranteeHeadline: "Direct Factory-Sealed Distribution",
        guaranteeDesc:
          "Over 10,000+ barrels and lubricants buffered for prompt industrial dispatch across India.",
        pillars: [
          {
            title: "Refinery-Direct Authenticity",
            description:
              "Every barrel, pail, and carton is sourced through authorized refinery channels with verified batch test reports and tamper-proof seals.",
            icon: "Factory",
          },
          {
            title: "Application-Matched Formulations",
            description:
              "Our lubrication specialists map the exact OEM specification, viscosity index, and operating temperature to eliminate equipment wear.",
            icon: "Wrench",
          },
          {
            title: "Buffer Stock & Fast Road Logistics",
            description:
              "We maintain multi-brand buffer stock across major viscosity grades, eliminating factory shutdown risks and delivery delays.",
            icon: "Truck",
          },
          {
            title: "Total Quality Assurance",
            description:
              "From sealed storage segregation to oil condition monitoring advisory, we help plants achieve optimal oil drain intervals and machinery health.",
            icon: "ShieldCheck",
          },
        ],
      },
    },
    // 3. Product Categories Spectrum
    {
      type: "BrandsProductCategoriesSection",
      order: 3,
      content: {
        eyebrow: "COMPREHENSIVE FLUID SPECTRUM",
        heading: "Lubrication Solutions for Every Industrial & Automotive Sector",
        description:
          "From ultra-pure turbine fluids to heavy-duty earthmover diesel oils, explore our distribution categories designed for high-performance operations.",
        categories: [
          {
            name: "Automotive & Engine Oils",
            description:
              "Synthetic 5W-30, 15W-40 diesel fluids, multi-grade gear lubricants, and coolants.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg",
            badge: "API CK-4 / SN Plus",
          },
          {
            name: "Industrial Gear & Hydraulic Oils",
            description:
              "ISO VG 32 to 680 heavy anti-wear hydraulic, turbine, and industrial circulating oils.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg",
            badge: "DIN 51524 / ISO 11158",
          },
          {
            name: "Refinery Barrels & Bulk Supply",
            description:
              "Factory-sealed 210L drums and bulk road tankers for continuous plant consumption.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg",
            badge: "210L Drums & Tankers",
          },
          {
            name: "Precision Engine Lubrication",
            description:
              "High thermal stability engine oils engineered for severe load and extended drain life.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg",
            badge: "Extended Drain Interval",
          },
          {
            name: "High-Temp Greases & Pastes",
            description:
              "Lithium complex, polyurea, and synthetic extreme-pressure greases for bearings & kilns.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg",
            badge: "NLGI 00 to 3 / EP Pastes",
          },
          {
            name: "Metalworking & CNC Coolants",
            description:
              "Bio-stable water-soluble cutting emulsions, grinding fluids, and rust preventives.",
            image:
              "https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg",
            badge: "Chlorine-Free Emulsions",
          },
        ],
      },
    },
    // 4. CTA
    {
      type: "BrandsCtaSection",
      order: 4,
      content: {
        eyebrowBadge: "Certified Lubrication Engineering Advisory",
        badge: "Certified Lubrication Engineering Advisory",
        heading: "Need an Engine Oil Recommendation or Brand Consultation?",
        description:
          "Our lubrication engineers map OEM engine viscosities (0W-20, 5W-30, 15W-40), industrial gear grades, and drain intervals to maximize your equipment life.",
        bgImage:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg",
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg",
        buttonText: "Request Engine Oil Quote",
        phoneText: "Direct Dispatch Desk",
        phoneNumber: "+91 98111 23456",
      },
    },
  ];

  for (const s of brandsSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: brandsPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: brandsPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log("✓ Brands page & sections ready.");

  // 6. Contact Us Page & Sections
  const contactPage = await prisma.page.upsert({
    where: { slug: "contact-us" },
    update: {
      title: "Contact Us",
      description:
        "Get in touch with Jai Deva Oil Co. for bulk lubricants supply, custom quotes, and distribution enquiries.",
      metaTitle:
        "Contact Us | Jai Deva Oil Co. - Multi-Brand Lubricants Distributor",
      metaDescription:
        "Reach out to Jai Deva Oil Co. sales and technical team for industrial oils, automotive lubricants, and greases across India.",
    },
    create: {
      title: "Contact Us",
      slug: "contact-us",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Get in touch with Jai Deva Oil Co. for bulk lubricants supply, custom quotes, and distribution enquiries.",
      metaTitle:
        "Contact Us | Jai Deva Oil Co. - Multi-Brand Lubricants Distributor",
      metaDescription:
        "Reach out to Jai Deva Oil Co. sales and technical team for industrial oils, automotive lubricants, and greases across India.",
    },
  });

  const contactSections = [
    {
      type: "ContactHero",
      order: 0,
      content: {
        title: "Contact Us",
        subtitle: "",
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1787738184/mahalaxmi/contact/contact-us-banner.jpg",
        altText: "Contact Us - Jai Deva Oil Co.",
      },
    },
    {
      type: "ContactHeadquarter",
      order: 1,
      content: {
        companyName: "Jai Deva Oil Co.",
        badge: "Multi-Brand Industrial & Automotive Lubricants Distributor",
        description:
          "Connect with our team for bulk lubricants supply, dealership opportunities, technical data sheets, and custom quotes.",
        proprietor: "Mr. Mayank Goyal",
        address: "Industrial Area & Regional Distribution Hub, India",
        phone: "+91 98765 43210",
        whatsapp: "919876543210",
        email: "sales@jaidevaoil.com",
        workingHours: "Monday to Saturday: 9:00 AM – 6:00 PM",
      },
    },
    {
      type: "ContactForm",
      order: 2,
      content: {
        badge: "Online Request",
        title: "Send an Enquiry",
        subtitle:
          "Please fill in your details and our team will get back to you with pricing & availability.",
        buttonText: "Submit Enquiry",
      },
    },
  ];

  // Remove deprecated RegionalOffices section if it exists
  await prisma.section.deleteMany({
    where: { pageId: contactPage.id, type: "RegionalOffices" },
  });

  for (const s of contactSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: contactPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content, order: s.order },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: contactPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log("✓ Contact Us page & sections ready.");

  // 7. Events Page & Sections
  const eventsPage = await prisma.page.upsert({
    where: { slug: "events" },
    update: {
      title: "Events & Activities",
      description:
        "Photo gallery and stakeholder engagement events hosted by Jai Deva Oil Co.",
      metaTitle: "Events & Gallery | Jai Deva Oil Co.",
      metaDescription:
        "Explore photo gallery and coverage of dealer meets, exhibitions, and industrial seminars by Jai Deva Oil Co.",
    },
    create: {
      title: "Events & Activities",
      slug: "events",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Photo gallery and stakeholder engagement events hosted by Jai Deva Oil Co.",
      metaTitle: "Events & Gallery | Jai Deva Oil Co.",
      metaDescription:
        "Explore photo gallery and coverage of dealer meets, exhibitions, and industrial seminars by Jai Deva Oil Co.",
    },
  });

  const eventsSections = [
    {
      type: "EventsHero",
      order: 0,
      content: {
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1787737913/mahalaxmi/events/events-banner.jpg",
        altText: "JAI DEVA OIL CO. Events & Activities Gallery Banner",
      },
    },
    {
      type: "EventsContent",
      order: 1,
      content: {
        title: "EVENTS",
        introText:
          "Jai Deva Oil Co. actively engages with their stakeholders by frequently hosting meetings and events with them. This includes meeting business partners, strategic partners, distributors, OEMs, agencies, mechanics, and industrial clients.",
      },
    },
    {
      type: "EventsGallery",
      order: 2,
      content: {
        galleryItems: [
          {
            id: 1,
            title: "HP Racer & HP Neosynth CNBC TV18 Overdrive Awards",
            image:
              "https://www.hplubricants.in/sites/default/files/hplube-at-overdrive-awards.jpg",
            altText:
              "HP Racer and HP Neosynth partners with CNBC TV18 to sponsor Overdrive Awards",
          },
          {
            id: 2,
            title: "Neosynth Plus 0W 20 launch for Petrol Cars",
            image:
              "https://www.hplubricants.in/sites/default/files/neosynth-plus-0w-20-launch-for-petrol-cars.jpg",
            altText: "Neosynth Plus 0W 20 launch for Petrol Cars",
          },
          {
            id: 3,
            title: "Excon 2017 Discussion",
            image: "https://www.hplubricants.in/sites/default/files/b5.jpg",
            altText: "Excon 2017 Discussion",
          },
          {
            id: 4,
            title: "Excon 2017 Jai Deva Oil Co. Stall Sideview",
            image: "https://www.hplubricants.in/sites/default/files/b4.jpg",
            altText: "Excon 2017 Jai Deva Oil Co. Stall Sideview",
          },
          {
            id: 5,
            title: "Excon 2017 Jai Deva Oil Co. Stall",
            image: "https://www.hplubricants.in/sites/default/files/b3.jpg",
            altText: "Excon 2017 Jai Deva Oil Co. Stall",
          },
          {
            id: 6,
            title: "Excon 2017 HPCL Team",
            image: "https://www.hplubricants.in/sites/default/files/b2.jpg",
            altText: "Excon 2017 HPCL Team",
          },
          {
            id: 7,
            title: "Excon 2017 Ribbon Cutting",
            image: "https://www.hplubricants.in/sites/default/files/b1.jpg",
            altText: "Excon 2017 Ribbon Cutting",
          },
          {
            id: 8,
            title: "OEM meet at Chennai",
            image: "https://www.hplubricants.in/sites/default/files/18.jpg",
            altText: "OEM meet at Chennai",
          },
          {
            id: 9,
            title: "World Road Meeting Banner 2017",
            image: "https://www.hplubricants.in/sites/default/files/17.jpg",
            altText: "World Road Meeting Banner 2017",
          },
          {
            id: 10,
            title: "World Road Meeting Screen Display 2017",
            image: "https://www.hplubricants.in/sites/default/files/16.jpg",
            altText: "World Road Meeting Screen Display 2017",
          },
          {
            id: 11,
            title: "World Road Meeting Stall 2017",
            image: "https://www.hplubricants.in/sites/default/files/15.jpg",
            altText: "World Road Meeting Stall 2017",
          },
          {
            id: 12,
            title: "World Road Meeting Exhibition 2017",
            image: "https://www.hplubricants.in/sites/default/files/14.jpg",
            altText: "World Road Meeting Exhibition 2017",
          },
          {
            id: 13,
            title: "World Road Meeting Lube Counter 2017",
            image: "https://www.hplubricants.in/sites/default/files/13.jpg",
            altText: "World Road Meeting Lube Counter 2017",
          },
          {
            id: 14,
            title: "World Road Meeting I&C Counter 2017",
            image: "https://www.hplubricants.in/sites/default/files/12.jpg",
            altText: "World Road Meeting I&C Counter 2017",
          },
          {
            id: 15,
            title: "Road Safety 2017 Salute",
            image: "https://www.hplubricants.in/sites/default/files/11.jpg",
            altText: "Road Safety 2017 Salute",
          },
          {
            id: 16,
            title: "Road Safety 2017 Showcase",
            image: "https://www.hplubricants.in/sites/default/files/10.jpg",
            altText: "Road Safety 2017 Showcase",
          },
          {
            id: 17,
            title: "Milcy Super Launch",
            image: "https://www.hplubricants.in/sites/default/files/9.jpg",
            altText: "Milcy Super Launch",
          },
          {
            id: 18,
            title: "Jai Deva Oil Co. ConMac 2017 Showcase",
            image: "https://www.hplubricants.in/sites/default/files/8.jpg",
            altText: "Jai Deva Oil Co. ConMac 2017 Showcase",
          },
          {
            id: 19,
            title: "Jai Deva Oil Co. ConMac 2017",
            image: "https://www.hplubricants.in/sites/default/files/7.jpg",
            altText: "Jai Deva Oil Co. ConMac 2017",
          },
          {
            id: 20,
            title: "Inauguration of POL Testing laboratory for Indian Army",
            image: "https://www.hplubricants.in/sites/default/files/6.jpg",
            altText: "Inauguration of POL Testing laboratory for Indian Army",
          },
          {
            id: 21,
            title:
              "Inauguration of POL Testing laboratory for Indian Army Showcase",
            image: "https://www.hplubricants.in/sites/default/files/5.jpg",
            altText:
              "Inauguration of POL Testing laboratory for Indian Army Showcase",
          },
          {
            id: 22,
            title:
              "Inauguration of POL Testing laboratory for Indian Army Ribbon Cut",
            image: "https://www.hplubricants.in/sites/default/files/4.jpg",
            altText:
              "Inauguration of POL Testing laboratory for Indian Army Ribbon Cut",
          },
          {
            id: 23,
            title:
              "Inauguration of POL Testing laboratory for Indian Army Walk",
            image: "https://www.hplubricants.in/sites/default/files/3.jpg",
            altText:
              "Inauguration of POL Testing laboratory for Indian Army Walk",
          },
          {
            id: 24,
            title:
              "Inauguration of POL Testing laboratory for Indian Army Chat",
            image: "https://www.hplubricants.in/sites/default/files/2.jpg",
            altText:
              "Inauguration of POL Testing laboratory for Indian Army Chat",
          },
          {
            id: 25,
            title:
              "Inauguration of POL Testing laboratory for Indian Army Red Carpet",
            image: "https://www.hplubricants.in/sites/default/files/1.jpg",
            altText:
              "Inauguration of POL Testing laboratory for Indian Army Red Carpet",
          },
        ],
      },
    },
  ];

  for (const s of eventsSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: eventsPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: eventsPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log("✓ Events page & sections ready.");

  // 8. Product Categories
  const categories = [
    {
      name: "Industrial Oils",
      slug: "industrial-oils",
      shortDesc:
        "High performance hydraulic, compressor, turbine, transformer, gear, film, and machinery lubricants.",
      fullDesc:
        "Discover JAI DEVA OIL CO.' industrial oils tailored for hydraulic systems, gearboxes, compressors, sugar mills, and more. Trusted for quality, innovation, and reliability.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Compressor-Oils.png",
      isFeatured: true,
      order: 0,
    },
    {
      name: "Industrial Greases",
      slug: "industrial-greases",
      shortDesc:
        "Extreme pressure lithium, complex, wheel bearing, and specialty temperature resistant greases.",
      fullDesc:
        "JAI DEVA OIL CO. supplies premium industrial greases formulated for heavy machinery bearings, steel mills, and high temperature applications.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Industrial-Greases.png",
      isFeatured: true,
      order: 1,
    },
    {
      name: "Automotive Oils",
      slug: "automotive-oils",
      shortDesc:
        "High-quality automotive, agricultural, passenger car, and engine oils.",
      fullDesc:
        "Explore JAI DEVA OIL CO.' range of automotive, agricultural, and commercial engine oils offering superior quality and performance for all your vehicles.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Automotive-Oils.png",
      isFeatured: true,
      order: 2,
    },
    {
      name: "Bike Engine Oils",
      slug: "bike-oils",
      shortDesc:
        "4-stroke motorcycle engine lubricants with JASO MA2 wet clutch specification.",
      fullDesc:
        "HP RACER 4T motorcycle oils provide 3-in-1 protection for motorcycle engine, wet clutch, and transmission gearbox.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Automotive-Oils.png",
      isFeatured: true,
      order: 3,
    },
  ];

  for (const cat of categories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✓ ${categories.length} Product categories ready.`);

  // 9. Products
  const sampleProducts = [
    {
      name: "HYCOM 150 P",
      slug: "hycom-150-p",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Specially developed for railway compressors.",
      applicationAreas: "Specially developed for railway compressors.",
      performanceBenefits: [
        "This oil has good demulsibility property, low deposits and sludge foaming tendency at a wide range of working temperature and in any gaseous atmosphere.",
        "Meets DIN 51506 VDL specifications, IS 13256:1992 DAB",
      ],
      specialFeatures: [
        "It is blended out of highly refined turbine base stocks and special types of anti-oxidants, anti-rust, anti-foam and demulsifier which do not react to any of the types of gases.",
      ],
      specsText: "Meets DIN 51506 VDL specifications, IS 13256:1992 DAB",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Appearance",
          value: "Clear",
        },
        {
          property: "Acidity, Total mg KOH / g",
          value: "0.20",
        },
        {
          property: "Density @ 29.5°C, g/cc",
          value: "0.8770",
        },
        {
          property: "Flash Point, COC, °C",
          value: ">210",
        },
        {
          property: "Pour Point, °C",
          value: "<-15",
        },
        {
          property: "OXIDATION STABILITY @ 135°C, 168 Hrs",
          value: "Pass",
        },
        {
          property: "FZG Rig Test, Pass Load Stage",
          value: ">8",
        },
        {
          property: "Rusting Test, Syn Sea Water, 24 Hrs",
          value: "Pass",
        },
        {
          property: "Kin. Viscosity @ 40°C, cSt",
          value: "135-165",
        },
        {
          property: "Kin. Viscosity @ 100°C, cSt",
          value: "15.0",
        },
        {
          property: "Viscosity Index",
          value: "100",
        },
      ],
      pdfUrl: "/docs/HYCOM_150_P_TDS.pdf",
      msdsUrl: "/docs/HYCOM_150_P_MSDS.pdf",
      isFeatured: true,
      order: 0,
    },
    {
      name: "HYCOM C 100, 150, 220, 320, 460",
      slug: "hycom-c-series",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Reciprocating air compressor lubrication.",
      applicationAreas: "Reciprocating air compressor lubrication.",
      performanceBenefits: ["High thermal stability", "Low carbon residue"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "100 - 460",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 1,
    },
    {
      name: "HYCOM LS EXPO SERIES",
      slug: "hycom-ls-expo",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Long service life screw compressor oil.",
      applicationAreas: "Long service life screw compressor oil.",
      performanceBenefits: ["Anti-wear", "Oxidation resistance"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Synthetic Blend",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 2,
    },
    {
      name: "HYCOM LS SERIES",
      slug: "hycom-ls-series",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Rotary screw air compressors.",
      applicationAreas: "Rotary screw air compressors.",
      performanceBenefits: ["Extended drain interval"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Rotary Screw Oil",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 3,
    },
    {
      name: "HYCOM PGE",
      slug: "hycom-pge",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Polyglycol synthetic compressor lubricant.",
      applicationAreas: "Polyglycol synthetic compressor lubricant.",
      performanceBenefits: ["Gas compressor compatibility"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Base",
          value: "PAG Synthetic",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 4,
    },
    {
      name: "CYNDOL GRADES",
      slug: "cyndol-grades",
      subtitle: "CYLINDER OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "CYLINDER OIL",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "Steam engine cylinders and worm gear drives operating under heavy wet steam conditions.",
      applicationAreas:
        "Steam engine cylinders and worm gear drives operating under heavy wet steam conditions.",
      performanceBenefits: [
        "Compounded with fatty oils",
        "Resists water washing",
      ],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity @ 100°C",
          value: "30 - 45 cSt",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 5,
    },
    {
      name: "HP FILM OIL",
      slug: "hp-film-oil",
      subtitle: "FILM OILS & STEEL MILL BEARING OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "HP FILM OIL grades are recommended for use in anti-friction bearings, plain bearings, drive gears and pinion of steel mills, where operating conditions are moderate. They are also suitable for use in circulation systems, where oils with high demulsibility characteristics are required.",
      applicationAreas:
        "HP FILM OIL grades are recommended for use in anti-friction bearings, plain bearings, drive gears and pinion of steel mills, where operating conditions are moderate. They are also suitable for use in circulation systems, where oils with high demulsibility characteristics are required.",
      performanceBenefits: [
        "Excellent oxidation stability",
        "High demulsibility",
        "Non-corrosive to materials",
      ],
      specialFeatures: [
        "HP FILM OILS are highly refined mineral oils suitable for oil film bearings used in steel plants. The product is blended from solvent extracted high viscosity index base stocks having excellent demulsibility characteristics. They also possess good oxidation and thermal stability.",
      ],
      specsText:
        "HP FILM OIL grades meet IPSS 1-09-001-95 GRADE 1 TO 6 & IS : 6552-1987",
      tableHeaders: ["46", "68", "100", "150", "220"],
      propertiesTable: [
        {
          property: "Appearance",
          value: "Bright & Clear",
        },
        {
          property: "Kinematic, Viscosity, cSt, @ 40°C",
          value: "",
          values: ["46", "68", "100", "150", "220"],
        },
        {
          property: "Kinematic, Viscosity, cSt, @ 100°C",
          value: "",
          values: ["4.0", "5.0", "6.1", "7.8", "10.1"],
        },
        {
          property: "Viscosity Index, Min",
          value: "",
          values: ["90", "90", "90", "90", "90"],
        },
        {
          property: "Flash Point, COC,°C, Min.",
          value: "",
          values: ["160", "190", "200", "210", "230"],
        },
        {
          property: "Pour Point, °C, Max.",
          value: "",
          values: ["(-)18", "(-)18", "(-)15", "(-)12", "(-)12"],
        },
        {
          property: "Copper Strip Corrosion, @ 100°C For 3 Hrs.",
          value: "Pass",
        },
        {
          property:
            "Emulsion Characteristics, In 20 Minutes,ml, At 54°C At 82°C",
          value: "",
          values: ["40-37-3", "40-37-3", "-", "-", "-"],
        },
      ],
      pdfUrl: "/docs/HP_FILM_OIL_TDS.pdf",
      msdsUrl: "/docs/HP_FILM_OIL_MSDS.pdf",
      isFeatured: true,
      order: 6,
    },
    {
      name: "HP STEEL 320",
      slug: "hp-steel-320",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Heavy duty steel mill roll neck bearings.",
      applicationAreas: "Heavy duty steel mill roll neck bearings.",
      performanceBenefits: ["Water separation"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "320",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: true,
      order: 7,
    },
    {
      name: "HP STEEL EP 100",
      slug: "hp-steel-ep-100",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Steel wire rod mill high speed bearings.",
      applicationAreas: "Steel wire rod mill high speed bearings.",
      performanceBenefits: ["Extreme pressure EP protection"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "100",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 8,
    },
    {
      name: "HP STEEL GRADES",
      slug: "hp-steel-grades",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Rolling mill Morgoil lubrication systems.",
      applicationAreas: "Rolling mill Morgoil lubrication systems.",
      performanceBenefits: ["Oxidation resistance"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Series",
          value: "Steel Grades",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 9,
    },
    {
      name: "HP FLUSHING OIL",
      slug: "hp-flushing-oil",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "GENERAL PURPOSE MACHINERY OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Flushing out old oil, sludge, and contaminants.",
      applicationAreas: "Flushing out old oil, sludge, and contaminants.",
      performanceBenefits: ["High solvency", "Viscosity light"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity @ 40°C",
          value: "15 - 22 cSt",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 10,
    },
    {
      name: "YANTROL / YANTROL N SERIES",
      slug: "yantrol-series",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "GENERAL PURPOSE MACHINERY OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Textile looms and plain bearings.",
      applicationAreas: "Textile looms and plain bearings.",
      performanceBenefits: ["Non-drip tacky property"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity Grades",
          value: "32 to 460",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 11,
    },
    {
      name: "ENKLO 32 SUPER",
      slug: "enklo-32-super",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Precision CNC machine tools.",
      applicationAreas: "Precision CNC machine tools.",
      performanceBenefits: ["Anti-wear protection"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "32",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 12,
    },
    {
      name: "ENKLO 46 PREMIUM",
      slug: "enklo-46-premium",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Industrial hydraulic presses.",
      applicationAreas: "Industrial hydraulic presses.",
      performanceBenefits: ["Demulsibility"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "46",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 13,
    },
    {
      name: "ENKLO 46 SUPER",
      slug: "enklo-46-super",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Mobile earthmoving machinery.",
      applicationAreas: "Mobile earthmoving machinery.",
      performanceBenefits: ["Anti-foam"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "46",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 14,
    },
    {
      name: "ENKLO 68 PREMIUM",
      slug: "enklo-68-premium",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Heavy duty hydraulic systems.",
      applicationAreas: "Heavy duty hydraulic systems.",
      performanceBenefits: ["Shear stability"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "68",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 15,
    },
    {
      name: "ENKLO 68 SUPER",
      slug: "enklo-68-super",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "High-pressure hydraulic pumps.",
      applicationAreas: "High-pressure hydraulic pumps.",
      performanceBenefits: ["Pump anti-wear"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Kin. Viscosity @ 40°C",
          value: "64.0 - 72.0 cSt",
        },
      ],
      pdfUrl: "/docs/ENKLO_68_TDS.pdf",
      msdsUrl: "/docs/ENKLO_68_MSDS.pdf",
      isFeatured: false,
      order: 16,
    },
    {
      name: "WAYLUBE",
      slug: "waylube-grades",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "MACHINERY OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Machine tool slideways and guides.",
      applicationAreas: "Machine tool slideways and guides.",
      performanceBenefits: ["Prevents stick-slip chatter"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "68 / 220",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 17,
    },
    {
      name: "HYTAK",
      slug: "hytak-base",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Heavy open gears.",
      applicationAreas: "Heavy open gears.",
      performanceBenefits: ["Bitumen free compound"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Open Gear Compound",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 18,
    },
    {
      name: "HYTAK 500 NB",
      slug: "hytak-500-nb",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Cement kilns open gear lubricant.",
      applicationAreas: "Cement kilns open gear lubricant.",
      performanceBenefits: ["Non-toxic"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "500 NB",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 19,
    },
    {
      name: "HYTAK 500 NB-1000",
      slug: "hytak-500-nb-1000",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Ultra-heavy load open gear drives.",
      applicationAreas: "Ultra-heavy load open gear drives.",
      performanceBenefits: ["Synthetic film"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity @ 100°C",
          value: "1000 cSt",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 20,
    },
    {
      name: "NU-MATIC",
      slug: "nu-matic-grades",
      subtitle: "PNEUMATIC TOOL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "PNEUMATIC TOOL OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Air hammers and rock drills.",
      applicationAreas: "Air hammers and rock drills.",
      performanceBenefits: ["Emulsifies with moisture"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity",
          value: "ISO VG 46 / 100 / 320",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 21,
    },
    {
      name: "SEETUL GRADES",
      slug: "seetul-grades",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Ammonia refrigeration compressors.",
      applicationAreas: "Ammonia refrigeration compressors.",
      performanceBenefits: ["Low pour point"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Mineral Refrigeration Oil",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 22,
    },
    {
      name: "SEETUL N 68 (P)",
      slug: "seetul-n-68",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Cold storage refrigeration.",
      applicationAreas: "Cold storage refrigeration.",
      performanceBenefits: ["Ultra low floc point"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "68",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 23,
    },
    {
      name: "SEETUL RFL GRADES",
      slug: "seetul-rfl",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Freon refrigerant systems.",
      applicationAreas: "Freon refrigerant systems.",
      performanceBenefits: ["Refrigerant compatibility"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Series",
          value: "RFL",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 24,
    },
    {
      name: "SEETUL S 68",
      slug: "seetul-s-68",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Synthetic refrigeration compressor oil.",
      applicationAreas: "Synthetic refrigeration compressor oil.",
      performanceBenefits: ["High thermal resistance"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "68",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 25,
    },
    {
      name: "SEETUL SE 68",
      slug: "seetul-se-68",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Polyolester POE synthetic oil.",
      applicationAreas: "Polyolester POE synthetic oil.",
      performanceBenefits: ["HFC compatible"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Base",
          value: "POE Synthetic",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 26,
    },
    {
      name: "SPINTEK",
      slug: "spintek-base",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Textile spinning spindles.",
      applicationAreas: "Textile spinning spindles.",
      performanceBenefits: ["Ultra low viscosity"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Viscosity @ 40°C",
          value: "2 to 22 cSt",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 27,
    },
    {
      name: "SPINTEK 3",
      slug: "spintek-3",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Ultra-high speed textile spindles.",
      applicationAreas: "Ultra-high speed textile spindles.",
      performanceBenefits: ["Low power consumption"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "3",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 28,
    },
    {
      name: "SPINTEK EE SERIES",
      slug: "spintek-ee-series",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Energy efficient textile spindle lubricant.",
      applicationAreas: "Energy efficient textile spindle lubricant.",
      performanceBenefits: ["Friction modifier technology"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Series",
          value: "EE Series",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 29,
    },
    {
      name: "SPINTEK SYN 2",
      slug: "spintek-syn-2",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Synthetic textile spindle fluid.",
      applicationAreas: "Synthetic textile spindle fluid.",
      performanceBenefits: ["Zero deposit formation"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "2",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 30,
    },
    {
      name: "STANTROL 1, 3",
      slug: "stantrol-1-3",
      subtitle: "STENTER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "STENTER OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Textile stenter machine conveyor chains up to 240°C.",
      applicationAreas: "Textile stenter machine conveyor chains up to 240°C.",
      performanceBenefits: ["Non-carbonizing high temperature synthetic oil"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Flash Point",
          value: "> 260°C",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 31,
    },
    {
      name: "CRUSHFINE 40 NB",
      slug: "crushfine-40-nb",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Sugar mill crushing roller journal bearings.",
      applicationAreas: "Sugar mill crushing roller journal bearings.",
      performanceBenefits: ["Bitumen-free compounded oil"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "40 NB",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 32,
    },
    {
      name: "CRUSHFINE 45 NB-II",
      slug: "crushfine-45-nb-ii",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Heavy duty sugar mill roll bearings.",
      applicationAreas: "Heavy duty sugar mill roll bearings.",
      performanceBenefits: ["High film strength"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "45 NB-II",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 33,
    },
    {
      name: "CRUSHFINE 60 NB-I",
      slug: "crushfine-60-nb-i",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Sugar cane crusher bearings under high shock load.",
      applicationAreas: "Sugar cane crusher bearings under high shock load.",
      performanceBenefits: ["Anti-wear EP"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "60 NB-I",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 34,
    },
    {
      name: "CRUSHFINE 60 NB-II",
      slug: "crushfine-60-nb-ii",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "High capacity sugar mill rollers.",
      applicationAreas: "High capacity sugar mill rollers.",
      performanceBenefits: ["Water resistance"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "60 NB-II",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 35,
    },
    {
      name: "CRUSHWELL 1, 2, 3, 4, 5",
      slug: "crushwell-series",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "All grades of sugar mill crusher bearings.",
      applicationAreas: "All grades of sugar mill crusher bearings.",
      performanceBenefits: ["High viscosity compounded oil"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grades",
          value: "1 to 5",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 36,
    },
    {
      name: "HP TRANSFORMER OIL I",
      slug: "hp-transformer-oil-1",
      subtitle: "TRANSFORMER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TRANSFORMER OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Electrical insulation in power transformers.",
      applicationAreas: "Electrical insulation in power transformers.",
      performanceBenefits: ["High breakdown voltage >70 kV"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "IS Standard",
          value: "IS 335",
        },
      ],
      pdfUrl: "/docs/POWERTRAN_TDS.pdf",
      msdsUrl: "/docs/POWERTRAN_MSDS.pdf",
      isFeatured: false,
      order: 37,
    },
    {
      name: "HP TRANSFORMER OILS",
      slug: "hp-transformer-oils",
      subtitle: "TRANSFORMER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TRANSFORMER OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Distribution transformers and switchgear.",
      applicationAreas: "Distribution transformers and switchgear.",
      performanceBenefits: ["Low Tan Delta"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Uninhibited",
        },
      ],
      pdfUrl: "/docs/POWERTRAN_TDS.pdf",
      msdsUrl: "/docs/POWERTRAN_MSDS.pdf",
      isFeatured: false,
      order: 38,
    },
    {
      name: "TURBINOL",
      slug: "turbinol-base",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Steam, gas, and hydro turbines.",
      applicationAreas: "Steam, gas, and hydro turbines.",
      performanceBenefits: ["TOST life > 3500 hours", "Water demulsibility"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ISO VG",
          value: "32 / 46 / 68",
        },
      ],
      pdfUrl: "/docs/TURBINOL_TDS.pdf",
      msdsUrl: "/docs/TURBINOL_MSDS.pdf",
      isFeatured: false,
      order: 39,
    },
    {
      name: "TURBINOL LP",
      slug: "turbinol-lp",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Long life turbine oil.",
      applicationAreas: "Long life turbine oil.",
      performanceBenefits: ["High thermal stability"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Series",
          value: "LP",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 40,
    },
    {
      name: "TURBINOL XT",
      slug: "turbinol-xt",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Extreme temperature gas turbine bearings.",
      applicationAreas: "Extreme temperature gas turbine bearings.",
      performanceBenefits: ["Synthetic turbine oil"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Series",
          value: "XT",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 41,
    },
    {
      name: "HP METWIRE NB",
      slug: "hp-metwire-nb",
      subtitle: "WIRE ROPE LUBRICANTS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "WIRE ROPE LUBRICANTS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Steel wire ropes in cranes, hoists, and elevators.",
      applicationAreas: "Steel wire ropes in cranes, hoists, and elevators.",
      performanceBenefits: ["Deep strand penetration"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Type",
          value: "Non-bituminous",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 42,
    },
    {
      name: "RODEC 120",
      slug: "rodec-120",
      subtitle: "WIRE ROPE LUBRICANTS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "WIRE ROPE LUBRICANTS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description: "Heavy duty crane wire ropes.",
      applicationAreas: "Heavy duty crane wire ropes.",
      performanceBenefits: ["Tacky coating"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Grade",
          value: "120",
        },
      ],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf",
      isFeatured: false,
      order: 43,
    },
    {
      name: "HP ALPLEX 2",
      slug: "hp-alplex-2",
      subtitle: "INDUSTRIAL GREASES",
      categorySlug: "industrial-greases",
      categoryName: "Industrial Greases",
      subCategoryTitle: "INDUSTRIAL GREASES",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "Lithium complex extreme pressure grease for steel rolling mills and heavy bearings.",
      applicationAreas:
        "Lithium complex extreme pressure grease for steel rolling mills and heavy bearings.",
      performanceBenefits: ["Drop point >260°C", "High load bearing capacity"],
      specialFeatures: [],
      specsText: "IS 14847:2000 NLGI 2",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "Drop Point",
          value: "> 260°C",
        },
      ],
      pdfUrl: "/docs/ALPLEX_TDS.pdf",
      msdsUrl: "/docs/ALPLEX_MSDS.pdf",
      isFeatured: false,
      order: 44,
    },
    {
      name: "HP AP3 LL (B)",
      slug: "hp-ap3-ll",
      subtitle: "INDUSTRIAL GREASES",
      categorySlug: "industrial-greases",
      categoryName: "Industrial Greases",
      subCategoryTitle: "INDUSTRIAL GREASES",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "All-purpose grease for anti-friction bearings, chassis, and water pumps.",
      applicationAreas:
        "All-purpose grease for anti-friction bearings, chassis, and water pumps.",
      performanceBenefits: ["High structural shear stability"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "NLGI Grade",
          value: "3",
        },
      ],
      pdfUrl: "/docs/AP3_TDS.pdf",
      msdsUrl: "/docs/AP3_MSDS.pdf",
      isFeatured: false,
      order: 45,
    },
    {
      name: "HP KISAN SHAKTI",
      slug: "hp-kisan-shakti",
      subtitle: "AGRICULTURE OILS",
      categorySlug: "automotive-oils",
      categoryName: "Automotive Oils",
      subCategoryTitle: "AGRICULTURE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "Formulated specifically for tractors and pump sets used in heavy agricultural operations.",
      applicationAreas:
        "Formulated specifically for tractors and pump sets used in heavy agricultural operations.",
      performanceBenefits: [
        "High engine protection against dust",
        "Shear stability under continuous tilling",
      ],
      specialFeatures: [],
      specsText: "API CF/SF, IS 13656 E-DL2",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "SAE Viscosity Grade",
          value: "20W-40",
        },
      ],
      pdfUrl: "/docs/HP_KISAN_SHAKTI_TDS.pdf",
      msdsUrl: "/docs/HP_KISAN_SHAKTI_MSDS.pdf",
      isFeatured: false,
      order: 46,
    },
    {
      name: "HP SUPER DUTY BRAKE FLUID DOT 3",
      slug: "hp-super-duty-brake-fluid-dot-3",
      subtitle: "BRAKE FLUIDS",
      categorySlug: "automotive-oils",
      categoryName: "Automotive Oils",
      subCategoryTitle: "BRAKE FLUIDS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "Hydraulic brake and clutch systems in passenger cars, trucks, and buses.",
      applicationAreas:
        "Hydraulic brake and clutch systems in passenger cars, trucks, and buses.",
      performanceBenefits: ["High boiling point preventing vapor lock"],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "ERBP, °C",
          value: "> 230",
        },
      ],
      pdfUrl: "/docs/DOT3_TDS.pdf",
      msdsUrl: "/docs/DOT3_MSDS.pdf",
      isFeatured: false,
      order: 47,
    },
    {
      name: "HP RACER 4T 20W-40",
      slug: "hp-racer-4t-20w40",
      subtitle: "SCOOTER & BIKE OILS",
      categorySlug: "bike-oils",
      categoryName: "Bike Engine Oils",
      subCategoryTitle: "SCOOTER & BIKE OILS",
      containerImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      description:
        "4-stroke motorcycles from Hero, Honda, Bajaj, TVS, Yamaha, and Royal Enfield.",
      applicationAreas:
        "4-stroke motorcycles from Hero, Honda, Bajaj, TVS, Yamaha, and Royal Enfield.",
      performanceBenefits: [
        "JASO MA2 wet clutch friction control",
        "Smooth gear shifting",
      ],
      specialFeatures: [],
      specsText: "",
      tableHeaders: ["Property", "Value"],
      propertiesTable: [
        {
          property: "SAE Grade",
          value: "20W-40",
        },
      ],
      pdfUrl: "/docs/RACER_20W40_TDS.pdf",
      msdsUrl: "/docs/RACER_20W40_MSDS.pdf",
      isFeatured: false,
      order: 48,
    },
  ];

  for (const p of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ ${sampleProducts.length} Products ready.`);

  // 10. Blogs Page & Sections
  const blogsPage = await prisma.page.upsert({
    where: { slug: "blogs" },
    update: {
      title: "Technical Articles & Lubrication Insights",
      description:
        "Technical articles, educational guides, and lubrication maintenance recommendations.",
      metaTitle: "Blogs & Insights | Jai Deva Oil Co.",
      metaDescription:
        "Learn how often to change engine oils, hydraulic fluid maintenance, and lubrication best practices from Jai Deva Oil Co.",
    },
    create: {
      title: "Technical Articles & Lubrication Insights",
      slug: "blogs",
      type: "static",
      visibility: "published",
      isStatic: true,
      description:
        "Technical articles, educational guides, and lubrication maintenance recommendations.",
      metaTitle: "Blogs & Insights | Jai Deva Oil Co.",
      metaDescription:
        "Learn how often to change engine oils, hydraulic fluid maintenance, and lubrication best practices from Jai Deva Oil Co.",
    },
  });

  const blogsSections = [
    {
      type: "BlogsHero",
      order: 0,
      content: {
        image:
          "https://res.cloudinary.com/dpa93copz/image/upload/v1787738185/mahalaxmi/blogs/blogs-banner.jpg",
        altText: "Blogs - Jai Deva Oil Co. HP Lubricants",
      },
    },
    {
      type: "BlogCategories",
      order: 1,
      content: [
        {
          id: "cat-auto",
          name: "Automotive",
          slug: "automotive",
          description:
            "Engine oils, gear lubricants, coolants for commercial and passenger vehicles.",
        },
        {
          id: "cat-ind",
          name: "Industrial",
          slug: "industrial",
          description:
            "Hydraulic oils, turbine oils, and heavy machinery lubrication guides.",
        },
        {
          id: "cat-bike",
          name: "Bike Oils",
          slug: "bike-oils",
          description:
            "2-wheeler and 4-stroke motorcycle engine maintenance insights.",
        },
        {
          id: "cat-spec",
          name: "Specialties",
          slug: "specialties",
          description:
            "Transformer oils, cutting fluids, and specialty industrial applications.",
        },
      ],
    },
  ];

  for (const s of blogsSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: blogsPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: blogsPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }

  // 10.1 Blog Posts
  const sampleBlogs = [
    {
      title:
        "How Often Should You Change Your Automotive Engine Oil? A Simple Guide",
      slug: "how-often-should-you-change-your-automotive-engine-oil",
      category: "Automotive",
      publishDate: "October 14, 2025",
      readTime: "6 min read",
      author: "HPCL Lubricants Technical Team",
      excerpt:
        "Regular oil changes are vital for the longevity and efficiency of your vehicle and machinery. Learn key factors, recommended mileage intervals, synthetic vs conventional oils, and oil condition monitoring.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/How-Often-Should-You-Change-Your-Automotive-Engine-Oil.jpg",
      content: {
        intro:
          "Regular oil changes are vital for the longevity and efficiency of your machinery, whether it's a car, industrial equipment, or a small engine like a lawnmower. However, determining the right interval for oil changes can be confusing due to various factors that influence oil life. This guide will help you understand how often you should change your Automotive Engine Oil and what factors to consider.",
        sections: [
          {
            heading: "1. Follow the Manufacturer’s Recommendations",
            paragraphs: [
              "Every vehicle manufacturer specifies precise lubrication intervals tailored to engine design and tolerances.",
            ],
            bulletPoints: [
              "Owner’s Manual: The best starting point is always your machine’s owner’s manual. Manufacturers provide specific guidelines on oil change intervals based on rigorous testing and engineering.",
              "Service Schedules: Service schedules detail recommended oil change frequency based on factors like usage, engine type, and operating conditions.",
            ],
          },
          {
            heading: "2. Consider the Type of Oil Used",
            paragraphs: [
              "The chemical formulation of your lubricant directly dictates how long it maintains its protective viscosity and detergent properties:",
            ],
            bulletPoints: [
              "Conventional Oil: Needs to be changed more frequently, typically every 3,000 to 5,000 miles (5,000–7,500 km) for vehicles or every 100-200 hours for machinery.",
              "Synthetic Oil: Due to superior molecular stability, synthetic oils last longer and require changes every 7,500 to 10,000 miles (10,000–15,000 km) or 300-500 operating hours.",
              "Synthetic Blend Oil: Combines synthetic and mineral basestocks for a middle ground, extending intervals slightly beyond conventional oils.",
              "High-Mileage Oil: Formulated with seal conditioners for older engines with over 75,000 miles to reduce oil consumption and seal leakage.",
            ],
          },
          {
            heading: "3. Evaluate Your Usage Patterns",
            paragraphs: [
              "Your daily driving style and vehicle workload heavily influence thermal breakdown rates:",
            ],
            bulletPoints: [
              "Frequent Short Trips: Short city trips prevent the engine from reaching optimal operating temperatures, promoting moisture condensation and fuel dilution in the oil.",
              "Heavy Loads and High Stress: Vehicles operating under continuous heavy loads or towing generate elevated internal heat, breaking down additives faster.",
              "Infrequent Use: Vehicles or seasonal machinery driven rarely still require time-based oil changes, as stagnant oil oxidizes and absorbs ambient moisture.",
            ],
          },
          {
            heading: "4. Consider Environmental Conditions",
            paragraphs: [
              "Ambient temperature extremes and air purity alter lubricant performance:",
            ],
            bulletPoints: [
              "Extreme Temperatures: Very hot weather accelerates oil oxidation, while severe cold thickens oil, demanding low-viscosity winter grades and timely replacements.",
              "Dusty or Dirty Environments: Off-road or unpaved driving allows airborne silica dust into the engine, requiring shorter oil and filter change intervals.",
            ],
          },
          {
            heading: "5. Monitor Oil Quality",
            paragraphs: [
              "Proactive visual and chemical oil checks help catch breakdown before mechanical wear occurs:",
            ],
            bulletPoints: [
              "Check Oil Level & Condition: Pull the dipstick regularly. Dark, gritty, sludge-like oil or a burnt odor indicates urgent replacement is needed.",
              "Oil Analysis: For heavy fleet operations or industrial equipment, laboratory oil analysis monitors wear metals, soot percentage, and remaining TBN.",
            ],
          },
          {
            heading: "6. Listen to Your Machine",
            paragraphs: [
              "Your vehicle provides clear physical signals when oil lubrication breaks down:",
            ],
            bulletPoints: [
              "Unusual Noises or Performance Issues: Increased engine knocking, valve ticking, or sluggish response indicates friction buildup from degraded oil.",
              "Dashboard Alerts: Pay attention to low oil pressure lights or automated oil life monitoring indicators and service promptly.",
            ],
          },
          {
            heading: "7. Factor in the Age of the Machine",
            paragraphs: [
              "Engine age changes internal clearances and blow-by gas generation:",
            ],
            bulletPoints: [
              "Older Engines: Higher wear clearances cause faster oil contamination and consumption, benefiting from shorter change cycles and high-viscosity protection.",
              "Newer Machines: Modern precision-machined engines with active emissions control systems support extended intervals when paired with premium synthetic oils.",
            ],
          },
          {
            heading: "8. Time-Based Changes",
            paragraphs: [
              "Oil Degradation Over Time: Even when mileage is low, exposure to air, moisture, and acid combustion byproducts breaks down additives. Always change engine oil at least once every 12 months.",
            ],
          },
        ],
        conclusion:
          "The frequency of oil changes depends on a variety of factors, including the type of oil, usage patterns, environmental conditions, and the machine's age. While following the manufacturer’s guidelines is crucial, being mindful of your specific operating conditions and regularly checking your oil can ensure your machine runs smoothly and efficiently. Regular oil changes are a simple yet vital maintenance task that protects your machine and keeps it performing at its best.",
        recommendedProducts: [
          "HP FUTUR-X 5W-30",
          "HP MILCY TURBO STAR 15W-40",
          "HP RACER 4T 20W-40",
        ],
      },
      isPublished: true,
    },
    {
      title: "How To Choose The Right Diesel Engine Oil For Your Vehicle",
      slug: "how-to-choose-the-right-diesel-engine-oil-for-your-vehicle",
      category: "Automotive",
      publishDate: "November 02, 2025",
      readTime: "7 min read",
      author: "HPCL Lubricants Technical Expert",
      excerpt:
        "A comprehensive guide to selecting the ideal diesel engine oil, understanding SAE viscosity ratings, API standards, OEM approvals, and engine protection.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/How-To-Choose-The-Right-Diesel-Engine-Oil-For-Your-Vehicle.jpg",
      content: {
        intro:
          "Choosing the right Diesel Engine Oil is crucial for the longevity and performance of your vehicle. Heavy-duty diesel engines operate under extreme pressures and thermal stress. With so many options available in the market, making an informed decision can be challenging. This guide will help you navigate the key factors to consider when selecting the best Diesel Engine Oil for your vehicle.",
        sections: [
          {
            heading: "1. Understand Your Vehicle's Requirements",
            paragraphs: [
              "Every vehicle has unique lubrication demands based on its engine design, emission systems, and operational duties.",
            ],
            bulletPoints: [
              "Owner's Manual: Always consult your vehicle's owner's manual first. It provides specific recommendations for the required viscosity grade and API service specification best suited for your engine.",
              "Engine Type: Diesel engines vary widely—from light passenger SUVs to heavy commercial trucks and tractors. High-performance turbo-diesel engines often require synthetic formulations, whereas conventional oils suffice for older, simpler engines.",
            ],
          },
          {
            heading: "2. Know the Different Types of Diesel Engine Oils",
            paragraphs: [
              "Engine oils are classified into several categories based on base oil refinement and synthetic formulation:",
            ],
            bulletPoints: [
              "Conventional Diesel Engine Oil: Refined directly from crude oil, conventional oil is affordable and ideal for older engines with routine maintenance schedules.",
              "Synthetic Diesel Engine Oil: Chemically synthesized for uniform molecular structure, delivering superior thermal stability, oxidation resistance, and performance in extreme cold or high-heat conditions.",
              "Synthetic Blend Diesel Engine Oil: A mixture of synthetic and mineral basestocks offering enhanced protection over conventional oil at a balanced cost.",
              "High-Mileage Diesel Engine Oil: Specifically formulated for engines with over 75,000 km, containing seal conditioners and anti-wear agents to reduce oil consumption and minimize leaks.",
            ],
          },
          {
            heading: "3. Consider the Viscosity Rating (SAE Grade)",
            paragraphs: [
              "Viscosity measures an oil's resistance to flow across varying operating temperatures:",
            ],
            bulletPoints: [
              "Understanding Viscosity Ratings: SAE multigrade ratings (such as 15W-40 or 10W-30) indicate performance. The number preceding 'W' (Winter) represents cold flow behavior, while the second number indicates high-temperature thickness at 100°C.",
              "Climate Considerations: In colder regions or winter seasons, lower ratings like 5W-40 or 10W-30 ensure instant cold-start oil circulation. In hotter climates like Indian summers, 15W-40 or 20W-50 grades maintain heavy film strength under load.",
            ],
          },
          {
            heading: "4. Look for Certifications & OEM Approvals",
            paragraphs: [
              "Ensure your lubricant meets international performance standards and vehicle manufacturer guidelines:",
            ],
            bulletPoints: [
              "API Standards (CK-4 / CI-4 Plus): Look for API donut marks. API CK-4 and CJ-4 low-SAPS oils are mandatory for modern BS-VI engines equipped with DPF and SCR systems, while API CI-4 Plus is ideal for BS-IV fleets.",
              "OEM Approvals: Top lubricants distributed by JAI DEVA OIL CO. carry OEM approvals from major vehicle manufacturers (Tata Motors, Ashok Leyland, Mahindra, Cummins), giving extra assurance of performance.",
            ],
          },
          {
            heading: "5. Consider the Oil Change Interval",
            paragraphs: [
              "Oil change frequency impacts total cost of ownership and vehicle uptime:",
            ],
            bulletPoints: [
              "Extended Drain Intervals: Premium synthetic oils (like HP MILCY TURBO ULTIMA) are engineered for extended drain intervals, keeping commercial fleets on the road longer.",
              "Conventional Oils: Require more frequent oil changes, suitable for lower annual mileage or budget-conscious operations.",
            ],
          },
          {
            heading: "6. Assess Your Driving Habits & Duty Cycle",
            paragraphs: [
              "Severe operating conditions demand higher specification lubricants:",
            ],
            bulletPoints: [
              "Heavy Hauling & Towing: Operating fully loaded trucks or agricultural equipment generates massive internal heat, requiring shear-stable synthetic or heavy-duty multigrade lubricants.",
              "City Stop-and-Go Driving: Urban delivery fleets encounter frequent idling and start-stop cycles, requiring high anti-wear (ZDDP) protection.",
            ],
          },
          {
            heading: "7. Evaluate the Oil's Additive Package",
            paragraphs: [
              "Performance additives protect internal engine components against soot and deposit buildup:",
            ],
            bulletPoints: [
              "Detergents & Dispersants: Neutralize combustion acids and keep soot particles suspended to prevent engine sludge formation.",
              "Anti-Wear Agents: Form a sacrificial barrier on camshafts and piston rings to eliminate metal-to-metal contact.",
              "Viscosity Index Improvers: Maintain stable lubricant viscosity across extreme temperature variations.",
            ],
          },
          {
            heading: "8. Cost vs. Performance",
            paragraphs: [
              "Weigh short-term lubricant costs against long-term fuel efficiency, reduced maintenance, and engine overhaul prevention. Investing in high-grade lubricants from JAI DEVA OIL CO. saves significant operating costs over time.",
            ],
          },
        ],
        conclusion:
          "Selecting the right Diesel Engine Oil requires balancing vehicle manufacturer specifications, climate conditions, duty cycles, and budget. Choosing HP MILCY series diesel lubricants from Jai Deva Oil Co. ensures maximum engine protection, extended drain intervals, and optimal fuel economy for your commercial fleet or personal vehicle.",
        recommendedProducts: [
          "HP MILCY TURBO ULTIMA 10W-40",
          "HP MILCY POWER 15W-40",
          "HP DIESELINO 15W-40T",
        ],
      },
      isPublished: true,
    },
    {
      title: "15W-40 Oil: Types, Properties, and Uses",
      slug: "15w-40-oil-and-types",
      category: "Automotive",
      publishDate: "December 18, 2025",
      readTime: "7 min read",
      author: "HPCL Lubricants Technical Expert",
      excerpt:
        "15W-40 is a widely used multi-grade engine oil known for its versatility and performance in commercial transport, agricultural tractors, and industrial generators.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg",
      content: {
        intro:
          "15W-40 oil is a widely used multi-grade engine oil, known for its versatility and performance in various temperatures and operating conditions. This guide provides an in-depth look at 15W-40 oil, exploring its types, properties, uses, and maintenance tips to help you make informed decisions for your vehicle or machinery.",
        sections: [
          {
            heading: "1. Introduction to 15W-40 Oil",
            paragraphs: [
              "15W-40 oil is a multi-grade engine oil, meaning its viscosity rating adapts across temperature ranges. The '15W' specifies the cold-temperature pumping viscosity (Winter rating), while '40' indicates kinematic viscosity at 100°C. This dual rating guarantees reliable cold starts and robust film thickness during continuous heavy operations.",
            ],
          },
          {
            heading: "2. Types of 15W-40 Engine Oil",
            paragraphs: [
              "15W-40 lubricants are available in conventional, synthetic blend, and full synthetic formulations:",
            ],
            bulletPoints: [
              "Conventional 15W-40 Oil: Refined directly from crude oil, providing solid lubrication for older commercial diesel engines at an economical cost.",
              "Synthetic Blend 15W-40 Oil: Combines mineral base stocks with synthetic compounds for superior oxidation resistance, enhanced engine cleanliness, and extended drain capability.",
              "Full Synthetic 15W-40 Oil: Engineered from high-purity synthetic base oils for maximum thermal stability, minimal oil volatility, and peak fuel efficiency.",
            ],
          },
          {
            heading: "3. Key Properties of 15W-40 Oil",
            paragraphs: [
              "Four essential physical properties define 15W-40 performance:",
            ],
            bulletPoints: [
              "Viscosity Stability: Maintains protective oil film across severe cold and intense heat.",
              "Thermal Breakdown Resistance: Resists sludge and varnish formation at high engine operating temperatures.",
              "Detergency & Dispersancy: Keeps soot particles suspended to prevent carbon deposits and ring sticking.",
              "Anti-Wear Protection: Forms sacrificial ZDDP films over cams, lifters, and bearings.",
            ],
          },
          {
            heading: "4. Applications Across Industries",
            paragraphs: [
              "15W-40 is specified across multiple heavy-duty sectors:",
            ],
            bulletPoints: [
              "Commercial Fleet Trucks: Long-haul logistics trucks, tippers, and buses.",
              "Agricultural Tractors & Harvesters: Heavy field machinery operating under high torque.",
              "Industrial Gensets & Excavators: Construction machinery and stationary diesel power generators.",
            ],
          },
        ],
        conclusion:
          "Trust the HP MILCY 15W-40 series from Jai Deva Oil Co. for exceptional engine cleanliness, reduced oil consumption, and long-term machinery protection.",
        recommendedProducts: [
          "HP MILCY TURBO STAR 15W-40",
          "HP MILCY SUPER 15W-40",
          "HP MILCY POWER 15W-40",
        ],
      },
      isPublished: true,
    },
    {
      title: "Transformer Oil: Types, Properties, and Uses",
      slug: "transformer-oil-types-properties-and-uses",
      category: "Industrial",
      publishDate: "January 10, 2026",
      readTime: "8 min read",
      author: "HP Industrial Lubricants Team",
      excerpt:
        "Discover the electrical insulation, active cooling properties, dielectric breakdown voltage standards, and maintenance requirements for electrical transformer fluids.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/Transformer-oil-final.jpg",
      content: {
        intro:
          "Transformer oil (dielectric insulating fluid) is a vital component in high-voltage electrical transformers. It serves two essential functions: providing electrical insulation between active conductors and dissipating intense heat generated within core windings. This comprehensive guide covers transformer oil formulations, testing, and maintenance practices.",
        sections: [
          {
            heading: "1. Types of Transformer Oil",
            paragraphs: [
              "Transformer fluids are categorized into mineral-based and synthetic dielectric fluids:",
            ],
            bulletPoints: [
              "Paraffinic Transformer Oil: Derived from paraffinic crudes; offers lower oxidation rates but higher pour points requiring pour depressants.",
              "Naphthenic Transformer Oil: Highly refined from naphthenic crudes; provides excellent low-temperature fluidity and superior sludge solubility.",
              "Synthetic Ester & Silicone Oils: Fire-resistant and biodegradable fluids specified for indoor substations, offshore rigs, and environmentally sensitive zones.",
            ],
          },
          {
            heading: "2. Key Physical & Electrical Properties",
            paragraphs: [
              "To safeguard high-voltage equipment, transformer oils must meet rigid specifications:",
            ],
            bulletPoints: [
              "Dielectric Breakdown Voltage (>70 kV): High electrical resistance prevents flashover and arcing inside the tank.",
              "Low Dissipation Factor (Tan Delta): Low dielectric loss minimizes energy dissipation as heat.",
              "High Flash Point (>140°C): High thermal threshold minimizes flammability and explosive risk.",
              "Oxidation Stability: Inhibited formulations prevent acid and sludge formation during decades of continuous service.",
            ],
          },
          {
            heading: "3. Maintenance & Quality Monitoring",
            paragraphs: [
              "Regular oil condition monitoring ensures grid reliability:",
            ],
            bulletPoints: [
              "Dissolved Gas Analysis (DGA): Tests for thermal fault gases (hydrogen, methane, acetylene) to detect internal insulation breakdown.",
              "Vacuum Filtration & Dehydration: Removes dissolved moisture and particulate debris to restore dielectric strength.",
              "Reclamation & Regeneration: Restores aged oil properties via fuller's earth treatment.",
            ],
          },
        ],
        conclusion:
          "HP POWERTRAN transformer dielectric fluids comply with IS 335 and IEC 60296 standards, delivering maximum safety and uninterrupted grid reliability.",
        recommendedProducts: ["HP POWERTRAN", "HP ENKLO 68", "HP HYDROL 68"],
      },
      isPublished: true,
    },
    {
      title: "Bike Engine Oil: Complete Selection & Performance Guide",
      slug: "bike-engine-oil",
      category: "Bike Oils",
      publishDate: "January 24, 2026",
      readTime: "6 min read",
      author: "HP Two-Wheeler Lubricant Advisory",
      excerpt:
        "Learn how 4T bike engine oils protect the engine, wet clutch, and transmission gears, while managing heat in city traffic and high-RPM riding.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/Bike-Engine-Oil-Final-Graphic.jpg",
      content: {
        intro:
          "The motorcycle universe is exhilarating. Riding brings freedom, but keeping your bike performing at its limit requires proper engine care. Unlike passenger cars where engine and gearbox use separate oils, 4-stroke motorcycles share a single oil bath for the engine, wet clutch, and transmission gears.",
        sections: [
          {
            heading: "1. Essential Functions of Two-Wheeler Engine Oil",
            paragraphs: [
              "Motorcycle lubricants perform four crucial duties simultaneously:",
            ],
            bulletPoints: [
              "Lubrication: Reduces metal-on-metal friction between piston rings, camshafts, and transmission gears.",
              "Heat Dissipation: Carries heat away from combustion chambers and clutch plates during continuous high-RPM operation.",
              "Cleaning: Suspends carbon deposits and combustion debris, keeping oil passages clear.",
              "Corrosion Protection: Forms a moisture barrier over internal components during humid or rainy weather.",
            ],
          },
          {
            heading: "2. Why JASO MA2 Certification Matters",
            paragraphs: [
              "JASO MA2 is the Japanese Automotive Standards Organization specification for high-friction wet clutch engagement. It guarantees zero clutch slippage during rapid acceleration while protecting transmission gear teeth.",
            ],
          },
          {
            heading: "3. Advanced Lubrication Technology by JAI DEVA OIL CO.",
            paragraphs: [
              "HP RACER 4T oils are blended with premium Group II base stocks and synthetic additives. They deliver exceptional thermal stability, preventing oil breakdown when idling in dense Indian city traffic.",
            ],
          },
        ],
        conclusion:
          "Keep your motorcycle engine smooth, responsive, and long-lasting with HP RACER 4T series motorcycle oils supplied by Jai Deva Oil Co..",
        recommendedProducts: [
          "HP RACER 4T 20W-40",
          "HP RACER 4T SYNTH 10W-30",
          "HP RACER SKUTO 10W-30",
        ],
      },
      isPublished: true,
    },
    {
      title: "Synthetic Engine Oil: Types, Properties, and Uses",
      slug: "synthetic-engine-oil-types-properties-and-uses",
      category: "Automotive",
      publishDate: "February 01, 2026",
      readTime: "7 min read",
      author: "HPCL Lubricants Research Lab",
      excerpt:
        "Explore full synthetic and semi-synthetic basestocks, extreme temperature viscosity stability, wear protection additives, and fuel economy benefits.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/Synthetic-Oil-Final-Graphic.jpg",
      content: {
        intro:
          "Synthetic engine oils are chemically engineered from pure base stocks to deliver uniform molecular structure, extreme temperature tolerance, and minimal volatility loss. This guide details synthetic oil categories, superior properties, and key applications.",
        sections: [
          {
            heading: "1. Types of Synthetic Engine Oils",
            paragraphs: [
              "Synthetic lubricants are tailored for specific performance demands:",
            ],
            bulletPoints: [
              "Full Synthetic Oil: Formulated entirely from Group III/IV synthetic basestocks; delivers ultimate cold-start fluidity, oxidation control, and extended drain intervals.",
              "Synthetic Blend Oil: Combines synthetic and conventional basestocks, providing superior protection over mineral oil at an accessible price point.",
            ],
          },
          {
            heading: "2. Key Superior Properties",
            paragraphs: [
              "Synthetic oils outperform conventional oils across critical metrics:",
            ],
            bulletPoints: [
              "Viscosity Index Stability: Resists thinning in summer heat and flow resistance during winter starts.",
              "High-Temperature Resistance: Prevents turbocharger coking and thermal breakdown under heavy load.",
              "Active Detergency: Keeps engine interiors free of harmful sludge, varnish, and carbon deposits.",
            ],
          },
          {
            heading: "3. Versatile Applications",
            paragraphs: [
              "Ideal for modern passenger cars, sports motorcycles, commercial fleets, and heavy industrial machinery requiring API SN/SP or CK-4 standards.",
            ],
          },
        ],
        conclusion:
          "Upgrade your vehicle to HP FUTUR-X full synthetic engine oils for maximum horsepower, engine cleanliness, and optimized fuel economy.",
        recommendedProducts: [
          "HP FUTUR-X 5W-40",
          "HP FUTUR-X 5W-30",
          "HP FUTUR-X 0W-20",
        ],
      },
      isPublished: true,
    },
    {
      title: "The Best Engine Oil for Your Bike: Durability & Performance",
      slug: "the-best-engine-oil-for-your-bike",
      category: "Bike Oils",
      publishDate: "February 08, 2026",
      readTime: "6 min read",
      author: "Jai Deva Two-Wheeler Lube Advisory",
      excerpt:
        "Discover why HP RACER 4T series is the top choice for two-wheelers, delivering wet clutch friction control, reduced oil consumption, and lower maintenance costs.",
      coverImage:
        "https://www.hplubricants.in/sites/default/files/The-best-engine-oil-for-your-bike-thumb.jpg",
      content: {
        intro:
          "Choosing the right engine oil for your bike is crucial for maintaining performance, efficiency, and engine longevity. JAI DEVA OIL CO.' Two Wheeler Engine Oil range is engineered to meet the stringent demands of modern motorcycles, commuters, and scooters across Indian road conditions.",
        sections: [
          {
            heading: "1. Enhanced Engine Durability",
            paragraphs: [
              "Manufactured from premium Group II base stocks and state-of-the-art additive technology meeting API SJ/SL and JASO MA2 specifications. Delivers 3-in-1 protection for the engine, wet clutch, and gearbox.",
            ],
          },
          {
            heading: "2. Reduced Oil Consumption",
            paragraphs: [
              "Creates a dense microscopic seal between piston rings and cylinder walls. Minimizes oil evaporation and oil burning in combustion chambers, reducing frequent oil top-ups.",
            ],
          },
          {
            heading: "3. Lower Maintenance & Extended Drain Life",
            paragraphs: [
              "Protects gears and clutch plates against high-stress friction and thermal degradation, cutting repair frequency and maintenance expenditure.",
            ],
          },
          {
            heading: "4. High Fuel Efficiency",
            paragraphs: [
              "Reduces internal engine drag and fluid resistance, ensuring maximum power transfer to the rear wheel and economical mileage.",
            ],
          },
        ],
        conclusion:
          "Experience an unparalleled biking experience with HP RACER 4T motorcycle lubricants from Jai Deva Oil Co..",
        recommendedProducts: [
          "HP RACER 4T 20W-40",
          "HP RACER 4T SYNTH 10W-30",
          "HP RACER 4T 10W-30",
        ],
      },
      isPublished: true,
    },
  ];

  for (const b of sampleBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✓ ${sampleBlogs.length} Blog posts ready.`);

  // Clean up any deprecated officeLocation entries
  await prisma.officeLocation.deleteMany({});

  // 10. Privacy Policy Page & Content
  const privacyPage = await prisma.page.upsert({
    where: { slug: "privacy-policy" },
    update: {
      title: "Privacy Policy",
      metaTitle: "Privacy Policy | Jai Deva Oil Co.",
      metaDescription:
        "Read the Privacy Policy of Jai Deva Oil Co., trusted multi-brand distributor for industrial and automotive lubricants and greases.",
      targetKeywords:
        "Privacy Policy, Jai Deva Oil Co., lubricants data protection",
      canonicalUrl: "/privacy-policy",
    },
    create: {
      title: "Privacy Policy",
      slug: "privacy-policy",
      type: "legal",
      visibility: "published",
      order: 50,
      metaTitle: "Privacy Policy | Jai Deva Oil Co.",
      metaDescription:
        "Read the Privacy Policy of Jai Deva Oil Co., trusted multi-brand distributor for industrial and automotive lubricants and greases.",
      targetKeywords:
        "Privacy Policy, Jai Deva Oil Co., lubricants data protection",
      canonicalUrl: "/privacy-policy",
      noIndex: false,
    },
  });

  const privacyContent = {
    title: "Privacy Policy",
    lastUpdated: "August 2026",
    content: `<p>Welcome to <strong>Jai Deva Oil Co.</strong> ("we", "our", or "us"). We are an established Multi-Brand Distributor and Trader of Industrial & Automotive Lubricants and Greases.</p>
<p>We are committed to protecting and respecting your personal privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you visit our website or interact with our enquiry, dealership, and quotation forms.</p>

<h2>1. Information We Collect</h2>
<p>We may collect and process the following personal and commercial information:</p>
<ul>
  <li><strong>Contact Information:</strong> Name, business/firm name, email address, phone number, city, and state submitted via enquiry or distributor application forms.</li>
  <li><strong>Product Interests:</strong> Lubricant categories, Technical Data Sheet (TDS) / Material Safety Data Sheet (MSDS) download requests, and bulk procurement queries.</li>
  <li><strong>Technical Data:</strong> IP address, browser type, device details, and interaction logs through cookies and analytics to improve website responsiveness.</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>We utilize the collected information strictly for legitimate commercial and customer service purposes:</p>
<ul>
  <li>To provide product specifications, quotation pricing, and technical lubrication recommendations.</li>
  <li>To process Dealership / Distribution Partner applications.</li>
  <li>To coordinate dispatch, doorstep supply logistics, and after-sales support across North India and nationwide.</li>
  <li>To enhance website performance, security, and user experience.</li>
</ul>

<h2>3. Information Sharing & Protection</h2>
<p>We do <strong>not</strong> sell, rent, trade, or commercially exploit your personal contact data. Your information is only shared with authorized sales engineers and regional supply depots solely to fulfill your product delivery and service requests.</p>

<h2>4. Cookies & Analytics</h2>
<p>We utilize standard cookies and analytics tools to understand website traffic patterns and improve responsiveness. You can adjust your browser settings to decline cookies if preferred.</p>

<h2>5. Contact Us Regarding Your Privacy</h2>
<p>If you have any questions, feedback, or requests regarding this Privacy Policy or data retention, please contact our compliance desk at <strong>sales@jaidevaoil.com</strong>.</p>`,
    isPublished: true,
  };

  const existingPrivacySection = await prisma.section.findFirst({
    where: { pageId: privacyPage.id, type: "PrivacyPolicyContent" },
  });

  if (existingPrivacySection) {
    await prisma.section.update({
      where: { id: existingPrivacySection.id },
      data: { content: privacyContent },
    });
  } else {
    await prisma.section.create({
      data: {
        pageId: privacyPage.id,
        type: "PrivacyPolicyContent",
        content: privacyContent,
        order: 0,
      },
    });
  }
  console.log("✓ Privacy Policy page & content ready.");

  console.log("=========================================");
  console.log("Database seeded successfully with 100% website data!");
  console.log("Admin Login: admin@jaideva.com / Admin@123");
  console.log("=========================================");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting full database seeding with 100% website data...');

  // 1. Admin User
  const adminPassword = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@jaideva.com' },
    update: {},
    create: {
      email: 'admin@jaideva.com',
      name: 'Jai Deva Admin',
      password: adminPassword,
      role: 'admin',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
  });
  console.log('✓ Admin user created.');

  // 2. Global Brand Configuration
  await prisma.globalConfig.upsert({
    where: { id: 'global' },
    update: {
      siteTitle: 'Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor',
      siteDescription:
        'Established in 2007, Jai Deva Oil Co. is a trusted Authorized Distributor of Industrial & Automotive Lubricants, offering quality lubrication products from leading brands.',
      phone: '+91 98120 22340',
      email: 'sales@jaideva.com',
      address: 'Industrial Area & Regional Distribution Hub, Haryana / Delhi NCR, India',
      logo: '/jaideva-logo.png',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/jaidevaoilco/?hl=en',
        linkedin: 'https://www.linkedin.com/company/81617692/',
        footerLogo: '/jaideva-logo.png',
        copyrightText: '© 2026 Jai Deva Oil Co. All rights reserved.',
      },
      robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://jaidevaoil.com/sitemap.xml',
      sitemapEnabled: true,
    },
    create: {
      id: 'global',
      siteTitle: 'Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor',
      siteDescription:
        'Established in 2007, Jai Deva Oil Co. is a trusted Authorized Distributor of Industrial & Automotive Lubricants, offering quality lubrication products from leading brands.',
      phone: '+91 98120 22340',
      email: 'sales@jaideva.com',
      address: 'Industrial Area & Regional Distribution Hub, Haryana / Delhi NCR, India',
      logo: '/jaideva-logo.png',
      socialLinks: {
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/jaidevaoilco/?hl=en',
        linkedin: 'https://www.linkedin.com/company/81617692/',
        footerLogo: '/jaideva-logo.png',
        copyrightText: '© 2026 Jai Deva Oil Co. All rights reserved.',
      },
    },
  });
  console.log('✓ Global config ready.');

  // 3. Navigation Links
  const navLinks = [
    { label: 'Home', title: 'HOME', url: '/', type: 'Main Link', parent: '-', order: 0 },
    { label: 'About', title: 'ABOUT', url: '/about-us', type: 'Main Link', parent: '-', order: 1 },
    { label: 'Brands', title: 'BRANDS', url: '/brands', type: 'Main Link', parent: '-', order: 2 },
    {
      label: 'Products',
      title: 'PRODUCTS',
      url: '/products',
      type: 'Dropdown',
      parent: '-',
      order: 3,
    },
    {
      label: 'Industries',
      title: 'INDUSTRIES',
      url: '/industries',
      type: 'Main Link',
      parent: '-',
      order: 4,
    },
    {
      label: 'Gallery',
      title: 'GALLERY',
      url: '/events',
      type: 'Main Link',
      parent: '-',
      order: 5,
    },
    { label: 'Blog', title: 'BLOG', url: '/blogs', type: 'Main Link', parent: '-', order: 6 },
    {
      label: 'Contact',
      title: 'CONTACT',
      url: '/contact-us',
      type: 'Main Link',
      parent: '-',
      order: 7,
    },
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
  console.log('✓ Navigation links ready.');

  // 4. Home Page & Sections
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {
      title: 'Home',
      order: 0,
      parent: '-',
      description:
        'Established in 2007, Jai Deva Oil Co. is a trusted Multi-Brand Distributor of Industrial & Automotive Lubricants.',
      metaTitle: 'Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor',
      metaDescription:
        'Reliable Lubrication Solutions for Every Industry & Application. Authorized Distributors of Engine Oil, Hydraulic Oil, Gear Oil, Greases, and Specialty Lubricants.',
    },
    create: {
      title: 'Home',
      slug: 'home',
      order: 0,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Established in 2007, Jai Deva Oil Co. is a trusted Multi-Brand Distributor of Industrial & Automotive Lubricants.',
      metaTitle: 'Jai Deva Oil Co. | Multi-Brand Industrial & Automotive Lubricant Distributor',
      metaDescription:
        'Reliable Lubrication Solutions for Every Industry & Application. Authorized Distributors of Engine Oil, Hydraulic Oil, Gear Oil, Greases, and Specialty Lubricants.',
    },
  });

  const homeSections = [
    {
      type: 'HomeHero',
      order: 0,
      content: {
        badge: 'MULTI-BRAND LUBRICANT SOLUTIONS',
        heading: 'Reliable lubrication for every industry and application.',
        description:
          'Jai Deva Oil Co. is a trusted multi-brand industrial and automotive lubricant distributor, helping businesses choose quality products from leading brands with confidence.',
        primaryBtnLabel: 'Explore Products',
        primaryBtnUrl: '#products',
        secondaryBtnLabel: 'Become a Partner',
        secondaryBtnUrl: '#contact',
        points: [
          'Engine, hydraulic and gear oils',
          'Grease and specialty lubricants',
          'Reliable supply and guidance',
        ],
        bgImage:
          'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2200&q=85',
        productImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      },
    },
    {
      type: 'ProductsServicesSection',
      order: 2,
      content: {
        title: 'OUR PRODUCT RANGE',
        subtitle: 'Complete Lubrication Solutions under One Roof',
        items: [
          {
            id: 'engine-oil',
            slug: 'engine-oil',
            name: 'Engine Oil',
            link: '/products/hp-lubricants#subcat-0',
            img: 'https://www.hplubricants.in/sites/default/files/automotive-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/automotive-2.png',
          },
          {
            id: 'hydraulic-oil',
            slug: 'hydraulic-oil',
            name: 'Hydraulic Oil',
            link: '/products/hp-lubricants#subcat-2',
            img: 'https://www.hplubricants.in/sites/default/files/industrial-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/industrial-2.png',
          },
          {
            id: 'gear-oil',
            slug: 'gear-oil',
            name: 'Gear Oil',
            link: '/products/hp-lubricants#subcat-1',
            img: 'https://www.hplubricants.in/sites/default/files/specialities-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/specialities-2.png',
          },
          {
            id: 'industrial-grease',
            slug: 'industrial-grease',
            name: 'Industrial Grease',
            link: '/products/hp-lubricants#subcat-3',
            img: 'https://www.hplubricants.in/sites/default/files/greases-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/greases-2.png',
          },
          {
            id: 'cutting-oil',
            slug: 'cutting-oil',
            name: 'Cutting Oil',
            link: '/products/motul-tech#subcat-0',
            img: 'https://www.hplubricants.in/sites/default/files/specialities-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/specialities-2.png',
          },
          {
            id: 'rust-preventive-oil',
            slug: 'rust-preventive-oil',
            name: 'Rust Preventive Oil',
            link: '/products/tw-chemin#subcat-2',
            img: 'https://www.hplubricants.in/sites/default/files/greases-1.png',
            hoverImg: 'https://www.hplubricants.in/sites/default/files/greases-2.png',
          },
        ],
      },
    },
    {
      type: 'MultiBrandSolutionsSection',
      order: 3,
      content: {
        badge: 'MULTI-BRAND LUBRICANT SOLUTIONS',
        title: 'Multiple Brands.',
        titleHighlight: 'One Reliable Partner.',
        paragraph1:
          'At Jai Deva Oil Co., we bring together a diverse portfolio of leading lubricant and industrial solution brands, making it easier for businesses to source the right products from one trusted distributor.',
        paragraph2:
          'Our multi-brand approach allows us to cater to different industrial, automotive and machinery lubrication requirements with a broad range of products and applications.',
        btnLabel: 'Explore Our Brands',
        btnUrl: '#brands',
        steps: [
          {
            num: '1',
            name: 'Understand',
            desc: 'Analyze machinery and operating conditions to define exact lubrication needs.',
            icon: 'Search',
          },
          {
            num: '2',
            name: 'Recommend',
            desc: 'Suggest the ideal brand, grade, and viscosity for maximum equipment life.',
            icon: 'ThumbsUp',
          },
          {
            num: '3',
            name: 'Supply',
            desc: 'Prompt delivery of 100% genuine lubricants directly from authorized stock.',
            icon: 'Truck',
          },
          {
            num: '4',
            name: 'Support',
            desc: 'Ongoing technical guidance, oil condition monitoring, and customer support.',
            icon: 'Headphones',
          },
        ],
      },
    },
    {
      type: 'IndustriesWeServeSection',
      order: 4,
      content: {
        title: 'INDUSTRIES WE SERVE',
        subtitle: 'Lubrication Solutions for Diverse Industries',
        leadText:
          'Our extensive lubricant portfolio serves the requirements of various industries, including:',
        description:
          'We provide lubrication products for industrial machinery, hydraulic systems, gears, bearings, engines, metalworking equipment and other critical applications.',
        btnLabel: 'Explore Industries',
        btnUrl: '#industries',
        industries: [
          { name: 'Steel', icon: 'Factory' },
          { name: 'Cement', icon: 'Building2' },
          { name: 'Power', icon: 'Zap' },
          { name: 'Textile', icon: 'Scissors' },
          { name: 'Paper', icon: 'FileText' },
          { name: 'Manufacturing', icon: 'Cog' },
          { name: 'Engineering', icon: 'Wrench' },
          { name: 'Automotive', icon: 'Car' },
        ],
      },
    },
    {
      type: 'TrustedClientsSection',
      order: 5,
      content: {
        title: 'OUR BRANDS',
        subtitle: 'Leading Brands for Reliable Lubrication Solutions',
        description: 'Leading Brands for Reliable Lubrication Solutions',
        clients: [
          {
            id: 'hp-lubricants',
            name: 'HP Lubricants',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672222/jaideva/brands/hp-lubricants.png',
          },
          {
            id: 'caltex',
            name: 'Caltex',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672216/jaideva/brands/caltex.svg',
          },
          {
            id: 'motultech',
            name: 'MotulTech',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672226/jaideva/brands/motultech.png',
          },
          {
            id: 'itw-chemin',
            name: 'ITW Chemin',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672224/jaideva/brands/itw-chemin.png',
          },
          {
            id: 'valvoline',
            name: 'Valvoline',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672228/jaideva/brands/valvoline.png',
          },
          {
            id: 'lubricon',
            name: 'Lubricon',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672225/jaideva/brands/lubricon.png',
          },
          {
            id: 'molygraph',
            name: 'Molygraph',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672225/jaideva/brands/molygraph.png',
          },
          {
            id: 'gs-caltex',
            name: 'GS Caltex',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672221/jaideva/brands/gs-caltex.png',
          },
          {
            id: 'idemitsu',
            name: 'Idemitsu',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672223/jaideva/brands/idemitsu.png',
          },
          {
            id: 'deep-pneumatics',
            name: 'Deep Pneumatics',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672218/jaideva/brands/deep-pneumatics.png',
          },
          {
            id: 'filtermist',
            name: 'Filtermist',
            logo: 'https://res.cloudinary.com/dpa93copz/image/upload/v1790672219/jaideva/brands/filtermist.svg',
          },
        ],
      },
    },
    {
      type: 'WhyJaiDevaSection',
      order: 6,
      content: {
        title: 'WHY JAI DEVA OIL CO.?',
        subtitle: 'Your Trusted Lubrication Partner Since 2007',
        points: [
          {
            title: '18+ Years of Experience',
            desc: 'Strong industry experience in lubricant distribution and trading since 2007.',
            icon: 'Calendar',
          },
          {
            title: 'Multi-Brand Portfolio',
            desc: 'A diverse range of lubricant products from leading brands.',
            icon: 'Layers',
          },
          {
            title: 'Wide Product Range',
            desc: 'Industrial oils, automotive lubricants, greases and specialty lubrication products.',
            icon: 'Boxes',
          },
          {
            title: 'Quality-Focused Approach',
            desc: 'We focus on supplying quality products suited to customer requirements.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Experienced Team',
            desc: 'Skilled professionals with industry knowledge and understanding of customer needs.',
            icon: 'Users',
          },
          {
            title: 'Reliable Service',
            desc: 'Committed to dependable supply and long-term customer relationships.',
            icon: 'Clock',
          },
        ],
      },
    },
    {
      type: 'BrandClosingBannerSection',
      order: 7,
      content: {
        badge: 'JAI DEVA OIL CO.',
        title: 'YOUR TRUSTED PARTNER IN INDUSTRIAL & AUTOMOTIVE LUBRICATION',
        description:
          'With 18+ years of industry experience, a diverse multi-brand portfolio and a customer-focused approach, Jai Deva Oil Co. continues to provide dependable lubrication products and solutions for industries, machinery and automotive applications.',
        highlights: [
          'Quality Products',
          'Multiple Brands',
          'Reliable Supply',
          'Customer-Focused Service',
        ],
        btnLabel: 'PARTNER WITH JAI DEVA OIL CO.',
        btnUrl: '/contact-us',
      },
    },
    {
      type: 'InstagramRibbon',
      order: 8,
      content: {
        title: '',
        subtitle: '',
        instagramAccountId: '',
        instagramToken: '',
      },
    },
    {
      type: 'LocateDistributorSection',
      order: 9,
      content: {
        companyName: 'Jai Deva Oil Co.',
        logo: '/jaideva-logo.png',
        address: 'Industrial Area & Distribution Hub, India',
        phone: '+91 98765 43210',
        workingHours: 'Working Hours: Mon - Sat: 9:00 AM - 6:30 PM',
        email: 'sales@jaidevaoil.com',
        btn1Text: 'SEND ENQUIRY',
        btn2Text: 'BECOME A DISTRIBUTOR',
      },
    },
    {
      type: 'FirstTimePopup',
      order: 10,
      content: {
        isEnabled: false,
        showForm: true,
        title: 'Special First-Time Visitor Offer',
        subtitle:
          'Connect with our technical team for competitive industrial pricing & direct supply.',
        formTitle: 'Request an Instant Quote',
        image: '',
      },
    },
  ];

  // Clean up any old duplicate or deprecated section names
  await prisma.section.deleteMany({
    where: {
      pageId: homePage.id,
      type: {
        in: [
          'HeroSlider',
          'HeroSliderSection',
          'AboutSection',
          'TestimonialsSection',
          'DistributorBanner',
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
  console.log('✓ Home page & sections ready.');

  // 5. About Us Page & Sections
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about-us' },
    update: {
      title: 'About Us',
      order: 1,
      parent: '-',
      description:
        'Learn more about Jai Deva Oil Co., our mentor Mr. Mayank Goyal, and our multi-brand lubricant distribution network.',
      metaTitle: 'About Us | Jai Deva Oil Co. - Multi-Brand Lubricant Distributor',
      metaDescription:
        'Established in 2007, Jai Deva Oil Co. is a leading wholesaler, distributor, and trader of industrial and automotive lubricants across India.',
    },
    create: {
      title: 'About Us',
      slug: 'about-us',
      order: 1,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Learn more about Jai Deva Oil Co., our mentor Mr. Mayank Goyal, and our multi-brand lubricant distribution network.',
      metaTitle: 'About Us | Jai Deva Oil Co. - Multi-Brand Lubricant Distributor',
      metaDescription:
        'Established in 2007, Jai Deva Oil Co. is a leading wholesaler, distributor, and trader of industrial and automotive lubricants across India.',
    },
  });

  // Clean up any old Jai Deva section
  await prisma.section.deleteMany({
    where: { pageId: aboutPage.id, type: 'AboutJai DevaContent' },
  });

  // Delete LubesHeadquarterSection if it still exists (no longer used on frontend)
  await prisma.section.deleteMany({
    where: { pageId: aboutPage.id, type: 'LubesHeadquarterSection' },
  });

  const aboutSections = [
    // 0. Hero
    {
      type: 'AboutHero',
      order: 0,
      content: {
        heading: 'BUILT ON TRUST SINCE 2007',
        tagline: 'Less You Burn, the More You Earn',
        description:
          'Jai Deva Oil Co. is a multi-brand industrial and automotive lubricant distributor. We source, stock, and supply genuine oils, greases, and specialty fluids for plants, fleets, and workshops — with quality checks and dependable regional delivery.',
        bannerImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
        altText: 'Jai Deva Oil Co. lubricant warehouse and supply',
      },
    },
    // 1. Story & Mentor Narrative
    {
      type: 'AboutJaiDevaContent',
      order: 1,
      content: {
        title: 'About Jai Deva Oil Co.',
        subtitle: 'Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.',
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1791180157/jaideva/about/mr-mayank-goyal.jpg',
        estBadge: 'Est. 2007',
        founderRole: 'Mentor & Proprietor',
        founderName: 'Mr. Mayank Goyal',
        founderNote: 'Jai Deva Oil Co. — Trusted Lubricant Distribution',
        paragraphs: [
          'Established in the year 2007, Jai Deva Oil Co. is a leading and prominent wholesaler, distributor, and trader of lubricant oil, engine oil, automotive grease, hydraulic oil, cutting oil, gear oil, rust preventive oil and much more. Made using the finest quality inputs alongside superior machinery, our products are highly admired and recommended, and each is tested carefully before delivery to our customers.',
          "Our team of professionals keeps a close watch on clients' evolving requirements, helping us meet them within a defined period of time. Owing to our quality-centric approach, we have been highly proficient in meeting the needs of clients across the marketplace, backed by a team of skilled and dexterous professionals with years of expertise in this business.",
          'We are headed by our mentor Mr. Mayank Goyal, who brings extensive knowledge and experience to the field. Owing to his balanced business plans and policies, we have attained a noteworthy position in the industry.',
        ],
      },
    },
    // 2. Team Structure
    {
      type: 'OurTeamStructureSection',
      order: 2,
      content: {
        heading: 'Our Team Structure',
        description:
          'A synchronized workforce of <strong>62+ lubricant specialists</strong>, relationship managers, and logistics crew driving dependable supply across India.',
        cards: [
          {
            step: 1,
            title: 'Industrial Sales',
            total: '27 Members',
            icon: 'Factory',
            roles: [
              { count: '20', label: 'Field Sales Officers' },
              { count: '7', label: 'CRM (Backend)' },
            ],
          },
          {
            step: 2,
            title: 'Digital Leads',
            total: '4 Members',
            icon: 'Globe2',
            roles: [{ count: '4', label: 'CRM (Backend)' }],
            tagline: 'Indiamart & SEO',
          },
          {
            step: 3,
            title: 'Automotive Sales',
            total: '8 Members',
            icon: 'Bike',
            roles: [
              { count: '5', label: 'Field Sales Officers' },
              { count: '2', label: 'CRM (Backend)' },
              { count: '1', label: 'Team Leader' },
            ],
          },
          {
            step: 4,
            title: 'Operations & Support',
            total: '23+ Members',
            icon: 'Cog',
            roles: [
              { count: '4', label: 'Accounts Team' },
              { count: '3', label: 'Warehouse Manager' },
              { count: '16+', label: 'Drivers & Staff' },
            ],
          },
        ],
      },
    },
    // 3. Journey Timeline
    {
      type: 'OurJourneySection',
      order: 3,
      content: {
        eyebrow: 'Our Journey',
        heading: 'Building Trust Since 2007',
        intro:
          'Every milestone below reflects a step in how we grew from a single trading desk into a multi-brand lubricant distribution partner.',
        milestones: [
          {
            year: '2007',
            icon: 'Calendar',
            title: 'Company Founded',
            description:
              'Jai Deva Oil Co. begins trading lubricants, laying the foundation for long-term partnerships built on trust.',
          },
          {
            year: '2012',
            icon: 'Layers',
            title: 'Multi-Brand Portfolio',
            description:
              'We broaden our range to include industrial and automotive lubrication brands, giving customers more choice under one roof.',
          },
          {
            year: '2016',
            icon: 'Boxes',
            title: 'Distribution Network Grows',
            description:
              'Our warehousing and logistics footprint expands, so customers across sectors can rely on consistent supply.',
          },
          {
            year: '2021',
            icon: 'ShieldCheck',
            title: 'Quality-First Standards',
            description:
              'We strengthen sourcing and storage practices to meet stricter industry quality and handling standards.',
          },
          {
            year: 'Today',
            icon: 'Users',
            title: 'A Trusted Industry Partner',
            description:
              'We keep growing alongside our customers, offering industry-focused lubrication solutions and dependable service.',
          },
        ],
      },
    },
    // 4. Why Choose Jai Deva Oil Co.
    {
      type: 'AboutWhyChooseSection',
      order: 4,
      content: {
        title: 'Why Choose Jai Deva Oil Co.?',
        subtitle: 'Dependable multi-brand lubricant supply, proven since 2007.',
        items: [
          {
            icon: 'Boxes',
            title: 'Multi-Brand Portfolio',
            description:
              'HP, Castrol, Shell, Gulf, Servo, Motul – all under one roof for industrial & automotive needs.',
          },
          {
            icon: 'Layers',
            title: 'Wide Product Range',
            description:
              'Industrial oils, automotive lubricants, greases, hydraulic fluids, and specialty products.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Quality-First Sourcing',
            description:
              '100% genuine lubricants with factory test certificates, viscosity verification, and sealed-batch integrity.',
          },
          {
            icon: 'Truck',
            title: 'Reliable Pan-India Supply',
            description:
              'Consistent inventory with prompt delivery across 40+ cities and industrial clusters.',
          },
          {
            icon: 'Users',
            title: 'Dedicated Account Team',
            description:
              'Experienced CRM and field officers ensure long-term customer satisfaction.',
          },
          {
            icon: 'Calendar',
            title: '18+ Years of Trust',
            description:
              'Operating since 2007 with a proven track record of quality service and industry expertise.',
          },
        ],
        whyChooseTitle: 'Why Choose Jai Deva Oil Co.?',
        whyChooseSubtitle: 'Dependable multi-brand lubricant supply, proven since 2007.',
        whyChooseItems: [
          {
            icon: 'Boxes',
            title: 'Multi-Brand Portfolio',
            description:
              'HP, Castrol, Shell, Gulf, Servo, Motul – all under one roof for industrial & automotive needs.',
          },
          {
            icon: 'Layers',
            title: 'Wide Product Range',
            description:
              'Industrial oils, automotive lubricants, greases, hydraulic fluids, and specialty products.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Quality-First Sourcing',
            description:
              '100% genuine lubricants with factory test certificates, viscosity verification, and sealed-batch integrity.',
          },
          {
            icon: 'Truck',
            title: 'Reliable Pan-India Supply',
            description:
              'Consistent inventory with prompt delivery across 40+ cities and industrial clusters.',
          },
          {
            icon: 'Users',
            title: 'Dedicated Account Team',
            description:
              'Experienced CRM and field officers ensure long-term customer satisfaction.',
          },
          {
            icon: 'Calendar',
            title: '18+ Years of Trust',
            description:
              'Operating since 2007 with a proven track record of quality service and industry expertise.',
          },
        ],
      },
    },
    // 4. Facilities / Image Gallery
    {
      type: 'AboutImageGallerySection',
      order: 5,
      content: {
        eyebrow: 'Infrastructure & Operations',
        heading: 'Our Facilities & Operational Hubs',
        description:
          "Take a visual tour inside Jai Deva Oil Co.'s modern logistics infrastructure, warehousing depots, and quality-controlled product staging centers.",
        stockBadge: 'Over 500+ SKUs Stocked & Ready for Dispatch',
        bannerEyebrow: 'Pan-India Supply Reliability',
        bannerHeading: 'Equipped for Bulk Industrial Deliveries & Emergency Plant Stoppages',
        bannerDescription:
          'Whether you need a single 210-liter barrel of turbine oil or recurring monthly tanker dispatches of ISO VG 68 hydraulic oil, our infrastructure ensures consistent stock, factory test reports, and prompt handling.',
        bannerButtonText: 'Schedule a Supply Consultation',
        facilities: [
          {
            id: 'depot',
            title: 'Central Logistics & Drum Staging Depot',
            subtitle: 'High-Capacity Heavy Lubricant Storage',
            category: 'Warehousing & Inventory',
            desc: 'Covered, temperature-regulated depot equipped for high-density storage of 210L barrels, 20L pails, and IBC intermediate bulk containers.',
            badges: ['Batch Segregation', 'Spill Containment System'],
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
            icon: 'Warehouse',
          },
          {
            id: 'hq',
            title: 'Corporate Operations & Account Advisory',
            subtitle: 'Central Commercial & Customer Coordination',
            category: 'Corporate Facility',
            desc: 'Our business operations desk coordinating customer procurement, supplier relations, invoicing, and pan-India industrial contracts.',
            badges: ['Dedicated Account Managers', 'Real-Time Order Tracking'],
            image:
              'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
            icon: 'Building2',
          },
          {
            id: 'inspection',
            title: 'Quality Verification & Spec Assurance Desk',
            subtitle: 'Laboratory & Viscosity Verification',
            category: 'Quality Control',
            desc: 'Verification protocols ensuring every supplied barrel matches OEM specifications, viscosity standards, and valid refinery test certificates.',
            badges: ['OEM Specification Checks', 'Sealed Batch Integrity'],
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
            icon: 'ShieldCheck',
          },
          {
            id: 'fleet',
            title: 'Regional Dispatch & Transit Network',
            subtitle: 'Rapid Pan-India Manufacturing Supply',
            category: 'Distribution Logistics',
            desc: 'Logistics infrastructure ensuring on-schedule delivery across manufacturing clusters, power plants, and automotive workshops in 40+ cities.',
            badges: ['Fast Dispatch Routes', 'Zero In-Transit Contamination'],
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675167/jaideva/about/oil-fleet-logistics.jpg',
            icon: 'Truck',
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
  console.log('✓ About Us page & sections ready.');

  // 5b. Brands Page & Sections
  const brandsPage = await prisma.page.upsert({
    where: { slug: 'brands' },
    update: {
      title: 'Brands',
      order: 2,
      parent: '-',
      description:
        'Authorized Multi-Brand Distribution Partner for HP, Castrol, Shell, Gulf, Motul, and world-class lubrication manufacturers.',
      metaTitle: 'Multi-Brand Lubricants Portfolio | Jai Deva Oil Co.',
      metaDescription:
        "Explore Jai Deva Oil Co.'s authorized multi-brand lubricant portfolio covering industrial oils, automotive fluids, bulk barrels, and specialty greases.",
    },
    create: {
      title: 'Brands',
      slug: 'brands',
      order: 2,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Authorized Multi-Brand Distribution Partner for HP, Castrol, Shell, Gulf, Motul, and world-class lubrication manufacturers.',
      metaTitle: 'Multi-Brand Lubricants Portfolio | Jai Deva Oil Co.',
      metaDescription:
        "Explore Jai Deva Oil Co.'s authorized multi-brand lubricant portfolio covering industrial oils, automotive fluids, bulk barrels, and specialty greases.",
    },
  });

  const brandsSections = [
    // 0. Hero
    {
      type: 'BrandsHero',
      order: 0,
      content: {
        badge: 'Authorized Multi-Brand Distribution Partner',
        heading: 'Brands That Power Every Industrial Move.',
        description:
          'Jai Deva Oil Co. brings together the world’s most trusted lubricant manufacturers, application engineering expertise, and dependable regional stock for automotive, manufacturing, and heavy infrastructure plants.',
        bannerImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
        ctaPrimaryText: 'Explore Brand Portfolio',
        ctaPrimaryUrl: '#brand-showcase',
        ctaSecondaryText: 'Consult a Specialist',
      },
    },
    // 1. Stats Band
    {
      type: 'BrandsStatsBand',
      order: 1,
      content: {
        stats: [
          { value: '91%', label: 'Growth in 3 Years' },
          { value: '24%', label: 'CAGR (FY 22-23 to FY 25-26)' },
          { value: '1.9X', label: 'Turnover in 3 Years' },
          { value: '60+', label: 'Employee Strength' },
        ],
      },
    },
    // 2. Pillars
    {
      type: 'BrandsPillarsSection',
      order: 2,
      content: {
        eyebrow: 'ENGINEERING RELIABILITY',
        heading: 'STRONG BRANDS. BETTER OPERATIONS.',
        description:
          "A trusted brand behind a lubricant isn't a formality — it's the difference between predictable maintenance and catastrophic machinery downtime.",
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
        sideImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
        verifiedBadge: 'AUTHORIZED REFINERY STOCKS',
        guaranteeTitle: 'REFINERY STOCK GUARANTEE',
        guaranteeTag: 'ISO VG 32 to 680',
        guaranteeHeadline: 'Direct Factory-Sealed Distribution',
        guaranteeDesc:
          'Over 10,000+ barrels and lubricants buffered for prompt industrial dispatch across India.',
        pillars: [
          {
            title: 'Refinery-Direct Authenticity',
            description:
              'Every barrel, pail, and carton is sourced through authorized refinery channels with verified batch test reports and tamper-proof seals.',
            icon: 'Factory',
          },
          {
            title: 'Application-Matched Formulations',
            description:
              'Our lubrication specialists map the exact OEM specification, viscosity index, and operating temperature to eliminate equipment wear.',
            icon: 'Wrench',
          },
          {
            title: 'Buffer Stock & Fast Road Logistics',
            description:
              'We maintain multi-brand buffer stock across major viscosity grades, eliminating factory shutdown risks and delivery delays.',
            icon: 'Truck',
          },
          {
            title: 'Total Quality Assurance',
            description:
              'From sealed storage segregation to oil condition monitoring advisory, we help plants achieve optimal oil drain intervals and machinery health.',
            icon: 'ShieldCheck',
          },
        ],
      },
    },
    // 3. Product Categories Spectrum
    {
      type: 'BrandsProductCategoriesSection',
      order: 3,
      content: {
        eyebrow: 'COMPREHENSIVE FLUID SPECTRUM',
        heading: 'Lubrication Solutions for Every Industrial & Automotive Sector',
        description:
          'From ultra-pure turbine fluids to heavy-duty earthmover diesel oils, explore our distribution categories designed for high-performance operations.',
        categories: [
          {
            name: 'Automotive & Engine Oils',
            description:
              'Synthetic 5W-30, 15W-40 diesel fluids, multi-grade gear lubricants, and coolants.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
            badge: 'API CK-4 / SN Plus',
          },
          {
            name: 'Industrial Gear & Hydraulic Oils',
            description:
              'ISO VG 32 to 680 heavy anti-wear hydraulic, turbine, and industrial circulating oils.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            badge: 'DIN 51524 / ISO 11158',
          },
          {
            name: 'Refinery Barrels & Bulk Supply',
            description:
              'Factory-sealed 210L drums and bulk road tankers for continuous plant consumption.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
            badge: '210L Drums & Tankers',
          },
          {
            name: 'Precision Engine Lubrication',
            description:
              'High thermal stability engine oils engineered for severe load and extended drain life.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
            badge: 'Extended Drain Interval',
          },
          {
            name: 'High-Temp Greases & Pastes',
            description:
              'Lithium complex, polyurea, and synthetic extreme-pressure greases for bearings & kilns.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            badge: 'NLGI 00 to 3 / EP Pastes',
          },
          {
            name: 'Metalworking & CNC Coolants',
            description:
              'Bio-stable water-soluble cutting emulsions, grinding fluids, and rust preventives.',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
            badge: 'Chlorine-Free Emulsions',
          },
        ],
      },
    },
    // 4. CTA
    {
      type: 'BrandsCtaSection',
      order: 4,
      content: {
        badge: 'Certified Lubrication Engineering Advisory',
        heading: 'Need an Engine Oil Recommendation or Brand Consultation?',
        description:
          'Our lubrication engineers map OEM engine viscosities (0W-20, 5W-30, 15W-40), industrial gear grades, and drain intervals to maximize your equipment life.',
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
        buttonText: 'Request Engine Oil Quote',
        phoneText: 'Direct Dispatch Desk',
        phoneNumber: '+91 98111 23456',
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
  console.log('✓ Brands page & sections ready.');

  // 5c. Industries Page & Sections
  const industriesPage = await prisma.page.upsert({
    where: { slug: 'industries' },
    update: {
      title: 'Industries',
      order: 4,
      parent: '-',
      description:
        'Industrial lubrication solutions and application engineering for steel mills, cement plants, power generation, automotive stamping, and manufacturing.',
      metaTitle: 'Industrial Lubricants & Plant Engineering | Jai Deva Oil Co.',
      metaDescription:
        'Explore refinery-certified industrial oils, hydraulic fluids, and synthetic gear oils designed to reduce machine wear and operating costs across manufacturing sectors.',
    },
    create: {
      title: 'Industries',
      slug: 'industries',
      order: 4,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Industrial lubrication solutions and application engineering for steel mills, cement plants, power generation, automotive stamping, and manufacturing.',
      metaTitle: 'Industrial Lubricants & Plant Engineering | Jai Deva Oil Co.',
      metaDescription:
        'Explore refinery-certified industrial oils, hydraulic fluids, and synthetic gear oils designed to reduce machine wear and operating costs across manufacturing sectors.',
    },
  });

  const industriesSections = [
    // 0. Hero & Metrics Band
    {
      type: 'IndustriesHero',
      order: 0,
      content: {
        badge: 'Jai Deva Oil Co. • Less You Burn, the More You Earn',
        heading: 'Industrial Lubricants Engineered For Peak Efficiency.',
        description:
          'Refinery-certified multi-brand oils, greases, and fluids tailored to minimize friction, extend machinery life, and cut your plant // operating costs.',
        bannerImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
        ctaPrimaryText: 'Explore Industries',
        ctaPrimaryUrl: '#sector-stage',
        ctaSecondaryText: 'Request Plant Quote',
        stats: [
          {
            value: '18+',
            label: 'Years of Experience',
          },
          {
            value: '600+',
            label: 'Retailers Network',
          },
          {
            value: '80+',
            label: 'Workshops Network',
          },
          {
            value: '10',
            label: 'Own Delivery Vehicles',
          },
        ],
      },
    },
    // 1. Sector Lubrication Stages
    {
      type: 'IndustryStageSection',
      order: 1,
      content: {
        eyebrow: 'Interactive Sector Explorer',
        heading: 'Engineered Sector Formulations',
        description: 'Jai Deva Oil Co. delivers on its promise: "Less You Burn, the More You Earn"',
        selectorHint: 'Select a sector to explore',
        promiseLabel: 'The Jai Deva Promise',
        productBadge: 'Refinery Certified',
        recommendedLabel: 'Recommended Industrial Formulation',
        oemPrefix: 'OEM Compliance:',
        buttonText: 'Request Spec Sheet & Quote',
        sectors: [
          {
            id: 'steel',
            name: 'Steel & Metallurgy',
            shortName: 'Steel & Metals',
            icon: 'Factory',
            plantImage:
              'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            headline: 'Extreme-Heat & Shock-Load Protection',
            promise: 'Resists 650°C radiant heat & eliminates bearing seizure',
            operatingCondition: 'Temps up to 650°C • Extreme Shock Load • Heavy Mill Scale',
            equipment: [
              'Continuous Casters (Concast)',
              'Hot & Cold Rolling Mills',
              'Heavy Reduction Drives',
            ],
            recommendedProduct: {
              name: 'HP Parthan EP 320 / 460 Heavy Industrial Gear Oil',
              grade: 'ISO VG 320 / 460',
              oemMatch: 'Flender, David Brown & Danieli Compliant',
              highlight:
                'FVA 54 Micropitting certified with high demulsibility against cooling spray water',
            },
          },
          {
            id: 'cement',
            name: 'Cement & Mining',
            shortName: 'Cement & Mining',
            icon: 'Building2',
            plantImage:
              'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
            headline: 'Abrasive Clinker Dust & Kiln Heat Resistance',
            promise: 'Prevents girth gear pitting and cuts relubrication cycles',
            operatingCondition: 'Kiln Drive 220°C • Fine Clinker Abrasives • High Vibration',
            equipment: ['Kiln Girth Gears & Pinions', 'Ball Mills & VRMs', 'Primary Jaw Crushers'],
            recommendedProduct: {
              name: 'Synthetic Asphaltic Open Gear Compound 1000',
              grade: 'ISO VG 1000 / Sprayable',
              oemMatch: 'FLSmidth & Thyssenkrupp Approved',
              highlight:
                'Resilient heavy hydrodynamic cushion protecting gear teeth under 100+ ton loads',
            },
          },
          {
            id: 'power',
            name: 'Power Generation & Turbines',
            shortName: 'Power & Turbines',
            icon: 'Zap',
            plantImage:
              'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
            headline: 'Varnish-Free Ultra-Clean Turbine Fluids',
            promise: '20,000+ hour oxidation life with zero servo valve sticking',
            operatingCondition: 'Continuous 24/7 Run • Steam Condensation • High Thermal Stress',
            equipment: ['Gas & Supercritical Turbines', 'EHV Transformers', 'Boiler Feed Pumps'],
            recommendedProduct: {
              name: 'Non-Zinc Ashless Premium Turbine Oil',
              grade: 'ISO VG 32 / 46 (Group II / III)',
              oemMatch: 'GE GEK 32568, Siemens TLV 9013',
              highlight:
                'Ultra-low MPC Delta E varnish rating guaranteeing rapid electro-hydraulic response',
            },
          },
          {
            id: 'automotive',
            name: 'Automotive & Logistics',
            shortName: 'Automotive & Fleets',
            icon: 'Car',
            plantImage:
              'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
            headline: 'Heavy Fleet Efficiency & Press Hydraulics',
            promise: 'Maximizes fleet km/L fuel savings and extends oil drains to 80k km',
            operatingCondition: 'BS-VI DPF Aftertreatment • 250 Bar Stamping Cycle • Highway Hauls',
            equipment: ['Commercial Fleet HCVs', 'Stamping Presses', 'Heavy Axles & Differentials'],
            recommendedProduct: {
              name: 'Kixx HDX API CK-4 15W-40 Low-SAPS Engine Oil',
              grade: 'API CK-4 / CJ-4',
              oemMatch: 'Cummins CES 20086, Volvo VDS-4.5, MB 228.31',
              highlight:
                'Protects particulate filters against ash buildup while lowering fuel burn',
            },
          },
          {
            id: 'cnc',
            name: 'Precision CNC & Engineering',
            shortName: 'CNC & Machining',
            icon: 'Wrench',
            plantImage:
              'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            headline: 'Bio-Stable Coolants & Anti-Chatter Waylubes',
            promise: 'Extends tool life by 30% and eliminates slideway stick-slip',
            operatingCondition: '30,000 RPM Spindles • Micro-Tolerances • High Cutting Heat',
            equipment: [
              'Multi-Axis VMC/HMC Centers',
              'High-Speed Tool Spindles',
              'Precision Slideways',
            ],
            recommendedProduct: {
              name: 'Bio-Stable Soluble Coolant + Waylube 68',
              grade: 'Semi-Synthetic + ISO VG 68',
              oemMatch: 'DIN 51502 CGLP, Fives Cincinnati P-47',
              highlight: 'Long sump life without odor, separating cleanly from tramp oils',
            },
          },
          {
            id: 'food',
            name: 'Food & Pharmaceuticals (H1)',
            shortName: 'Food & Cleanroom',
            icon: 'UtensilsCrossed',
            plantImage:
              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
            headline: '100% Non-Toxic NSF H1 Certified Lubricants',
            promise: 'Guarantees food safety compliance and resists caustic steam washdowns',
            operatingCondition:
              'Incidental Food Contact • Daily Chemical Washdown • Sub-Zero Freezers',
            equipment: ['Rotary Bottling Carousels', 'Tablet Punch Presses', 'Packaging Lines'],
            recommendedProduct: {
              name: 'NSF H1 Synthetic Food-Grade Gear Oil & Grease',
              grade: 'ISO VG 220 / NLGI 2',
              oemMatch: 'FDA 21 CFR 178.3570, Halal & Kosher',
              highlight: 'Odorless, colorless, and immune to wash-off during CIP sanitation cycles',
            },
          },
          {
            id: 'textile',
            name: 'Textile & Looms',
            shortName: 'Textile & Looms',
            icon: 'Shirt',
            plantImage:
              'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
            oilImage:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
            headline: 'Zero-Staining Scourable Needle Oils & Chain Fluids',
            promise: 'Prevents fabric oil spots and resists carbonization in 240°C stenter ovens',
            operatingCondition: '1,200 Picks/min • 240°C Stenter Heat • High Lint Atmosphere',
            equipment: ['Knitting Needles & Sinkers', 'Air-Jet Looms', 'Stenter Drying Frames'],
            recommendedProduct: {
              name: 'Washable Scourable Needle Oil + Synthetic Chain 220',
              grade: 'ISO VG 22 / ISO VG 220',
              oemMatch: 'Mayer & Cie, Terrot & Monforts Specs',
              highlight: '100% washable in standard scouring baths, leaving no spot stains',
            },
          },
        ],
      },
    },
    // 2. Less You Burn Impact
    {
      type: 'LessYouBurnImpactSection',
      order: 2,
      content: {
        badge: 'The Jai Deva Operating Standard',
        heading: '"Less You Burn, The More You Earn"',
        subtitle:
          "Lubrication isn't just an operating expense—it's your plant's frontline protection against friction, thermal breakdown, and multimillion-rupee machinery failures.",
        buttonText: 'Request Plant TCO Audit',
        pillars: [
          {
            metric: '-15°C to -22°C',
            title: 'Reduced Sump Operating Heat',
            desc: 'High-VI synthetic base stocks cut internal fluid shear and mechanical friction across heavy reduction gearboxes.',
            icon: 'ThermometerSnowflake',
          },
          {
            metric: '2x to 3x Longer',
            title: 'Extended Oil Drain Intervals',
            desc: 'Superior thermal oxidation resistance prevents viscosity breakdown, doubling working hours between oil changes.',
            icon: 'Clock',
          },
          {
            metric: 'Up to 35%',
            title: 'Lower Plant Lubrication TCO',
            desc: 'Less lubricant consumed, zero sludge valve sticking, and eliminated unplanned catastrophic equipment downtime.',
            icon: 'TrendingDown',
          },
        ],
      },
    },
    // 3. Machinery Feature Section
    {
      type: 'MachineryFeatureSection',
      order: 3,
      content: {
        eyebrow: 'Machinery-Specific Lubrication',
        heading: 'Critical Plant Machinery Systems',
        description:
          'Tailored viscosity grades and chemical additive packages designed for specific equipment stress points.',
        protectionLabel: 'Machinery Protection Profile',
        formulationsLabel: 'Equivalent Industrial Formulations:',
        buttonText: 'Request Spec Sheet & Quote',
        systems: [
          {
            id: 'gearboxes',
            icon: 'Cog',
            title: 'Heavy Industrial Gearboxes',
            spec: 'ISO VG 150 to 680 • FVA 54 Certified',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            desc: 'Formulated with sulfur-phosphorus EP chemistry to eliminate gear tooth micropitting in continuous planetary and helical drives.',
            oilHighlight: 'HP Parthan EP / Mobilgear 600 XP / Omala S2 G',
            benefits: [
              'Zero micropitting under extreme shock loads',
              'Superior demulsibility against mill water ingress',
              'Flender, David Brown & Danieli approved',
            ],
          },
          {
            id: 'hydraulics',
            icon: 'Gauge',
            title: 'High-Pressure Hydraulic Systems',
            spec: 'ISO VG 32, 46, 68 • DIN 51524 HLP/HVLP',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
            desc: 'Engineered for high-flow proportional servo valves with ultra-rapid air release and sub-3-micron filterability.',
            oilHighlight: 'HP Enklo / Mobil DTE 10 Excel / Tellus S2 MX',
            benefits: [
              'Thermal shear stability under continuous 250 bar',
              'Zero sticky sludge or servo valve hang-ups',
              'Denison HF-0, Eaton Vickers & Rexroth certified',
            ],
          },
          {
            id: 'turbines',
            icon: 'Wind',
            title: 'Turbines & Rotary Compressors',
            spec: 'Non-Zinc Ashless • 20,000+ Hour Drain',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
            desc: 'Ashless non-zinc formulation delivering extreme oxidation resistance and zero lacquer formation across high-speed rotating shafts.',
            oilHighlight: 'HP Turbinol / Mobil DTE 700 / Rarus 427',
            benefits: [
              'Rapid water separation under steam condensates',
              'Ultra-low MPC Delta E varnish prevention',
              'GE, Siemens & Atlas Copco grade compliant',
            ],
          },
          {
            id: 'bearings',
            icon: 'Disc',
            title: 'Heavy Bearings & Open Girth Gears',
            spec: 'NLGI 1, 2, 3 • High-Temp Synthetic Base',
            image:
              'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
            desc: 'Heavy calcium sulfonate and polyurea greases with solid MoS2 for kiln hoods, vibrating screens, and heavy crusher bearings.',
            oilHighlight: 'Molygraph Ultra / Mobilith SHC / Gadus S2',
            benefits: [
              'Drop point exceeding 280°C for extreme heat',
              'Resists heavy water spray and abrasive dust',
              'Extreme 4-ball weld load exceeding 400 kgf',
            ],
          },
        ],
      },
    },
    // 4. Plant Process Section
    {
      type: 'PlantProcessSection',
      order: 4,
      content: {
        eyebrow: 'Lifecycle Engineering Support',
        heading: 'Our Plant Lubrication Journey',
        description:
          'A proven four-stage engineering process ensuring zero unplanned equipment downtime.',
        buttonText: 'Book Plant Audit',
        steps: [
          {
            step: '01',
            title: 'On-Site Oil Sampling',
            tagline: 'Field Inspection',
            icon: 'TestTube2',
            desc: 'Our lubrication engineers draw hot operating oil samples from critical gearboxes and hydraulic sumps.',
          },
          {
            step: '02',
            title: 'Lab Spectroscopic Testing',
            tagline: 'Predictive Analytics',
            icon: 'FileCheck2',
            desc: 'Testing for wear metals (Fe, Cu, Al), moisture ppm, acid number (TAN), and remaining useful life (RUL).',
          },
          {
            step: '03',
            title: 'Plant SKU Consolidation',
            tagline: '35% Inventory Reduction',
            icon: 'Boxes',
            desc: 'Auditing plant manuals to streamline dozens of grease and oil grades into 8–10 high-performance multi-grades.',
          },
          {
            step: '04',
            title: 'Emergency Drum Dispatch',
            tagline: 'Zero Line Stoppage',
            icon: 'Truck',
            desc: '24–48h emergency barrel (210L) reserves across ISO VG 32 to 680 to prevent catastrophic line shutdowns.',
          },
        ],
      },
    },
    // 5. Industries Consultation CTA
    {
      type: 'IndustriesConsultationCTA',
      order: 5,
      content: {
        badge: 'Zero-Cost Technical Assessment',
        heading: "Optimize Your Plant's Lubrication Performance Today",
        description:
          'Whether you need urgent barrel dispatch, cross-referencing for an imported machine, or a full plant SKU consolidation audit, our lubrication specialists are ready to support your facility.',
        formTitle: 'Request Sector Specification',
        formSubtitle:
          'Select your primary operating vertical to launch a tailored technical enquiry:',
        dropdownLabel: 'Industry / Machinery Application:',
        buttonText: 'Get Technical Recommendation & Pricing',
        phoneText: 'Or visit our contact page for direct depot locations',
        phoneNumber: '',
        trustIndicators: [
          { icon: 'Clock', text: '24-Hour Quotation Turnaround' },
          { icon: 'ShieldCheck', text: '100% Genuine Batch CoAs' },
          { icon: 'Headphones', text: 'Dedicated Plant Support' },
        ],
        sectorOptions: [
          'Steel & Hot Rolling Mills',
          'Cement & Heavy Mining',
          'Power Generation & Turbines',
          'Automotive & Component Stamping',
          'Food & Beverage NSF H1 Safe',
          'Pharmaceuticals & Cleanrooms',
          'Textile High-Speed Spinning',
          'Plastics & Injection Molding',
          'Paper Machine Circulating Systems',
          'General Precision CNC Machining',
        ],
      },
    },
  ];

  for (const s of industriesSections) {
    const existing = await prisma.section.findFirst({
      where: { pageId: industriesPage.id, type: s.type },
    });
    if (existing) {
      await prisma.section.update({
        where: { id: existing.id },
        data: { content: s.content },
      });
    } else {
      await prisma.section.create({
        data: {
          pageId: industriesPage.id,
          type: s.type,
          content: s.content,
          order: s.order,
        },
      });
    }
  }
  console.log('✓ Industries page & sections ready.');

  // 6. Contact Us Page & Sections
  const contactPage = await prisma.page.upsert({
    where: { slug: 'contact-us' },
    update: {
      title: 'Contact Us',
      order: 7,
      parent: '-',
      description:
        'Get in touch with Jai Deva Oil Co. for bulk lubricants supply, custom quotes, and distribution enquiries.',
      metaTitle: 'Contact Us | Jai Deva Oil Co. - Multi-Brand Lubricants Distributor',
      metaDescription:
        'Reach out to Jai Deva Oil Co. sales and technical team for industrial oils, automotive lubricants, and greases across India.',
    },
    create: {
      title: 'Contact Us',
      slug: 'contact-us',
      order: 7,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Get in touch with Jai Deva Oil Co. for bulk lubricants supply, custom quotes, and distribution enquiries.',
      metaTitle: 'Contact Us | Jai Deva Oil Co. - Multi-Brand Lubricants Distributor',
      metaDescription:
        'Reach out to Jai Deva Oil Co. sales and technical team for industrial oils, automotive lubricants, and greases across India.',
    },
  });

  const contactSections = [
    {
      type: 'ContactHero',
      order: 0,
      content: {
        title: 'Contact Us',
        subtitle: '',
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1787738184/mahalaxmi/contact/contact-us-banner.jpg',
        altText: 'Contact Us - Jai Deva Oil Co.',
      },
    },
    {
      type: 'ContactHeadquarter',
      order: 1,
      content: {
        companyName: 'Jai Deva Oil Co.',
        badge: 'Multi-Brand Industrial & Automotive Lubricants Distributor',
        description:
          'Connect with our team for bulk lubricants supply, dealership opportunities, technical data sheets, and custom quotes.',
        proprietor: 'Mr. Mayank Goyal',
        address: 'Industrial Area & Regional Distribution Hub, India',
        phone: '+91 98765 43210',
        whatsapp: '919876543210',
        email: 'sales@jaidevaoil.com',
        workingHours: 'Monday to Saturday: 10:00 AM – 6:00 PM',
      },
    },
    {
      type: 'ContactForm',
      order: 2,
      content: {
        badge: 'Online Request',
        title: 'Send an Enquiry',
        subtitle:
          'Please fill in your details and our team will get back to you with pricing & availability.',
        buttonText: 'Submit Enquiry',
      },
    },
    {
      type: 'ExistingBusinessNetwork',
      order: 3,
      content: {
        badge: 'North India Network',
        heading: 'Existing Business Network',
        description:
          'Direct distribution hubs, administrative branches, and field teams across the northern industrial corridor.',
        regionalMapImage:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1791178976/jaideva/contact/operating-region-map.png',
        quickJumpWarehouses: '🔴 Mandoli, Baghpat, Haridwar',
        quickJumpOffices: '🔵 Delhi HQ & Haridwar',
        quickJumpFieldHubs: '🟡 14 Field Presence Hubs',
        summaryWarehouses: 'Mandoli (Delhi), Baghpat (U.P.), Haridwar (Uttarakhand)',
        summaryOffices: 'Delhi HQ (Corporate), Haridwar (Regional Operations)',
        summaryFieldHubs: 'Noida, Ghaziabad, Meerut, Sonipat, Rohtak, Dehradun +',
        locations: [
          {
            id: 'mandoli',
            name: 'Delhi / Mandoli',
            state: 'Delhi',
            region: 'Delhi NCR',
            type: ['warehouse', 'office'],
            lat: 28.709,
            lng: 77.311,
            description: 'Central Warehouse Hub & Corporate Operations Office',
            address: 'Mandoli Industrial Area, Delhi 110093',
          },
          {
            id: 'baghpat',
            name: 'Baghpat',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['warehouse'],
            lat: 28.948,
            lng: 77.228,
            description: 'Regional Bulk Storage Warehouse & Rapid Distribution Depot',
            address: 'Industrial Corridor, Baghpat, Uttar Pradesh',
          },
          {
            id: 'haridwar',
            name: 'Haridwar',
            state: 'Uttarakhand',
            region: 'Uttarakhand',
            type: ['warehouse', 'office'],
            lat: 29.938,
            lng: 78.145,
            description: 'Uttarakhand Regional Warehouse & Branch Operations Office',
            address: 'SIDCUL Industrial Area, Haridwar, Uttarakhand',
          },
          {
            id: 'ghaziabad',
            name: 'Ghaziabad',
            state: 'Uttar Pradesh',
            region: 'Delhi NCR',
            type: ['field'],
            lat: 28.669,
            lng: 77.438,
            description: 'Engineering & Heavy Industrial Unit Coverage',
          },
          {
            id: 'noida',
            name: 'Noida',
            state: 'Uttar Pradesh',
            region: 'Delhi NCR',
            type: ['field'],
            lat: 28.535,
            lng: 77.391,
            description: 'Industrial Machine & Automotive Component Cluster',
          },
          {
            id: 'greater-noida',
            name: 'Greater Noida',
            state: 'Uttar Pradesh',
            region: 'Delhi NCR',
            type: ['field'],
            lat: 28.474,
            lng: 77.503,
            description: 'Automotive OEM & Heavy Manufacturing Belt',
          },
          {
            id: 'meerut',
            name: 'Meerut',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 28.984,
            lng: 77.706,
            description: 'Industrial Engineering, Sports & Transformers Industry',
          },
          {
            id: 'muzaffarnagar',
            name: 'Muzaffarnagar',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 29.472,
            lng: 77.708,
            description: 'Steel Rolling Mills & Paper Mills Lubrication Supply',
          },
          {
            id: 'saharanpur',
            name: 'Saharanpur',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 29.967,
            lng: 77.551,
            description: 'Agro, Wood Processing & Paper Machinery Lubricants',
          },
          {
            id: 'hapur',
            name: 'Hapur',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 28.73,
            lng: 77.78,
            description: 'Industrial Processing & Heavy Machinery Support',
          },
          {
            id: 'sikandrabad',
            name: 'Sikandrabad',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 28.45,
            lng: 77.694,
            description: 'Ceramics, Cables & Metallurgy Industrial Area',
          },
          {
            id: 'aligarh',
            name: 'Aligarh',
            state: 'Uttar Pradesh',
            region: 'Western U.P.',
            type: ['field'],
            lat: 27.897,
            lng: 78.088,
            description: 'Hardware, Metal Die-Casting & Auto Components',
          },
          {
            id: 'roorkee',
            name: 'Roorkee',
            state: 'Uttarakhand',
            region: 'Uttarakhand',
            type: ['field'],
            lat: 29.854,
            lng: 77.888,
            description: 'Manufacturing & Precision Instrumentation Corridor',
          },
          {
            id: 'dehradun',
            name: 'Dehradun',
            state: 'Uttarakhand',
            region: 'Uttarakhand',
            type: ['field'],
            lat: 30.316,
            lng: 78.032,
            description: 'Pharma, Light Engineering & Transport Fleet Lubrication',
          },
          {
            id: 'sonipat',
            name: 'Sonipat',
            state: 'Haryana',
            region: 'Haryana',
            type: ['field'],
            lat: 28.993,
            lng: 77.015,
            description: 'Kundli/Rai Industrial Zones & Automotive Suppliers',
          },
          {
            id: 'bahadurgarh',
            name: 'Bahadurgarh',
            state: 'Haryana',
            region: 'Haryana',
            type: ['field'],
            lat: 28.692,
            lng: 76.924,
            description: 'Heavy Industrial Machinery & Footwear Manufacturing',
          },
          {
            id: 'rohtak',
            name: 'Rohtak',
            state: 'Haryana',
            region: 'Haryana',
            type: ['field'],
            lat: 28.895,
            lng: 76.606,
            description: 'Fast-Growing Automotive Hub & Engineering Plants',
          },
        ],
      },
    },
  ];

  // Remove deprecated RegionalOffices section if it exists
  await prisma.section.deleteMany({
    where: { pageId: contactPage.id, type: 'RegionalOffices' },
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
  console.log('✓ Contact Us page & sections ready.');

  // 7. Events Page & Sections
  const eventsPage = await prisma.page.upsert({
    where: { slug: 'events' },
    update: {
      title: 'Events & Activities',
      order: 5,
      parent: '-',
      description: 'Photo gallery and stakeholder engagement events hosted by Jai Deva Oil Co.',
      metaTitle: 'Events & Gallery | Jai Deva Oil Co.',
      metaDescription:
        'Explore photo gallery and coverage of dealer meets, exhibitions, and industrial seminars by Jai Deva Oil Co.',
    },
    create: {
      title: 'Events & Activities',
      slug: 'events',
      order: 5,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description: 'Photo gallery and stakeholder engagement events hosted by Jai Deva Oil Co.',
      metaTitle: 'Events & Gallery | Jai Deva Oil Co.',
      metaDescription:
        'Explore photo gallery and coverage of dealer meets, exhibitions, and industrial seminars by Jai Deva Oil Co.',
    },
  });

  const eventsSections = [
    {
      type: 'EventsHero',
      order: 0,
      content: {
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1787737913/mahalaxmi/events/events-banner.jpg',
        altText: 'JAI DEVA OIL CO. Events & Activities Gallery Banner',
      },
    },
    {
      type: 'EventsContent',
      order: 1,
      content: {
        title: 'EVENTS',
        introText:
          'Jai Deva Oil Co. actively engages with their stakeholders by frequently hosting meetings and events with them. This includes meeting business partners, strategic partners, distributors, OEMs, agencies, mechanics, and industrial clients.',
      },
    },
    {
      type: 'EventsGallery',
      order: 2,
      content: {
        galleryItems: [
          {
            id: 1,
            title: 'HP Racer & HP Neosynth CNBC TV18 Overdrive Awards',
            image: 'https://www.hplubricants.in/sites/default/files/hplube-at-overdrive-awards.jpg',
            altText: 'HP Racer and HP Neosynth partners with CNBC TV18 to sponsor Overdrive Awards',
          },
          {
            id: 2,
            title: 'Neosynth Plus 0W 20 launch for Petrol Cars',
            image:
              'https://www.hplubricants.in/sites/default/files/neosynth-plus-0w-20-launch-for-petrol-cars.jpg',
            altText: 'Neosynth Plus 0W 20 launch for Petrol Cars',
          },
          {
            id: 3,
            title: 'Excon 2017 Discussion',
            image: 'https://www.hplubricants.in/sites/default/files/b5.jpg',
            altText: 'Excon 2017 Discussion',
          },
          {
            id: 4,
            title: 'Excon 2017 Jai Deva Oil Co. Stall Sideview',
            image: 'https://www.hplubricants.in/sites/default/files/b4.jpg',
            altText: 'Excon 2017 Jai Deva Oil Co. Stall Sideview',
          },
          {
            id: 5,
            title: 'Excon 2017 Jai Deva Oil Co. Stall',
            image: 'https://www.hplubricants.in/sites/default/files/b3.jpg',
            altText: 'Excon 2017 Jai Deva Oil Co. Stall',
          },
          {
            id: 6,
            title: 'Excon 2017 HPCL Team',
            image: 'https://www.hplubricants.in/sites/default/files/b2.jpg',
            altText: 'Excon 2017 HPCL Team',
          },
          {
            id: 7,
            title: 'Excon 2017 Ribbon Cutting',
            image: 'https://www.hplubricants.in/sites/default/files/b1.jpg',
            altText: 'Excon 2017 Ribbon Cutting',
          },
          {
            id: 8,
            title: 'OEM meet at Chennai',
            image: 'https://www.hplubricants.in/sites/default/files/18.jpg',
            altText: 'OEM meet at Chennai',
          },
          {
            id: 9,
            title: 'World Road Meeting Banner 2017',
            image: 'https://www.hplubricants.in/sites/default/files/17.jpg',
            altText: 'World Road Meeting Banner 2017',
          },
          {
            id: 10,
            title: 'World Road Meeting Screen Display 2017',
            image: 'https://www.hplubricants.in/sites/default/files/16.jpg',
            altText: 'World Road Meeting Screen Display 2017',
          },
          {
            id: 11,
            title: 'World Road Meeting Stall 2017',
            image: 'https://www.hplubricants.in/sites/default/files/15.jpg',
            altText: 'World Road Meeting Stall 2017',
          },
          {
            id: 12,
            title: 'World Road Meeting Exhibition 2017',
            image: 'https://www.hplubricants.in/sites/default/files/14.jpg',
            altText: 'World Road Meeting Exhibition 2017',
          },
          {
            id: 13,
            title: 'World Road Meeting Lube Counter 2017',
            image: 'https://www.hplubricants.in/sites/default/files/13.jpg',
            altText: 'World Road Meeting Lube Counter 2017',
          },
          {
            id: 14,
            title: 'World Road Meeting I&C Counter 2017',
            image: 'https://www.hplubricants.in/sites/default/files/12.jpg',
            altText: 'World Road Meeting I&C Counter 2017',
          },
          {
            id: 15,
            title: 'Road Safety 2017 Salute',
            image: 'https://www.hplubricants.in/sites/default/files/11.jpg',
            altText: 'Road Safety 2017 Salute',
          },
          {
            id: 16,
            title: 'Road Safety 2017 Showcase',
            image: 'https://www.hplubricants.in/sites/default/files/10.jpg',
            altText: 'Road Safety 2017 Showcase',
          },
          {
            id: 17,
            title: 'Milcy Super Launch',
            image: 'https://www.hplubricants.in/sites/default/files/9.jpg',
            altText: 'Milcy Super Launch',
          },
          {
            id: 18,
            title: 'Jai Deva Oil Co. ConMac 2017 Showcase',
            image: 'https://www.hplubricants.in/sites/default/files/8.jpg',
            altText: 'Jai Deva Oil Co. ConMac 2017 Showcase',
          },
          {
            id: 19,
            title: 'Jai Deva Oil Co. ConMac 2017',
            image: 'https://www.hplubricants.in/sites/default/files/7.jpg',
            altText: 'Jai Deva Oil Co. ConMac 2017',
          },
          {
            id: 20,
            title: 'Inauguration of POL Testing laboratory for Indian Army',
            image: 'https://www.hplubricants.in/sites/default/files/6.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army',
          },
          {
            id: 21,
            title: 'Inauguration of POL Testing laboratory for Indian Army Showcase',
            image: 'https://www.hplubricants.in/sites/default/files/5.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army Showcase',
          },
          {
            id: 22,
            title: 'Inauguration of POL Testing laboratory for Indian Army Ribbon Cut',
            image: 'https://www.hplubricants.in/sites/default/files/4.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army Ribbon Cut',
          },
          {
            id: 23,
            title: 'Inauguration of POL Testing laboratory for Indian Army Walk',
            image: 'https://www.hplubricants.in/sites/default/files/3.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army Walk',
          },
          {
            id: 24,
            title: 'Inauguration of POL Testing laboratory for Indian Army Chat',
            image: 'https://www.hplubricants.in/sites/default/files/2.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army Chat',
          },
          {
            id: 25,
            title: 'Inauguration of POL Testing laboratory for Indian Army Red Carpet',
            image: 'https://www.hplubricants.in/sites/default/files/1.jpg',
            altText: 'Inauguration of POL Testing laboratory for Indian Army Red Carpet',
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
  console.log('✓ Events page & sections ready.');

  // 8 & 9. Brand Categories & Products (inlined from seed-brands.js)
  // Auto-generated brand categories and products seeder
  const brandCategories = [
    {
      name: 'HP Lubricants',
      slug: 'hp-lubricants',
      shortDesc: "India's Premier Lubricant Solutions & Direct Refinery Supply Authority",
      fullDesc:
        "HP Lubricants is India's largest lubricant brand, offering an exhaustive spectrum of high-performance automotive and heavy industrial oils. Backed by state-of-the-art refinery testing, direct pipeline infrastructure, and ISO-certified batch blending, HP Lubricants ensures maximum machine longevity, thermal stability, and operational efficiency across critical power, steel, manufacturing, and transport infrastructure.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      isFeatured: true,
      order: 1,
    },
    {
      name: 'Valvoline',
      slug: 'valvoline',
      shortDesc: 'Over 150 Years of Severe-Duty Fleet Innovation & Extended Drain Chemistry',
      fullDesc:
        "Valvoline has pioneered heavy fleet lubrication since 1866. Engineered specifically for severe-duty commercial transport, mining haulers, and high-hour industrial equipment, Valvoline's patented chemistry ensures maximum thermal breakdown defense, soot dispersion, and extended drain intervals.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      isFeatured: true,
      order: 2,
    },
    {
      name: 'GS Caltex',
      slug: 'gs-caltex',
      shortDesc: 'World-Class Kixx Group II/III Synthetic Base Oil Technology',
      fullDesc:
        "GS Caltex operates one of the world's largest single-site petroleum refineries and base oil manufacturing facilities. Its flagship Kixx lubricant portfolio leverages ultra-pure Group II and Group III synthetic base oils, ensuring superior oxidation resistance, reduced friction, and exceptional fuel economy under severe loads.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      isFeatured: true,
      order: 3,
    },
    {
      name: 'Idemitsu',
      slug: 'idemitsu',
      shortDesc: 'Tight-Tolerance Japanese OEM Precision Fluids & Machine Tool Chemistry',
      fullDesc:
        "Idemitsu is Japan's premier OEM lubricant partner, formulating factory-fill fluids for world-leading Japanese automotive and machinery manufacturers. Its specialized Daphne product line is engineered for high-speed spindles, EDM dielectric spark erosion, and ultra-tight tolerance CNC machine tools.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      isFeatured: true,
      order: 4,
    },
    {
      name: 'Molygraph Lubricants',
      slug: 'molygraph-lubricants',
      shortDesc: 'Engineered Specialty High-Temp Greases, Pastes & Extreme Tribology',
      fullDesc:
        "Molygraph is India's leading manufacturer of engineered specialty greases, anti-seize pastes, and high-temperature tribological lubricants. Built specifically for cement kilns, steel mills, continuous casters, and heavy forging plants where conventional lubricants melt or wash off under extreme pressure.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      isFeatured: true,
      order: 5,
    },
    {
      name: 'Motul Tech',
      slug: 'motul-tech',
      shortDesc: 'French Industrial Fluid Technology & Metal Transformation Chemistry',
      fullDesc:
        "MotulTech is the dedicated heavy industrial division of France's Motul Group. Specializing in high-performance CNC metalworking coolants, neat cutting oils, dielectric spark erosion fluids, and accelerated quench oils, MotulTech products optimize tool life, machine uptime, and metal transformation quality.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      isFeatured: true,
      order: 6,
    },
    {
      name: 'Deep Pneumatics',
      slug: 'deep-pneumatics',
      shortDesc: 'Industrial Rotary Screw Compressors, Clean Air Treatment & Specialized Fluids',
      fullDesc:
        'Deep Pneumatics is an industrial leader providing high-efficiency rotary screw compressors, air treatment dryers, pneumatic filtration units, and custom synthetic compressor fluids. Engineered to provide continuous, carbon-free compressed air for critical automation, pneumatic machinery, and heavy industrial facilities.',
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      isFeatured: true,
      order: 7,
    },
    {
      name: 'Lubricon',
      slug: 'lubricon',
      shortDesc: 'Custom Industrial Blends, Severe-Duty Circulating & Plant-Specific Fluids',
      fullDesc:
        'Lubricon delivers customized industrial lubricant blends, precision slideway fluids, and plant-specific process oils formulated to match machinery configurations. Designed for continuous manufacturing lines, severe circulating sumps, heavy machine tools, and specialized industrial gear drives.',
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      isFeatured: true,
      order: 8,
    },
    {
      name: 'TW Chemin',
      slug: 'tw-chemin',
      shortDesc: 'European Precision Metalworking Chemistry, CNC Coolants & Rust Defense',
      fullDesc:
        'TW Chemin represents German precision chemical formulations for multi-axis CNC metal cutting, surface preparation, and long-term corrosion prevention. Formulated with bio-stable biocides, zero-chlorine lubricity boosters, and thin-film dewatering anti-corrosion barriers.',
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      isFeatured: true,
      order: 9,
    },
    {
      name: 'Filtermist',
      slug: 'filtermist',
      shortDesc: 'UK World Leaders in Centrifugal Oil Mist Extraction & Machine Shop Clean Air',
      fullDesc:
        "Filtermist is the international standard in oil mist collectors, centrifugal smoke eliminators, and workshop air filtration units since 1969. Engineered to capture hazardous oil mist directly at the CNC machine source, recover valuable coolants, and protect workers' health.",
      coverImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      isFeatured: true,
      order: 10,
    },
  ];

  const brandProducts = [
    {
      name: 'HP Racer 4T 20W-40',
      slug: 'hp-racer-4t-20w40',
      subtitle: 'HP Lubricants • Engine Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Engine Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Premium four-stroke motorcycle and scooter engine oil with high friction stability and clutch anti-slippage.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Two-Wheelers, Four-Stroke Motorcycles, Scooters',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API SL | JASO MA2 | SAE 20W-40.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 900ml / 1L / 50L / 210L Drum',
        'Application areas: Two-Wheelers, Four-Stroke Motorcycles, Scooters',
        'Standards & specs: API SL | JASO MA2 | SAE 20W-40',
      ],
      specsText: 'API SL | JASO MA2 | SAE 20W-40',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Engine Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API SL | JASO MA2 | SAE 20W-40',
        },
        {
          property: 'Primary Applications',
          value: 'Two-Wheelers, Four-Stroke Motorcycles, Scooters',
        },
        {
          property: 'Standard Packaging Options',
          value: '900ml, 1L, 50L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 101,
    },
    {
      name: 'HP Milcy Turbo 15W-40',
      slug: 'hp-milcy-turbo-15w40',
      subtitle: 'HP Lubricants • Engine Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Engine Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description:
        'Severe-duty turbo-charged diesel engine oil engineered for extended drain intervals, soot dispersion, and bore protection.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Heavy Commercial Vehicles, Earthmovers, Diesel Gensets',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API CI-4 Plus / SL | MB 228.3 | SAE 15W-40.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 7.5L / 10L / 20L Bucket / 210L Drum',
        'Application areas: Heavy Commercial Vehicles, Earthmovers, Diesel Gensets',
        'Standards & specs: API CI-4 Plus / SL | MB 228.3 | SAE 15W-40',
      ],
      specsText: 'API CI-4 Plus / SL | MB 228.3 | SAE 15W-40',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Engine Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API CI-4 Plus / SL | MB 228.3 | SAE 15W-40',
        },
        {
          property: 'Primary Applications',
          value: 'Heavy Commercial Vehicles, Earthmovers, Diesel Gensets',
        },
        {
          property: 'Standard Packaging Options',
          value: '7.5L, 10L, 20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 102,
    },
    {
      name: 'HP Neosynth 5W-30',
      slug: 'hp-neosynth-5w30',
      subtitle: 'HP Lubricants • Engine Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Engine Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        '100% full synthetic motor oil delivering maximum fuel efficiency and cold-cranking protection for modern petrol/diesel cars.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Modern Turbocharged Cars, SUVs, Hybrid Powertrains',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API SP | ILSAC GF-6 | Full Synthetic.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 1L / 3.5L / 4L Canister / 210L Drum',
        'Application areas: Modern Turbocharged Cars, SUVs, Hybrid Powertrains',
        'Standards & specs: API SP | ILSAC GF-6 | Full Synthetic',
      ],
      specsText: 'API SP | ILSAC GF-6 | Full Synthetic',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Engine Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API SP | ILSAC GF-6 | Full Synthetic',
        },
        {
          property: 'Primary Applications',
          value: 'Modern Turbocharged Cars, SUVs, Hybrid Powertrains',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 3.5L, 4L Canister, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 103,
    },
    {
      name: 'HP Gear Oil EP 90',
      slug: 'hp-gear-oil-ep-90',
      subtitle: 'HP Lubricants • Gear Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Gear Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Multi-purpose extreme pressure gear lubricant formulated for hypoid, spiral bevel, and synchromesh gearboxes.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Manual Transmissions, Hypoid Differentials, Steering Gears',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API GL-4 | IS:1118-1992 | EP 90.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 1L / 5L / 20L Bucket / 210L Drum',
        'Application areas: Manual Transmissions, Hypoid Differentials, Steering Gears',
        'Standards & specs: API GL-4 | IS:1118-1992 | EP 90',
      ],
      specsText: 'API GL-4 | IS:1118-1992 | EP 90',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Gear Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API GL-4 | IS:1118-1992 | EP 90',
        },
        {
          property: 'Primary Applications',
          value: 'Manual Transmissions, Hypoid Differentials, Steering Gears',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 5L, 20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 104,
    },
    {
      name: 'HP Parthan EP 220',
      slug: 'hp-parthan-ep-220',
      subtitle: 'HP Lubricants • Gear Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Gear Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Premium lead-free extreme pressure industrial gear oil with excellent demulsibility and anti-micropitting defense.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Steel Rolling Mills, Cement Ball Mills, Paper Machine Drives',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 220 | DIN 51517 Part 3 (CLP) | AGMA 9005-E02.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L Bucket / 210L Refinery Barrel / Bulk Road Tanker',
        'Application areas: Steel Rolling Mills, Cement Ball Mills, Paper Machine Drives',
        'Standards & specs: ISO VG 220 | DIN 51517 Part 3 (CLP) | AGMA 9005-E02',
      ],
      specsText: 'ISO VG 220 | DIN 51517 Part 3 (CLP) | AGMA 9005-E02',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Gear Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 220 | DIN 51517 Part 3 (CLP) | AGMA 9005-E02',
        },
        {
          property: 'Primary Applications',
          value: 'Steel Rolling Mills, Cement Ball Mills, Paper Machine Drives',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Refinery Barrel, Bulk Road Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 105,
    },
    {
      name: 'HP Parthan EP 320',
      slug: 'hp-parthan-ep-320',
      subtitle: 'HP Lubricants • Gear Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Gear Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Heavy-duty industrial enclosed gear lubricant built to withstand continuous heavy shock loading and high temperatures.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Crusher Gearboxes, Extruders, Heavy Mining Conveyors',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 320 | DIN 51517 Part 3 | US Steel 224.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L / 210L Drum / Tanker Delivery',
        'Application areas: Crusher Gearboxes, Extruders, Heavy Mining Conveyors',
        'Standards & specs: ISO VG 320 | DIN 51517 Part 3 | US Steel 224',
      ],
      specsText: 'ISO VG 320 | DIN 51517 Part 3 | US Steel 224',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Gear Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 320 | DIN 51517 Part 3 | US Steel 224',
        },
        {
          property: 'Primary Applications',
          value: 'Crusher Gearboxes, Extruders, Heavy Mining Conveyors',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum, Tanker Delivery',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 106,
    },
    {
      name: 'HP Enklo 68',
      slug: 'hp-enklo-68',
      subtitle: 'HP Lubricants • Hydraulic Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Hydraulic Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'High performance anti-wear hydraulic oil providing oxidation stability, anti-foam, and rapid water separation.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Plastic Injection Molding, CNC Hydraulic Packs, Hydraulic Presses',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 68 | DIN 51524 Part 2 (HLP) | Parker Denison HF-0.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L Bucket / 210L Refinery Barrel / Bulk Road Tanker',
        'Application areas: Plastic Injection Molding, CNC Hydraulic Packs, Hydraulic Presses',
        'Standards & specs: ISO VG 68 | DIN 51524 Part 2 (HLP) | Parker Denison HF-0',
      ],
      specsText: 'ISO VG 68 | DIN 51524 Part 2 (HLP) | Parker Denison HF-0',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Hydraulic Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 68 | DIN 51524 Part 2 (HLP) | Parker Denison HF-0',
        },
        {
          property: 'Primary Applications',
          value: 'Plastic Injection Molding, CNC Hydraulic Packs, Hydraulic Presses',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Refinery Barrel, Bulk Road Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 107,
    },
    {
      name: 'HP Enklo 46',
      slug: 'hp-enklo-46',
      subtitle: 'HP Lubricants • Hydraulic Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Hydraulic Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Premium anti-wear hydraulic oil formulated for rotary vane, piston, and gear type hydraulic pumps under severe duty.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Mobile Construction Equipment, Machine Tool Hydraulics, Forklifts',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 46 | DIN 51524 Part 2 | Eaton Vickers I-286-S.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L / 210L Drum / Bulk Tanker',
        'Application areas: Mobile Construction Equipment, Machine Tool Hydraulics, Forklifts',
        'Standards & specs: ISO VG 46 | DIN 51524 Part 2 | Eaton Vickers I-286-S',
      ],
      specsText: 'ISO VG 46 | DIN 51524 Part 2 | Eaton Vickers I-286-S',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Hydraulic Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 46 | DIN 51524 Part 2 | Eaton Vickers I-286-S',
        },
        {
          property: 'Primary Applications',
          value: 'Mobile Construction Equipment, Machine Tool Hydraulics, Forklifts',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 108,
    },
    {
      name: 'HP Enklo 32',
      slug: 'hp-enklo-32',
      subtitle: 'HP Lubricants • Hydraulic Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Hydraulic Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Light viscosity anti-wear fluid designed for tight-clearance servo valves and high-cycle industrial automation.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Servo-Controlled Machine Tools, Precision Robotics, Low Temp Hydraulics',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 32 | DIN 51524 Part 2 | High Viscosity Index.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L Bucket / 210L Drum',
        'Application areas: Servo-Controlled Machine Tools, Precision Robotics, Low Temp Hydraulics',
        'Standards & specs: ISO VG 32 | DIN 51524 Part 2 | High Viscosity Index',
      ],
      specsText: 'ISO VG 32 | DIN 51524 Part 2 | High Viscosity Index',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Hydraulic Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 32 | DIN 51524 Part 2 | High Viscosity Index',
        },
        {
          property: 'Primary Applications',
          value: 'Servo-Controlled Machine Tools, Precision Robotics, Low Temp Hydraulics',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 109,
    },
    {
      name: 'HP Lithon 2',
      slug: 'hp-lithon-2',
      subtitle: 'HP Lubricants • Greases',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Premium multi-purpose lithium grease with high mechanical shear stability, anti-rust, and water resistance.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Electric Motor Bearings, Industrial Rollers, General Plant Lubrication',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Lithium Base | Drop Point 190°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 1kg / 5kg / 18kg Pail / 180kg Barrel',
        'Application areas: Electric Motor Bearings, Industrial Rollers, General Plant Lubrication',
        'Standards & specs: NLGI 2 | Lithium Base | Drop Point 190°C',
      ],
      specsText: 'NLGI 2 | Lithium Base | Drop Point 190°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Lithium Base | Drop Point 190°C',
        },
        {
          property: 'Primary Applications',
          value: 'Electric Motor Bearings, Industrial Rollers, General Plant Lubrication',
        },
        {
          property: 'Standard Packaging Options',
          value: '1kg, 5kg, 18kg Pail, 180kg Barrel',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 110,
    },
    {
      name: 'HP AP3 Grease',
      slug: 'hp-ap3-grease',
      subtitle: 'HP Lubricants • Greases',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'High shear resistance grease designed specifically for automotive wheel bearings and heavy industrial shaft collars.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Commercial Truck Wheel Bearings, Textile Machinery, Farm Equipment',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 3 | Premium Lithium Soap | Drop Point 195°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 500g / 1kg / 3kg / 18kg Pail / 180kg Drum',
        'Application areas: Commercial Truck Wheel Bearings, Textile Machinery, Farm Equipment',
        'Standards & specs: NLGI 3 | Premium Lithium Soap | Drop Point 195°C',
      ],
      specsText: 'NLGI 3 | Premium Lithium Soap | Drop Point 195°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 3 | Premium Lithium Soap | Drop Point 195°C',
        },
        {
          property: 'Primary Applications',
          value: 'Commercial Truck Wheel Bearings, Textile Machinery, Farm Equipment',
        },
        {
          property: 'Standard Packaging Options',
          value: '500g, 1kg, 3kg, 18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 111,
    },
    {
      name: 'HP High Temp Complex EP Grease',
      slug: 'hp-high-temp-grease',
      subtitle: 'HP Lubricants • Greases',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'High drop point extreme-pressure grease formulated for continuous operation in furnace cars, asphalt dryers, and steel plants.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Furnace Rollers, Cement Kiln Exhaust Fans, Continuous Casters',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Lithium Complex EP | Drop Point >260°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Furnace Rollers, Cement Kiln Exhaust Fans, Continuous Casters',
        'Standards & specs: NLGI 2 | Lithium Complex EP | Drop Point >260°C',
      ],
      specsText: 'NLGI 2 | Lithium Complex EP | Drop Point >260°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Lithium Complex EP | Drop Point >260°C',
        },
        {
          property: 'Primary Applications',
          value: 'Furnace Rollers, Cement Kiln Exhaust Fans, Continuous Casters',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 112,
    },
    {
      name: 'HP Turbinol 46',
      slug: 'hp-turbinol-46',
      subtitle: 'HP Lubricants • Industrial Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Industrial Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Inhibited steam and gas turbine oil offering exceptional oxidation resistance and rapid air release.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Power Plant Turbines, Centrifugal Compressors, Heavy Hydro Plants',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 46 | DIN 51515 Part 1 (L-TD) | GE GEK 32568.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 210L Refinery Barrel / Bulk Tanker',
        'Application areas: Power Plant Turbines, Centrifugal Compressors, Heavy Hydro Plants',
        'Standards & specs: ISO VG 46 | DIN 51515 Part 1 (L-TD) | GE GEK 32568',
      ],
      specsText: 'ISO VG 46 | DIN 51515 Part 1 (L-TD) | GE GEK 32568',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Industrial Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 46 | DIN 51515 Part 1 (L-TD) | GE GEK 32568',
        },
        {
          property: 'Primary Applications',
          value: 'Power Plant Turbines, Centrifugal Compressors, Heavy Hydro Plants',
        },
        {
          property: 'Standard Packaging Options',
          value: '210L Refinery Barrel, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 113,
    },
    {
      name: 'HP Compressor Oil 68',
      slug: 'hp-compressor-68',
      subtitle: 'HP Lubricants • Industrial Oils',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Industrial Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Severe duty reciprocating and screw air compressor oil designed to prevent carbon valve build-up.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Reciprocating Air Compressors, Rotary Screw Compressors',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 68 | DIN 51506 VDL | Low Carbon Residue.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 20L Bucket / 210L Drum',
        'Application areas: Reciprocating Air Compressors, Rotary Screw Compressors',
        'Standards & specs: ISO VG 68 | DIN 51506 VDL | Low Carbon Residue',
      ],
      specsText: 'ISO VG 68 | DIN 51506 VDL | Low Carbon Residue',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Industrial Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 68 | DIN 51506 VDL | Low Carbon Residue',
        },
        {
          property: 'Primary Applications',
          value: 'Reciprocating Air Compressors, Rotary Screw Compressors',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 114,
    },
    {
      name: 'HP Transformer Oil 60',
      slug: 'hp-transformer-oil-60',
      subtitle: 'HP Lubricants • Specialty Products',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Specialty Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Uninhibited mineral insulating electrical oil with superior cooling properties and low dielectric dissipation factor.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'High Voltage Transformers, Switchgear, Circuit Breakers',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting IEC 60296 | IS:335 | High Breakdown Voltage >60 kV.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 210L Sealed Refinery Drum / Dedicated Tanker Delivery',
        'Application areas: High Voltage Transformers, Switchgear, Circuit Breakers',
        'Standards & specs: IEC 60296 | IS:335 | High Breakdown Voltage >60 kV',
      ],
      specsText: 'IEC 60296 | IS:335 | High Breakdown Voltage >60 kV',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Specialty Products',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'IEC 60296 | IS:335 | High Breakdown Voltage >60 kV',
        },
        {
          property: 'Primary Applications',
          value: 'High Voltage Transformers, Switchgear, Circuit Breakers',
        },
        {
          property: 'Standard Packaging Options',
          value: '210L Sealed Refinery Drum, Dedicated Tanker Delivery',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 115,
    },
    {
      name: 'HP Thermic Fluid 32',
      slug: 'hp-thermic-fluid-32',
      subtitle: 'HP Lubricants • Specialty Products',
      categorySlug: 'hp-lubricants',
      categoryName: 'HP Lubricants',
      subCategoryTitle: 'Specialty Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Mineral based circulating heat transfer fluid designed to resist cracking and thermal sludge formation in closed heat systems.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Textile Processing, Chemical Reactors, Plywood Presses',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 32 | High Bulk Thermal Stability to 300°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by HP Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from HP Lubricants',
        'Packaging sizes: 210L Drum / Bulk Delivery',
        'Application areas: Textile Processing, Chemical Reactors, Plywood Presses',
        'Standards & specs: ISO VG 32 | High Bulk Thermal Stability to 300°C',
      ],
      specsText: 'ISO VG 32 | High Bulk Thermal Stability to 300°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'HP Lubricants',
        },
        {
          property: 'Category',
          value: 'Specialty Products',
        },
        {
          property: 'Origin / Status',
          value: 'India (HQ) (Authorized Industrial Partner)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 32 | High Bulk Thermal Stability to 300°C',
        },
        {
          property: 'Primary Applications',
          value: 'Textile Processing, Chemical Reactors, Plywood Presses',
        },
        {
          property: 'Standard Packaging Options',
          value: '210L Drum, Bulk Delivery',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 116,
    },
    {
      name: 'Valvoline SynPower 5W-40',
      slug: 'valvoline-synpower-5w40',
      subtitle: 'Valvoline • Automotive Lubricants',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Automotive Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Advanced full synthetic passenger car engine oil delivering maximum thermal breakdown protection.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Turbocharged Gasoline Engines, European Passenger Cars',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API SP / SN Plus | ACEA A3/B4 | Full Synthetic.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 1L / 4L / 210L Drum',
        'Application areas: Turbocharged Gasoline Engines, European Passenger Cars',
        'Standards & specs: API SP / SN Plus | ACEA A3/B4 | Full Synthetic',
      ],
      specsText: 'API SP / SN Plus | ACEA A3/B4 | Full Synthetic',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Automotive Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API SP / SN Plus | ACEA A3/B4 | Full Synthetic',
        },
        {
          property: 'Primary Applications',
          value: 'Turbocharged Gasoline Engines, European Passenger Cars',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 4L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 117,
    },
    {
      name: 'Valvoline All-Climate 20W-50',
      slug: 'valvoline-all-climate-20w50',
      subtitle: 'Valvoline • Automotive Lubricants',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Automotive Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description:
        'High viscosity mineral engine oil providing thick protective film under high ambient heat.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Commercial Taxis, Heavy Duty Utility Vehicles',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API SL/CF | Multi-Grade Engine Protection.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 1L / 5L / 50L / 210L Drum',
        'Application areas: Commercial Taxis, Heavy Duty Utility Vehicles',
        'Standards & specs: API SL/CF | Multi-Grade Engine Protection',
      ],
      specsText: 'API SL/CF | Multi-Grade Engine Protection',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Automotive Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API SL/CF | Multi-Grade Engine Protection',
        },
        {
          property: 'Primary Applications',
          value: 'Commercial Taxis, Heavy Duty Utility Vehicles',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 5L, 50L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 118,
    },
    {
      name: 'Valvoline Premium Blue 15W-40',
      slug: 'valvoline-premium-blue-15w40',
      subtitle: 'Valvoline • Commercial Vehicle Lubricants',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Commercial Vehicle Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description:
        'Exclusively endorsed by Cummins, offering extended drain intervals and superior oxidation resistance.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Cummins Diesel Engines, Highway Fleets, Mining Haulers',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Cummins CES 20086 | API CK-4 / CJ-4 | SAE 15W-40.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 7.5L / 15L / 50L / 210L Drum',
        'Application areas: Cummins Diesel Engines, Highway Fleets, Mining Haulers',
        'Standards & specs: Cummins CES 20086 | API CK-4 / CJ-4 | SAE 15W-40',
      ],
      specsText: 'Cummins CES 20086 | API CK-4 / CJ-4 | SAE 15W-40',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Commercial Vehicle Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Cummins CES 20086 | API CK-4 / CJ-4 | SAE 15W-40',
        },
        {
          property: 'Primary Applications',
          value: 'Cummins Diesel Engines, Highway Fleets, Mining Haulers',
        },
        {
          property: 'Standard Packaging Options',
          value: '7.5L, 15L, 50L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 119,
    },
    {
      name: 'Valvoline All-Fleet Extra 15W-40',
      slug: 'valvoline-all-fleet-extra',
      subtitle: 'Valvoline • Commercial Vehicle Lubricants',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Commercial Vehicle Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Engineered for high-mileage heavy commercial vehicles operating in severe road conditions.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Heavy Buses, Multi-Axle Trucks, Excavators',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API CI-4 / CH-4 | Volvo VDS-3 | MB 228.3.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 10L / 20L / 210L Drum',
        'Application areas: Heavy Buses, Multi-Axle Trucks, Excavators',
        'Standards & specs: API CI-4 / CH-4 | Volvo VDS-3 | MB 228.3',
      ],
      specsText: 'API CI-4 / CH-4 | Volvo VDS-3 | MB 228.3',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Commercial Vehicle Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API CI-4 / CH-4 | Volvo VDS-3 | MB 228.3',
        },
        {
          property: 'Primary Applications',
          value: 'Heavy Buses, Multi-Axle Trucks, Excavators',
        },
        {
          property: 'Standard Packaging Options',
          value: '10L, 20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 120,
    },
    {
      name: 'Valvoline GEO LA 40',
      slug: 'valvoline-geo-40',
      subtitle: 'Valvoline • Industrial Lubricants',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Formulated for high-output natural gas and biogas stationary industrial engines.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Power Cogeneration Plants, Landfill Gas Gensets',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Low Ash Stationary Gas Engine Oil | SAE 40.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 208L Drum / Bulk Tanker',
        'Application areas: Power Cogeneration Plants, Landfill Gas Gensets',
        'Standards & specs: Low Ash Stationary Gas Engine Oil | SAE 40',
      ],
      specsText: 'Low Ash Stationary Gas Engine Oil | SAE 40',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Low Ash Stationary Gas Engine Oil | SAE 40',
        },
        {
          property: 'Primary Applications',
          value: 'Power Cogeneration Plants, Landfill Gas Gensets',
        },
        {
          property: 'Standard Packaging Options',
          value: '208L Drum, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 121,
    },
    {
      name: 'Valvoline Crimson EP 2',
      slug: 'valvoline-crimson-ep2',
      subtitle: 'Valvoline • Greases',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Tacky extreme-pressure grease engineered for severe wash-off conditions and vibrating screens.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Mining Conveyors, Excavator Pivot Pins, Marine Terminals',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Calcium Sulfonate Complex | High Water Washout.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Mining Conveyors, Excavator Pivot Pins, Marine Terminals',
        'Standards & specs: NLGI 2 | Calcium Sulfonate Complex | High Water Washout',
      ],
      specsText: 'NLGI 2 | Calcium Sulfonate Complex | High Water Washout',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Calcium Sulfonate Complex | High Water Washout',
        },
        {
          property: 'Primary Applications',
          value: 'Mining Conveyors, Excavator Pivot Pins, Marine Terminals',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 122,
    },
    {
      name: 'Valvoline ZEREX HD Extended Life Coolant',
      slug: 'valvoline-zerex-hd-coolant',
      subtitle: 'Valvoline • Specialty Products',
      categorySlug: 'valvoline',
      categoryName: 'Valvoline',
      subCategoryTitle: 'Specialty Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Protects heavy diesel engine cylinder liners against cavitation and pitting for up to 1,000,000 km.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Heavy Diesel Cooling Systems, Industrial Gensets',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Organic Acid Technology (OAT) | ASTM D6210.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Valvoline.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Valvoline',
        'Packaging sizes: 5L / 20L / 210L Drum',
        'Application areas: Heavy Diesel Cooling Systems, Industrial Gensets',
        'Standards & specs: Organic Acid Technology (OAT) | ASTM D6210',
      ],
      specsText: 'Organic Acid Technology (OAT) | ASTM D6210',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Valvoline',
        },
        {
          property: 'Category',
          value: 'Specialty Products',
        },
        {
          property: 'Origin / Status',
          value: 'United States (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Organic Acid Technology (OAT) | ASTM D6210',
        },
        {
          property: 'Primary Applications',
          value: 'Heavy Diesel Cooling Systems, Industrial Gensets',
        },
        {
          property: 'Standard Packaging Options',
          value: '5L, 20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 123,
    },
    {
      name: 'Kixx PAO 1 0W-30',
      slug: 'kixx-pao-1-0w30',
      subtitle: 'GS Caltex • Automotive Lubricants',
      categorySlug: 'gs-caltex',
      categoryName: 'GS Caltex',
      subCategoryTitle: 'Automotive Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Top-tier polyalphaolefin synthetic oil for ultra-low friction and high thermal stability.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'High-End Performance Vehicles, Direct Injection Engines',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting 100% PAO Synthetic | API SP | ACEA C2/C3.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by GS Caltex.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from GS Caltex',
        'Packaging sizes: 1L / 4L Can / 200L Drum',
        'Application areas: High-End Performance Vehicles, Direct Injection Engines',
        'Standards & specs: 100% PAO Synthetic | API SP | ACEA C2/C3',
      ],
      specsText: '100% PAO Synthetic | API SP | ACEA C2/C3',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'GS Caltex',
        },
        {
          property: 'Category',
          value: 'Automotive Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'South Korea (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: '100% PAO Synthetic | API SP | ACEA C2/C3',
        },
        {
          property: 'Primary Applications',
          value: 'High-End Performance Vehicles, Direct Injection Engines',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 4L Can, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 124,
    },
    {
      name: 'Kixx HDX CK-4 15W-40',
      slug: 'kixx-hdx-ck4',
      subtitle: 'GS Caltex • Automotive Lubricants',
      categorySlug: 'gs-caltex',
      categoryName: 'GS Caltex',
      subCategoryTitle: 'Automotive Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description: 'Low-SAPS heavy duty diesel engine oil preserving particulate filters (DPF).',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Euro VI Fleets, Heavy Construction Equipment',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API CK-4 / CJ-4 | Volvo VDS-4.5 | Cummins CES 20086.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by GS Caltex.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from GS Caltex',
        'Packaging sizes: 15L / 20L / 200L Drum',
        'Application areas: Euro VI Fleets, Heavy Construction Equipment',
        'Standards & specs: API CK-4 / CJ-4 | Volvo VDS-4.5 | Cummins CES 20086',
      ],
      specsText: 'API CK-4 / CJ-4 | Volvo VDS-4.5 | Cummins CES 20086',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'GS Caltex',
        },
        {
          property: 'Category',
          value: 'Automotive Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'South Korea (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API CK-4 / CJ-4 | Volvo VDS-4.5 | Cummins CES 20086',
        },
        {
          property: 'Primary Applications',
          value: 'Euro VI Fleets, Heavy Construction Equipment',
        },
        {
          property: 'Standard Packaging Options',
          value: '15L, 20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 125,
    },
    {
      name: 'GS Hydro HD 68',
      slug: 'gs-hydro-hd-68',
      subtitle: 'GS Caltex • Industrial Lubricants',
      categorySlug: 'gs-caltex',
      categoryName: 'GS Caltex',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'High anti-wear hydraulic oil providing rapid air release and exceptional thermal stability.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Industrial Hydraulic Systems, Precision Presses',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 68 | DIN 51524 Part 2 | Denison HF-0.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by GS Caltex.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from GS Caltex',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: Industrial Hydraulic Systems, Precision Presses',
        'Standards & specs: ISO VG 68 | DIN 51524 Part 2 | Denison HF-0',
      ],
      specsText: 'ISO VG 68 | DIN 51524 Part 2 | Denison HF-0',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'GS Caltex',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'South Korea (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 68 | DIN 51524 Part 2 | Denison HF-0',
        },
        {
          property: 'Primary Applications',
          value: 'Industrial Hydraulic Systems, Precision Presses',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 126,
    },
    {
      name: 'GS Golden Pearl EP 2',
      slug: 'gs-golden-pearl-ep2',
      subtitle: 'GS Caltex • Greases',
      categorySlug: 'gs-caltex',
      categoryName: 'GS Caltex',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Heavy multi-purpose grease offering high shear endurance and anti-rust protection.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Heavy Industrial Bearings, Truck Chassis',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Premium Lithium EP | High Drop Point.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by GS Caltex.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from GS Caltex',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Heavy Industrial Bearings, Truck Chassis',
        'Standards & specs: NLGI 2 | Premium Lithium EP | High Drop Point',
      ],
      specsText: 'NLGI 2 | Premium Lithium EP | High Drop Point',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'GS Caltex',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'South Korea (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Premium Lithium EP | High Drop Point',
        },
        {
          property: 'Primary Applications',
          value: 'Heavy Industrial Bearings, Truck Chassis',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 127,
    },
    {
      name: 'GS Thermic Heat Transfer Oil 32',
      slug: 'gs-thermic-32',
      subtitle: 'GS Caltex • Specialty Lubricants',
      categorySlug: 'gs-caltex',
      categoryName: 'GS Caltex',
      subCategoryTitle: 'Specialty Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Synthetic based heat transfer fluid preventing carbon fouling in thermal boiler circuits.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Industrial Heaters, Chemical Reactors',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 32 | Operating Temp to 310°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by GS Caltex.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from GS Caltex',
        'Packaging sizes: 200L Drum / Bulk Tanker',
        'Application areas: Industrial Heaters, Chemical Reactors',
        'Standards & specs: ISO VG 32 | Operating Temp to 310°C',
      ],
      specsText: 'ISO VG 32 | Operating Temp to 310°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'GS Caltex',
        },
        {
          property: 'Category',
          value: 'Specialty Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'South Korea (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 32 | Operating Temp to 310°C',
        },
        {
          property: 'Primary Applications',
          value: 'Industrial Heaters, Chemical Reactors',
        },
        {
          property: 'Standard Packaging Options',
          value: '200L Drum, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 128,
    },
    {
      name: 'Idemitsu IFG7 0W-20',
      slug: 'idemitsu-ifg7-0w20',
      subtitle: 'Idemitsu • Automotive Lubricants',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Automotive Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Ultra-low viscosity Japanese OEM synthetic motor oil delivering high thermal response.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Japanese OEM Cars, Hybrid Vehicles',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API SP | ILSAC GF-6A | Nano-Tailored Synthetic.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 1L / 3.5L / 200L Drum',
        'Application areas: Japanese OEM Cars, Hybrid Vehicles',
        'Standards & specs: API SP | ILSAC GF-6A | Nano-Tailored Synthetic',
      ],
      specsText: 'API SP | ILSAC GF-6A | Nano-Tailored Synthetic',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Automotive Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API SP | ILSAC GF-6A | Nano-Tailored Synthetic',
        },
        {
          property: 'Primary Applications',
          value: 'Japanese OEM Cars, Hybrid Vehicles',
        },
        {
          property: 'Standard Packaging Options',
          value: '1L, 3.5L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 129,
    },
    {
      name: 'Daphne Super Spindle Oil 2',
      slug: 'daphne-super-spindle-2',
      subtitle: 'Idemitsu • Industrial Lubricants',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Formulated for ultra-high-speed CNC grinding and milling spindles exceeding 30,000 RPM.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'High-Speed CNC Spindles, Precision Internal Grinders',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Viscosity 2 cSt @ 40°C | Ultra-Low Friction.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 20L Can / 200L Drum',
        'Application areas: High-Speed CNC Spindles, Precision Internal Grinders',
        'Standards & specs: Viscosity 2 cSt @ 40°C | Ultra-Low Friction',
      ],
      specsText: 'Viscosity 2 cSt @ 40°C | Ultra-Low Friction',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Viscosity 2 cSt @ 40°C | Ultra-Low Friction',
        },
        {
          property: 'Primary Applications',
          value: 'High-Speed CNC Spindles, Precision Internal Grinders',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Can, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 130,
    },
    {
      name: 'Daphne Super Gear Oil 220',
      slug: 'daphne-super-gear-220',
      subtitle: 'Idemitsu • Gear Oils',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Gear Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Precision Japanese industrial gear oil preventing micro-pitting under repetitive reverse torque.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Machine Tool Gearboxes, Robotic Drive Joints',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 220 | High EP | Sludge Resistant.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: Machine Tool Gearboxes, Robotic Drive Joints',
        'Standards & specs: ISO VG 220 | High EP | Sludge Resistant',
      ],
      specsText: 'ISO VG 220 | High EP | Sludge Resistant',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Gear Oils',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 220 | High EP | Sludge Resistant',
        },
        {
          property: 'Primary Applications',
          value: 'Machine Tool Gearboxes, Robotic Drive Joints',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 131,
    },
    {
      name: 'Daphne Super Hydro 46A',
      slug: 'daphne-super-hydro-46a',
      subtitle: 'Idemitsu • Hydraulic Oils',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Hydraulic Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Eliminates copper corrosion and valve sticking in electro-hydraulic servo machine tools.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Electro-Hydraulic Servo Systems, Plastic Injection Machines',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 46 | Ashless Non-Zinc | Long Drain.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: Electro-Hydraulic Servo Systems, Plastic Injection Machines',
        'Standards & specs: ISO VG 46 | Ashless Non-Zinc | Long Drain',
      ],
      specsText: 'ISO VG 46 | Ashless Non-Zinc | Long Drain',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Hydraulic Oils',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 46 | Ashless Non-Zinc | Long Drain',
        },
        {
          property: 'Primary Applications',
          value: 'Electro-Hydraulic Servo Systems, Plastic Injection Machines',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 132,
    },
    {
      name: 'Daphne Eponex Grease EP 2',
      slug: 'daphne-eponex-ep2',
      subtitle: 'Idemitsu • Greases',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'High-speed precision bearing grease with 3x longer life than conventional lithium soaps.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Precision Machine Tool Bearings, Robotic Linear Guides',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Polyurea Thickener | Drop Point 260°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 16kg Pail / 180kg Drum',
        'Application areas: Precision Machine Tool Bearings, Robotic Linear Guides',
        'Standards & specs: NLGI 2 | Polyurea Thickener | Drop Point 260°C',
      ],
      specsText: 'NLGI 2 | Polyurea Thickener | Drop Point 260°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Polyurea Thickener | Drop Point 260°C',
        },
        {
          property: 'Primary Applications',
          value: 'Precision Machine Tool Bearings, Robotic Linear Guides',
        },
        {
          property: 'Standard Packaging Options',
          value: '16kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 133,
    },
    {
      name: 'Daphne Cut Dielectric EDM Fluid',
      slug: 'daphne-dielectric-cut-68',
      subtitle: 'Idemitsu • Specialty Products',
      categorySlug: 'idemitsu',
      categoryName: 'Idemitsu',
      subCategoryTitle: 'Specialty Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description: 'Specialized dielectric fluid for spark erosion electrical discharge machines.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'CNC Sinker EDM Machines, Die & Mold Spark Erosion',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Synthetic Dielectric | Odorless | High Flash Point.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Idemitsu.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Idemitsu',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: CNC Sinker EDM Machines, Die & Mold Spark Erosion',
        'Standards & specs: Synthetic Dielectric | Odorless | High Flash Point',
      ],
      specsText: 'Synthetic Dielectric | Odorless | High Flash Point',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Idemitsu',
        },
        {
          property: 'Category',
          value: 'Specialty Products',
        },
        {
          property: 'Origin / Status',
          value: 'Japan (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Synthetic Dielectric | Odorless | High Flash Point',
        },
        {
          property: 'Primary Applications',
          value: 'CNC Sinker EDM Machines, Die & Mold Spark Erosion',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 134,
    },
    {
      name: 'Molylube Ultra High Temp Chain Oil',
      slug: 'molylube-chain-oil-280',
      subtitle: 'Molygraph Lubricants • Industrial Lubricants',
      categorySlug: 'molygraph-lubricants',
      categoryName: 'Molygraph Lubricants',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Synthetic ester chain lubricant that does not produce carbon varnishing in paint ovens and stenters.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Paint Shop Conveyors, Textile Stenter Chains, Glass Annealing',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Operating Temp to 280°C | Zero Residue Synthetic.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Molygraph Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Molygraph Lubricants',
        'Packaging sizes: 20L Bucket / 210L Drum',
        'Application areas: Paint Shop Conveyors, Textile Stenter Chains, Glass Annealing',
        'Standards & specs: Operating Temp to 280°C | Zero Residue Synthetic',
      ],
      specsText: 'Operating Temp to 280°C | Zero Residue Synthetic',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Molygraph Lubricants',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Operating Temp to 280°C | Zero Residue Synthetic',
        },
        {
          property: 'Primary Applications',
          value: 'Paint Shop Conveyors, Textile Stenter Chains, Glass Annealing',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 135,
    },
    {
      name: 'Molylube Open Gear Sprayable Compound',
      slug: 'molylube-open-gear-1000',
      subtitle: 'Molygraph Lubricants • Specialty Lubricants',
      categorySlug: 'molygraph-lubricants',
      categoryName: 'Molygraph Lubricants',
      subCategoryTitle: 'Specialty Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description: 'Sprayable open girth gear lubricant for rotary cement kilns and ball mills.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Cement Kiln Girth Gears, Sugar Mill Drives',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Asphalt-Free | Extreme Pressure Solid MoS2 Package.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Molygraph Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Molygraph Lubricants',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Cement Kiln Girth Gears, Sugar Mill Drives',
        'Standards & specs: Asphalt-Free | Extreme Pressure Solid MoS2 Package',
      ],
      specsText: 'Asphalt-Free | Extreme Pressure Solid MoS2 Package',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Molygraph Lubricants',
        },
        {
          property: 'Category',
          value: 'Specialty Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Asphalt-Free | Extreme Pressure Solid MoS2 Package',
        },
        {
          property: 'Primary Applications',
          value: 'Cement Kiln Girth Gears, Sugar Mill Drives',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 136,
    },
    {
      name: 'Molygraph Superlube 2000',
      slug: 'molygraph-superlube-2000',
      subtitle: 'Molygraph Lubricants • Greases',
      categorySlug: 'molygraph-lubricants',
      categoryName: 'Molygraph Lubricants',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Resists extreme shock loading, chemical exposure, and water flooding in rolling mills.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Steel Rolling Mills, Continuous Casters, Mining Wash Plants',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Calcium Sulfonate Complex | 4-Ball Weld >600 kg.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Molygraph Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Molygraph Lubricants',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Steel Rolling Mills, Continuous Casters, Mining Wash Plants',
        'Standards & specs: NLGI 2 | Calcium Sulfonate Complex | 4-Ball Weld >600 kg',
      ],
      specsText: 'NLGI 2 | Calcium Sulfonate Complex | 4-Ball Weld >600 kg',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Molygraph Lubricants',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Calcium Sulfonate Complex | 4-Ball Weld >600 kg',
        },
        {
          property: 'Primary Applications',
          value: 'Steel Rolling Mills, Continuous Casters, Mining Wash Plants',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 137,
    },
    {
      name: 'Molygraph Formchem 50 Drawing Oil',
      slug: 'molygraph-formchem-50',
      subtitle: 'Molygraph Lubricants • Metalworking Fluids',
      categorySlug: 'molygraph-lubricants',
      categoryName: 'Molygraph Lubricants',
      subCategoryTitle: 'Metalworking Fluids',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Prevents die scoring and galling in severe deep drawing and heavy gauge sheet stamping.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Automotive Body Panel Stamping, Deep Drawing Presses',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Chlorine-Free EP Lubricant | Water Washable.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Molygraph Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Molygraph Lubricants',
        'Packaging sizes: 20L / 210L Drum',
        'Application areas: Automotive Body Panel Stamping, Deep Drawing Presses',
        'Standards & specs: Chlorine-Free EP Lubricant | Water Washable',
      ],
      specsText: 'Chlorine-Free EP Lubricant | Water Washable',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Molygraph Lubricants',
        },
        {
          property: 'Category',
          value: 'Metalworking Fluids',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Chlorine-Free EP Lubricant | Water Washable',
        },
        {
          property: 'Primary Applications',
          value: 'Automotive Body Panel Stamping, Deep Drawing Presses',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 138,
    },
    {
      name: 'Molygraph Kopal 1000 Copper Anti-Seize',
      slug: 'molygraph-kopal-1000',
      subtitle: 'Molygraph Lubricants • Assembly & Maintenance Products',
      categorySlug: 'molygraph-lubricants',
      categoryName: 'Molygraph Lubricants',
      subCategoryTitle: 'Assembly & Maintenance Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Prevents thread galling, welding, and corrosion on high-heat turbine bolts and exhaust studs.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Turbine Casing Studs, Furnace Flanges, Exhaust Manifolds',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Operating Temp to 1100°C | Lead-Free.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Molygraph Lubricants.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Molygraph Lubricants',
        'Packaging sizes: 500g Tin / 1kg / 5kg / 20kg Pail',
        'Application areas: Turbine Casing Studs, Furnace Flanges, Exhaust Manifolds',
        'Standards & specs: Operating Temp to 1100°C | Lead-Free',
      ],
      specsText: 'Operating Temp to 1100°C | Lead-Free',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Molygraph Lubricants',
        },
        {
          property: 'Category',
          value: 'Assembly & Maintenance Products',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Operating Temp to 1100°C | Lead-Free',
        },
        {
          property: 'Primary Applications',
          value: 'Turbine Casing Studs, Furnace Flanges, Exhaust Manifolds',
        },
        {
          property: 'Standard Packaging Options',
          value: '500g Tin, 1kg, 5kg, 20kg Pail',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 139,
    },
    {
      name: 'MotulTech Supracool 9620',
      slug: 'supracool-9620',
      subtitle: 'Motul Tech • Metalworking Fluids',
      categorySlug: 'motul-tech',
      categoryName: 'Motul Tech',
      subCategoryTitle: 'Metalworking Fluids',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Long-life machining emulsion delivering high tool lubricity on titanium, inconel, and stainless alloys.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Aerospace Multi-Axis CNC, High Pressure Through-Spindle Machining',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Bio-Stable Semi-Synthetic Coolant | Chlorine & Boron Free.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Motul Tech.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Motul Tech',
        'Packaging sizes: 20L / 208L Drum',
        'Application areas: Aerospace Multi-Axis CNC, High Pressure Through-Spindle Machining',
        'Standards & specs: Bio-Stable Semi-Synthetic Coolant | Chlorine & Boron Free',
      ],
      specsText: 'Bio-Stable Semi-Synthetic Coolant | Chlorine & Boron Free',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Motul Tech',
        },
        {
          property: 'Category',
          value: 'Metalworking Fluids',
        },
        {
          property: 'Origin / Status',
          value: 'France (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Bio-Stable Semi-Synthetic Coolant | Chlorine & Boron Free',
        },
        {
          property: 'Primary Applications',
          value: 'Aerospace Multi-Axis CNC, High Pressure Through-Spindle Machining',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 208L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 140,
    },
    {
      name: 'MotulTech Thermocool 32',
      slug: 'motultech-thermocool-32',
      subtitle: 'Motul Tech • Industrial Lubricants',
      categorySlug: 'motul-tech',
      categoryName: 'Motul Tech',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Resists thermal cracking and deposit formation in high-heat industrial circulation boilers.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Plastic Molding Heaters, Chemical Reactors',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 32 | High Thermal Stability to 320°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Motul Tech.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Motul Tech',
        'Packaging sizes: 208L Drum / Bulk Tanker',
        'Application areas: Plastic Molding Heaters, Chemical Reactors',
        'Standards & specs: ISO VG 32 | High Thermal Stability to 320°C',
      ],
      specsText: 'ISO VG 32 | High Thermal Stability to 320°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Motul Tech',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'France (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 32 | High Thermal Stability to 320°C',
        },
        {
          property: 'Primary Applications',
          value: 'Plastic Molding Heaters, Chemical Reactors',
        },
        {
          property: 'Standard Packaging Options',
          value: '208L Drum, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 141,
    },
    {
      name: 'MotulTech Thermogrease 300',
      slug: 'motultech-thermogrease-300',
      subtitle: 'Motul Tech • Greases',
      categorySlug: 'motul-tech',
      categoryName: 'Motul Tech',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description: 'Engineered for high-temperature furnace exhaust bearings and drying fans.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Furnace Fans, Asphalt Processing',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Synthetic Base | Operating Temp to 300°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Motul Tech.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Motul Tech',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Furnace Fans, Asphalt Processing',
        'Standards & specs: Synthetic Base | Operating Temp to 300°C',
      ],
      specsText: 'Synthetic Base | Operating Temp to 300°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Motul Tech',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'France (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Synthetic Base | Operating Temp to 300°C',
        },
        {
          property: 'Primary Applications',
          value: 'Furnace Fans, Asphalt Processing',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 142,
    },
    {
      name: 'MotulTech Severe Quench Oil 20',
      slug: 'motultech-thermocut-quench',
      subtitle: 'Motul Tech • Specialty Products',
      categorySlug: 'motul-tech',
      categoryName: 'Motul Tech',
      subCategoryTitle: 'Specialty Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Delivers maximum surface hardness without distortion during steel heat treatment.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Gear Tooth Hardening, Bearing Ring Quenching',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Accelerated Quench Speed | Low Drag-Out.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Motul Tech.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Motul Tech',
        'Packaging sizes: 208L Drum',
        'Application areas: Gear Tooth Hardening, Bearing Ring Quenching',
        'Standards & specs: Accelerated Quench Speed | Low Drag-Out',
      ],
      specsText: 'Accelerated Quench Speed | Low Drag-Out',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Motul Tech',
        },
        {
          property: 'Category',
          value: 'Specialty Products',
        },
        {
          property: 'Origin / Status',
          value: 'France (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Accelerated Quench Speed | Low Drag-Out',
        },
        {
          property: 'Primary Applications',
          value: 'Gear Tooth Hardening, Bearing Ring Quenching',
        },
        {
          property: 'Standard Packaging Options',
          value: '208L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 143,
    },
    {
      name: 'MotulTech Safco Clean Degreaser',
      slug: 'safco-clean-degreaser',
      subtitle: 'Motul Tech • Maintenance Solutions',
      categorySlug: 'motul-tech',
      categoryName: 'Motul Tech',
      subCategoryTitle: 'Maintenance Solutions',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Quick-drying degreasing solvent for machine tools and metal parts before painting.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Machine Shop Maintenance, Pre-Assembly Cleaning',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Zero-Residue Solvent | High Dielectric.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Motul Tech.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Motul Tech',
        'Packaging sizes: 20L Canister / 208L Drum',
        'Application areas: Machine Shop Maintenance, Pre-Assembly Cleaning',
        'Standards & specs: Zero-Residue Solvent | High Dielectric',
      ],
      specsText: 'Zero-Residue Solvent | High Dielectric',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Motul Tech',
        },
        {
          property: 'Category',
          value: 'Maintenance Solutions',
        },
        {
          property: 'Origin / Status',
          value: 'France (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Zero-Residue Solvent | High Dielectric',
        },
        {
          property: 'Primary Applications',
          value: 'Machine Shop Maintenance, Pre-Assembly Cleaning',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Canister, 208L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 144,
    },
    {
      name: 'Deep Rotary Screw Compressor 37 kW',
      slug: 'deep-screw-compressor-37kw',
      subtitle: 'Deep Pneumatics • Air Compressors',
      categorySlug: 'deep-pneumatics',
      categoryName: 'Deep Pneumatics',
      subCategoryTitle: 'Air Compressors',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Continuous duty direct-coupled industrial screw compressor with smart micro-processor control.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Manufacturing Plants, Textile Automation, Automotive Assembly',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting 37 kW (50 HP) | 215 CFM @ 8 Bar | Direct Drive.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Deep Pneumatics.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Deep Pneumatics',
        'Packaging sizes: Complete Unit',
        'Application areas: Manufacturing Plants, Textile Automation, Automotive Assembly',
        'Standards & specs: 37 kW (50 HP) | 215 CFM @ 8 Bar | Direct Drive',
      ],
      specsText: '37 kW (50 HP) | 215 CFM @ 8 Bar | Direct Drive',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Deep Pneumatics',
        },
        {
          property: 'Category',
          value: 'Air Compressors',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: '37 kW (50 HP) | 215 CFM @ 8 Bar | Direct Drive',
        },
        {
          property: 'Primary Applications',
          value: 'Manufacturing Plants, Textile Automation, Automotive Assembly',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Complete Unit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 145,
    },
    {
      name: 'Deep Industrial FRL Trio Combination',
      slug: 'deep-frl-trio',
      subtitle: 'Deep Pneumatics • Pneumatic Products',
      categorySlug: 'deep-pneumatics',
      categoryName: 'Deep Pneumatics',
      subCategoryTitle: 'Pneumatic Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Clean moisture separation, precise pressure regulation, and micro-fog lubrication for air tools.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Pneumatic Tool Lines, Machine Tool Air Prep',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting 1/2" to 1" Port | 5 Micron Filtration | Auto Drain.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Deep Pneumatics.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Deep Pneumatics',
        'Packaging sizes: Box Unit',
        'Application areas: Pneumatic Tool Lines, Machine Tool Air Prep',
        'Standards & specs: 1/2" to 1" Port | 5 Micron Filtration | Auto Drain',
      ],
      specsText: '1/2" to 1" Port | 5 Micron Filtration | Auto Drain',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Deep Pneumatics',
        },
        {
          property: 'Category',
          value: 'Pneumatic Products',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: '1/2" to 1" Port | 5 Micron Filtration | Auto Drain',
        },
        {
          property: 'Primary Applications',
          value: 'Pneumatic Tool Lines, Machine Tool Air Prep',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Box Unit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 146,
    },
    {
      name: 'Deep Refrigerated Air Dryer 150 CFM',
      slug: 'deep-ref-dryer-150',
      subtitle: 'Deep Pneumatics • Air Treatment Solutions',
      categorySlug: 'deep-pneumatics',
      categoryName: 'Deep Pneumatics',
      subCategoryTitle: 'Air Treatment Solutions',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description: 'Eliminates pipe condensation, rust, and water damage across factory air lines.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'CNC Machine Air Lines, Spray Painting Booths',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting +3°C Pressure Dew Point | R134a Eco Refrigerant.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Deep Pneumatics.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Deep Pneumatics',
        'Packaging sizes: Self-Contained Cabinet',
        'Application areas: CNC Machine Air Lines, Spray Painting Booths',
        'Standards & specs: +3°C Pressure Dew Point | R134a Eco Refrigerant',
      ],
      specsText: '+3°C Pressure Dew Point | R134a Eco Refrigerant',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Deep Pneumatics',
        },
        {
          property: 'Category',
          value: 'Air Treatment Solutions',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: '+3°C Pressure Dew Point | R134a Eco Refrigerant',
        },
        {
          property: 'Primary Applications',
          value: 'CNC Machine Air Lines, Spray Painting Booths',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Self-Contained Cabinet',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 147,
    },
    {
      name: 'Deep 1000L Vertical Air Receiver Tank',
      slug: 'deep-air-receiver-1000l',
      subtitle: 'Deep Pneumatics • Industrial Equipment',
      categorySlug: 'deep-pneumatics',
      categoryName: 'Deep Pneumatics',
      subCategoryTitle: 'Industrial Equipment',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Dampens compressor pulsations and acts as a surge storage tank for high-demand bursts.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Centralized Compressed Air Utility',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting 1000 Liters | 10 Bar Design Pressure | ASME Certified.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Deep Pneumatics.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Deep Pneumatics',
        'Packaging sizes: Vertical Vessel',
        'Application areas: Centralized Compressed Air Utility',
        'Standards & specs: 1000 Liters | 10 Bar Design Pressure | ASME Certified',
      ],
      specsText: '1000 Liters | 10 Bar Design Pressure | ASME Certified',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Deep Pneumatics',
        },
        {
          property: 'Category',
          value: 'Industrial Equipment',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: '1000 Liters | 10 Bar Design Pressure | ASME Certified',
        },
        {
          property: 'Primary Applications',
          value: 'Centralized Compressed Air Utility',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Vertical Vessel',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 148,
    },
    {
      name: 'Deep UltraSynthec 8000h Compressor Oil',
      slug: 'deep-synthec-8000h',
      subtitle: 'Deep Pneumatics • Compressor Lubricants',
      categorySlug: 'deep-pneumatics',
      categoryName: 'Deep Pneumatics',
      subCategoryTitle: 'Compressor Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Prevents varnish and carbon sludge in high-temperature rotary screw compressors.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Rotary Screw Air Compressors, Continuous Duty Vane Units',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 46 | 100% PAO Synthetic | 8000 Operating Hours.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Deep Pneumatics.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Deep Pneumatics',
        'Packaging sizes: 20L Bucket / 210L Drum',
        'Application areas: Rotary Screw Air Compressors, Continuous Duty Vane Units',
        'Standards & specs: ISO VG 46 | 100% PAO Synthetic | 8000 Operating Hours',
      ],
      specsText: 'ISO VG 46 | 100% PAO Synthetic | 8000 Operating Hours',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Deep Pneumatics',
        },
        {
          property: 'Category',
          value: 'Compressor Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 46 | 100% PAO Synthetic | 8000 Operating Hours',
        },
        {
          property: 'Primary Applications',
          value: 'Rotary Screw Air Compressors, Continuous Duty Vane Units',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 149,
    },
    {
      name: 'Lubricon Fleet Master 15W-40',
      slug: 'lubricon-fleet-15w40',
      subtitle: 'Lubricon • Engine Oils',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Engine Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675213/jaideva/products/engine-oil-bottles.jpg',
      descriptionTitle: 'Description',

      description:
        'Multi-grade commercial diesel fluid designed for heavy transport and off-road engines.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Commercial Fleet Vehicles, Industrial Tractors',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting API CI-4 / SL | Heavy Fleet Protection.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 20L / 210L Drum',
        'Application areas: Commercial Fleet Vehicles, Industrial Tractors',
        'Standards & specs: API CI-4 / SL | Heavy Fleet Protection',
      ],
      specsText: 'API CI-4 / SL | Heavy Fleet Protection',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Engine Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'API CI-4 / SL | Heavy Fleet Protection',
        },
        {
          property: 'Primary Applications',
          value: 'Commercial Fleet Vehicles, Industrial Tractors',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 150,
    },
    {
      name: 'Lubricon Industrial Gear EP 220',
      slug: 'lubricon-gear-ep-220',
      subtitle: 'Lubricon • Gear Oils',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Gear Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Heavy anti-scuff industrial gear fluid for enclosed helical and bevel gearboxes.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Industrial Gearboxes, Crusher Drives',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 220 | High EP | DIN 51517 Part 3.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 20L / 210L Drum',
        'Application areas: Industrial Gearboxes, Crusher Drives',
        'Standards & specs: ISO VG 220 | High EP | DIN 51517 Part 3',
      ],
      specsText: 'ISO VG 220 | High EP | DIN 51517 Part 3',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Gear Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 220 | High EP | DIN 51517 Part 3',
        },
        {
          property: 'Primary Applications',
          value: 'Industrial Gearboxes, Crusher Drives',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 151,
    },
    {
      name: 'Lubricon Hydro AW 68',
      slug: 'lubricon-hydro-68',
      subtitle: 'Lubricon • Hydraulic Oils',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Hydraulic Oils',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description: 'High anti-wear hydraulic oil for heavy duty industrial pumps and presses.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Hydraulic Machinery, Die Casting Machines',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 68 | Anti-Wear | DIN 51524 Part 2.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 20L / 210L Drum',
        'Application areas: Hydraulic Machinery, Die Casting Machines',
        'Standards & specs: ISO VG 68 | Anti-Wear | DIN 51524 Part 2',
      ],
      specsText: 'ISO VG 68 | Anti-Wear | DIN 51524 Part 2',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Hydraulic Oils',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 68 | Anti-Wear | DIN 51524 Part 2',
        },
        {
          property: 'Primary Applications',
          value: 'Hydraulic Machinery, Die Casting Machines',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 152,
    },
    {
      name: 'Lubricon Litho-Plex EP 2',
      slug: 'lubricon-lithoplex-2',
      subtitle: 'Lubricon • Greases',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Greases',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'General plant multi-purpose grease offering high shear endurance under heavy vibration.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Conveyor Bearings, Industrial Rollers',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting NLGI 2 | Lithium Complex Soap | High Drop Point.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 18kg Pail / 180kg Drum',
        'Application areas: Conveyor Bearings, Industrial Rollers',
        'Standards & specs: NLGI 2 | Lithium Complex Soap | High Drop Point',
      ],
      specsText: 'NLGI 2 | Lithium Complex Soap | High Drop Point',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Greases',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'NLGI 2 | Lithium Complex Soap | High Drop Point',
        },
        {
          property: 'Primary Applications',
          value: 'Conveyor Bearings, Industrial Rollers',
        },
        {
          property: 'Standard Packaging Options',
          value: '18kg Pail, 180kg Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 153,
    },
    {
      name: 'Lubricon Thermol-300 Thermal Fluid',
      slug: 'lubricon-thermol-300',
      subtitle: 'Lubricon • Specialty Lubricants',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Specialty Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Mineral circulating heat transfer oil with high resistance to thermal degradation.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Industrial Process Heaters, Plywood Hot Presses',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Thermal Fluid | Operating Temp to 300°C.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 210L Drum / Bulk Tanker',
        'Application areas: Industrial Process Heaters, Plywood Hot Presses',
        'Standards & specs: Thermal Fluid | Operating Temp to 300°C',
      ],
      specsText: 'Thermal Fluid | Operating Temp to 300°C',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Specialty Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Thermal Fluid | Operating Temp to 300°C',
        },
        {
          property: 'Primary Applications',
          value: 'Industrial Process Heaters, Plywood Hot Presses',
        },
        {
          property: 'Standard Packaging Options',
          value: '210L Drum, Bulk Tanker',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 154,
    },
    {
      name: 'Lubricon Waylube ISO 68',
      slug: 'lubricon-waylube-68',
      subtitle: 'Lubricon • Industrial Lubricants',
      categorySlug: 'lubricon',
      categoryName: 'Lubricon',
      subCategoryTitle: 'Industrial Lubricants',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Eliminates jerky stick-slip motion on horizontal CNC machine tool ways and slides.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Horizontal CNC Lathes, Milling Machine Slideways',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting ISO VG 68 | Anti-Stick-Slip | DIN 51502 CGLP.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Lubricon.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Lubricon',
        'Packaging sizes: 20L Bucket / 210L Drum',
        'Application areas: Horizontal CNC Lathes, Milling Machine Slideways',
        'Standards & specs: ISO VG 68 | Anti-Stick-Slip | DIN 51502 CGLP',
      ],
      specsText: 'ISO VG 68 | Anti-Stick-Slip | DIN 51502 CGLP',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Lubricon',
        },
        {
          property: 'Category',
          value: 'Industrial Lubricants',
        },
        {
          property: 'Origin / Status',
          value: 'India (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'ISO VG 68 | Anti-Stick-Slip | DIN 51502 CGLP',
        },
        {
          property: 'Primary Applications',
          value: 'Horizontal CNC Lathes, Milling Machine Slideways',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Bucket, 210L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 155,
    },
    {
      name: 'TW SolvClean 100 Industrial Degreaser',
      slug: 'tw-solvclean-100',
      subtitle: 'TW Chemin • Industrial Chemicals',
      categorySlug: 'tw-chemin',
      categoryName: 'TW Chemin',
      subCategoryTitle: 'Industrial Chemicals',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Removes stubborn machining oils, greases, and carbon deposits from metal parts.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Ultrasonic Wash Tanks, Pre-Assembly Cleaning',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Fast Evaporating | Zero Residue | Non-Corrosive.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by TW Chemin.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from TW Chemin',
        'Packaging sizes: 20L Can / 200L Drum',
        'Application areas: Ultrasonic Wash Tanks, Pre-Assembly Cleaning',
        'Standards & specs: Fast Evaporating | Zero Residue | Non-Corrosive',
      ],
      specsText: 'Fast Evaporating | Zero Residue | Non-Corrosive',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'TW Chemin',
        },
        {
          property: 'Category',
          value: 'Industrial Chemicals',
        },
        {
          property: 'Origin / Status',
          value: 'Germany (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Fast Evaporating | Zero Residue | Non-Corrosive',
        },
        {
          property: 'Primary Applications',
          value: 'Ultrasonic Wash Tanks, Pre-Assembly Cleaning',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L Can, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 156,
    },
    {
      name: 'TW CoolPro 500 Semi-Synthetic Coolant',
      slug: 'tw-coolpro-500',
      subtitle: 'TW Chemin • Lubrication Solutions',
      categorySlug: 'tw-chemin',
      categoryName: 'TW Chemin',
      subCategoryTitle: 'Lubrication Solutions',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'High performance cutting fluid designed for steel, cast iron, and aluminum alloys.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'CNC Milling & Turning, High Pressure Drilling',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Biostable Emulsion | Chlorine-Free | Anti-Foam.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by TW Chemin.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from TW Chemin',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: CNC Milling & Turning, High Pressure Drilling',
        'Standards & specs: Biostable Emulsion | Chlorine-Free | Anti-Foam',
      ],
      specsText: 'Biostable Emulsion | Chlorine-Free | Anti-Foam',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'TW Chemin',
        },
        {
          property: 'Category',
          value: 'Lubrication Solutions',
        },
        {
          property: 'Origin / Status',
          value: 'Germany (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Biostable Emulsion | Chlorine-Free | Anti-Foam',
        },
        {
          property: 'Primary Applications',
          value: 'CNC Milling & Turning, High Pressure Drilling',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 157,
    },
    {
      name: 'TW RustGuard Dewatering 200',
      slug: 'tw-rustguard-200',
      subtitle: 'TW Chemin • Specialty Chemicals',
      categorySlug: 'tw-chemin',
      categoryName: 'TW Chemin',
      subCategoryTitle: 'Specialty Chemicals',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Displaces water instantly from wet machined parts, leaving an anti-corrosion barrier.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Export Packaging, Intermediate Storage Parts',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Rapid Dewatering | Thin Oily Film | 12+ Months Protection.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by TW Chemin.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from TW Chemin',
        'Packaging sizes: 20L / 200L Drum',
        'Application areas: Export Packaging, Intermediate Storage Parts',
        'Standards & specs: Rapid Dewatering | Thin Oily Film | 12+ Months Protection',
      ],
      specsText: 'Rapid Dewatering | Thin Oily Film | 12+ Months Protection',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'TW Chemin',
        },
        {
          property: 'Category',
          value: 'Specialty Chemicals',
        },
        {
          property: 'Origin / Status',
          value: 'Germany (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Rapid Dewatering | Thin Oily Film | 12+ Months Protection',
        },
        {
          property: 'Primary Applications',
          value: 'Export Packaging, Intermediate Storage Parts',
        },
        {
          property: 'Standard Packaging Options',
          value: '20L, 200L Drum',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 158,
    },
    {
      name: 'TW MoistureDisplacer 40 Spray',
      slug: 'tw-moisture-displacer',
      subtitle: 'TW Chemin • Maintenance Products',
      categorySlug: 'tw-chemin',
      categoryName: 'TW Chemin',
      subCategoryTitle: 'Maintenance Products',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790674698/jaideva/about/oil-drums-warehouse.jpg',
      descriptionTitle: 'Description',

      description:
        'Frees rusted bolts, displaces moisture from electrical circuits, and stops squeaks.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Maintenance Toolkits, Electrical Switchgear Maintenance',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting High Dielectric | Penetrating & Lubricating.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by TW Chemin.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from TW Chemin',
        'Packaging sizes: 500ml Aerosol / 5L Can / 20L Can',
        'Application areas: Maintenance Toolkits, Electrical Switchgear Maintenance',
        'Standards & specs: High Dielectric | Penetrating & Lubricating',
      ],
      specsText: 'High Dielectric | Penetrating & Lubricating',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'TW Chemin',
        },
        {
          property: 'Category',
          value: 'Maintenance Products',
        },
        {
          property: 'Origin / Status',
          value: 'Germany (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'High Dielectric | Penetrating & Lubricating',
        },
        {
          property: 'Primary Applications',
          value: 'Maintenance Toolkits, Electrical Switchgear Maintenance',
        },
        {
          property: 'Standard Packaging Options',
          value: '500ml Aerosol, 5L Can, 20L Can',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 159,
    },
    {
      name: 'Filtermist FX4002 Centrifugal Mist Collector',
      slug: 'filtermist-fx4002',
      subtitle: 'Filtermist • Oil Mist Collectors',
      categorySlug: 'filtermist',
      categoryName: 'Filtermist',
      subCategoryTitle: 'Oil Mist Collectors',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description:
        'Direct-drive centrifugal unit removing oil mist and returning condensed coolant into the sump.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'CNC Turning Centers, Milling Enclosures',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Airflow 1250 m³/h | 1.1 kW Motor | Low Noise 70 dB(A).',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Filtermist.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Filtermist',
        'Packaging sizes: Complete Collector Unit',
        'Application areas: CNC Turning Centers, Milling Enclosures',
        'Standards & specs: Airflow 1250 m³/h | 1.1 kW Motor | Low Noise 70 dB(A)',
      ],
      specsText: 'Airflow 1250 m³/h | 1.1 kW Motor | Low Noise 70 dB(A)',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Filtermist',
        },
        {
          property: 'Category',
          value: 'Oil Mist Collectors',
        },
        {
          property: 'Origin / Status',
          value: 'United Kingdom (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Airflow 1250 m³/h | 1.1 kW Motor | Low Noise 70 dB(A)',
        },
        {
          property: 'Primary Applications',
          value: 'CNC Turning Centers, Milling Enclosures',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Complete Collector Unit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 160,
    },
    {
      name: 'Filtermist FX5002 Mist Collector',
      slug: 'filtermist-fx5002',
      subtitle: 'Filtermist • Oil Mist Collectors',
      categorySlug: 'filtermist',
      categoryName: 'Filtermist',
      subCategoryTitle: 'Oil Mist Collectors',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675216/jaideva/products/engine-oil-hero.jpg',
      descriptionTitle: 'Description',

      description:
        'Higher throughput extraction unit for high-pressure through-spindle coolant CNC centers.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'High-Pressure Machining Centers, Large Enclosures',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Airflow 1750 m³/h | 1.5 kW | High Volume Mist Extraction.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Filtermist.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Filtermist',
        'Packaging sizes: Complete Collector Unit',
        'Application areas: High-Pressure Machining Centers, Large Enclosures',
        'Standards & specs: Airflow 1750 m³/h | 1.5 kW | High Volume Mist Extraction',
      ],
      specsText: 'Airflow 1750 m³/h | 1.5 kW | High Volume Mist Extraction',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Filtermist',
        },
        {
          property: 'Category',
          value: 'Oil Mist Collectors',
        },
        {
          property: 'Origin / Status',
          value: 'United Kingdom (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Airflow 1750 m³/h | 1.5 kW | High Volume Mist Extraction',
        },
        {
          property: 'Primary Applications',
          value: 'High-Pressure Machining Centers, Large Enclosures',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Complete Collector Unit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 161,
    },
    {
      name: 'Filtermist HEPA H13 Afterfilter',
      slug: 'filtermist-hepa-afterfilter',
      subtitle: 'Filtermist • Filtration Systems',
      categorySlug: 'filtermist',
      categoryName: 'Filtermist',
      subCategoryTitle: 'Filtration Systems',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Mounted on top of the Filtermist collector to eliminate dry smoke and sub-micron oil particulate.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Neat Oil Machining, High Speed Grinding Smoke',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Efficiency 99.95% @ 0.3 Micron | H13 Standard.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Filtermist.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Filtermist',
        'Packaging sizes: Filter Pack',
        'Application areas: Neat Oil Machining, High Speed Grinding Smoke',
        'Standards & specs: Efficiency 99.95% @ 0.3 Micron | H13 Standard',
      ],
      specsText: 'Efficiency 99.95% @ 0.3 Micron | H13 Standard',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Filtermist',
        },
        {
          property: 'Category',
          value: 'Filtration Systems',
        },
        {
          property: 'Origin / Status',
          value: 'United Kingdom (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Efficiency 99.95% @ 0.3 Micron | H13 Standard',
        },
        {
          property: 'Primary Applications',
          value: 'Neat Oil Machining, High Speed Grinding Smoke',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Filter Pack',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 162,
    },
    {
      name: 'Filtermist Industrial Smoke Eliminator',
      slug: 'filtermist-smoke-eliminator',
      subtitle: 'Filtermist • Industrial Air Filtration',
      categorySlug: 'filtermist',
      categoryName: 'Filtermist',
      subCategoryTitle: 'Industrial Air Filtration',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675162/jaideva/about/oil-lab-quality.jpg',
      descriptionTitle: 'Description',

      description:
        'Captures dense smoke generated by heat treatment and severe high-speed machining.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Heat Treatment Shops, Heavy Machining Plants',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Multi-Stage High Performance Sub-Micron Filtration.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Filtermist.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Filtermist',
        'Packaging sizes: Filtration Unit',
        'Application areas: Heat Treatment Shops, Heavy Machining Plants',
        'Standards & specs: Multi-Stage High Performance Sub-Micron Filtration',
      ],
      specsText: 'Multi-Stage High Performance Sub-Micron Filtration',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Filtermist',
        },
        {
          property: 'Category',
          value: 'Industrial Air Filtration',
        },
        {
          property: 'Origin / Status',
          value: 'United Kingdom (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Multi-Stage High Performance Sub-Micron Filtration',
        },
        {
          property: 'Primary Applications',
          value: 'Heat Treatment Shops, Heavy Machining Plants',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Filtration Unit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 163,
    },
    {
      name: 'Filtermist F-Monitor Airflow Sensor',
      slug: 'filtermist-f-monitor',
      subtitle: 'Filtermist • Extraction Solutions',
      categorySlug: 'filtermist',
      categoryName: 'Filtermist',
      subCategoryTitle: 'Extraction Solutions',
      containerImage:
        'https://res.cloudinary.com/dpa93copz/image/upload/v1790675219/jaideva/products/industrial-gear-oil.jpg',
      descriptionTitle: 'Description',

      description:
        'Monitors airflow volume and alerts machine operators when afterfilters require maintenance.',
      applicationAreasTitle: 'Application Areas',

      applicationAreas: 'Continuous Airflow Monitoring, Preventive Maintenance',
      performanceBenefitsTitle: 'Performance Benefits',

      performanceBenefits: [
        'Formulated for severe-duty performance meeting Digital LED Status Indicator | Airflow & Filter Monitor.',
        'Maximum thermal stability, oxidation resistance, and extended equipment operational life.',
        'Robust boundary-film lubrication minimizing friction and mechanical downtime.',
        'Guaranteed 100% original manufacturer distribution stock by Filtermist.',
      ],
      specialFeaturesTitle: 'Special Features',

      specialFeatures: [
        'Authorized factory supply from Filtermist',
        'Packaging sizes: Sensor Gauge Kit',
        'Application areas: Continuous Airflow Monitoring, Preventive Maintenance',
        'Standards & specs: Digital LED Status Indicator | Airflow & Filter Monitor',
      ],
      specsText: 'Digital LED Status Indicator | Airflow & Filter Monitor',
      tableHeaders: ['Property', 'Value'],
      propertiesTableTitle: 'Physico-Chemical Properties',

      propertiesTable: [
        {
          property: 'Brand / Manufacturer',
          value: 'Filtermist',
        },
        {
          property: 'Category',
          value: 'Extraction Solutions',
        },
        {
          property: 'Origin / Status',
          value: 'United Kingdom (Certified Multi-Brand Stockist)',
        },
        {
          property: 'Specifications / Standards',
          value: 'Digital LED Status Indicator | Airflow & Filter Monitor',
        },
        {
          property: 'Primary Applications',
          value: 'Continuous Airflow Monitoring, Preventive Maintenance',
        },
        {
          property: 'Standard Packaging Options',
          value: 'Sensor Gauge Kit',
        },
        {
          property: 'Product Status',
          value: '100% Genuine Authorized Stock',
        },
      ],
      pdfUrl: '#',
      msdsUrl: '#',
      isFeatured: true,
      order: 164,
    },
  ];

  // === Brand Categories & Products ===

  console.log('Cleaning up any extraneous products & categories...');
  const validCategorySlugs = brandCategories.map((c) => c.slug);
  const validProductSlugs = brandProducts.map((p) => p.slug);

  await prisma.product.deleteMany({
    where: { slug: { notIn: validProductSlugs } },
  });
  await prisma.productCategory.deleteMany({
    where: { slug: { notIn: validCategorySlugs } },
  });

  console.log('Upserting brand categories...');
  for (const cat of brandCategories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✓ ${brandCategories.length} Brand categories ready.`);

  console.log('Upserting products root page...');
  await prisma.page.upsert({
    where: { slug: 'products' },
    update: {
      title: 'Products',
      description:
        'Explore high-performance automotive and industrial lubricants, fluids, and filtration equipment.',
      metaTitle: 'Products & Solutions | Jai Deva Oil Co.',
      metaDescription:
        'Explore high-performance automotive and industrial lubricants, greases, fluids, and filtration equipment distributed by Jai Deva Oil Co.',
      order: 3,
      parent: '-',
      type: 'standard',
      visibility: 'published',
      isStatic: true,
    },
    create: {
      title: 'Products',
      slug: 'products',
      description:
        'Explore high-performance automotive and industrial lubricants, fluids, and filtration equipment.',
      metaTitle: 'Products & Solutions | Jai Deva Oil Co.',
      metaDescription:
        'Explore high-performance automotive and industrial lubricants, greases, fluids, and filtration equipment distributed by Jai Deva Oil Co.',
      order: 3,
      parent: '-',
      type: 'standard',
      visibility: 'published',
      isStatic: true,
    },
  });

  console.log('Upserting brand category SEO pages...');
  for (const cat of brandCategories) {
    const pageSlug = `products/${cat.slug}`;
    await prisma.page.upsert({
      where: { slug: pageSlug },
      update: {
        title: cat.name,
        description: cat.shortDesc,
        metaTitle: `${cat.name} | Jai Deva Oil Co.`,
        metaDescription: cat.shortDesc,
        order: cat.order,
        parent: 'products',
        type: 'standard',
        visibility: 'published',
        isStatic: false,
      },
      create: {
        title: cat.name,
        slug: pageSlug,
        description: cat.shortDesc,
        metaTitle: `${cat.name} | Jai Deva Oil Co.`,
        metaDescription: cat.shortDesc,
        order: cat.order,
        parent: 'products',
        type: 'standard',
        visibility: 'published',
        isStatic: false,
      },
    });
  }
  console.log(`✓ ${brandCategories.length} Brand category SEO pages ready.`);

  console.log('Upserting brand products...');
  for (const p of brandProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ ${brandProducts.length} Brand products ready.`);

  // 10. Blogs Page & Sections
  const blogsPage = await prisma.page.upsert({
    where: { slug: 'blogs' },
    update: {
      title: 'Technical Articles & Lubrication Insights',
      order: 6,
      parent: '-',
      description:
        'Technical articles, educational guides, and lubrication maintenance recommendations.',
      metaTitle: 'Blogs & Insights | Jai Deva Oil Co.',
      metaDescription:
        'Learn how often to change engine oils, hydraulic fluid maintenance, and lubrication best practices from Jai Deva Oil Co.',
    },
    create: {
      title: 'Technical Articles & Lubrication Insights',
      slug: 'blogs',
      order: 6,
      parent: '-',
      type: 'static',
      visibility: 'published',
      isStatic: true,
      description:
        'Technical articles, educational guides, and lubrication maintenance recommendations.',
      metaTitle: 'Blogs & Insights | Jai Deva Oil Co.',
      metaDescription:
        'Learn how often to change engine oils, hydraulic fluid maintenance, and lubrication best practices from Jai Deva Oil Co.',
    },
  });

  const blogsSections = [
    {
      type: 'BlogsHero',
      order: 0,
      content: {
        image:
          'https://res.cloudinary.com/dpa93copz/image/upload/v1787738185/mahalaxmi/blogs/blogs-banner.jpg',
        altText: 'Blogs - Jai Deva Oil Co. HP Lubricants',
      },
    },
    {
      type: 'BlogCategories',
      order: 1,
      content: [
        {
          id: 'cat-auto',
          name: 'Automotive',
          slug: 'automotive',
          description:
            'Engine oils, gear lubricants, coolants for commercial and passenger vehicles.',
        },
        {
          id: 'cat-ind',
          name: 'Industrial',
          slug: 'industrial',
          description: 'Hydraulic oils, turbine oils, and heavy machinery lubrication guides.',
        },
        {
          id: 'cat-bike',
          name: 'Bike Oils',
          slug: 'bike-oils',
          description: '2-wheeler and 4-stroke motorcycle engine maintenance insights.',
        },
        {
          id: 'cat-spec',
          name: 'Specialties',
          slug: 'specialties',
          description: 'Transformer oils, cutting fluids, and specialty industrial applications.',
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
      title: 'How Often Should You Change Your Automotive Engine Oil? A Simple Guide',
      slug: 'how-often-should-you-change-your-automotive-engine-oil',
      category: 'Automotive',
      publishDate: 'October 14, 2025',
      readTime: '6 min read',
      author: 'HPCL Lubricants Technical Team',
      excerpt:
        'Regular oil changes are vital for the longevity and efficiency of your vehicle and machinery. Learn key factors, recommended mileage intervals, synthetic vs conventional oils, and oil condition monitoring.',
      coverImage:
        'https://www.hplubricants.in/sites/default/files/How-Often-Should-You-Change-Your-Automotive-Engine-Oil.jpg',
      content: {
        intro:
          "Regular oil changes are vital for the longevity and efficiency of your machinery, whether it's a car, industrial equipment, or a small engine like a lawnmower. However, determining the right interval for oil changes can be confusing due to various factors that influence oil life. This guide will help you understand how often you should change your Automotive Engine Oil and what factors to consider.",
        sections: [
          {
            heading: '1. Follow the Manufacturer’s Recommendations',
            paragraphs: [
              'Every vehicle manufacturer specifies precise lubrication intervals tailored to engine design and tolerances.',
            ],
            bulletPoints: [
              'Owner’s Manual: The best starting point is always your machine’s owner’s manual. Manufacturers provide specific guidelines on oil change intervals based on rigorous testing and engineering.',
              'Service Schedules: Service schedules detail recommended oil change frequency based on factors like usage, engine type, and operating conditions.',
            ],
          },
          {
            heading: '2. Consider the Type of Oil Used',
            paragraphs: [
              'The chemical formulation of your lubricant directly dictates how long it maintains its protective viscosity and detergent properties:',
            ],
            bulletPoints: [
              'Conventional Oil: Needs to be changed more frequently, typically every 3,000 to 5,000 miles (5,000–7,500 km) for vehicles or every 100-200 hours for machinery.',
              'Synthetic Oil: Due to superior molecular stability, synthetic oils last longer and require changes every 7,500 to 10,000 miles (10,000–15,000 km) or 300-500 operating hours.',
              'Synthetic Blend Oil: Combines synthetic and mineral basestocks for a middle ground, extending intervals slightly beyond conventional oils.',
              'High-Mileage Oil: Formulated with seal conditioners for older engines with over 75,000 miles to reduce oil consumption and seal leakage.',
            ],
          },
          {
            heading: '3. Evaluate Your Usage Patterns',
            paragraphs: [
              'Your daily driving style and vehicle workload heavily influence thermal breakdown rates:',
            ],
            bulletPoints: [
              'Frequent Short Trips: Short city trips prevent the engine from reaching optimal operating temperatures, promoting moisture condensation and fuel dilution in the oil.',
              'Heavy Loads and High Stress: Vehicles operating under continuous heavy loads or towing generate elevated internal heat, breaking down additives faster.',
              'Infrequent Use: Vehicles or seasonal machinery driven rarely still require time-based oil changes, as stagnant oil oxidizes and absorbs ambient moisture.',
            ],
          },
          {
            heading: '4. Consider Environmental Conditions',
            paragraphs: [
              'Ambient temperature extremes and air purity alter lubricant performance:',
            ],
            bulletPoints: [
              'Extreme Temperatures: Very hot weather accelerates oil oxidation, while severe cold thickens oil, demanding low-viscosity winter grades and timely replacements.',
              'Dusty or Dirty Environments: Off-road or unpaved driving allows airborne silica dust into the engine, requiring shorter oil and filter change intervals.',
            ],
          },
          {
            heading: '5. Monitor Oil Quality',
            paragraphs: [
              'Proactive visual and chemical oil checks help catch breakdown before mechanical wear occurs:',
            ],
            bulletPoints: [
              'Check Oil Level & Condition: Pull the dipstick regularly. Dark, gritty, sludge-like oil or a burnt odor indicates urgent replacement is needed.',
              'Oil Analysis: For heavy fleet operations or industrial equipment, laboratory oil analysis monitors wear metals, soot percentage, and remaining TBN.',
            ],
          },
          {
            heading: '6. Listen to Your Machine',
            paragraphs: [
              'Your vehicle provides clear physical signals when oil lubrication breaks down:',
            ],
            bulletPoints: [
              'Unusual Noises or Performance Issues: Increased engine knocking, valve ticking, or sluggish response indicates friction buildup from degraded oil.',
              'Dashboard Alerts: Pay attention to low oil pressure lights or automated oil life monitoring indicators and service promptly.',
            ],
          },
          {
            heading: '7. Factor in the Age of the Machine',
            paragraphs: ['Engine age changes internal clearances and blow-by gas generation:'],
            bulletPoints: [
              'Older Engines: Higher wear clearances cause faster oil contamination and consumption, benefiting from shorter change cycles and high-viscosity protection.',
              'Newer Machines: Modern precision-machined engines with active emissions control systems support extended intervals when paired with premium synthetic oils.',
            ],
          },
          {
            heading: '8. Time-Based Changes',
            paragraphs: [
              'Oil Degradation Over Time: Even when mileage is low, exposure to air, moisture, and acid combustion byproducts breaks down additives. Always change engine oil at least once every 12 months.',
            ],
          },
        ],
        conclusion:
          "The frequency of oil changes depends on a variety of factors, including the type of oil, usage patterns, environmental conditions, and the machine's age. While following the manufacturer’s guidelines is crucial, being mindful of your specific operating conditions and regularly checking your oil can ensure your machine runs smoothly and efficiently. Regular oil changes are a simple yet vital maintenance task that protects your machine and keeps it performing at its best.",
        recommendedProducts: [
          'HP FUTUR-X 5W-30',
          'HP MILCY TURBO STAR 15W-40',
          'HP RACER 4T 20W-40',
        ],
      },
      isPublished: true,
    },
    {
      title: 'How To Choose The Right Diesel Engine Oil For Your Vehicle',
      slug: 'how-to-choose-the-right-diesel-engine-oil-for-your-vehicle',
      category: 'Automotive',
      publishDate: 'November 02, 2025',
      readTime: '7 min read',
      author: 'HPCL Lubricants Technical Expert',
      excerpt:
        'A comprehensive guide to selecting the ideal diesel engine oil, understanding SAE viscosity ratings, API standards, OEM approvals, and engine protection.',
      coverImage:
        'https://www.hplubricants.in/sites/default/files/How-To-Choose-The-Right-Diesel-Engine-Oil-For-Your-Vehicle.jpg',
      content: {
        intro:
          'Choosing the right Diesel Engine Oil is crucial for the longevity and performance of your vehicle. Heavy-duty diesel engines operate under extreme pressures and thermal stress. With so many options available in the market, making an informed decision can be challenging. This guide will help you navigate the key factors to consider when selecting the best Diesel Engine Oil for your vehicle.',
        sections: [
          {
            heading: "1. Understand Your Vehicle's Requirements",
            paragraphs: [
              'Every vehicle has unique lubrication demands based on its engine design, emission systems, and operational duties.',
            ],
            bulletPoints: [
              "Owner's Manual: Always consult your vehicle's owner's manual first. It provides specific recommendations for the required viscosity grade and API service specification best suited for your engine.",
              'Engine Type: Diesel engines vary widely—from light passenger SUVs to heavy commercial trucks and tractors. High-performance turbo-diesel engines often require synthetic formulations, whereas conventional oils suffice for older, simpler engines.',
            ],
          },
          {
            heading: '2. Know the Different Types of Diesel Engine Oils',
            paragraphs: [
              'Engine oils are classified into several categories based on base oil refinement and synthetic formulation:',
            ],
            bulletPoints: [
              'Conventional Diesel Engine Oil: Refined directly from crude oil, conventional oil is affordable and ideal for older engines with routine maintenance schedules.',
              'Synthetic Diesel Engine Oil: Chemically synthesized for uniform molecular structure, delivering superior thermal stability, oxidation resistance, and performance in extreme cold or high-heat conditions.',
              'Synthetic Blend Diesel Engine Oil: A mixture of synthetic and mineral basestocks offering enhanced protection over conventional oil at a balanced cost.',
              'High-Mileage Diesel Engine Oil: Specifically formulated for engines with over 75,000 km, containing seal conditioners and anti-wear agents to reduce oil consumption and minimize leaks.',
            ],
          },
          {
            heading: '3. Consider the Viscosity Rating (SAE Grade)',
            paragraphs: [
              "Viscosity measures an oil's resistance to flow across varying operating temperatures:",
            ],
            bulletPoints: [
              "Understanding Viscosity Ratings: SAE multigrade ratings (such as 15W-40 or 10W-30) indicate performance. The number preceding 'W' (Winter) represents cold flow behavior, while the second number indicates high-temperature thickness at 100°C.",
              'Climate Considerations: In colder regions or winter seasons, lower ratings like 5W-40 or 10W-30 ensure instant cold-start oil circulation. In hotter climates like Indian summers, 15W-40 or 20W-50 grades maintain heavy film strength under load.',
            ],
          },
          {
            heading: '4. Look for Certifications & OEM Approvals',
            paragraphs: [
              'Ensure your lubricant meets international performance standards and vehicle manufacturer guidelines:',
            ],
            bulletPoints: [
              'API Standards (CK-4 / CI-4 Plus): Look for API donut marks. API CK-4 and CJ-4 low-SAPS oils are mandatory for modern BS-VI engines equipped with DPF and SCR systems, while API CI-4 Plus is ideal for BS-IV fleets.',
              'OEM Approvals: Top lubricants distributed by JAI DEVA OIL CO. carry OEM approvals from major vehicle manufacturers (Tata Motors, Ashok Leyland, Mahindra, Cummins), giving extra assurance of performance.',
            ],
          },
          {
            heading: '5. Consider the Oil Change Interval',
            paragraphs: [
              'Oil change frequency impacts total cost of ownership and vehicle uptime:',
            ],
            bulletPoints: [
              'Extended Drain Intervals: Premium synthetic oils (like HP MILCY TURBO ULTIMA) are engineered for extended drain intervals, keeping commercial fleets on the road longer.',
              'Conventional Oils: Require more frequent oil changes, suitable for lower annual mileage or budget-conscious operations.',
            ],
          },
          {
            heading: '6. Assess Your Driving Habits & Duty Cycle',
            paragraphs: ['Severe operating conditions demand higher specification lubricants:'],
            bulletPoints: [
              'Heavy Hauling & Towing: Operating fully loaded trucks or agricultural equipment generates massive internal heat, requiring shear-stable synthetic or heavy-duty multigrade lubricants.',
              'City Stop-and-Go Driving: Urban delivery fleets encounter frequent idling and start-stop cycles, requiring high anti-wear (ZDDP) protection.',
            ],
          },
          {
            heading: "7. Evaluate the Oil's Additive Package",
            paragraphs: [
              'Performance additives protect internal engine components against soot and deposit buildup:',
            ],
            bulletPoints: [
              'Detergents & Dispersants: Neutralize combustion acids and keep soot particles suspended to prevent engine sludge formation.',
              'Anti-Wear Agents: Form a sacrificial barrier on camshafts and piston rings to eliminate metal-to-metal contact.',
              'Viscosity Index Improvers: Maintain stable lubricant viscosity across extreme temperature variations.',
            ],
          },
          {
            heading: '8. Cost vs. Performance',
            paragraphs: [
              'Weigh short-term lubricant costs against long-term fuel efficiency, reduced maintenance, and engine overhaul prevention. Investing in high-grade lubricants from JAI DEVA OIL CO. saves significant operating costs over time.',
            ],
          },
        ],
        conclusion:
          'Selecting the right Diesel Engine Oil requires balancing vehicle manufacturer specifications, climate conditions, duty cycles, and budget. Choosing HP MILCY series diesel lubricants from Jai Deva Oil Co. ensures maximum engine protection, extended drain intervals, and optimal fuel economy for your commercial fleet or personal vehicle.',
        recommendedProducts: [
          'HP MILCY TURBO ULTIMA 10W-40',
          'HP MILCY POWER 15W-40',
          'HP DIESELINO 15W-40T',
        ],
      },
      isPublished: true,
    },
    {
      title: '15W-40 Oil: Types, Properties, and Uses',
      slug: '15w-40-oil-and-types',
      category: 'Automotive',
      publishDate: 'December 18, 2025',
      readTime: '7 min read',
      author: 'HPCL Lubricants Technical Expert',
      excerpt:
        '15W-40 is a widely used multi-grade engine oil known for its versatility and performance in commercial transport, agricultural tractors, and industrial generators.',
      coverImage: 'https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg',
      content: {
        intro:
          '15W-40 oil is a widely used multi-grade engine oil, known for its versatility and performance in various temperatures and operating conditions. This guide provides an in-depth look at 15W-40 oil, exploring its types, properties, uses, and maintenance tips to help you make informed decisions for your vehicle or machinery.',
        sections: [
          {
            heading: '1. Introduction to 15W-40 Oil',
            paragraphs: [
              "15W-40 oil is a multi-grade engine oil, meaning its viscosity rating adapts across temperature ranges. The '15W' specifies the cold-temperature pumping viscosity (Winter rating), while '40' indicates kinematic viscosity at 100°C. This dual rating guarantees reliable cold starts and robust film thickness during continuous heavy operations.",
            ],
          },
          {
            heading: '2. Types of 15W-40 Engine Oil',
            paragraphs: [
              '15W-40 lubricants are available in conventional, synthetic blend, and full synthetic formulations:',
            ],
            bulletPoints: [
              'Conventional 15W-40 Oil: Refined directly from crude oil, providing solid lubrication for older commercial diesel engines at an economical cost.',
              'Synthetic Blend 15W-40 Oil: Combines mineral base stocks with synthetic compounds for superior oxidation resistance, enhanced engine cleanliness, and extended drain capability.',
              'Full Synthetic 15W-40 Oil: Engineered from high-purity synthetic base oils for maximum thermal stability, minimal oil volatility, and peak fuel efficiency.',
            ],
          },
          {
            heading: '3. Key Properties of 15W-40 Oil',
            paragraphs: ['Four essential physical properties define 15W-40 performance:'],
            bulletPoints: [
              'Viscosity Stability: Maintains protective oil film across severe cold and intense heat.',
              'Thermal Breakdown Resistance: Resists sludge and varnish formation at high engine operating temperatures.',
              'Detergency & Dispersancy: Keeps soot particles suspended to prevent carbon deposits and ring sticking.',
              'Anti-Wear Protection: Forms sacrificial ZDDP films over cams, lifters, and bearings.',
            ],
          },
          {
            heading: '4. Applications Across Industries',
            paragraphs: ['15W-40 is specified across multiple heavy-duty sectors:'],
            bulletPoints: [
              'Commercial Fleet Trucks: Long-haul logistics trucks, tippers, and buses.',
              'Agricultural Tractors & Harvesters: Heavy field machinery operating under high torque.',
              'Industrial Gensets & Excavators: Construction machinery and stationary diesel power generators.',
            ],
          },
        ],
        conclusion:
          'Trust the HP MILCY 15W-40 series from Jai Deva Oil Co. for exceptional engine cleanliness, reduced oil consumption, and long-term machinery protection.',
        recommendedProducts: [
          'HP MILCY TURBO STAR 15W-40',
          'HP MILCY SUPER 15W-40',
          'HP MILCY POWER 15W-40',
        ],
      },
      isPublished: true,
    },
    {
      title: 'Transformer Oil: Types, Properties, and Uses',
      slug: 'transformer-oil-types-properties-and-uses',
      category: 'Industrial',
      publishDate: 'January 10, 2026',
      readTime: '8 min read',
      author: 'HP Industrial Lubricants Team',
      excerpt:
        'Discover the electrical insulation, active cooling properties, dielectric breakdown voltage standards, and maintenance requirements for electrical transformer fluids.',
      coverImage: 'https://www.hplubricants.in/sites/default/files/Transformer-oil-final.jpg',
      content: {
        intro:
          'Transformer oil (dielectric insulating fluid) is a vital component in high-voltage electrical transformers. It serves two essential functions: providing electrical insulation between active conductors and dissipating intense heat generated within core windings. This comprehensive guide covers transformer oil formulations, testing, and maintenance practices.',
        sections: [
          {
            heading: '1. Types of Transformer Oil',
            paragraphs: [
              'Transformer fluids are categorized into mineral-based and synthetic dielectric fluids:',
            ],
            bulletPoints: [
              'Paraffinic Transformer Oil: Derived from paraffinic crudes; offers lower oxidation rates but higher pour points requiring pour depressants.',
              'Naphthenic Transformer Oil: Highly refined from naphthenic crudes; provides excellent low-temperature fluidity and superior sludge solubility.',
              'Synthetic Ester & Silicone Oils: Fire-resistant and biodegradable fluids specified for indoor substations, offshore rigs, and environmentally sensitive zones.',
            ],
          },
          {
            heading: '2. Key Physical & Electrical Properties',
            paragraphs: [
              'To safeguard high-voltage equipment, transformer oils must meet rigid specifications:',
            ],
            bulletPoints: [
              'Dielectric Breakdown Voltage (>70 kV): High electrical resistance prevents flashover and arcing inside the tank.',
              'Low Dissipation Factor (Tan Delta): Low dielectric loss minimizes energy dissipation as heat.',
              'High Flash Point (>140°C): High thermal threshold minimizes flammability and explosive risk.',
              'Oxidation Stability: Inhibited formulations prevent acid and sludge formation during decades of continuous service.',
            ],
          },
          {
            heading: '3. Maintenance & Quality Monitoring',
            paragraphs: ['Regular oil condition monitoring ensures grid reliability:'],
            bulletPoints: [
              'Dissolved Gas Analysis (DGA): Tests for thermal fault gases (hydrogen, methane, acetylene) to detect internal insulation breakdown.',
              'Vacuum Filtration & Dehydration: Removes dissolved moisture and particulate debris to restore dielectric strength.',
              "Reclamation & Regeneration: Restores aged oil properties via fuller's earth treatment.",
            ],
          },
        ],
        conclusion:
          'HP POWERTRAN transformer dielectric fluids comply with IS 335 and IEC 60296 standards, delivering maximum safety and uninterrupted grid reliability.',
        recommendedProducts: ['HP POWERTRAN', 'HP ENKLO 68', 'HP HYDROL 68'],
      },
      isPublished: true,
    },
    {
      title: 'Bike Engine Oil: Complete Selection & Performance Guide',
      slug: 'bike-engine-oil',
      category: 'Bike Oils',
      publishDate: 'January 24, 2026',
      readTime: '6 min read',
      author: 'HP Two-Wheeler Lubricant Advisory',
      excerpt:
        'Learn how 4T bike engine oils protect the engine, wet clutch, and transmission gears, while managing heat in city traffic and high-RPM riding.',
      coverImage:
        'https://www.hplubricants.in/sites/default/files/Bike-Engine-Oil-Final-Graphic.jpg',
      content: {
        intro:
          'The motorcycle universe is exhilarating. Riding brings freedom, but keeping your bike performing at its limit requires proper engine care. Unlike passenger cars where engine and gearbox use separate oils, 4-stroke motorcycles share a single oil bath for the engine, wet clutch, and transmission gears.',
        sections: [
          {
            heading: '1. Essential Functions of Two-Wheeler Engine Oil',
            paragraphs: ['Motorcycle lubricants perform four crucial duties simultaneously:'],
            bulletPoints: [
              'Lubrication: Reduces metal-on-metal friction between piston rings, camshafts, and transmission gears.',
              'Heat Dissipation: Carries heat away from combustion chambers and clutch plates during continuous high-RPM operation.',
              'Cleaning: Suspends carbon deposits and combustion debris, keeping oil passages clear.',
              'Corrosion Protection: Forms a moisture barrier over internal components during humid or rainy weather.',
            ],
          },
          {
            heading: '2. Why JASO MA2 Certification Matters',
            paragraphs: [
              'JASO MA2 is the Japanese Automotive Standards Organization specification for high-friction wet clutch engagement. It guarantees zero clutch slippage during rapid acceleration while protecting transmission gear teeth.',
            ],
          },
          {
            heading: '3. Advanced Lubrication Technology by JAI DEVA OIL CO.',
            paragraphs: [
              'HP RACER 4T oils are blended with premium Group II base stocks and synthetic additives. They deliver exceptional thermal stability, preventing oil breakdown when idling in dense Indian city traffic.',
            ],
          },
        ],
        conclusion:
          'Keep your motorcycle engine smooth, responsive, and long-lasting with HP RACER 4T series motorcycle oils supplied by Jai Deva Oil Co..',
        recommendedProducts: [
          'HP RACER 4T 20W-40',
          'HP RACER 4T SYNTH 10W-30',
          'HP RACER SKUTO 10W-30',
        ],
      },
      isPublished: true,
    },
    {
      title: 'Synthetic Engine Oil: Types, Properties, and Uses',
      slug: 'synthetic-engine-oil-types-properties-and-uses',
      category: 'Automotive',
      publishDate: 'February 01, 2026',
      readTime: '7 min read',
      author: 'HPCL Lubricants Research Lab',
      excerpt:
        'Explore full synthetic and semi-synthetic basestocks, extreme temperature viscosity stability, wear protection additives, and fuel economy benefits.',
      coverImage: 'https://www.hplubricants.in/sites/default/files/Synthetic-Oil-Final-Graphic.jpg',
      content: {
        intro:
          'Synthetic engine oils are chemically engineered from pure base stocks to deliver uniform molecular structure, extreme temperature tolerance, and minimal volatility loss. This guide details synthetic oil categories, superior properties, and key applications.',
        sections: [
          {
            heading: '1. Types of Synthetic Engine Oils',
            paragraphs: ['Synthetic lubricants are tailored for specific performance demands:'],
            bulletPoints: [
              'Full Synthetic Oil: Formulated entirely from Group III/IV synthetic basestocks; delivers ultimate cold-start fluidity, oxidation control, and extended drain intervals.',
              'Synthetic Blend Oil: Combines synthetic and conventional basestocks, providing superior protection over mineral oil at an accessible price point.',
            ],
          },
          {
            heading: '2. Key Superior Properties',
            paragraphs: ['Synthetic oils outperform conventional oils across critical metrics:'],
            bulletPoints: [
              'Viscosity Index Stability: Resists thinning in summer heat and flow resistance during winter starts.',
              'High-Temperature Resistance: Prevents turbocharger coking and thermal breakdown under heavy load.',
              'Active Detergency: Keeps engine interiors free of harmful sludge, varnish, and carbon deposits.',
            ],
          },
          {
            heading: '3. Versatile Applications',
            paragraphs: [
              'Ideal for modern passenger cars, sports motorcycles, commercial fleets, and heavy industrial machinery requiring API SN/SP or CK-4 standards.',
            ],
          },
        ],
        conclusion:
          'Upgrade your vehicle to HP FUTUR-X full synthetic engine oils for maximum horsepower, engine cleanliness, and optimized fuel economy.',
        recommendedProducts: ['HP FUTUR-X 5W-40', 'HP FUTUR-X 5W-30', 'HP FUTUR-X 0W-20'],
      },
      isPublished: true,
    },
    {
      title: 'The Best Engine Oil for Your Bike: Durability & Performance',
      slug: 'the-best-engine-oil-for-your-bike',
      category: 'Bike Oils',
      publishDate: 'February 08, 2026',
      readTime: '6 min read',
      author: 'Jai Deva Two-Wheeler Lube Advisory',
      excerpt:
        'Discover why HP RACER 4T series is the top choice for two-wheelers, delivering wet clutch friction control, reduced oil consumption, and lower maintenance costs.',
      coverImage:
        'https://www.hplubricants.in/sites/default/files/The-best-engine-oil-for-your-bike-thumb.jpg',
      content: {
        intro:
          "Choosing the right engine oil for your bike is crucial for maintaining performance, efficiency, and engine longevity. JAI DEVA OIL CO.' Two Wheeler Engine Oil range is engineered to meet the stringent demands of modern motorcycles, commuters, and scooters across Indian road conditions.",
        sections: [
          {
            heading: '1. Enhanced Engine Durability',
            paragraphs: [
              'Manufactured from premium Group II base stocks and state-of-the-art additive technology meeting API SJ/SL and JASO MA2 specifications. Delivers 3-in-1 protection for the engine, wet clutch, and gearbox.',
            ],
          },
          {
            heading: '2. Reduced Oil Consumption',
            paragraphs: [
              'Creates a dense microscopic seal between piston rings and cylinder walls. Minimizes oil evaporation and oil burning in combustion chambers, reducing frequent oil top-ups.',
            ],
          },
          {
            heading: '3. Lower Maintenance & Extended Drain Life',
            paragraphs: [
              'Protects gears and clutch plates against high-stress friction and thermal degradation, cutting repair frequency and maintenance expenditure.',
            ],
          },
          {
            heading: '4. High Fuel Efficiency',
            paragraphs: [
              'Reduces internal engine drag and fluid resistance, ensuring maximum power transfer to the rear wheel and economical mileage.',
            ],
          },
        ],
        conclusion:
          'Experience an unparalleled biking experience with HP RACER 4T motorcycle lubricants from Jai Deva Oil Co..',
        recommendedProducts: [
          'HP RACER 4T 20W-40',
          'HP RACER 4T SYNTH 10W-30',
          'HP RACER 4T 10W-30',
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
    where: { slug: 'privacy-policy' },
    update: {
      title: 'Privacy Policy',
      order: 50,
      parent: '-',
      metaTitle: 'Privacy Policy | Jai Deva Oil Co.',
      metaDescription:
        'Read the Privacy Policy of Jai Deva Oil Co., trusted multi-brand distributor for industrial and automotive lubricants and greases.',
      targetKeywords: 'Privacy Policy, Jai Deva Oil Co., lubricants data protection',
      canonicalUrl: '/privacy-policy',
    },
    create: {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      type: 'legal',
      visibility: 'published',
      order: 50,
      parent: '-',
      metaTitle: 'Privacy Policy | Jai Deva Oil Co.',
      metaDescription:
        'Read the Privacy Policy of Jai Deva Oil Co., trusted multi-brand distributor for industrial and automotive lubricants and greases.',
      targetKeywords: 'Privacy Policy, Jai Deva Oil Co., lubricants data protection',
      canonicalUrl: '/privacy-policy',
      noIndex: false,
    },
  });

  const privacyContent = {
    title: 'Privacy Policy',
    lastUpdated: 'August 2026',
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
    where: { pageId: privacyPage.id, type: 'PrivacyPolicyContent' },
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
        type: 'PrivacyPolicyContent',
        content: privacyContent,
        order: 0,
      },
    });
  }
  console.log('✓ Privacy Policy page & content ready.');

  console.log('=========================================');
  console.log('Database seeded successfully with 100% website data!');
  console.log('Admin Login: admin@jaideva.com / Admin@123');
  console.log('=========================================');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

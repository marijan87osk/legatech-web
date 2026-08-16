import type { Metadata } from "next";

export const siteUrl = "https://legatech.hr";
export const siteName = "Legatech";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  startingPrice: number;
  billingPeriod?: "MONTH";
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  modifiedAt: string;
  authorName: string;
  image?: string;
};

export function absoluteUrl(path: string) {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const isFilePath = /\/[^/]+\.[a-z0-9]+$/i.test(normalizedPath);
  const cleanPath = path === "/" ? "/" : isFilePath ? normalizedPath : `${normalizedPath}/`;
  return new URL(cleanPath, siteUrl).toString();
}

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "hr_HR",
      type: "website",
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: siteName,
  legalName: "LEGATECH, obrt za razvoj softvera, vl. Marijan Malčić",
  description: "Digitalna agencija iz Osijeka za izradu web stranica i trgovina, SEO optimizaciju i održavanje web stranica.",
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/apple-icon.png"),
    width: 180,
    height: 180,
  },
  email: "info@legatech.hr",
  telephone: "+385997357070",
  taxID: "14184408003",
  founder: {
    "@type": "Person",
    name: "Marijan Malčić",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kninska ulica 1 A",
    postalCode: "31000",
    addressLocality: "Osijek",
    addressCountry: "HR",
  },
  areaServed: {
    "@type": "Country",
    name: "Hrvatska",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl("/"),
  name: siteName,
  inLanguage: "hr-HR",
  publisher: { "@id": organizationId },
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  startingPrice,
  billingPeriod,
}: ServiceSchemaInput) {
  const url = absoluteUrl(path);
  const priceSpecification = {
    "@type": "UnitPriceSpecification",
    price: startingPrice,
    priceCurrency: "EUR",
    ...(billingPeriod ? { unitText: billingPeriod } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Hrvatska" },
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceSpecification,
    },
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  authorName,
  image,
}: ArticleSchemaInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "hr-HR",
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: { "@type": "Person", name: authorName },
    publisher: { "@id": organizationId },
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

const BASE_URL = "https://command.dada878.com";

const siteName = "基岩版";
const description = "幫助你快速地建立各種複雜的基岩版 Minecraft 指令！";

const SEO = {
  title: siteName,
  description: description,
  canonical: BASE_URL,
  openGraph: {
    title: siteName,
    description: description,
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-images/default.png`,
        width: 1200,
        height: 630,
      },
    ],
    siteName: siteName,
    type: "website",
  },
};

const noIndexSEO = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function defaultSEO({
  title,
  description,
  url,
  noindex,
}: {
  title?: string;
  description?: string;
  url?: string;
  customMeta?: { [key: string]: string };
  noindex?: boolean;
} = {}) {
  const titleMeta = title ? `${title} | ${siteName}` : siteName;
  const urlMeta = url ? `${BASE_URL}${url}` : SEO.canonical;

  let seoConfig = {
    ...SEO,
    title: titleMeta,
    canonical: urlMeta,
    description: description ?? SEO.description,
    openGraph: {
      ...SEO.openGraph,
      title: titleMeta,
      url: urlMeta,
      description: description ?? SEO.description,
    },
  };

  if (noindex) {
    seoConfig = {
      ...seoConfig,
      ...noIndexSEO,
    };
  }

  return seoConfig;
}

export { defaultSEO };

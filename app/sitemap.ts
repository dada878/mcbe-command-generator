const BASE_URL = "https://command.dada878.com";

export default async function sitemap() {
  const basePages = ["/", "/rawtext", "/tellraw", "/titleraw"];

  return [
    ...basePages.map((url) => {
      return {
        url: `${BASE_URL}${url}`,
        lastModified: new Date(),
      };
    }),
  ];
}

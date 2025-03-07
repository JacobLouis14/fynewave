import { getArticlesForSitemap } from "@/services/actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await getArticlesForSitemap();
  const articles =
    data.articleData?.map((article) => {
      return {
        url: `https://fynewave.com/${article.slug}`,
        lastModified: article.updatedAt,
      };
    }) ?? [];

  return [
    {
      url: "https://fynewave.com",
      lastModified: new Date(),
    },
    ...articles,
  ];
}

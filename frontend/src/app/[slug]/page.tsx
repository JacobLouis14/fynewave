import Articlecontainer from "@/components/article/articlecontainer";
import Articlesupportive from "@/components/article/articlesupportive";
import Appbar from "@/components/common/Appbar";
import Relatedblogs from "@/components/home/relatedblogs";
import { getBlogPostBySlug } from "@/services/actions";
import { Metadata } from "next";
import Image from "next/image";
import { title } from "process";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data, error } = await getBlogPostBySlug(params.slug);
  if (error) return { title: "Article" };
  return {
    title: data.articleDataBySlug?.title,
    description: data.articleDataBySlug?.desc,
    openGraph: {
      images: [
        {
          url: data.articleDataBySlug?.thumbnailUrl || "",
        },
      ],
    },
  };
}

const Article = async ({ params }: Props) => {
  const { data: articlePostData, error: articlePostError } =
    await getBlogPostBySlug(params.slug);

  if (articlePostError) {
    return <p>something went wrong</p>;
  }

  const { articleDataBySlug, relatedArticles } = articlePostData;

  return (
    <>
      <Appbar />
      {/* Banner */}
      <div className="relative w-full h-40 md:h-96">
        <Image
          src={
            articleDataBySlug?.bannerUrl
              ? articleDataBySlug?.bannerUrl
              : "https://guitar.com/wp-content/uploads/2021/04/Kevin-Shields-Credit-Larry-Busacca-Getty-Images@1400x1050.jpg"
          }
          alt="Article banner"
          fill
          sizes="100vw"
          // layout="intrinsic"
          // width={1400}
          // height={1050}
          className="w-full object-cover"
        />
      </div>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-11 px-3 md:px-8 py-8 min-h-screen gap-3">
        <div className="lg:col-span-8">
          <Articlecontainer articleDataBySlug={articleDataBySlug} />
        </div>
        <div className="lg:col-span-3 lg:bg-[#F5F4F4] md:px-5 py-8">
          <Articlesupportive
            songsIframe={articleDataBySlug?.songsIframes || []}
            videosIframe={articleDataBySlug?.videoIframes || []}
            relatedPosts={relatedArticles || []}
          />
        </div>
      </div>
      {/* Related blogs */}
      <Relatedblogs />
    </>
  );
};

export default Article;

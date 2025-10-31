import Appbar from "@/components/common/Appbar";
import { getArticles } from "@/services/actions";
import Image from "next/image";
import React from "react";
import Loading from "../loading";
import { toReadableDate } from "@/lib/utils/toReadableDate";
import Link from "next/link";

const SearchPage = async (props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const { data, error, isLoading } = await getArticles(query);

  if (error) {
    return (
      <>
        <Appbar />
        <p>Something went wrong</p>
      </>
    );
  }

  return (
    <>
      <Appbar />
      <div className="flex flex-col gap-3 px-2 md:px-16 py-8">
        {data.articles && data.articles?.length > 0 ? (
          data.articles?.map((article) => (
            <Link
              href={`${article.slug}`}
              key={article._id}
              className="grid sm:grid-cols-6 grid-cols-1 gap-8 w-full bg-slate-100 px-3 py-3"
            >
              <div className="relative sm:col-span-2 flex items-center justify-center w-full min-h-48 max-h-64 bg-white">
                <Image
                  src={`${article.thumbnailUrl}`}
                  alt="image"
                  //   width={500}
                  //   height={400}
                  fill
                  sizes="100% 100%"
                  className="object-cover"
                />
              </div>
              <div className="sm:col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2 pt-4">
                  <h2 className="font-semibold text-3xl break-words">
                    {article.title}
                  </h2>
                  <p>{article.author.name}</p>
                  <p className="font-light">
                    {toReadableDate(article.createdAt || "")}
                  </p>
                </div>
                <div>{article.desc}</div>
              </div>
            </Link>
          ))
        ) : (
          <p>No article found</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;

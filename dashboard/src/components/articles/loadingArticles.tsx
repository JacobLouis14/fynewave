"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InfiniteSpinner from "../common/infiniteSpinner";
import { fetchArticles } from "@/actions/action";

let page = 2;

function LoadingArticles() {
  const { ref, inView } = useInView();
  const [articles, setArticles] = useState<React.JSX.Element[]>([]);
  const [hadDataAvailable, setHasDataAvailable] = useState<boolean>(true);
  const [isError, setIsError] = useState<unknown | null>(null);

  //   loading article Handler
  const loadingHandler = async () => {
    const { articles: articleResponse, error } = await fetchArticles(page);

    // if error
    if (error) {
      setIsError(error.err);
      return;
    }
    // if article
    if (articleResponse) {
      if (articleResponse.length < 10) {
        setHasDataAvailable(false);
        return;
      }
      setArticles([...articles, ...articleResponse]);
      page++;
    }
  };

  useEffect(() => {
    if (inView && hadDataAvailable) {
      loadingHandler();
    }
  }, [inView]);

  // error
  if (isError) {
    return (
      <div className="w-full">
        <p>Something went wrong.....</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {articles.length > 0 && <tbody>{articles}</tbody>}
      {/* spinner */}
      {hadDataAvailable && (
        <div ref={ref} className="flex justify-center pt-4">
          <InfiniteSpinner />
        </div>
      )}
    </div>
  );
}

export default LoadingArticles;

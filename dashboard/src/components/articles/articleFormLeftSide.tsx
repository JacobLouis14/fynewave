import { ArticleModel } from "@/models/article";
import Image from "next/image";
import React, { useRef } from "react";
import DOMpurify from "isomorphic-dompurify";
import { useDebouncedCallback } from "use-debounce";

// using window interface to make instagram embedd proccess work
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface Props {
  articleData: ArticleModel;
  setArticleData: React.Dispatch<React.SetStateAction<ArticleModel>>;
  handleUploads: (
    e: React.ChangeEvent<HTMLInputElement>,
    destination: keyof ArticleModel,
    urlDes: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    }
  ) => void;
  handleRemoveUploads: (
    dataFile: keyof ArticleModel,
    urlData: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    },
    reference: React.RefObject<HTMLInputElement>
  ) => void;
  uploadImagesToDisplay: {
    imageUrl: string;
    bannerUrl: string;
    articleContentImageUrl: string;
  };
}

const ArticleFormLeftSide = ({
  articleData,
  setArticleData,
  uploadImagesToDisplay,
  handleRemoveUploads,
  handleUploads,
}: Props) => {
  const articleContentImageRef = useRef<HTMLInputElement>(null);

  // debouncing instagram script process
  const instaScriptEmbedHandler = useDebouncedCallback(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, 300);

  // script embedding blur handler
  const handleBlur = () => {
    instaScriptEmbedHandler();
  };

  return (
    <div className="flex flex-col gap-5 w-full md:col-span-5">
      {/* title */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Article title</h1>
        <input
          type="text"
          placeholder="title goes here"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.title}
          onChange={(e) =>
            setArticleData({ ...articleData, title: e.target.value })
          }
        />
      </div>
      {/* alternative title */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Article alternative title</h1>
        <input
          type="text"
          placeholder="alternative title goes here"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.alternativeTitle}
          onChange={(e) =>
            setArticleData({
              ...articleData,
              alternativeTitle: e.target.value,
            })
          }
        />
      </div>
      {/* desc */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Description</h1>
        <input
          type="text"
          placeholder="small description"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.desc}
          onChange={(e) =>
            setArticleData({ ...articleData, desc: e.target.value })
          }
        />
      </div>
      {/* article content one */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Article content one</h1>
        <textarea
          rows={10}
          placeholder="first row article data"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.articleContentOne}
          onChange={(e) =>
            setArticleData({
              ...articleData,
              articleContentOne: e.target.value,
            })
          }
        />
      </div>
      {/* article content two */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Article content two</h1>
        <textarea
          rows={10}
          placeholder="first row article data"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.articleContentTwo}
          onChange={(e) =>
            setArticleData({
              ...articleData,
              articleContentTwo: e.target.value,
            })
          }
        />
      </div>
      {/* article content three */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Article content three</h1>
        <textarea
          rows={10}
          placeholder="first row article data"
          className="px-4 py-3 outline-none border rounded-lg w-full"
          value={articleData.articleContentThree}
          onChange={(e) =>
            setArticleData({
              ...articleData,
              articleContentThree: e.target.value,
            })
          }
        />
      </div>
      {/* content image & instagram embedd */}
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 w-full gap-8">
        <div>
          <h1 className="text-2xl font-medium">Article Content Image</h1>
          <input
            type="file"
            accept="image/*"
            ref={articleContentImageRef}
            placeholder="tumbnail image"
            className="px-4 py-3 outline-none rounded-lg w-full"
            onChange={(e) =>
              handleUploads(e, "articleContentImage", "articleContentImageUrl")
            }
          />
          {uploadImagesToDisplay.articleContentImageUrl && (
            <div className="flex flex-col gap-3">
              <div className="relative h-52 aspect-square">
                <Image
                  src={uploadImagesToDisplay.articleContentImageUrl}
                  alt="Uploded Image"
                  fill
                  sizes="100%,100%"
                  className="object-contain bottom-0"
                />
              </div>
              <button
                onClick={() =>
                  handleRemoveUploads(
                    "articleContentImage",
                    "articleContentImageUrl",
                    articleContentImageRef
                  )
                }
                className="px-4 py-2 text-white bg-darkRed z-10"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-medium">Instagram embed</h1>
          <input
            type="text"
            placeholder="Instagram embed"
            className="w-full px-3 py-2 outline-none border-none rounded-md"
            onChange={(e) =>
              setArticleData({
                ...articleData,
                articleContentInstagram: e.currentTarget.value,
              })
            }
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setArticleData({
                  ...articleData,
                  articleContentInstagram: e.currentTarget.value,
                });
              }
            }}
            value={articleData.articleContentInstagram}
          />
          {articleData.articleContentInstagram && (
            <div
              className="h-96 overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html:
                  DOMpurify.sanitize(articleData.articleContentInstagram) || "",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleFormLeftSide;

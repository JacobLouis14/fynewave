"use client";
import { updateArticle } from "@/actions/sActions";
import InfiniteSpinner from "@/components/common/infiniteSpinner";
import InputTags from "@/lib/tags-input/inputTags";
import { ArticleModel } from "@/models/article";
import { CategoryModel } from "@/models/category";
import { useAddNewArticleApiMutation } from "@/store/api";
import extractErrMsgFromRtk from "@/utils/extractErrorMsg";
import { fileToUrl } from "@/utils/fileToUrl";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import DOMpurify from "isomorphic-dompurify";

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
  articleToUpdate?: ArticleModel | null;
  categoriesData: {
    categories: CategoryModel[] | null;
    categoriesError: { message: string } | null;
  };
}

const ArticleForm = ({ articleToUpdate, categoriesData }: Props) => {
  const [articleData, setArticleData] = useState<ArticleModel>({
    title: articleToUpdate?.title || "",
    banner: articleToUpdate?.banner || null,
    thumbnail: articleToUpdate?.thumbnail || null,
    desc: articleToUpdate?.desc || "",
    articleContentOne: articleToUpdate?.articleContentOne || "",
    articleContentTwo: articleToUpdate?.articleContentTwo || "",
    articleContentThree: articleToUpdate?.articleContentThree || "",
    tags: articleToUpdate?.tags || [],
    author: articleToUpdate?.author || "",
    category: articleToUpdate?.category || "",
    songsIframes: articleToUpdate?.songsIframes || [],
    videoIframes: articleToUpdate?.videoIframes || [],
    alternativeTitle: articleToUpdate?.alternativeTitle || "",
    articleContentImage: articleToUpdate?.articleContentImage || null,
    articleContentInstagram: articleToUpdate?.articleContentInstagram || "",
  });
  const [uploadImagesToDisplay, setUploadImagesToDisplay] = useState<{
    imageUrl: string;
    bannerUrl: string;
    articleContentImageUrl: string;
  }>({
    imageUrl:
      typeof articleToUpdate?.thumbnailUrl === "string"
        ? articleToUpdate?.thumbnailUrl
        : "",
    bannerUrl:
      typeof articleToUpdate?.bannerUrl === "string"
        ? articleToUpdate?.bannerUrl
        : "",
    articleContentImageUrl:
      typeof articleToUpdate?.articleContentImageUrl === "string"
        ? articleToUpdate?.articleContentImageUrl
        : "",
  });
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);
  const articleContentImageRef = useRef<HTMLInputElement>(null);
  const [addNewArticle, { isLoading }] = useAddNewArticleApiMutation();
  const [updationLoading, setUpdationLoading] = useState(false);
  const [songsIframeInputValue, setSongsIframeInputValue] = useState("");
  const [videoIframeInputValue, setVideoIframeInputValue] = useState("");

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

  // handle Image uploads
  const handleUploads = (
    e: React.ChangeEvent<HTMLInputElement>,
    destination: keyof ArticleModel,
    urlDes: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    }
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = fileToUrl(file);
      setArticleData((prevData) => ({
        ...prevData,
        [destination]: file,
      }));
      setUploadImagesToDisplay((prevDisplay) => ({
        ...prevDisplay,
        [urlDes]: url,
      }));
    }
  };

  // remove uploads
  const handleRemoveUploads = (
    dataFile: keyof ArticleModel,
    urlData: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    },
    reference: React.RefObject<HTMLInputElement>
  ) => {
    setUploadImagesToDisplay((prevData) => ({
      ...prevData,
      [urlData]: "",
    }));
    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [dataFile]: null,
    }));
    if (reference.current) {
      reference.current.value = "";
    }
  };

  // publish Handler $ update Handler
  const handlePublish = async () => {
    const {
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      banner,
      thumbnail,
      tags,
      author,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentImage,
      articleContentInstagram,
    } = articleData;
    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !banner ||
      !thumbnail ||
      !author ||
      tags.length === 0 ||
      !category
    ) {
      toast.warning("fill the forms completly");
      return;
    }

    // loading for updation
    articleToUpdate ? setUpdationLoading(true) : setUpdationLoading(false);

    // if data available
    const articleFormData = new FormData();
    articleFormData.append("title", title);
    articleFormData.append("desc", desc);
    articleFormData.append("articleContentOne", articleContentOne);
    articleFormData.append("articleContentTwo", articleContentTwo);
    articleFormData.append("articleContentThree", articleContentThree);
    articleFormData.append("author", author);
    articleFormData.append("category", category);
    articleContentInstagram &&
      articleFormData.append(
        "articleContentInstagram",
        articleContentInstagram
      );
    articleContentImage &&
      articleFormData.append("articleContentImage", articleContentImage);
    alternativeTitle &&
      articleFormData.append("alternativeTitle", alternativeTitle);
    if (typeof banner === "string") {
      articleFormData.append("bannerUrl", banner);
    } else {
      articleFormData.append("banner", banner);
    }
    if (typeof thumbnail === "string") {
      articleFormData.append("thumbnailUrl", thumbnail);
    } else {
      articleFormData.append("thumbnail", thumbnail);
    }
    songsIframes?.map((sFrame) => {
      articleFormData.append("songsIframes", sFrame);
    });
    videoIframes?.map((vFrame) => {
      articleFormData.append("videoIframes", vFrame);
    });
    articleData?.tags.forEach((tag) => {
      articleFormData.append("tags", tag);
    });

    // for update
    if (articleToUpdate) {
      articleToUpdate._id
        ? articleFormData.append("_id", articleToUpdate._id)
        : null;
      const { data, error } = await updateArticle(articleFormData);

      if (error) {
        toast.error(`Error in updating Article`);
        setUpdationLoading(false);
        return;
      }
      if (data) {
        toast.success("sucessfully update article");
        setUpdationLoading(false);
        return;
      }
    } else {
      // for publish
      const { error, data } = await addNewArticle(articleFormData);

      if (error) {
        const errMsg = extractErrMsgFromRtk(error);
console.log(error);
        toast.error(`Error in adding Article.${errMsg}`);
        return;
      }
      if (data) {
        toast.success("sucessfully added new article");
        return;
      }
    }
  };

  // songs iframe keydown handler
  const songsIframeEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && songsIframeInputValue.trim() !== "") {
      setArticleData({
        ...articleData,
        songsIframes: [
          ...(articleData.songsIframes || []),
          songsIframeInputValue,
        ],
      });
      setSongsIframeInputValue("");
    }
  };

  // songs i frame delete handler
  const handleIframeDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedIframes = articleData.songsIframes?.filter(
      (_, i) => i != index
    );
    setArticleData({
      ...articleData,
      songsIframes: updatedIframes,
    });
  };

  // songs iframe keydown handler
  const videoIframeEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && videoIframeInputValue.trim() !== "") {
      setArticleData({
        ...articleData,
        videoIframes: [
          ...(articleData.videoIframes || []),
          videoIframeInputValue,
        ],
      });
      setVideoIframeInputValue("");
    }
  };

  // songs i frame delete handler
  const handlevideoIframeDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedIframes = articleData.videoIframes?.filter(
      (_, i) => i != index
    );
    setArticleData({
      ...articleData,
      videoIframes: updatedIframes,
    });
  };

  // appending the instagram embedding script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="px-4 py-8 grid grid-rows-1 grid-cols-1 md:grid-cols-7 gap-3">
      {/* left side */}
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
                handleUploads(
                  e,
                  "articleContentImage",
                  "articleContentImageUrl"
                )
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
                    DOMpurify.sanitize(articleData.articleContentInstagram) ||
                    "",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="md:col-span-2 flex flex-col gap-5">
        {/* tumbnail */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">Tumbnail</h1>
          <input
            type="file"
            accept="image/*"
            ref={mainImageInputRef}
            placeholder="tumbnail image"
            className="px-4 py-3 outline-none rounded-lg w-full"
            onChange={(e) => handleUploads(e, "thumbnail", "imageUrl")}
          />
          {uploadImagesToDisplay.imageUrl && (
            <div className="flex flex-col gap-3">
              <div className="relative h-52 aspect-square">
                <Image
                  src={uploadImagesToDisplay.imageUrl}
                  alt="Uploded Image"
                  fill
                  sizes="100%,100%"
                  className="object-contain bottom-0"
                />
              </div>
              <button
                onClick={() =>
                  handleRemoveUploads(
                    "thumbnail",
                    "imageUrl",
                    mainImageInputRef
                  )
                }
                className="px-4 py-2 text-white bg-darkRed z-10"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        {/* banner */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">Banner</h1>
          <input
            type="file"
            accept="image/*"
            ref={bannerImageInputRef}
            placeholder="Banner image"
            className="px-4 py-3 outline-none  rounded-lg w-full"
            onChange={(e) => handleUploads(e, "banner", "bannerUrl")}
          />
          {uploadImagesToDisplay.bannerUrl && (
            <div className="flex flex-col gap-5">
              <div className="relative h-52 aspect-square">
                <Image
                  src={uploadImagesToDisplay.bannerUrl}
                  alt="Uploded Image"
                  fill
                  sizes="100%,100%"
                  className="object-contain bottom-0"
                />
              </div>
              <button
                onClick={() =>
                  handleRemoveUploads(
                    "banner",
                    "bannerUrl",
                    bannerImageInputRef
                  )
                }
                className="px-4 py-2 text-white bg-darkRed z-10"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        {/* tags */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Tags</h1>
          <InputTags value={articleData} saveChangedValue={setArticleData} />
        </div>
        {/* author */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-medium">Author</h1>
          <input
            type="text"
            placeholder="author name"
            className="px-4 py-3 outline-none border rounded-lg w-full"
            value={articleData.author}
            onChange={(e) =>
              setArticleData({ ...articleData, author: e.target.value })
            }
          />
        </div>
        {/* category */}
        {categoriesData.categoriesError && categoriesData.categories ? (
          <p>Error in retrieving categories</p>
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-medium">Category</h1>
            <select
              name=""
              id=""
              className="px-4 py-3 outline-none border rounded-lg w-full"
              onChange={(e) =>
                setArticleData({ ...articleData, category: e.target.value })
              }
              value={articleData.category}
            >
              <option value="" disabled>
                Select category
              </option>
              {categoriesData.categories?.map(
                (category) =>
                  category.category && (
                    <option value={category.category} key={category._id}>
                      {category.category}
                    </option>
                  )
              )}
            </select>
          </div>
        )}
        {/* songs iframe */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">songs Iframes</h1>
            <input
              type="text"
              placeholder="songs Iframe eg: from soundcloud etc..."
              className="w-full px-3 py-2 outline-none border-none rounded-md"
              onChange={(e) => setSongsIframeInputValue(e.target.value)}
              onKeyDown={(e) => songsIframeEnterHandler(e)}
              value={songsIframeInputValue}
            />
          </div>
          {articleData.songsIframes && articleData.songsIframes?.length > 0 && (
            <div className="flex flex-col gap-2">
              {articleData.songsIframes.map((sIframe, index) => (
                <div key={index} className="w-full flex flex-col gap-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sIframe,
                    }}
                    className="object-contain w-full"
                  />
                  <button
                    className="w-full px-3 py-2 outline-none border-none bg-lightRed text-white rounded-md"
                    onClick={(e) => handleIframeDelete(index, e)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Videos iframe */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">Videos Iframes</h1>
            <input
              type="text"
              placeholder="use width=100% and height=100%"
              className="w-full px-3 py-2 outline-none border-none rounded-md"
              onChange={(e) => setVideoIframeInputValue(e.target.value)}
              onKeyDown={(e) => videoIframeEnterHandler(e)}
              value={videoIframeInputValue}
            />
          </div>
          {articleData.videoIframes && articleData.videoIframes?.length > 0 && (
            <div className="flex flex-col gap-2">
              {articleData.videoIframes.map((vIframe, index) => (
                <div key={index} className="w-full flex flex-col gap-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: vIframe,
                    }}
                    className="object-contain w-full"
                  />
                  <button
                    className="w-full px-3 py-2 outline-none border-none bg-lightRed text-white rounded-md"
                    onClick={(e) => handlevideoIframeDelete(index, e)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* publish button */}
        <button
          className={`${
            isLoading || updationLoading ? "" : "py-2"
          } bg-darkRed text-white rounded-lg flex items-center justify-center hover:cursor-pointer mt-10`}
          onClick={handlePublish}
          disabled={updationLoading || isLoading}
        >
          <h1>{articleToUpdate ? "Update" : "Publish"}</h1>
          {(isLoading || updationLoading) && (
            <iframe
              className="h-10 aspect-square"
              src="https://lottie.host/embed/a2a62e65-0443-4831-a1df-6106a3f938d1/LTiEdzxULh.json"
            ></iframe>
          )}
        </button>
      </div>
    </div>
  );
};

export default ArticleForm;

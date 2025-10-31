import InputTags from "@/lib/tags-input/inputTags";
import { ArticleModel } from "@/models/article";
import { CategoryModel } from "@/models/category";
import Image from "next/image";
import React, { useRef } from "react";

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
  categoriesData: {
    categories: CategoryModel[] | null;
    categoriesError: { message: string } | null;
  };
  songsIframeInputValue: string;
  setSongsIframeInputValue: React.Dispatch<React.SetStateAction<string>>;
  songsIframeEnterHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleIframeDelete: (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  videoIframeInputValue: string;
  setVideoIframeInputValue: React.Dispatch<React.SetStateAction<string>>;
  videoIframeEnterHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlevideoIframeDelete: (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  author: string;
}

const ArticleFormRightSide = ({
  articleData,
  handleRemoveUploads,
  handleUploads,
  setArticleData,
  uploadImagesToDisplay,
  categoriesData,
  songsIframeInputValue,
  setSongsIframeInputValue,
  songsIframeEnterHandler,
  handleIframeDelete,
  videoIframeEnterHandler,
  handlevideoIframeDelete,
  setVideoIframeInputValue,
  videoIframeInputValue,
  author,
}: Props) => {
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
                handleRemoveUploads("thumbnail", "imageUrl", mainImageInputRef)
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
                handleRemoveUploads("banner", "bannerUrl", bannerImageInputRef)
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
          value={author}
          // onChange={(e) =>
          //   setArticleData({ ...articleData, author: e.target.value })
          // }
          readOnly
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
      {/* group */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">Group</h1>
        <select
          className="px-4 py-3 outline-none border rounded-lg w-full"
          onChange={(e) =>
            setArticleData({ ...articleData, group: e.target.value })
          }
          value={articleData.group || "default"}
        >
          <option value="default" disabled>
            Select group
          </option>
          <option value="article">Article</option>
          <option value="song">Song</option>
          <option value="artist">Artist</option>
          <option value="dj">Dj</option>
        </select>
      </div>
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
    </>
  );
};

export default ArticleFormRightSide;

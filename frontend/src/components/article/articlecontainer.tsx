import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Tagscard from "./tagscard";
import Socialicons from "./socialicons";
import { ArticleModel } from "@/models/article";
import { toReadableDate } from "@/lib/utils/toReadableDate";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import InstagramEmbedd from "./instagramEmbedd";

interface Props {
  articleDataBySlug: ArticleModel | null;
}

const Articlecontainer = ({ articleDataBySlug }: Props) => {
  // const sanitizedInstagram = DOMPurify.sanitize(
  //   articleDataBySlug?.articleContentInstagram || "",
  //   {
  //     ALLOWED_TAGS: ["iframe"],
  //     ALLOWED_ATTR: ["href", "src", "alt", "title", "style", "width"],
  //   }
  // );

  return (
    <div className="w-full h-full">
      {/* header portion */}
      <div className="flex flex-col gap-5">
        <h1 className="font-raleway text-4xl font-medium">
          {articleDataBySlug?.title}
        </h1>
        <div className="flex gap-5 items-center flex-wrap">
          {/* post details */}
          <div className="flex gap-8 text-[#7D7983]">
            <div className="flex items-center gap-2 text-sm lg:text-md">
              <PersonOutlineOutlinedIcon />
              <p className="font-poppins">{articleDataBySlug?.author}</p>
            </div>
            <div className="flex gap-2 items-center text-sm lg:text-md">
              <CalendarMonthOutlinedIcon />
              <p className="font-poppins">
                {toReadableDate(articleDataBySlug?.createdAt || "")}
              </p>
            </div>
          </div>
          {/* tags */}
          <div className="flex flex-wrap gap-3">
            {articleDataBySlug?.tags.map((tagValue, index) => (
              <Tagscard tagName={tagValue} key={index} />
            ))}
          </div>
          {/* icons */}
          <Socialicons />
        </div>
      </div>
      {/* content  */}
      <div className="pt-8 flex flex-col gap-5">
        {/* 1 st row */}
        <div>
          <p className="text-justify">{articleDataBySlug?.articleContentOne}</p>
        </div>
        {/* 2nd row */}
        <div>
          <div className="w-full md:w-96 aspect-square bg-gray-100 mr-4 mb-2 float-left relative">
            {articleDataBySlug?.articleContentImageUrl ? (
              <Image
                src={articleDataBySlug?.articleContentImageUrl}
                alt="Article image"
                fill
                sizes="100% 100%"
                className="object-cover"
              />
            ) : (
              <Image
                src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                alt="No image"
                fill
                sizes="100% 100%"
              />
            )}
          </div>
          <div className="w-full text-justify">
            <p>{articleDataBySlug?.articleContentTwo}</p>
          </div>
        </div>
        {/* 3rd row */}
        <div>
          <div className="w-full sm:w-96 h-96 ml-4 float-right overflow-y-scroll overflow-x-hidden">
            {/* <div
              dangerouslySetInnerHTML={{
                __html: articleDataBySlug?.articleContentInstagram || "",
              }}
            /> */}
            <InstagramEmbedd
              embeddCode={articleDataBySlug?.articleContentInstagram || ""}
            />
          </div>
          <div className="w-full text-justify">
            <p>{articleDataBySlug?.articleContentThree}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articlecontainer;

import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Link from "next/link";
import Image from "next/image";
import { ArticleModel } from "@/models/article";
import { toReadableDate } from "@/lib/utils/toReadableDate";

interface Props {
  articleData: ArticleModel;
}

const Horizontalsmallcard = ({ articleData }: Props) => {
  if (!articleData) return;

  return (
    <Link href={articleData.slug || "slug"} className="w-full">
      <div className="flex max-h-40 w-full">
        {/* image */}
        <div className="relative aspect-square w-1/3 shrink-0 overflow-hidden">
          <Image
            src={
              articleData.thumbnailUrl
                ? articleData.thumbnailUrl
                : "https://wallpapers.com/images/featured/image-79gc4p3mqu7an848.jpg"
            }
            alt="post image"
            fill
            sizes="100%,100%"
            className="object-cover object-center h-full w-full"
          />
        </div>
        {/* content */}
        <div className="flex flex-col font-poppins pt-2 pl-2 w-full">
          <h6 className="line-clamp-1 font-normal text-xl">
            {articleData.title}
          </h6>
          <p className=" line-clamp-2 2xl:line-clamp-3 text-sm md:mt-1 lg:mt-3">
            {articleData.desc}
          </p>
          <div className="flex flex-col xl:flex-row mt-3 gap-2 justify-between text-[#7D7983] w-full">
            <div className="flex items-center gap-3 text-sm lg:text-md">
              <PersonOutlineOutlinedIcon />
              <p className="font-poppins">{articleData.author}</p>
            </div>
            <div className="flex gap-3 items-center text-sm lg:text-md">
              <CalendarMonthOutlinedIcon />
              <p className="font-poppins">
                {toReadableDate(articleData.updatedAt || "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Horizontalsmallcard;

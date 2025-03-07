import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Link from "next/link";
import Image from "next/image";
import { ArticleModel } from "@/models/article";
import { toReadableDate } from "@/lib/utils/toReadableDate";

interface Props {
  cardData?: ArticleModel;
}

const Horizontalcards = ({ cardData }: Props) => {
  return (
    <Link href={cardData?.slug || "slug"}>
      <div className="flex flex-col md:flex-row max-w-full">
        <div className="relative aspect-video md:aspect-square md:w-64 shrink-0">
          <Image
            src={
              cardData?.thumbnailUrl
                ? cardData?.thumbnailUrl
                : "https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e.png"
            }
            alt="post image"
            fill
            className="object-cover"
            sizes="100%,100%"
          />
        </div>
        <div className="flex flex-col px-4 py-3 overflow-hidden w-full">
          <h6 className="font-medium font-raleway text-2xl md:text-3xl line-clamp-2">
            {cardData?.title}
          </h6>
          <p className="font-poppins mt-2 md:mt-5 line-clamp-3 text-balance">
            {cardData?.desc}
          </p>
          <div className="flex flex-col md:flex-row mt-3 md:mt-5 gap-3 justify-between text-[#7D7983] flex-wrap">
            <div className="flex gap-3 items-center">
              <PersonOutlineOutlinedIcon className="md:text-4xl" />
              <p className="font-poppins">{cardData?.author}</p>
            </div>
            <div className="flex gap-3 items-center">
              <CalendarMonthOutlinedIcon className="md:text-4xl" />
              <p className="font-poppins">
                {toReadableDate(cardData?.updatedAt || "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Horizontalcards;

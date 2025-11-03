"use client";
import React, { useState } from "react";
import DeleteArticleBtn from "./deleteArticleBtn";
import Link from "next/link";
import FeaturedSongsTogglerButton from "../featuredSongsToggler";
import CheckThemOutTogglerButton from "../checkThemOutToggler";
import SpotLightTogglerButton from "../spotLightToggler";
import LandingTogglerButton from "../landingToggler";

interface Props {
  articleId?: string | null;
  isSongOfTheWeek?: boolean;
  isArtistOfTheWeek?: boolean;
  isDjOfTheWeek?: boolean;
  isLandingCard?: boolean;
}

const PublishTableMoreButton = ({
  articleId,
  isArtistOfTheWeek,
  isDjOfTheWeek,
  isLandingCard,
  isSongOfTheWeek,
}: Props) => {
  // console.log(articleId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //   BUTTON CLICK HANDLER
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      <button onClick={handleButtonClick} className="w-6">
        <svg
          fill="#ba091d"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32.055 32.055"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
      {isModalOpen && (
        <div className="absolute top-5 right-0 px-3 py-2 bg-white rounded-md min-w-52 min-h-32 border flex flex-col gap-3 z-40">
          <div className="flex items-center justify-between gap-2 py-2">
            <p>Featured songs</p>
            <FeaturedSongsTogglerButton
              articleId={articleId || ""}
              isSongOfTheWeek={isSongOfTheWeek}
            />
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <p>Check then out</p>
            <CheckThemOutTogglerButton
              articleId={articleId || ""}
              isArtistOfTheWeek={isArtistOfTheWeek}
            />
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <p>On the spotlight</p>
            <SpotLightTogglerButton
              articleId={articleId || ""}
              isDjOfTheWeek={isDjOfTheWeek}
            />
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <p>Landing card</p>
            <LandingTogglerButton
              articleId={articleId || ""}
              isLandingCard={isLandingCard}
            />
          </div>
          <Link
            href={`/dashboard/articles/edit-article?query=${articleId}`}
            className="px-3 py-1 bg-blue-600 text-white rounded-md h-8 text-center"
          >
            Edit
          </Link>
          <DeleteArticleBtn articleId={articleId} />
        </div>
      )}
    </div>
  );
};

export default PublishTableMoreButton;

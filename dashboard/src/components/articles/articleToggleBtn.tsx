"use client";
import {
  addArtistOfTheWeekAction,
  addDjsOfTheWeekAction,
  addSongOfTheWeekAction,
  updateLandingCards,
} from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isSongOfTheWeek?: boolean;
  isArtistOfTheWeek?: boolean;
  isDjOfTheWeek?: boolean;
  isLandingCard?: boolean;
  articleId: string;
  name: string;
}

const ArticleToggleBtn = ({
  isArtistOfTheWeek,
  isDjOfTheWeek,
  isSongOfTheWeek,
  isLandingCard,
  articleId,
  name,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [djPositioningNumber, setDjPositioningNumber] = useState<number | null>(
    null
  );
  const [landingCardTitle, setLandingCardTitle] = useState<string>("");
  const [landingCardCategoryTitle, setLandingCardCategoryTitle] =
    useState<string>("");

  //   session
  const { data: sessionData } = useSession();

  const handleTogglerChange = () => setIsModalOpen(true);
  const cancelHandler = () => {
    if (djPositioningNumber) setDjPositioningNumber(null);
    if (landingCardTitle) setLandingCardTitle("");
    setIsModalOpen(false);
  };

  const handleProcced = async () => {
    try {
      if (articleId && name === "song-of-the-week") {
        setIsLoading(true);

        const { data, error } = await addSongOfTheWeekAction(
          articleId,
          sessionData?.user.token || ""
        );
        if (error) {
          console.log(error);
          toast.error("error in adding songs of the week");
          return;
        }
        if (data) {
          toast.success("sucessfully added songs of the week");
          cancelHandler();
          return;
        }
      }
      if (articleId && name === "artist-of-the-week") {
        setIsLoading(true);

        const { data, error } = await addArtistOfTheWeekAction(
          articleId,
          sessionData?.user.token || ""
        );
        if (error) {
          console.log(error);
          toast.error("error in adding artist of the week");
          return;
        }
        if (data) {
          toast.success("sucessfully added artist of the week");
          cancelHandler();
          return;
        }
      }
      if (articleId && name === "dj-of-the-week") {
        if (isDjOfTheWeek === false) {
          if (!djPositioningNumber || djPositioningNumber > 3) {
            return toast.warn("enter dj position number");
          }
        }
        setIsLoading(true);

        const { data, error } = await addDjsOfTheWeekAction(
          articleId,
          sessionData?.user.token || "",
          djPositioningNumber
        );
        if (error) {
          console.log(error);
          toast.error("error in adding dj of the week");
          return;
        }
        if (data) {
          toast.success("sucessfully added dj of the week");
          cancelHandler();

          return;
        }
      }
      if (articleId && name === "landing-card") {
        if (
          (!landingCardTitle || !landingCardCategoryTitle) &&
          isLandingCard === false
        )
          return toast.warn("enter landing card title");
        setIsLoading(true);

        const { data, error } = await updateLandingCards(
          articleId,
          sessionData?.user.token || "",
          landingCardTitle,
          landingCardCategoryTitle
        );
        if (error) {
          console.log(error);
          toast.error("error in adding landing cards");
          return;
        }
        if (data) {
          toast.success("sucessfully added landing cards");
          cancelHandler();

          return;
        }
      }
    } catch (error) {
      console.log(`error in making showcases error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={
            isArtistOfTheWeek === true ||
            isDjOfTheWeek === true ||
            isSongOfTheWeek === true ||
            isLandingCard === true
          }
          type="checkbox"
          className="sr-only peer"
          onChange={handleTogglerChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

      {isModalOpen && (
        <div className="fixed top-0 left-0 h-full z-10 w-full flex justify-center items-center bg-gray-600 bg-opacity-40">
          <div className="flex flex-col items-center gap-4 w-96 rounded-md px-4 py-2 bg-white">
            <span className="ms-auto cursor-pointer" onClick={cancelHandler}>
              X
            </span>
            <p>Are you sure ?</p>
            {name === "dj-of-the-week" && isDjOfTheWeek === false && (
              <div>
                <input
                  type="number"
                  className="outline-none rounded-md px-4 py-3 w-full border"
                  placeholder="Dj positioning 1-3"
                  onChange={(e) =>
                    setDjPositioningNumber(parseInt(e.target.value))
                  }
                />
              </div>
            )}
            {name === "landing-card" && isLandingCard === false && (
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="outline-none rounded-md px-4 py-3 w-full border"
                  placeholder="landing card title"
                  onChange={(e) => setLandingCardTitle(e.target.value)}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value="artist-of-the-week"
                      id="article-toggle-btn-artist-of-the-week"
                      name="article-landing-category-title"
                      checked={
                        landingCardCategoryTitle === "artist-of-the-week"
                      }
                      onChange={(e) => {
                        setLandingCardCategoryTitle(e.target.value);
                      }}
                    />
                    <label htmlFor="article-toggle-btn-artist-of-the-week">
                      Artist of the week
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value="song-of-the-week"
                      id="article-toggle-btn-song-of-the-week"
                      name="article-landing-category-title"
                      checked={landingCardCategoryTitle === "song-of-the-week"}
                      onChange={(e) => {
                        setLandingCardCategoryTitle(e.target.value);
                      }}
                    />
                    <label htmlFor="article-toggle-btn-song-of-the-week">
                      Song of the week
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value="dj-of-the-week"
                      id="article-toggle-btn-dj-of-the-week"
                      name="article-landing-category-title"
                      checked={landingCardCategoryTitle === "dj-of-the-week"}
                      onChange={(e) =>
                        setLandingCardCategoryTitle(e.target.value)
                      }
                    />
                    <label htmlFor="article-toggle-btn-dj-of-the-week">
                      DJ of the week
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-6 mt-5">
              <button
                className="bg-red-800 rounded-md px-4 py-2 text-white"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                className="bg-green-900 rounded-md px-4 py-2 text-white"
                onClick={handleProcced}
                disabled={isLoading}
              >
                Procced
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleToggleBtn;

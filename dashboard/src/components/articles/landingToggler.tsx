"use client";
import {
  addArtistOfTheWeekAction,
  addDjsOfTheWeekAction,
  createLandingCards,
  deleteArtistsOfTheWeek,
  deleteDjsoFTheWeek,
  deleteLandingCards,
} from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isLandingCard?: boolean;
  articleId: string;
}

const LandingTogglerButton = ({ isLandingCard, articleId }: Props) => {
  const { data: sessionData } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [landingCardTitle, setLandingCardTitle] = useState<string>("");
  const [landingCardCategoryTitle, setLandingCardCategoryTitle] =
    useState<string>("");

  const handleTogglerChange = () => setIsModalOpen(true);
  const cancelHandler = () => {
    setLandingCardTitle("");
    setIsModalOpen(false);
  };

  //   HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!isLandingCard) {
        const { data, error } = await createLandingCards(
          articleId,
          sessionData?.user.token || "",
          landingCardTitle,
          landingCardCategoryTitle
        );
        if (error) {
          console.log(error);
          toast.error("error in adding from landing cards");
          return;
        }
        if (data) {
          toast.success("sucessfully add landing cards");
          cancelHandler();
          return;
        }
      } else {
        const { data, error } = await deleteLandingCards(
          articleId,
          sessionData?.user.token || ""
        );
        if (error) {
          console.log(error);
          toast.error("error in removing landing cards");
          return;
        }
        if (data) {
          toast.success("sucessfully removed landing cards");
          cancelHandler();
          return;
        }
      }
    } catch (error) {
      console.log(`error in landing cards toggler: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={isLandingCard === true}
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
            <div>
              {isLandingCard === false && (
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
                        checked={
                          landingCardCategoryTitle === "song-of-the-week"
                        }
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
            </div>
            <div className="flex gap-6 mt-5">
              <button
                className="bg-red-800 rounded-md px-4 py-2 text-white"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                className="bg-green-900 rounded-md px-4 py-2 text-white"
                onClick={handleSubmit}
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

export default LandingTogglerButton;

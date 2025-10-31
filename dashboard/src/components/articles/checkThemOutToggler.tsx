"use client";
import {
  addArtistOfTheWeekAction,
  deleteArtistsOfTheWeek,
} from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isArtistOfTheWeek?: boolean;
  articleId: string;
}

const CheckThemOutTogglerButton = ({ isArtistOfTheWeek, articleId }: Props) => {
  const { data: sessionData } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglerChange = () => setIsModalOpen(true);
  const cancelHandler = () => setIsModalOpen(false);

  //   HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!isArtistOfTheWeek) {
        const { data, error } = await addArtistOfTheWeekAction(
          articleId,
          sessionData?.user.token || ""
        );
        if (error) {
          console.log(error);
          toast.error("error in removing from artist of the week");
          return;
        }
        if (data) {
          toast.success("sucessfully remove artist of the week");
          cancelHandler();
          return;
        }
      } else {
        const { data, error } = await deleteArtistsOfTheWeek(
          articleId,
          sessionData?.user.token || ""
        );
        if (error) {
          console.log(error);
          toast.error("error in updating artist of the week");
          return;
        }
        if (data) {
          toast.success("sucessfully update artist of the week");
          cancelHandler();
          return;
        }
      }
    } catch (error) {
      console.log(`error in artist of week toggler: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={isArtistOfTheWeek === true}
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

export default CheckThemOutTogglerButton;

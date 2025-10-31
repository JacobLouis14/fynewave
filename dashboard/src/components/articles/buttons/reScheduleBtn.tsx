"use client";
import { articleReSchedule } from "@/actions/sActions";
import { error } from "console";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleId?: string | null;
}

const ReScheduledBtn = ({ articleId }: Props) => {
  const session = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // open modal handler
  const handleOpen = () => setOpenModal(true);
  // close handler
  const handleClose = () => {
    setScheduleDate("");
    setOpenModal(false);
  };

  //   SCHEDULE HANDLER
  const handleReschedule = async () => {
    if (!articleId) return toast.warning("article data missing");
    if (!scheduleDate) return toast.warning("schedule date required");

    try {
      setIsLoading(true);

      const body = {
        scheduledDate: scheduleDate,
      };

      const response = await articleReSchedule(
        articleId,
        session.data?.user.token || "",
        body
      );
      console.log(response);

      if (response.error) {
        return toast.error(response.error.message || "something went wrong");
      }
      if (response.data) {
        toast.success(response.data.message || "Schedule success");
        handleClose();
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(`error in re-scheduling`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`py-1 px-2 bg-gray-300 text-darkRed rounded-lg flex items-center justify-center hover:cursor-pointer`}
        onClick={handleOpen}
      >
        <h1 className="text-sm">Re Schedule</h1>
      </button>

      {openModal && (
        <div className="fixed bg-black/40 top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="bg-white flex flex-col gap-5 w-96 px-5 py-3 rounded-md">
            <div className="flex justify-between">
              <h6 className="font-semibold">Schedule!</h6>
              <button onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ba091d"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-5 py-5">
              <p className="text-sm">You must need to select a date and time</p>
              <input
                className="border outline-none px-5 rounded-md"
                type="datetime-local"
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            <div className="flex gap-3 ms-auto">
              <button
                onClick={handleClose}
                className="border rounded-md px-5 py-1"
              >
                cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={!scheduleDate || isLoading}
                className="border rounded-md px-5 py-1 bg-darkRed text-white disabled:bg-gray-400"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReScheduledBtn;

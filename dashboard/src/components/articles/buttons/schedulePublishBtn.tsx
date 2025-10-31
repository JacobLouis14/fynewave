"use client";
import { updateArticle } from "@/actions/sActions";
import { Article, ArticleModel } from "@/models/article";
import extractErrMsgFromRtk from "@/utils/extractErrorMsg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleData: Article | ArticleModel | null;
}

const SchedulePublishBtn = ({ articleData }: Props) => {
  const router = useRouter();
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

  const handleSchedule = async (statusValue: string) => {
    if (!articleData) return;

    const articleId = articleData._id;
    const articleFormData = new FormData();
    articleFormData.append("title", articleData.title);
    articleFormData.append("desc", articleData.desc);
    articleFormData.append("articleContentOne", articleData.articleContentOne);
    articleFormData.append("articleContentTwo", articleData.articleContentTwo);
    articleFormData.append(
      "articleContentThree",
      articleData.articleContentThree
    );
    articleFormData.append("category", articleData.category);
    if (typeof articleData.thumbnail === "string") {
      articleFormData.append("thumbnailUrl", articleData.thumbnail);
    }
    if (typeof articleData.banner === "string") {
      articleFormData.append("bannerUrl", articleData.banner);
    }
    articleData?.tags.forEach((tag) => {
      articleFormData.append("tags", tag);
    });
    articleFormData.append("status", statusValue);
    articleFormData.append("reviewedBy", session.data?.user.id || "");
    articleFormData.append("group", articleData.group);
    articleFormData.append("scheduledDate", scheduleDate);

    try {
      setIsLoading(true);
      // for publish
      const { data, error } = await updateArticle(
        articleId || "",
        session.data?.user.token || "",
        articleFormData
      );

      if (error) {
        const errMsg = extractErrMsgFromRtk(error);
        console.log(error);
        toast.error(`Error in scheduling Article.${errMsg}`);
        return;
      }
      if (data) {
        toast.success("sucessfully scheduled article");
        handleClose();
        router.back();
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error in scheduling Article.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`py-2 bg-gray-300 text-darkRed rounded-lg flex items-center justify-center hover:cursor-pointer`}
        onClick={handleOpen}
      >
        <h1 className="text-sm">Schedule Publish</h1>
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
                onClick={() => handleSchedule("scheduled")}
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

export default SchedulePublishBtn;

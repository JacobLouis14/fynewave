"use client";
import { softDeleteArticle } from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleId: string | null | undefined;
}

const DeleteArticleBtn = ({ articleId }: Props) => {
  const session = useSession();
  const [cnfDelete, setCnfDelete] = useState<boolean>(false);
  // delete Handler
  const handlerDeleteArticle = async () => {
    if (articleId) {
      const toastId = toast.loading("Deleting...");

      try {
        const { data, error, isLoading } = await softDeleteArticle(
          articleId,
          session.data?.user.token || ""
        );

        if (error) {
          toast.update(toastId, {
            render: "Error in deleteing Article",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
        if (data) {
          toast.update(toastId, {
            render: "Article deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setCnfDelete(false);
        }
      } catch (error) {
        console.log(error);

        toast.update(toastId, {
          render: "Error in deleteing Article",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded-md h-8"
        onClick={() => setCnfDelete(true)}
      >
        Delete
      </button>

      {cnfDelete && (
        <div className="fixed bg-black/40 top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="bg-white flex flex-col gap-5 w-96 px-5 py-3 rounded-md">
            <div className="flex justify-between">
              <h6 className="font-semibold">Warning!</h6>
              <button onClick={() => setCnfDelete(false)}>
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
            <div className="text-center py-5">
              <p>Are you sure about deleting?</p>
            </div>
            <div className="flex gap-3 ms-auto">
              <button
                onClick={() => setCnfDelete(false)}
                className="border rounded-md px-5 py-1"
              >
                cancel
              </button>
              <button
                onClick={handlerDeleteArticle}
                className="border rounded-md px-5 py-1 bg-darkRed text-white"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteArticleBtn;

"use client";
import { deleteUserAction } from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  userId: string | null | undefined;
}

const DeleteUserBtn = ({ userId }: Props) => {
  if (!userId) return null;
  const session = useSession();
  const [cnfDelete, setCnfDelete] = useState<boolean>(false);

  // delete Handler
  const handlerDeleteArticle = async () => {
    if (userId) {
      const token = session.data?.user.token;
      const toastId = toast.loading("Deleting...");
      const { data, error, isLoading } = await deleteUserAction(
        token || "",
        userId
      );

      if (error) {
        toast.update(toastId, {
          render: "Error in deleteing user",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      if (data) {
        toast.update(toastId, {
          render: "User deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setCnfDelete(false);
      }
    }
  };

  return (
    <>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded-md"
        onClick={() => setCnfDelete(true)}
      >
        Delete
      </button>

      {cnfDelete && (
        <div className="fixed bg-black/40 top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="bg-white flex flex-col gap-5 w-96 px-5 py-3 rounded-md">
            <div className="flex justify-between">
              <h6 className="font-semibold">Warning!</h6>
              <button onClick={() => setCnfDelete(false)}>close</button>
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

export default DeleteUserBtn;

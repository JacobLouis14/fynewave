"use client";
import { removeUserEditPermissionForSpecificArticleAction } from "@/actions/sActions";
import { UserDataModel } from "@/models/auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  userData: UserDataModel;
}

const UserEditDataModal = ({ userData }: Props) => {
  // console.log(userData);
  const { data: sessionData } = useSession();
  const [isModalOpen, setISModalOpen] = useState<boolean>(false);

  // modal open handler
  const handleOpenModal = () => setISModalOpen(true);

  // modal close handler
  const handleCloseModal = () => setISModalOpen(false);

  // remove permission handler
  const handleRemovePermissionFromUser = async (articleId: string) => {
    try {
      const { _id } = userData;

      if (!_id || !articleId) return toast.error("uncomplete data");

      const { data, error } =
        await removeUserEditPermissionForSpecificArticleAction(
          sessionData?.user.id || "",
          _id,
          articleId
        );
      if (error) {
        console.log(error);
        return toast.error("error in removing permission");
      }
      toast.success("sucessfully change the permission");
    } catch (error) {
      console.log(`error in removing permission error: ${error}`);
    }
  };

  return (
    <>
      <button
        className="bg-darkRed text-white py-2 rounded-md w-full"
        onClick={handleOpenModal}
      >
        edits
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/35 z-[60] flex justify-center items-center">
          <div className="ms-10 w-[70%] h-[90%] bg-white relative">
            <button
              className="absolute -right-10 -top-8"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 fill-white"
                viewBox="0 0 30 30"
              >
                <path d="M7 4a1 1 0 0 0-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293A1 1 0 0 0 7 4"></path>
              </svg>
            </button>
            {userData.editAllotedArticleDetails &&
            userData.editAllotedArticleDetails?.length > 0 ? (
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    <th className="p-2">Article Name</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {userData.editAllotedArticleDetails?.map((allotedArticle) => (
                    <tr key={allotedArticle._id}>
                      <td>{allotedArticle.title}</td>
                      <td>
                        <button
                          className="bg-darkRed text-white py-2 px-4 rounded-md"
                          onClick={() =>
                            handleRemovePermissionFromUser(allotedArticle._id)
                          }
                        >
                          cancel permission
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No permission allowded</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditDataModal;

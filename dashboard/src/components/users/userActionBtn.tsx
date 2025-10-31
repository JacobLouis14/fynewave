"use client";
import { UserDataModel } from "@/models/auth";
import React, { useState } from "react";
import SuspendToggler from "./suspendToggler";
import EditPermissionToggler from "./editPermissionToggler";
import UserEditDataModal from "./userEditDataModal";
import DeleteUserBtn from "./deleteUser";

const canDeleteUser = (
  currentUserRole: string,
  targetUserRole: string,
  currentUserId: string,
  targetUserId: string
) => {
  if (currentUserRole === "super_admin") {
    return true;
  }
  if (
    currentUserRole === "admin" &&
    targetUserRole === "content_writer" &&
    currentUserId !== targetUserId
  ) {
    // Admin can only delete content writers (but not other admins or super admins)
    return true;
  }
  return false;
};

const ActionButton = ({
  label,
  condition,
  component,
}: {
  label: string;
  condition: boolean;
  component: JSX.Element;
}) => {
  return condition ? (
    <div className="flex items-center justify-between px-3 py-2 border-b last:border-0">
      <p>{label}</p>
      {component}
    </div>
  ) : null;
};

interface Props {
  userData: UserDataModel;
  currentUserRole: string;
  currentUserId: string;
}

const UserActionButton = ({
  userData,
  currentUserRole,
  currentUserId,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Button to toggle the modal */}
      <button className="w-5" onClick={() => setIsModalOpen(!isModalOpen)}>
        <svg
          fill="#000000"
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
            <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
          </g>
        </svg>
      </button>

      {isModalOpen && (
        <div className="absolute top-8 right-0 w-64 h-40 z-10 border rounded-md py-5 bg-white flex flex-col overflow-auto">
          {/* Render the actions based on conditions */}
          {/* Action: Suspend (only for content writers) */}
          <ActionButton
            label="Suspend"
            condition={
              (currentUserRole === "super_admin" ||
                currentUserRole === "admin") &&
              userData.role !== "super_admin"
            }
            component={
              <SuspendToggler
                suspendValue={userData?.isSuspended}
                userId={userData?._id}
              />
            }
          />

          {/* Action: Allow Edit (only for content writers) */}
          <ActionButton
            label="Allow Edit"
            condition={
              userData.role !== "admin" && userData.role !== "super_admin"
            }
            component={
              <EditPermissionToggler
                editValue={userData.isEditAllowed}
                userId={userData._id}
              />
            }
          />

          {/* Action: Edits Allotted (always available) */}
          <ActionButton
            label="Edits Allotted"
            condition={userData.role == "content_writer"}
            component={<UserEditDataModal userData={userData} />}
          />

          {/* Action: Delete (can only delete if the user is a content writer or if a super admin) */}
          <ActionButton
            label="Delete"
            condition={canDeleteUser(
              currentUserRole,
              userData.role,
              currentUserId,
              userData._id || ""
            )}
            component={<DeleteUserBtn userId={userData._id} />}
          />
        </div>
      )}
    </div>
  );
};

export default UserActionButton;

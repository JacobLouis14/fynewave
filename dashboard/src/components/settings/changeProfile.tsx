"use client";
import { updateProfile } from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangeProfile = () => {
  const [profileData, setProfileData] = useState<{
    user_name: string;
  }>({
    user_name: "",
  });
  const session = useSession();

  const handleProfileUpdate = async () => {
    const { user_name } = profileData;
    if (user_name) {
      const toastId = toast.loading("Updating...");

      const { data, error, isLoading } = await updateProfile(
        session.data?.user.token || "",
        profileData
      );

      if (error) {
        toast.update(toastId, {
          render: error.message || "Error in updating profile",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      if (data) {
        toast.update(toastId, {
          render: "profile updating successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        await session.update({ name: profileData.user_name });
        setProfileData({ user_name: "" });
      }
    }
  };
  return (
    <div className="flex flex-col gap-3 px-5 py-8 border-b">
      <h6 className="text-xl font-semibold">Change Profile</h6>
      <div className="flex gap-5">
        <input
          type="text"
          className="px-3 py-2 w-96 rounded-md border"
          placeholder="Enter new username"
          value={profileData.user_name}
          onChange={(e) =>
            setProfileData({ ...profileData, user_name: e.target.value })
          }
        />
      </div>
      <div className="ms-auto">
        <button
          onClick={handleProfileUpdate}
          className="px-2 py-1 bg-darkRed text-white rounded-md"
        >
          update profile
        </button>
      </div>
    </div>
  );
};

export default ChangeProfile;

"use client";
import { changePassword } from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState<{
    new_password: string;
    old_password: string;
  }>({
    new_password: "",
    old_password: "",
  });
  const session = useSession();

  const handleChangePassword = async () => {
    const { new_password, old_password } = passwordData;
    if (new_password && old_password) {
      const toastId = toast.loading("Updating...");

      const { data, error, isLoading } = await changePassword(
        session.data?.user.token || "",
        passwordData
      );

      if (error) {
        toast.update(toastId, {
          render: error.message || "Error in updating password",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      if (data) {
        toast.update(toastId, {
          render: "Password updating successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setPasswordData({
          new_password: "",
          old_password: "",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 px-5 py-8 border-b">
      <h6 className="text-xl font-semibold">Change Password</h6>
      <div className="flex gap-5">
        <input
          type="text"
          className="px-3 py-2 w-96 rounded-md border"
          placeholder="Enter old password"
          value={passwordData.old_password}
          onChange={(e) =>
            setPasswordData({ ...passwordData, old_password: e.target.value })
          }
        />
        <input
          type="text"
          className="px-3 py-2 w-96 rounded-md border"
          placeholder="Enter new password"
          value={passwordData.new_password}
          onChange={(e) =>
            setPasswordData({ ...passwordData, new_password: e.target.value })
          }
        />
      </div>
      <div className="ms-auto">
        <button
          onClick={handleChangePassword}
          className="px-2 py-1 bg-darkRed text-white rounded-md"
        >
          change password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;

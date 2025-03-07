"use client";
import { userSuspendUpdateAction } from "@/actions/sActions";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SuspendToggler = ({
  suspendValue,
  userId,
}: {
  suspendValue: boolean | undefined;
  userId: string | undefined;
}) => {
  const [suspendLoadingStatus, setSuspendLoadingStatus] = useState(false);
  const { data: session } = useSession();

  const suspendHandler = async () => {
    try {
      setSuspendLoadingStatus(true);
      const { data, error } = await userSuspendUpdateAction(
        session?.user.token || "",
        userId || ""
      );
      if (data.updatedUser?.isSuspended === true) {
        toast.success("sucessfully suspended user");
      } else {
        toast.success("user back in action");
      }
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("error in suspending user");
    } finally {
      setSuspendLoadingStatus(false);
    }
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={suspendValue}
          className="sr-only peer"
          onChange={suspendHandler}
          disabled={suspendLoadingStatus}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
};

export default SuspendToggler;

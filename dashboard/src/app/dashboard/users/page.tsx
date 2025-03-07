import { getAllUserData } from "@/actions/sActions";
import EditPermissionForm from "@/components/users/editPermissionForm";
import SignupForm from "@/components/users/signupForm";
import UserTables from "@/components/users/userTables";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Users = async () => {
  const session = await getServerSession(authOptions);
  const { data: userData } = await getAllUserData(session?.user.token || "");

  // redirection if no user login
  if (!session?.user) redirect("/");

  // access only for admins
  if (session.user.role != 0) {
    return <div className="w-full text-center">Access Restricted</div>;
  }

  return (
    <div className="px-5 py-12 grid grid-rows-1 grid-cols-1 md:grid-cols-7 gap-5">
      <div className="md:col-span-5 overflow-x-scroll">
        <UserTables userData={userData} />
      </div>
      <div className="md:col-span-2 flex flex-col gap-7">
        <div className="flex flex-col gap-7">
          {/* creation */}
          <h1 className="text-2xl">Create Users</h1>
          <SignupForm />
        </div>
        <div className="flex flex-col gap-7">
          <h1 className="text-2xl">Allow edits</h1>
          <EditPermissionForm />
        </div>
      </div>
    </div>
  );
};

export default Users;

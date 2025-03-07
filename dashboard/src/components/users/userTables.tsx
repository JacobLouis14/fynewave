import { UserDataModel } from "@/models/auth";
import { userRoleExtractor } from "@/utils/roleExtractor";
import React from "react";
import SuspendToggler from "./suspendToggler";
import EditPermissionToggler from "./editPermissionToggler";
import Link from "next/link";
import UserEditDataModal from "./userEditDataModal";

const UserTables = ({ userData }: { userData: UserDataModel[] | null }) => {
  // if no user Data
  if (userData && userData?.length < 1) {
    return <p className="text-center">No user Data found</p>;
  }

  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Role</th>
          <th className="p-2">Email</th>
          <th className="p-2">Suspend</th>
          <th className="p-2">Allow Edit</th>
          <th className="p-2">Edits alloted</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {userData?.map((users, index) => (
          <tr key={index}>
            <td className="p-2">{users?.name}</td>
            <td className={`p-2`}>{userRoleExtractor(users?.role)}</td>
            <td className="p-2">{users?.email}</td>
            {users.role === 1 && (
              <td className="p-2">
                <SuspendToggler
                  suspendValue={users.isSuspended}
                  userId={users._id}
                />
              </td>
            )}
            {users.role === 1 && (
              <td className="p-2">
                <EditPermissionToggler
                  editValue={users.isEditAllowed}
                  userId={users._id}
                />
              </td>
            )}
            {users.role === 1 && (
              <td>
                <UserEditDataModal userData={users} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTables;

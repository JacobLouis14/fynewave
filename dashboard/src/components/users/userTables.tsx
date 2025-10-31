import { UserDataModel } from "@/models/auth";
import { userRoleExtractor } from "@/utils/roleExtractor";
import React from "react";
import UserActionButton from "./userActionBtn";

interface Props {
  userData: UserDataModel[] | null;
  role: string;
  currentUserId: string;
}

const getActionVisibility = (
  role: string,
  currentUserId: string,
  userId: string,
  userRole: string
) => {
  if (role === "super_admin" && currentUserId !== userId) return true;
  if (
    role === "admin" &&
    userRole !== "admin" &&
    userRole !== "super_admin" &&
    currentUserId !== userId
  )
    return true;
  return false;
};

const UserTables = ({ userData, role, currentUserId }: Props) => {
  // Early return if no user data
  if (!userData || userData.length === 0) {
    return <p className="text-center">No user data found</p>;
  }

  const tableHeaders = ["Name", "Role", "Email", "Actions"];

  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index} className="p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {userData.map((users, index) => {
          const shouldShowActions = getActionVisibility(
            role,
            currentUserId,
            users._id || "",
            users.role
          );

          return (
            <tr key={index}>
              <td className="p-2">{users?.name}</td>
              <td className="p-2">{userRoleExtractor(users?.role)}</td>
              <td className="p-2">{users?.email}</td>
              {shouldShowActions && (
                <td>
                  <UserActionButton
                    userData={users}
                    currentUserRole={role}
                    currentUserId={currentUserId}
                  />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTables;

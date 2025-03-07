import { getUsersMatrics } from "@/actions/sActions";
import { userRoleExtractor } from "@/utils/roleExtractor";
import React from "react";

const UserSummary = async () => {
  const { data: userMatricsData, error: userMatricsError } =
    await getUsersMatrics();

  return (
    <div className="flex flex-col gap-6 md:px-3 bg-white rounded-lg">
      <div className="flex flex-col gap-5 px-4 py-3 flex-wrap">
        {userMatricsError ? (
          <p>something went wrong</p>
        ) : (
          userMatricsData.allUserMatrics?.map((userMatrics, index) => (
            <div
              className="flex justify-between flex-wrap border border-gray-200 px-3 py-2 rounded-lg"
              key={index}
            >
              <h1>{userRoleExtractor(userMatrics._id)}</h1>
              <h1 className="font-bold text-darkRed">{userMatrics.number}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserSummary;

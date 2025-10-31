import ChangePassword from "@/components/settings/changePassword";
import ChangeProfile from "@/components/settings/changeProfile";
import React from "react";

const UpdateProfile = () => {
  return (
    <div className="flex flex-col gap-5">
      <ChangeProfile />
      <ChangePassword />
    </div>
  );
};

export default UpdateProfile;

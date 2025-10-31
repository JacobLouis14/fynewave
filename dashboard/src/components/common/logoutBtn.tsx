"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  const [cnfLogout, setCnfLogout] = useState<boolean>(false);

  // logout handler
  const handlerLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      <button
        onClick={() => setCnfLogout(true)}
        className="px-3 py-2 mt-16 md:mt-0 bg-gray-200 rounded-lg w-2/3 md:w-full hover:bg-darkRed hover:text-white text-start"
      >
        Logout
      </button>

      {cnfLogout && (
        <div className="fixed bg-black/40 top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="bg-white flex flex-col gap-5 w-96 px-5 py-3 rounded-md">
            <div className="flex justify-between">
              <h6 className="font-semibold">Warning!</h6>
              <button onClick={() => setCnfLogout(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ba091d"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <div className="text-center py-5">
              <p>Are you sure about logging out?</p>
            </div>
            <div className="flex gap-3 ms-auto">
              <button
                onClick={() => setCnfLogout(false)}
                className="border rounded-md px-5 py-1"
              >
                cancel
              </button>
              <button
                onClick={handlerLogout}
                className="border rounded-md px-5 py-1 bg-darkRed text-white"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBtn;

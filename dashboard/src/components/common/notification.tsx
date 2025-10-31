"use client";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // handle Open
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative">
      <button onClick={handleOpen}>Notification</button>

      {isOpen && (
        <div className="absolute top-8 right-0 w-96 h-96 bg-white rounded-md z-10 flex flex-col text-black py-3 px-5">
          <div className="flex justify-between">
            <h6>Notifications</h6>
            <button onClick={handleClose}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

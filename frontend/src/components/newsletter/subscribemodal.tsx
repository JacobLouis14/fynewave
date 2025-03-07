"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../common/button";
import CloseIcon from "@mui/icons-material/Close";
import Modalinputfield from "../common/modalinputfield";
import { useAppDispatch, useAppSelector } from "@/lib/states/statehooks";
import {
  newsletterSubscribeModalCloseHandler,
  newsletterSubscribeModalisOpen,
} from "@/lib/states/features/appUiSlice";
import { useDebouncedCallback } from "use-debounce";
import { subscribeToNewsletterAction } from "@/services/actions";

const Subscribemodal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(newsletterSubscribeModalisOpen);
  const [subscribeApiLoading, setSubscribeApiLoading] =
    useState<boolean>(false);
  const [newsLetterEmail, setNewsLetterEmail] = useState<string>("");
  const [newsletterError, setNewsletterError] = useState<string>("");
  const [isNewsletterSuccess, setisNewsletterSuccess] =
    useState<boolean>(false);

  //   close Handler
  const closeHandler = () => {
    setNewsLetterEmail("");
    setNewsletterError("");
    setSubscribeApiLoading(false);
    setisNewsletterSuccess(false);
    dispatch(newsletterSubscribeModalCloseHandler());
    document.body.style.overflow = "unset";
  };

  // input change handler
  const handleInputChange = useDebouncedCallback((inputEmail: string) => {
    setNewsLetterEmail(inputEmail);
  }, 100);

  // subscribe handler
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!newsLetterEmail) return setNewsletterError("Invalid email");

      setSubscribeApiLoading(true);
      const { data } = await subscribeToNewsletterAction();
      if (data?.status === 200) return setisNewsletterSuccess(true);
    } catch (error) {
      setNewsletterError("something went wrong");
    } finally {
      setSubscribeApiLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed border top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-black z-50 px-10 py-3 rounded-lg bg-white max-w-[800px] w-full min-h-80 md:h-fit max-h-screen md:max-h-fit">
      {/* header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-raleway">Subscribe</h1>
        <button onClick={closeHandler}>
          <CloseIcon />
        </button>
      </div>
      {/* content */}
      <div className="w-full h-full grid md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-5 md:gap-0 pt-10">
        <div className="flex flex-col gap-5 font-raleway md:col-span-2">
          <h3 className="text-4xl font-medium">Stay Tuned!</h3>
          <p>
            Get the latest articles and updated that you need to know. You’ll
            get special recommendations weekly.
          </p>
          <form className="flex gap-5 flex-wrap" onSubmit={handleSubscribe}>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                className="rounded-full outline-none px-5 py-2 border"
                placeholder="Enter your email"
                value={newsLetterEmail}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <p className="text-sm text-red-700 ps-5">{newsletterError}</p>
            </div>
            <button
              className="rounded-full bg-headerRedFrom text-white px-4 py-2 h-11"
              type="submit"
            >
              {subscribeApiLoading
                ? "please wait"
                : !subscribeApiLoading && isNewsletterSuccess
                ? "Subscribed"
                : "Subscribe Now"}
            </button>
          </form>
        </div>
        <div className="relative md:col-span-1">
          <Image
            src="/subscribemodalimage.svg"
            alt="Image"
            fill
            sizes="100%,100%"
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribemodal;

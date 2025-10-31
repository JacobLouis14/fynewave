import { getDjOfTheWeek } from "@/services/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Djofweek = async () => {
  const { data: djOfTheWeekData, error: djOfTheWeekError } =
    await getDjOfTheWeek();

  if (djOfTheWeekError) {
    return <p className="text-center h-36">Something went wrong</p>;
  }

  if (
    djOfTheWeekData.allDjsOfTheWeek &&
    djOfTheWeekData.allDjsOfTheWeek.length < 1
  ) {
    return null;
  }

  const { allDjsOfTheWeek } = djOfTheWeekData;

  const djPosOne = allDjsOfTheWeek?.find((a) => JSON.parse(a.position) == 1);
  const djPosTwo = allDjsOfTheWeek?.find((a) => JSON.parse(a.position) == 2);
  const djPosThree = allDjsOfTheWeek?.find((a) => JSON.parse(a.position) == 3);

  return (
    <div className="pb-10 px-2 lg:px-8">
      <h2 className="text-center font-raleway font-bold text-4xl">
        On The Spotlight{/* DJs of the Week */}
      </h2>
      {/* content */}
      <div className="pt-7 grid grid-rows-1 lg:grid-cols-9 gap-5 lg:max-h-dvh">
        {/* 1st col */}
        {djPosOne ? (
          <Link
            href={djPosOne.articleData.slug}
            className="bg-green-200 rounded-xl overflow-hidden relative lg:col-span-5 max-h-[15rem] md:max-h-[30rem] lg:max-h-dvh cursor-pointer"
          >
            <Image
              src={
                djPosOne.articleData.thumbnailUrl
                  ? djPosOne.articleData.thumbnailUrl
                  : "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg"
              }
              className="object-cover w-full h-full hover:scale-125 hover:duration-700 transition ease-in-out"
              alt="Dj banner"
              height={500}
              width={500}
              quality={100}
            />
            {/* content */}
            <div className="absolute bottom-0 px-8 py-5 bg-[#0707074D] text-white hover:bg-headerRedTo/35 w-full md:w-2/3 max-h-60 overflow-y-auto">
              <h3 className="font-bold font-raleway text-2xl md:text-4xl">
                {djPosOne.articleData.alternativeTitle}
              </h3>
              <h6 className="font-normal mt-2 text-lg md:text-xl">
                {djPosOne.articleData.releaseTitle}
              </h6>
              <p className="font-light text-sm mt-2">
                {djPosOne.articleData.category}
              </p>
            </div>
          </Link>
        ) : (
          <div className="relative w-full lg:col-span-5 max-h-[15rem] md:max-h-[30rem] lg:max-h-dvh">
            <Image
              src={
                "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
              }
              className="object-contain w-full h-full"
              alt="nothing"
              height={500}
              width={500}
            />
          </div>
        )}
        {/* 2nd col */}
        <div className="grid grid-rows-2 gap-5 lg:col-span-4">
          {/* 2nd col -> 1st row */}
          {djPosTwo ? (
            <Link
              href={djPosTwo.articleData.slug}
              className="bg-yellow-400 max-h-[15rem] md:max-h-[30rem] lg:max-h-[400px] rounded-xl overflow-hidden relative cursor-pointer"
            >
              <Image
                src={
                  djPosTwo.articleData.thumbnailUrl
                    ? djPosTwo.articleData.thumbnailUrl
                    : "https://t3.ftcdn.net/jpg/06/16/07/70/360_F_616077017_Jp4pLORx9f3TihEDLq0P9tX6mpXmk6iO.jpg"
                }
                className="object-cover w-full h-full hover:scale-125 hover:duration-700 transition ease-in-out"
                alt="Dj banner"
                height={500}
                width={500}
              />
              {/* content */}
              <div className="absolute bottom-0 px-8 py-5 bg-[#0707074D] text-white hover:bg-headerRedTo/35 w-full md:w-2/3 max-h-60 overflow-y-auto">
                <h3 className="font-bold font-raleway text-2xl md:text-4xl">
                  {djPosTwo.articleData.alternativeTitle}
                </h3>
                <h6 className="font-normal mt-2 text-lg md:text-xl">
                  {djPosTwo.articleData.releaseTitle}
                </h6>
                <p className="font-light text-sm mt-2">
                  {djPosTwo.articleData.category}
                </p>
              </div>
            </Link>
          ) : (
            <div className="relative w-full max-h-[15rem] md:max-h-[30rem] lg:max-h-[400px]">
              <Image
                src={
                  "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                }
                className="object-contain w-full h-full"
                alt="nothing"
                height={500}
                width={500}
              />
            </div>
          )}
          {/*2nd col ->  2nd row */}
          {djPosThree ? (
            <Link
              href={djPosThree.articleData.slug}
              className="bg-yellow-600 max-h-[15rem] md:max-h-[30rem] lg:max-h-[400px] rounded-xl overflow-hidden relative cursor-pointer"
            >
              <Image
                src={
                  djPosThree.articleData.thumbnailUrl
                    ? djPosThree.articleData.thumbnailUrl
                    : "https://t3.ftcdn.net/jpg/06/16/07/70/360_F_616077017_Jp4pLORx9f3TihEDLq0P9tX6mpXmk6iO.jpg"
                }
                className="object-cover w-full h-full hover:scale-125 hover:duration-700 transition ease-in-out"
                alt="Dj banner"
                height={500}
                width={500}
              />
              {/* content */}
              <div className="absolute bottom-0 px-8 py-5 bg-[#0707074D] text-white hover:bg-headerRedTo/35 w-full md:w-2/3 max-h-60 overflow-y-auto">
                <h3 className="font-bold font-raleway text-2xl md:text-4xl">
                  {djPosThree.articleData.alternativeTitle}
                </h3>
                <h6 className="font-normal mt-2 text-lg md:text-xl">
                  {djPosThree.articleData.releaseTitle}
                </h6>
                <p className="font-light text-sm mt-2">
                  {djPosThree.articleData.category}
                </p>
              </div>
            </Link>
          ) : (
            <div className="relative w-full max-h-[15rem] md:max-h-[30rem] lg:max-h-[400px]">
              <Image
                src={
                  "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                }
                className="object-contain w-full h-full"
                alt="nothing"
                height={500}
                width={500}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Djofweek;

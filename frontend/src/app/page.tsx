import { unstable_noStore as noStore } from "next/cache";
import Artistofweek from "@/components/home/artistofweek";
import Djofweek from "@/components/home/djofweek";
import Latestblogs from "@/components/home/latestblogs";
import Relatedblogs from "@/components/home/relatedblogs";
import Songsofweek from "@/components/home/songsofweek";
import LandingHomeWrapper from "@/components/landing/landinghomewrapper";
import Landingmain from "@/components/landing/landingmain";
import React from "react";

export default function Landing() {
  noStore();
  return (
    <>
      <Landingmain />
      {/* home content */}
      <LandingHomeWrapper>
        <Songsofweek />
        <Djofweek />
        <Artistofweek />
        <Latestblogs />
        <Relatedblogs />
      </LandingHomeWrapper>
    </>
  );
}

import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Appbar from "@/components/common/Appbar";
import { Metadata } from "next";
import Songsofweek from "@/components/home/songsofweek";
import Djofweek from "@/components/home/djofweek";
import Artistofweek from "@/components/home/artistofweek";
import Latestblogs from "@/components/home/latestblogs";
import Relatedblogs from "@/components/home/relatedblogs";
import Subscribebar from "@/components/newsletter/subscribebar";
import SubscribeBarController from "@/lib/utils/subscribebarcontroller";

export const metadata: Metadata = {
  title: "Home",
};

const Home = () => {
  noStore();
  return (
    <>
      <Appbar />
      <Songsofweek />
      <Djofweek />
      <Artistofweek />
      <Latestblogs />
      <Relatedblogs />
      <SubscribeBarController>
        <Subscribebar />
      </SubscribeBarController>
    </>
  );
};

export default Home;

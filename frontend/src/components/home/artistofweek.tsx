import React from "react";
import CardCorousel from "./cardCorousel";
import Card from "../common/card";
import { getArtistOfTheWeek } from "@/services/actions";

const Artistofweek = async () => {
  const { data: allArtistOfTheWeekData, error: allArtistOfTheWeekError } =
    await getArtistOfTheWeek();

  if (allArtistOfTheWeekError) {
    return <p className="text-center">Something went wrong</p>;
  }

  if (
    allArtistOfTheWeekData.allArtistsOfTheWeek &&
    allArtistOfTheWeekData.allArtistsOfTheWeek.length < 1
  ) {
    return <p className="text-center h-36">No Artist of the week</p>;
  }

  return (
    <div className="pb-10 pt-5 px-3">
      <h2 className="text-center font-raleway font-medium text-4xl">
        Check Them Out!!!{/* Artists of the Week */}
      </h2>
      {/* content -> card Caurosel */}
      <CardCorousel>
        {allArtistOfTheWeekData.allArtistsOfTheWeek?.map((artistOfTheweek) => (
          <Card
            key={artistOfTheweek._id}
            forArtist={true}
            CardData={artistOfTheweek}
          />
        ))}
        {/* <Card forArtist={true} />
        <Card forArtist={true} />
        <Card forArtist={true} /> */}
      </CardCorousel>
    </div>
  );
};

export default Artistofweek;

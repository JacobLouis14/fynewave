import React from "react";
import CardCorousel from "./cardCorousel";
import Card from "../common/card";
import { getSongsOfTheWeek } from "@/services/actions";

const Songsofweek = async () => {
  const { data: allSongsOfTheWeekData, error: allSongsOfTheWeekError } =
    await getSongsOfTheWeek();
  console.log(allSongsOfTheWeekError);

  if (allSongsOfTheWeekError) {
    return <p className="text-center h-36">Something went wrong</p>;
  }

  if (
    allSongsOfTheWeekData.allSongsOfTheWeek &&
    allSongsOfTheWeekData.allSongsOfTheWeek.length < 1
  ) {
    return <p className="text-center h-36">No songs of the week</p>;
  }

  return (
    <div className="py-10 px-3">
      {/* Title */}
      <h2 className="text-center font-raleway font-medium text-4xl">
        Featured Songs{/* Songs of the Week */}
      </h2>
      {/* carosel wrapper */}
      <CardCorousel>
        {allSongsOfTheWeekData.allSongsOfTheWeek?.map((songOftheWeek) => (
          <Card
            key={songOftheWeek._id}
            forArtist={false}
            CardData={songOftheWeek}
          />
        ))}
        {/* <Card forArtist={false} />
        <Card forArtist={false} />
        <Card forArtist={false} /> */}
      </CardCorousel>
    </div>
  );
};

export default Songsofweek;

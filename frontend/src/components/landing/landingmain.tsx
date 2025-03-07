import LandingCard from "./landingCard";
import ScrollListner from "@/lib/utils/scrollListner";
import Landingheader from "./landingheader";
import { getLandingCards } from "@/services/actions";
import { replaceHyphenWithSpace } from "@/utils/hypenremover";

const Landingmain = async () => {
  const { data: landingData, error: landingError } = await getLandingCards();

  if (landingError) {
    return <p className="text-center">Error in landing cards</p>;
  }
  const landingCardDetatils = landingData?.allLandingCards.articleIds.sort(
    (a, b) => {
      const order = [
        "artist-of-the-week",
        "song-of-the-week",
        "dj-of-the-week",
      ];
      return order.indexOf(a.categoryTitle) - order.indexOf(b.categoryTitle);
    }
  );

  return (
    <ScrollListner>
      {/* header */}
      <Landingheader />
      {/* content */}
      <div className="font-raleway flex flex-col items-center py-10 px-5">
        <h3 className="text-4xl font-bold text-center">
          Top picks of the Week
        </h3>
        {/* card Wrapper */}
        {landingData?.allLandingCards && landingCardDetatils ? (
          <div className="grid grid-flow-col-1 lg:grid-cols-3 gap-5 mt-10 px-5 md:px-7 w-screen">
            {landingCardDetatils?.map((cardDetails) => (
              <div key={cardDetails.articleId}>
                <LandingCard
                  categoryTitle={
                    (cardDetails && cardDetails.categoryTitle) || ""
                  }
                  altText={(cardDetails && cardDetails.cardTitle) || ""}
                  slug={(cardDetails && cardDetails?.articleData.slug) || ""}
                  imageUrl={
                    (cardDetails && cardDetails?.articleData?.thumbnailUrl) ||
                    ""
                  }
                />
                <h6 className="text-center mt-5 text-2xl md:text-3xl font-semibold drop-shadow-xl">
                  {cardDetails &&
                    replaceHyphenWithSpace(cardDetails?.categoryTitle)}
                </h6>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full mt-10 h-52">
            <p className="font-bold">Something went wrong</p>
          </div>
        )}
      </div>
      {/* bg svg icons */}
      <div className="hidden lg:inline-block absolute bottom-0 left-[12%]">
        <svg
          className="w-40 aspect-square"
          viewBox="0 0 234 236"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M87.75 177V49.1667L204.75 29.5V157.333M87.75 177C87.75 193.292 74.6543 206.5 58.5 206.5C42.3457 206.5 29.25 193.292 29.25 177C29.25 160.708 42.3457 147.5 58.5 147.5C74.6543 147.5 87.75 160.708 87.75 177ZM204.75 157.333C204.75 173.626 191.654 186.833 175.5 186.833C159.346 186.833 146.25 173.626 146.25 157.333C146.25 141.041 159.346 127.833 175.5 127.833C191.654 127.833 204.75 141.041 204.75 157.333Z"
              stroke="#1E1E1E"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div className="hidden lg:inline-block absolute top-28 left-[26%]">
        <svg
          className="w-32 aspect-square"
          viewBox="0 0 234 236"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M87.75 177V49.1667L204.75 29.5V157.333M87.75 177C87.75 193.292 74.6543 206.5 58.5 206.5C42.3457 206.5 29.25 193.292 29.25 177C29.25 160.708 42.3457 147.5 58.5 147.5C74.6543 147.5 87.75 160.708 87.75 177ZM204.75 157.333C204.75 173.626 191.654 186.833 175.5 186.833C159.346 186.833 146.25 173.626 146.25 157.333C146.25 141.041 159.346 127.833 175.5 127.833C191.654 127.833 204.75 141.041 204.75 157.333Z"
              stroke="#1E1E1E"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div className="hidden lg:inline-block absolute top-16 right-[1%]">
        <svg
          className="w-48 aspect-square"
          viewBox="0 0 234 236"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M87.75 177V49.1667L204.75 29.5V157.333M87.75 177C87.75 193.292 74.6543 206.5 58.5 206.5C42.3457 206.5 29.25 193.292 29.25 177C29.25 160.708 42.3457 147.5 58.5 147.5C74.6543 147.5 87.75 160.708 87.75 177ZM204.75 157.333C204.75 173.626 191.654 186.833 175.5 186.833C159.346 186.833 146.25 173.626 146.25 157.333C146.25 141.041 159.346 127.833 175.5 127.833C191.654 127.833 204.75 141.041 204.75 157.333Z"
              stroke="#1E1E1E"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div className="hidden lg:inline-block absolute bottom-0 right-[4%]">
        <svg
          className="w-48 aspect-square"
          viewBox="0 0 234 236"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M87.75 177V49.1667L204.75 29.5V157.333M87.75 177C87.75 193.292 74.6543 206.5 58.5 206.5C42.3457 206.5 29.25 193.292 29.25 177C29.25 160.708 42.3457 147.5 58.5 147.5C74.6543 147.5 87.75 160.708 87.75 177ZM204.75 157.333C204.75 173.626 191.654 186.833 175.5 186.833C159.346 186.833 146.25 173.626 146.25 157.333C146.25 141.041 159.346 127.833 175.5 127.833C191.654 127.833 204.75 141.041 204.75 157.333Z"
              stroke="#1E1E1E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </ScrollListner>
  );
};

export default Landingmain;

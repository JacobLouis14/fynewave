import { toReadableDate } from "@/lib/utils/toReadableDate";
import { ArtistOfTheWeekModal, SongOfTheWeekModal } from "@/models/showcase";
import Image from "next/image";
import Link from "next/link";

interface Props<T extends boolean> {
  forArtist: T;
  CardData?: T extends true ? ArtistOfTheWeekModal : SongOfTheWeekModal;
}

const Card = <T extends boolean>({ forArtist, CardData }: Props<T>) => {
  if (!CardData) {
    return;
  }

  return (
    <Link href={CardData.slug || "slug"}>
      <div className="min-w-[255px] max-w-[235px] md:max-w-[331px] md:w-[331px] group cursor-pointer">
        <div className="relative w-full h-[221px] md:h-[296px] overflow-hidden rounded-2xl">
          <Image
            src={
              CardData.thumbnailUrl
                ? CardData.thumbnailUrl
                : "https://images.smiletemplates.com/uploads/screenshots/651/0000651648/powerpoint-template-450w.jpg"
            }
            alt="card Image"
            fill
            sizes="100%,100%"
            priority
            className={`object-cover group-hover:border-b-4 group-hover:border-headerRedTo hover:scale-125 hover:duration-700 transition ease-in-out
          `}
          />
        </div>
        {/* content */}
        <div className="text-[#86818B] mt-3">
          <p className="font-raleway font-light">{CardData?.category}</p>
          <h1
            className={`font-raleway font-bold text-black pt-3 text-2xl group-hover:text-headerRedTo`}
          >
            {CardData?.alternativeTitle}
          </h1>
          {!forArtist && "album" in CardData && (
            <p
              className={`font-raleway font-light pt-3 group-hover:font-semibold group-hover:text-black`}
            >
              {CardData?.album || "Unknown Album"}
            </p>
          )}
          <p className="font-raleway font-light pt-2 text-sm">
            {toReadableDate(CardData?.updatedAt || "")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

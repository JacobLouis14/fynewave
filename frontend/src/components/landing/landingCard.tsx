import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  slug?: string;
  altText?: string;
  imageUrl?: string;
  categoryTitle?: string;
};

const LandingCard = ({ slug, altText, imageUrl, categoryTitle }: Props) => {
  return (
    <Link href={slug || "slug"}>
      <div className="relative bg-gray-200 lg:aspect-[5/4] aspect-video w-full xxl:w-[28rem] rounded-xl shadow-lg border-b-headerRedTo border-b-4 overflow-hidden">
        <div className="w-full h-full bg-[#000000]/10 absolute text-white z-10"></div>
        <Image
          src={
            imageUrl
              ? imageUrl
              : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
          }
          alt="Image"
          fill
          priority={true}
          sizes="100%,100%"
          className="object-cover brightness-[0.55]"
          draggable={false}
        />
        {/* content */}
        <div className="absolute bottom-5 md:bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
          <h3 className="text-xl md:text-3xl font-medium">
            {altText ? altText : ""}
          </h3>
        </div>
        {/* svg logo */}
        <div className="absolute top-[15%] md:top-16 left-[10%] md:left-10">
          {categoryTitle === "artist-of-the-week" && (
            <svg
              className="md:w-40 w-20"
              viewBox="0 0 167 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M136.123 49.292H166.748V65.6592H149.248V110.669C149.248 116.397 147.133 121.239 142.904 125.195C138.675 129.15 133.498 131.128 127.373 131.128C121.248 131.128 116.071 129.15 111.842 125.195C107.613 121.239 105.498 116.397 105.498 110.669C105.498 104.94 107.613 100.098 111.842 96.143C116.071 92.1876 121.248 90.2099 127.373 90.2099C128.54 90.2099 129.852 90.3122 131.311 90.5168C132.769 90.7214 134.373 91.1647 136.123 91.8466V49.292ZM0.498062 131.128V108.214C0.498062 103.44 1.7741 99.1436 4.32619 95.3246C6.87827 91.5056 10.2689 88.5732 14.4981 86.5273C23.5397 82.2991 32.7272 79.128 42.0606 77.0139C51.3939 74.8998 60.8731 73.8428 70.4981 73.8428C76.6231 73.8428 82.7116 74.286 88.7637 75.1726C94.8158 76.0592 100.904 77.389 107.029 79.1621C104.113 80.7988 101.488 82.7765 99.1543 85.0952C96.821 87.4139 94.7793 89.9371 93.0293 92.665C89.2376 91.8466 85.4824 91.2329 81.7637 90.8237C78.0449 90.4145 74.2897 90.2099 70.4981 90.2099C62.1856 90.2099 54.0189 91.1647 45.9981 93.0742C37.9772 94.9837 30.1022 97.7115 22.3731 101.258C21.0606 101.94 20.0033 102.894 19.2012 104.122C18.3991 105.35 17.9981 106.713 17.9981 108.214V114.761H88.2168C88.5085 117.488 89.2012 120.216 90.2949 122.944C91.3887 125.672 92.8835 128.4 94.7793 131.128H0.498062ZM70.4981 65.6592C60.8731 65.6592 52.6335 62.454 45.7793 56.0435C38.9251 49.633 35.4981 41.9268 35.4981 32.9249C35.4981 23.923 38.9251 16.2168 45.7793 9.80631C52.6335 3.39585 60.8731 0.190613 70.4981 0.190613C80.1231 0.190613 88.3626 3.39585 95.2168 9.80631C102.071 16.2168 105.498 23.923 105.498 32.9249C105.498 41.9268 102.071 49.633 95.2168 56.0435C88.3626 62.454 80.1231 65.6592 70.4981 65.6592ZM70.4981 49.292C75.3106 49.292 79.4304 47.6894 82.8574 44.4842C86.2845 41.279 87.9981 37.4259 87.9981 32.9249C87.9981 28.4239 86.2845 24.5708 82.8574 21.3656C79.4304 18.1604 75.3106 16.5578 70.4981 16.5578C65.6856 16.5578 61.5658 18.1604 58.1387 21.3656C54.7116 24.5708 52.9981 28.4239 52.9981 32.9249C52.9981 37.4259 54.7116 41.279 58.1387 44.4842C61.5658 47.6894 65.6856 49.292 70.4981 49.292Z"
                fill="white"
                fillOpacity="0.2"
              />
            </svg>
          )}
          {categoryTitle === "song-of-the-week" && (
            <svg
              className="w-14 md:w-36 aspect-square"
              viewBox="0 0 130 149"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.9147 148.545C32.0897 148.545 21.9668 145.33 13.5459 138.899C5.12509 132.468 0.914673 124.738 0.914673 115.707C0.914673 106.677 5.12509 98.946 13.5459 92.5152C21.9668 86.0844 32.0897 82.869 43.9147 82.869C48.0355 82.869 51.8428 83.2452 55.3365 83.9978C58.8303 84.7503 62.1897 85.8792 65.4147 87.3842V0.773438H129.915V33.6117H86.9147V115.707C86.9147 124.738 82.7043 132.468 74.2834 138.899C65.8626 145.33 55.7397 148.545 43.9147 148.545Z"
                fill="white"
                fillOpacity="0.3"
              />
              <path
                d="M65.4094 87.3956L65.4272 87.4039V87.3842V0.785938H129.902V33.5992H86.9147H86.9022V33.6117V115.707C86.9022 124.733 82.6942 132.46 74.2758 138.889C65.8574 145.318 55.7373 148.533 43.9147 148.533C32.0921 148.533 21.9719 145.318 13.5535 138.889C5.13517 132.46 0.927173 124.733 0.927173 115.707C0.927173 106.681 5.13517 98.9541 13.5535 92.5251C21.9719 86.0962 32.0921 82.8815 43.9147 82.8815C48.0348 82.8815 51.8411 83.2577 55.3339 84.01C58.8268 84.7624 62.1852 85.8909 65.4094 87.3956Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="0.025"
              />
            </svg>
          )}
          {categoryTitle === "dj-of-the-week" && (
            <svg
              className="w-20 md:w-40"
              viewBox="0 0 158 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.9148 129.193H18.0259C13.2286 129.193 9.12193 127.789 5.70573 124.98C2.28952 122.172 0.581421 118.796 0.581421 114.852V64.6594C0.581421 55.6965 2.65295 47.3012 6.796 39.4735C10.9391 31.6459 16.5358 24.834 23.5863 19.038C30.6367 13.2419 38.9229 8.64091 48.4446 5.23499C57.9664 1.82906 68.1786 0.126099 79.0814 0.126099C89.9842 0.126099 100.196 1.82906 109.718 5.23499C119.24 8.64091 127.526 13.2419 134.577 19.038C141.627 24.834 147.224 31.6459 151.367 39.4735C155.51 47.3012 157.581 55.6965 157.581 64.6594V114.852C157.581 118.796 155.873 122.172 152.457 124.98C149.041 127.789 144.934 129.193 140.137 129.193H105.248V71.8298H140.137V64.6594C140.137 50.6772 134.213 38.8162 122.365 29.0765C110.518 19.3367 96.0898 14.4668 79.0814 14.4668C62.0731 14.4668 47.6451 19.3367 35.7974 29.0765C23.9497 38.8162 18.0259 50.6772 18.0259 64.6594V71.8298H52.9148V129.193ZM35.4703 86.1705H18.0259V114.852H35.4703V86.1705ZM122.693 86.1705V114.852H140.137V86.1705H122.693Z"
                fill="white"
                fillOpacity="0.2"
              />
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LandingCard;

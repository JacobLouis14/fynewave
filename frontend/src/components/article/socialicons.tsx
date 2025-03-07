"use client";
import React from "react";

const Socialicons = () => {
  // share handler
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("url copied");
  };

  return (
    <div className="flex gap-4 ms-auto">
      <button>
        <svg
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 2H9.5C8.17392 2 6.90215 2.52678 5.96447 3.46447C5.02678 4.40215 4.5 5.67392 4.5 7V10H1.5V14H4.5V22H8.5V14H11.5L12.5 10H8.5V7C8.5 6.73478 8.60536 6.48043 8.79289 6.29289C8.98043 6.10536 9.23478 6 9.5 6H12.5V2Z"
            stroke="#757575"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button>
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 6.5H17.01M6.5 2H16.5C19.2614 2 21.5 4.23858 21.5 7V17C21.5 19.7614 19.2614 22 16.5 22H6.5C3.73858 22 1.5 19.7614 1.5 17V7C1.5 4.23858 3.73858 2 6.5 2ZM15.5 11.37C15.6234 12.2022 15.4813 13.0522 15.0938 13.799C14.7063 14.5458 14.0931 15.1514 13.3416 15.5297C12.5901 15.9079 11.7384 16.0396 10.9078 15.9059C10.0771 15.7723 9.30976 15.3801 8.71484 14.7852C8.11992 14.1902 7.72773 13.4229 7.59407 12.5922C7.4604 11.7616 7.59207 10.9099 7.97033 10.1584C8.34859 9.40685 8.95419 8.79374 9.70098 8.40624C10.4478 8.01874 11.2978 7.87659 12.13 8C12.9789 8.12588 13.7649 8.52146 14.3717 9.12831C14.9785 9.73515 15.3741 10.5211 15.5 11.37Z"
            stroke="#757575"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button onClick={handleShare}>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.09 13.51L15.92 17.49M15.91 6.51L9.09 10.49M21.5 5C21.5 6.65685 20.1569 8 18.5 8C16.8431 8 15.5 6.65685 15.5 5C15.5 3.34315 16.8431 2 18.5 2C20.1569 2 21.5 3.34315 21.5 5ZM9.5 12C9.5 13.6569 8.15685 15 6.5 15C4.84315 15 3.5 13.6569 3.5 12C3.5 10.3431 4.84315 9 6.5 9C8.15685 9 9.5 10.3431 9.5 12ZM21.5 19C21.5 20.6569 20.1569 22 18.5 22C16.8431 22 15.5 20.6569 15.5 19C15.5 17.3431 16.8431 16 18.5 16C20.1569 16 21.5 17.3431 21.5 19Z"
            stroke="#757575"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Socialicons;

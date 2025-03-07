import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import NewsSubscribebtn from "../newsletter/newsSubscribebtn";

const Subscribebar = () => {
  return (
    <div className="fixed z-30 bottom-0 w-full lg:flex items-center bg-gradient-to-r from-headerRedFrom to-headerRedTo py-3 px-8 max-h-20 h-full hidden">
      {/* text */}
      <div className="flex gap-5 text-white">
        <svg
          width="28"
          height="34"
          viewBox="0 0 28 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.666748 28.6666V25.3333H4.00008V13.6666C4.00008 11.361 4.69453 9.31936 6.08341 7.54158C7.4723 5.73603 9.27786 4.55547 11.5001 3.99992V2.83325C11.5001 2.13881 11.7362 1.55547 12.2084 1.08325C12.7084 0.583251 13.3056 0.333252 14.0001 0.333252C14.6945 0.333252 15.2779 0.583251 15.7501 1.08325C16.2501 1.55547 16.5001 2.13881 16.5001 2.83325V3.99992C18.7223 4.55547 20.5279 5.73603 21.9167 7.54158C23.3056 9.31936 24.0001 11.361 24.0001 13.6666V25.3333H27.3334V28.6666H0.666748ZM14.0001 33.6666C13.0834 33.6666 12.2917 33.3471 11.6251 32.7082C10.9862 32.0416 10.6667 31.2499 10.6667 30.3333H17.3334C17.3334 31.2499 17.0001 32.0416 16.3334 32.7082C15.6945 33.3471 14.9167 33.6666 14.0001 33.6666ZM7.33341 25.3333H20.6667V13.6666C20.6667 11.8333 20.014 10.2638 18.7084 8.95825C17.4029 7.6527 15.8334 6.99992 14.0001 6.99992C12.1667 6.99992 10.5973 7.6527 9.29175 8.95825C7.98619 10.2638 7.33341 11.8333 7.33341 13.6666V25.3333Z"
            fill="#FEFEFF"
          />
        </svg>
        <p className="font-raleway text-2xl">
          Subscribe us for daily updates and much more!!
        </p>
      </div>
      {/* button */}
      <div className="ms-auto">
        <NewsSubscribebtn
          className="me-6 font-poppins bg-white py-3 px-5 rounded-full text-headerRedTo"
          title={
            <div>
              <SendOutlinedIcon className="me-3" />
              SUBSCRIBE NOW
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Subscribebar;

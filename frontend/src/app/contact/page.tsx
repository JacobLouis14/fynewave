import Appbar from "@/components/common/Appbar";
import Footer from "@/components/common/Footer";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-grow py-4 px-16">
        <h1 className="text-4xl font-semibold font-raleway mb-4 text-center">
          Contact
        </h1>
        <p className="text-center font-semibold">
          email :{" "}
          <a href="mailto:info.fynewave@gmail.com">info.fynewave@gmail.com</a>
        </p>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ContactPage;

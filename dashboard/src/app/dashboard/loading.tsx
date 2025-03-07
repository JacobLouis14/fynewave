import InfiniteSpinner from "@/components/common/infiniteSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <InfiniteSpinner />
    </div>
  );
};

export default Loading;

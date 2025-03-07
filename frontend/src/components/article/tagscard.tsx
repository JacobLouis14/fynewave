import React from "react";

const Tagscard = ({ tagName }: { tagName: string }) => {
  return (
    <div className="px-3 py-[2px] rounded-md hover:cursor-pointer border-[1px] border-[#991C42] text-[#982647] font-semibold hover:bg-gray-100">
      {tagName}
    </div>
  );
};

export default Tagscard;

import { getShowCasesMatrics } from "@/actions/sActions";
import React from "react";

const ArticleSummary = async () => {
  const { data: showcasesMatricsData, error: showcasesMatricsError } =
    await getShowCasesMatrics();

  return (
    <div className="flex flex-col gap-6 md:px-3 bg-white rounded-lg">
      <div className="flex flex-col gap-3 px-1 py-3 flex-wrap">
        {showcasesMatricsError ? (
          <p>Error in loading</p>
        ) : (
          showcasesMatricsData.allShowCasesMatrics?.map(
            (showcaseMatric, index) => (
              <div
                className="flex justify-between flex-wrap border border-gray-200 px-3 py-2 rounded-lg"
                key={index}
              >
                <h1>{showcaseMatric._id}</h1>
                <h1 className="font-bold text-darkRed">
                  {showcaseMatric.showcasesCount}
                </h1>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ArticleSummary;

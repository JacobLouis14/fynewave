import { getCategoryMatrics } from "@/actions/sActions";
import React from "react";

const CategorySummary = async () => {
  const { data: categoryMatricsData, error: categoryMatricsError } =
    await getCategoryMatrics();

  return (
    <div className="flex flex-col gap-6 md:px-3 bg-white rounded-lg">
      {categoryMatricsError ? (
        <p>Something went wrong</p>
      ) : (
        <>
          <div className="flex justify-between gap-5 px-4 py-3 flex-wrap">
            <p className="text-2xl">Total Categories</p>
            <h1 className="font-bold text-2xl text-darkRed">
              {categoryMatricsData.categoryMetrics?.totalCategoryCount}
            </h1>
          </div>
          <div className="flex flex-col gap-5 px-4 py-3 flex-wrap">
            {categoryMatricsData.categoryMetrics?.articleCountByCategory.map(
              (categoryMatrics, index) => (
                <div
                  className="flex justify-between flex-wrap border border-gray-200 px-3 py-2 rounded-lg"
                  key={index}
                >
                  <h1>{categoryMatrics._id}</h1>
                  <h1 className="font-bold text-darkRed">
                    {categoryMatrics.number}
                  </h1>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySummary;

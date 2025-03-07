import { getCategories } from "@/actions/sActions";
import React from "react";
import InfiniteSpinner from "../common/infiniteSpinner";
import CategoryDeleteBtn from "./categoryDeleteBtn";

const CategoryTable = async () => {
  const { data, error, isLoading } = await getCategories();

  // loading
  if (isLoading) {
    return (
      <div className="w-full">
        <InfiniteSpinner />
      </div>
    );
  }

  // error
  if (error) {
    return <div className="w-full">{error.message}</div>;
  }

  // no data
  if (!data) {
    return <div className="w-full">No categories available</div>;
  }

  return (
    <div className="relative flex py-10 overflow-x-auto">
      <table className="table-auto border border-collapse w-full">
        <thead>
          <tr>
            <th className="border py-5 px-5">#</th>
            <th className="border py-5 px-5">category name</th>
            <th className="border py-5 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((categoryData, index) => (
            <tr key={index}>
              <td className="border text-center">{index + 1}</td>
              <td className="border text-center px-5">
                {categoryData.category}
              </td>
              <td className="border text-center px-5 py-2">
                <CategoryDeleteBtn categoryId={categoryData._id || null} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;

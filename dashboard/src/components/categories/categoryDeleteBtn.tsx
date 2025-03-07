"use client";
import { deleteCategory } from "@/actions/sActions";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryDeleteBtn = ({ categoryId }: { categoryId: string | null }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // delete Handler
  const handleDelete = async () => {
    if (categoryId) {
      setIsLoading(true);
      try {
        const { data, error } = await deleteCategory(categoryId);

        // error
        if (error) {
          console.log(error);

          toast.error("error in deletion");
          return;
        }
        // data
        if (data) {
          toast.success("delete success");
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded-lg"
      onClick={handleDelete}
      disabled={isLoading}
    >
      Delete
    </button>
  );
};

export default CategoryDeleteBtn;

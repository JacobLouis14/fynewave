"use client";
import { createCategory } from "@/actions/sActions";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // submit handler
  const handleCategoryCreation = async (formData: FormData) => {
    if (isLoading) return;

    setIsLoading(true);

    const { data, error } = await createCategory(formData);

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    } else if (data) {
      toast.success("Successfully created");
    }

    setIsLoading(false);
  };

  return (
    <form action={handleCategoryCreation} className="flex flex-col gap-3">
      <input
        type="text"
        name="category"
        className="w-full border outline-none rounded-lg px-5 py-2"
        placeholder="new category"
      />
      <button
        className="px-3 py-2 rounded-lg bg-darkRed text-white"
        disabled={isLoading}
      >
        Create
      </button>
    </form>
  );
};

export default CategoryForm;

import CategoryForm from "@/components/categories/categoryForm";
import CategoryTable from "@/components/categories/categoryTable";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Categories = async () => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (!session?.user) redirect("/");

  return (
    <div className="px-5 py-12 grid grid-rows-1 grid-cols-1 md:grid-cols-7 gap-5">
      <div className="col-span-5">
        <CategoryTable />
      </div>
      <div className="col-span-2 flex flex-col gap-10">
        {/* creation */}
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-medium">Add Category</h1>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default Categories;

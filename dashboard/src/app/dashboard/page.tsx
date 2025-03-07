import ArticleSummary from "@/components/dashboard/articleSummary";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import CategorySummary from "@/components/dashboard/categorySummary";
import UserSummary from "@/components/dashboard/userSummary";
import { authOptions } from "@/config/authOptions";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (!session?.user) redirect("/");

  return (
    <div className="px-5 py-3 grid grid-rows-3 gap-4 h-full md:h-[90%]">
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 row-span-2 gap-4">
        <ArticleSummary />
        <CategorySummary />
      </div>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 row-span-2 gap-4">
        <UserSummary />
      </div>
    </div>
  );
};

export default Dashboard;

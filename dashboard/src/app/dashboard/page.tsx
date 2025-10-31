import React from "react";
import CategorySummary from "@/components/dashboard/categorySummary";
import DashboardCard from "@/components/dashboard/dashCard";
import { getDashboardCards } from "@/actions/sActions";

const Dashboard = async () => {
  const { data, error } = await getDashboardCards();

  return (
    <div className="px-5 py-3 flex flex-col gap-4 h-[90vh] overflow-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <DashboardCard
            title="Published Articles"
            value={data.data?.publishedArticles}
          />
        </div>
        <div>
          <DashboardCard
            title="Pending Articles"
            value={data.data?.pendingArticles}
          />
        </div>
        <div>
          <DashboardCard
            title="Scheduled Articles"
            value={data.data?.scheduledArticles}
          />
        </div>
        <div>
          <DashboardCard title="Users" value={data.data?.userCount} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="h-full">
          <CategorySummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";

interface Props {
  title: string;
  value?: number;
}

const DashboardCard = ({ title, value }: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full h-32 bg-red-300 rounded-md p-3">
      <p>{title}</p>
      <p className="text-6xl">{value || 0}</p>
    </div>
  );
};

export default DashboardCard;

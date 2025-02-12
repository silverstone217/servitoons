import AsideNavigation from "@/components/dashboard/AsideNavigation";
import HeaderSmallScreen from "@/components/dashboard/HeaderSmallScreen";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="w-full lg:overflow-hidden lg:h-dvh flex flex-col lg:flex-row">
      {/* header small screen */}
      <HeaderSmallScreen />

      {/* sidebar big screen*/}
      <AsideNavigation />

      {/* content */}
      <div className="lg:h-full lg:overflow-y-auto lg:overflow-x-hidden lg:flex-1 bg-slate-600 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

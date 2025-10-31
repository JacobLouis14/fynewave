import SidebarWrapper from "@/components/common/sidebarWrapper";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppBarDropdown from "@/components/common/appBarDropdown";
import Sidebarlist from "@/components/common/sidebarlist";
import SidebarToggler from "@/components/common/sidebarToggler";
import AuthGaurd from "@/lib/next-auth/authGaurd";
import Notification from "@/components/common/notification";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (session === null) redirect("/");

  return (
    <AuthGaurd>
      <div className="flex h-screen bg-gray-50 w-screen">
        {/* side bar */}
        <SidebarWrapper session={session}>
          <Sidebarlist userRole={session.user.role} />
        </SidebarWrapper>
        {/* Right side */}
        <div className="md:ms-[16rem] w-full h-screen flex flex-col">
          {/* appbar */}
          <div className="flex px-5 py-3 bg-darkRed text-white h-[8vh]">
            <div className="md:hidden">
              <SidebarToggler />
            </div>
            <div className="ms-auto flex items-center gap-3 pr-5">
              {/* <Notification /> */}
              <AppBarDropdown sessionData={session} />
            </div>
          </div>
          {/* contents */}
          <div className="h-[92%] relative overflow-hidden">{children}</div>
        </div>
      </div>
    </AuthGaurd>
  );
};

export default DashboardLayout;

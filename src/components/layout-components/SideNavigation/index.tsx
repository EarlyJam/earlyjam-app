import { useNavigate } from "@tanstack/react-router";
import { LuLogOut } from "react-icons/lu";

import LogoFull from "@/assets/svgs/LogoFull";
import ProfileDropdown from "@/components/layout-components/ProfileDropdown.tsx";
import NavList from "@/components/layout-components/SideNavigation/NavList";
import Divider from "@/components/ui/divider";
import { logout } from "@/helpers/auth.ts";

function SideNavigation() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    await navigate({ to: "/login" });
  };

  return (
    <div className="fixed left-0 top-0 z-sidenav hidden h-screen w-side-nav bg-gray-100 p-3 sm:block">
      <div className="h-full rounded-lg bg-blue-secondary-dark px-6 py-10">
        <div className="flex h-full flex-col items-start">
          <div className="flex w-full grow flex-col gap-5">
            <LogoFull variant="light" />
            <Divider className="border-gray-200/24" />
            <NavList />
          </div>
          <Divider className="border-gray-200/24" />
          <div className="w-full">
            <div className="py-3">
              <ProfileDropdown />
            </div>
            <div
              className="flex cursor-pointer flex-row items-center gap-3 py-3"
              onClick={handleLogout}
            >
              <LuLogOut className="h-6 w-6 cursor-pointer text-white" />
              <p className="text-base font-semibold leading-5.5 text-white">
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;

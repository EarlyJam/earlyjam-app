import { useState } from "react";

import { LuMenu } from "react-icons/lu";

import LogoFull from "@/assets/svgs/LogoFull";
import SideNavMobileView from "@/components/layout-components/SideNavigation/SideNavMobileView";

function MobileContent() {
  const [showSideNav, setShowSideNav] = useState(false);

  const handleMenuClick = () => {
    setShowSideNav((prev) => !prev);
  };

  return (
    <div className="flex grow flex-row items-center justify-between px-5 py-4 sm:hidden">
      <div className="h-8.75 w-20 [&>svg]:h-full [&>svg]:w-full">
        <LogoFull />
      </div>
      <LuMenu
        className="h-7 w-7 cursor-pointer text-gray-800"
        onClick={handleMenuClick}
      />
      {showSideNav && <SideNavMobileView />}
    </div>
  );
}

export default MobileContent;

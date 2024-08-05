import LogoFull from "@/assets/svgs/LogoFull";
import SideNavMobileView from "@/components/layout-components/SideNavigation/SideNavMobileView";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

function MobileContent() {
  const [showSideNav, setShowSideNav] = useState(false);

  const handleMenuClick = () => {
    setShowSideNav((prev) => !prev);
  };

  return (
    <div className="px-5 py-4 grow sm:hidden flex flex-row items-center justify-between">
      <div className="h-8.75 w-20 [&>svg]:h-full [&>svg]:w-full">
        <LogoFull />
      </div>
      <LuMenu
        className="h-7 w-7 text-gray-800 cursor-pointer"
        onClick={handleMenuClick}
      />
      {showSideNav && <SideNavMobileView />}
    </div>
  );
}

export default MobileContent;

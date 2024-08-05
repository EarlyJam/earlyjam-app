import DesktopContent from "@/components/layout-components/AppHeader/DesktopContent";
import MobileContent from "@/components/layout-components/AppHeader/MobileContent";
import SideNavSpacing from "@/components/layout-components/SideNavigation/SideNavSpacing";

function AppHeader() {
  return (
    <div className="fixed top-0 left-0 flex flex-row h-app-header-mobile sm:h-app-header w-screen bg-gray-50 border-b border-b-gray-300 z-header">
      <SideNavSpacing className="hidden sm:block" />
      <DesktopContent />
      <MobileContent />
    </div>
  );
}

export default AppHeader;

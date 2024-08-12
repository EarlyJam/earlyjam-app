import DesktopContent from "@/components/layout-components/AppHeader/DesktopContent";
import MobileContent from "@/components/layout-components/AppHeader/MobileContent";
import SideNavSpacing from "@/components/layout-components/SideNavigation/SideNavSpacing";

function AppHeader() {
  return (
    <div className="fixed left-0 top-0 z-header flex h-app-header-mobile w-screen flex-row border-b border-b-gray-300 bg-gray-50 sm:h-app-header">
      <SideNavSpacing className="hidden sm:block" />
      <DesktopContent />
      <MobileContent />
    </div>
  );
}

export default AppHeader;

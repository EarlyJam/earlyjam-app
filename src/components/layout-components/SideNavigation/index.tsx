import LogoFull from "@/assets/svgs/LogoFull";
import NavList from "@/components/layout-components/SideNavigation/NavList";
import SettingsNavLink from "@/components/layout-components/SideNavigation/SettingsNavLink";
import Divider from "@/components/ui/divider";

function SideNavigation() {
  return (
    <div className="fixed left-0 top-0 z-sidenav hidden h-screen w-side-nav bg-blue-secondary-dark p-6 sm:block">
      <div className="flex h-full flex-col items-start">
        <div className="flex w-full grow flex-col gap-5">
          <LogoFull variant="light" />
          <Divider className="border-gray-200/24" />
          <NavList />
        </div>
        <SettingsNavLink />
      </div>
    </div>
  );
}

export default SideNavigation;

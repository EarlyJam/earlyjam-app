import LogoFull from "@/assets/svgs/LogoFull";
import NavList from "@/components/layout-components/SideNavigation/NavList";
import SettingsNavLink from "@/components/layout-components/SideNavigation/SettingsNavLink";
import Divider from "@/components/ui/divider";

function SideNavigation() {
  return (
    <div className="fixed left-0 top-0 hidden sm:block w-side-nav h-screen p-6 bg-blue-secondary-dark z-sidenav">
      <div className="flex flex-col items-start h-full">
        <div className="flex flex-col gap-5 grow w-full">
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

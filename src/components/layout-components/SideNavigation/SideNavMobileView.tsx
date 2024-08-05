import AppHeaderSpacing from "@/components/layout-components/AppHeader/AppHeaderSpacing";
import NavList from "@/components/layout-components/SideNavigation/NavList";
import SettingsNavLink from "@/components/layout-components/SideNavigation/SettingsNavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileFullName } from "@/helpers/profile";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { getNameInitials } from "@/utils";

function SideNavMobileView() {
  const { data: profile } = useAuthProfile();

  const fullName = getProfileFullName(profile);

  return (
    <div className="fixed left-0 top-0 w-full h-screen flex flex-col pointer-events-none">
      <AppHeaderSpacing className="pointer-events-none bg-transparent" />
      <div className="flex flex-col items-start grow p-6 bg-blue-secondary-dark pointer-events-auto">
        <div className="grow w-full">
          <NavList />
        </div>
        <div className="space-y-4">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile?.profile_image} alt="Profile Image" />
              <AvatarFallback>{getNameInitials(fullName)}</AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold leading-5.5 text-white">
              {fullName}
            </p>
          </div>
          <SettingsNavLink />
        </div>
      </div>
    </div>
  );
}

export default SideNavMobileView;

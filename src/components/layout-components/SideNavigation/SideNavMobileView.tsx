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
    <div className="pointer-events-none fixed left-0 top-0 flex h-screen w-full flex-col">
      <AppHeaderSpacing className="pointer-events-none bg-transparent" />
      <div className="pointer-events-auto flex grow flex-col items-start bg-blue-secondary-dark p-6">
        <div className="w-full grow">
          <NavList />
        </div>
        <div className="space-y-4">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="h-12 w-12">
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

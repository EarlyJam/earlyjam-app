import { useNavigate } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { logout } from "@/helpers/auth";
import { getProfileFullName } from "@/helpers/profile";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { getNameInitials } from "@/utils";

function DesktopContent() {
  const navigate = useNavigate();

  const { data: profile } = useAuthProfile();

  const fullName = getProfileFullName(profile);

  const handleLogout = async () => {
    await logout();

    await navigate({ to: "/login" });
  };

  return (
    <div className="hidden grow flex-row-reverse items-center px-28 py-4.5 sm:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile?.profile_image} alt="Profile Image" />
              <AvatarFallback>{getNameInitials(fullName)}</AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold leading-5.5 text-blue-secondary-dark">
              {fullName}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DesktopContent;

import { useNavigate } from "@tanstack/react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { logout } from "@/helpers/auth.ts";
import { getProfileFullName } from "@/helpers/profile";
import useAuthProfile from "@/hooks/queries/useAuthProfile.ts";
import { getNameInitials } from "@/utils";

function ProfileDropdown() {
  const navigate = useNavigate();

  const { data: profile } = useAuthProfile();

  const fullName = getProfileFullName(profile);

  const handleLogout = async () => {
    await logout();

    await navigate({ to: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.profile_image} alt="Profile Image" />
            <AvatarFallback>{getNameInitials(fullName)}</AvatarFallback>
          </Avatar>
          <p className="text-base font-semibold leading-5.5 text-white">
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
  );
}

export default ProfileDropdown;

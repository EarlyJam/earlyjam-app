import { useMemo } from "react";

import LogoFull from "@/assets/svgs/LogoFull";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthProfile from "@/hooks/queries/useAuthProfile";

const Header = () => {
  const { data: profile } = useAuthProfile();

  const userData = useMemo(() => {
    return {
      name: `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim(),
      image: profile?.profile_image ?? "https://github.com/shadcn.png"
    };
  }, [profile]);

  return (
    <div className="fixed top-0 flex h-simple-header w-full flex-row items-center justify-between bg-beige-secondary px-5 py-4 shadow-ej-2 sm:px-28 sm:py-6">
      <LogoFull />
      <div className="flex flex-row items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userData.image} alt="user profile image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-base font-semibold leading-5.5">{userData.name}</p>
      </div>
    </div>
  );
};

export default Header;

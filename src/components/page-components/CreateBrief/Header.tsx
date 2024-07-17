import LogoFull from "@/assets/svgs/LogoFull";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { useMemo } from "react";

const Header = () => {
  const { data: profile } = useAuthProfile();

  const userData = useMemo(() => {
    return {
      name: `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim(),
      image: profile?.profile_image ?? "https://github.com/shadcn.png",
    };
  }, [profile]);
  console.log("🚀 ~ userData ~ userData:", userData);

  return (
    <div className="flex flex-row justify-between items-center px-5 py-4 sm:py-6 sm:px-28 bg-beige-secondary shadow-ej-2">
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

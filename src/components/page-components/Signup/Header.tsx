import { LuX } from "react-icons/lu";

import LogoFull from "@/assets/svgs/LogoFull";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-white px-5 py-6 sm:px-28 sm:py-8">
      <LogoFull />
      <div className="cursor-pointer rounded-full bg-gray-200 p-3 sm:p-4">
        <LuX className="text-gray-500" />
      </div>
    </div>
  );
};

export default Header;

import LogoFull from "@/assets/svgs/LogoFull";
import { X } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-5 py-6 sm:py-8 sm:px-28 bg-white">
      <LogoFull />
      <div className="sm:p-4 p-3 bg-gray-200 rounded-full cursor-pointer">
        <X className="text-gray-500" />
      </div>
    </div>
  );
};

export default Header;

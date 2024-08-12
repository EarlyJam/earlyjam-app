import LogoFull from "@/assets/svgs/LogoFull";

const Header = () => {
  return (
    <div className="absolute top-0 z-header flex w-full flex-row items-center gap-4.5 bg-beige-secondary px-5 py-4 shadow-ej-2 sm:px-28 sm:py-6">
      <LogoFull />
      <div className="h-9 w-px border-l border-l-gray-400-disable" />
      <p className="font-semibold leading-5.5 text-blue-secondary-dark">
        Jammer
      </p>
    </div>
  );
};

export default Header;

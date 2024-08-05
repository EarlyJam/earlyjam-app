import LogoFull from "@/assets/svgs/LogoFull";

const Header = () => {
  return (
    <div className="absolute top-0 w-full flex flex-row items-center gap-4.5 px-5 py-4 sm:py-6 sm:px-28 bg-beige-secondary shadow-ej-2 z-header">
      <LogoFull />
      <div className="h-9 w-px border-l border-l-gray-400-disable" />
      <p className="text-blue-secondary-dark font-semibold leading-5.5">
        Jammer
      </p>
    </div>
  );
};

export default Header;

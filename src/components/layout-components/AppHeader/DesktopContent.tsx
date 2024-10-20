import ProfileDropdown from "@/components/layout-components/ProfileDropdown.tsx";

function DesktopContent() {
  return (
    <div className="hidden grow flex-row-reverse items-center px-28 py-4.5 sm:flex">
      <ProfileDropdown />
    </div>
  );
}

export default DesktopContent;

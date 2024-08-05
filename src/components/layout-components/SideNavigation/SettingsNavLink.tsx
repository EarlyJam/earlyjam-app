import NavLink from "@/components/layout-components/SideNavigation/NavLink";
import { LuSettings } from "react-icons/lu";

function SettingsNavLink() {
  return <NavLink to="/settings" label="Settings" icon={<LuSettings />} />;
}

export default SettingsNavLink;

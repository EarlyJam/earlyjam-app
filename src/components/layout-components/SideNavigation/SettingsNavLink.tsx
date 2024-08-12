import { LuSettings } from "react-icons/lu";

import NavLink from "@/components/layout-components/SideNavigation/NavLink";

function SettingsNavLink() {
  return <NavLink to="/settings" label="Settings" icon={<LuSettings />} />;
}

export default SettingsNavLink;

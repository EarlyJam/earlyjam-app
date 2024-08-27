import { useLocation } from "@tanstack/react-router";
import { LuMenu, LuUserCheck2, LuUserCircle } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiBoundingBox, PiWallet } from "react-icons/pi";

import NavLink from "@/components/layout-components/SideNavigation/NavLink";
import useIsUserSuperAdmin from "@/hooks/useIsUserSuperAdmin.ts";
import { NavItem } from "@/types/global.ts";

const userNavItems: NavItem[] = [
  {
    label: "All Jams",
    value: "all_jams",
    to: "/",
    icon: <LuMenu />,
    children: [
      {
        label: "Feedback",
        value: "feedback",
        to: "/feedback",
        icon: <MdOutlineVideoLibrary />
      },
      {
        label: "Design",
        value: "design",
        to: "/design",
        icon: <PiBoundingBox />
      }
    ]
  },
  {
    label: "Jam Wallet",
    value: "jam_wallet",
    to: "/jam-wallet",
    icon: <PiWallet />
  },
  {
    label: "My Profile",
    value: "my_profile",
    to: "/my-profile",
    icon: <LuUserCircle />
  }
];

const superAdminNavItems: NavItem[] = [
  {
    label: "Jammer Management",
    value: "jammer_management",
    to: "/",
    icon: <LuUserCheck2 />
  },
  {
    label: "My Profile",
    value: "my_profile",
    to: "/my-profile",
    icon: <LuUserCircle />
  }
];

function NavList() {
  const location = useLocation();

  const isSuperAdmin = useIsUserSuperAdmin();

  const navItems = isSuperAdmin === false ? userNavItems : superAdminNavItems;

  return (
    <nav className="space-y-5">
      {navItems.map((item) => (
        <NavLink
          key={item.value}
          to={item.to}
          label={item.label}
          icon={item.icon}
          active={location.pathname.startsWith(item.to)}
          subLinks={item.children?.map((child) => ({
            to: child.value,
            label: child.label,
            icon: child.icon
          }))}
        />
      ))}
    </nav>
  );
}

export default NavList;

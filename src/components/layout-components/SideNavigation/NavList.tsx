import NavLink from "@/components/layout-components/SideNavigation/NavLink";
import { useLocation } from "@tanstack/react-router";
import { LuMenu, LuUserCircle } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiBoundingBox, PiWallet } from "react-icons/pi";

const items = [
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
        icon: <MdOutlineVideoLibrary />,
      },
      {
        label: "Design",
        value: "design",
        to: "/design",
        icon: <PiBoundingBox />,
      },
    ],
  },
  {
    label: "Jam Wallet",
    value: "jam_wallet",
    to: "/jam-wallet",
    icon: <PiWallet />,
  },
  {
    label: "My Profile",
    value: "my_profile",
    to: "/my-profile",
    icon: <LuUserCircle />,
  },
];

function NavList() {
  const location = useLocation();

  return (
    <nav className="space-y-5">
      {items.map((item) => (
        <NavLink
          key={item.value}
          to={item.to}
          label={item.label}
          icon={item.icon}
          active={location.pathname.startsWith(item.to)}
          subLinks={item.children?.map((child) => ({
            to: child.value,
            label: child.label,
            icon: child.icon,
          }))}
        />
      ))}
    </nav>
  );
}

export default NavList;

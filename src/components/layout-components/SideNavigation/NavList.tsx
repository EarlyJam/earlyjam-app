import { useLocation } from "@tanstack/react-router";
import { LuMenu, LuUserCheck2, LuUserCircle } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { PiWallet } from "react-icons/pi";

import DesignIcon from "@/assets/svgs/DesignIcon";
import NavLink from "@/components/layout-components/SideNavigation/NavLink";
import { UserType } from "@/enums/user.ts";
import useAuthProfile from "@/hooks/queries/useAuthProfile.ts";
import useIsUserSuperAdmin from "@/hooks/useIsUserSuperAdmin.ts";
import { NavItem } from "@/types/global.ts";

const userNavItems: NavItem[] = [
  {
    label: "All Briefs",
    value: "all_briefs",
    to: "/",
    icon: <LuMenu />
  }
];

const jammerNavItems: NavItem[] = [
  {
    label: "All Briefs",
    value: "all_briefs",
    to: "/",
    icon: <LuMenu />
  },
  {
    label: "Jam Wallet",
    value: "jam_wallet",
    to: "/jammer-wallet",
    icon: <PiWallet />
  },
  {
    label: "My Profile",
    value: "my_profile",
    to: "/my-profile",
    icon: <LuUserCircle />
  },
  {
    label: "Design",
    value: "design",
    to: "/markup",
    icon: <DesignIcon />
  }
];

const superAdminNavItems: NavItem[] = [
  {
    label: "Jammer Management",
    value: "jammer-management",
    to: "/",
    icon: <LuUserCheck2 />
  },
  {
    label: "Payment Transactions",
    value: "payment-transactions",
    to: "/payment-transactions",
    icon: <MdOutlinePayment />
  },
  {
    label: "Withdrawal Requests",
    value: "withdrawal-requests",
    to: "/withdrawal-requests",
    icon: <MdOutlinePayment />
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
  const { data: profile } = useAuthProfile();

  const isSuperAdmin = useIsUserSuperAdmin();

  let navItems = userNavItems;

  if (isSuperAdmin) {
    navItems = superAdminNavItems;
  }

  if (profile?.user_type === UserType.Jammer) {
    navItems = jammerNavItems;
  }

  return (
    <nav>
      {navItems.map((item) => (
        <NavLink
          key={item.value}
          to={item.to}
          label={item.label}
          icon={item.icon}
          active={location.pathname === item.to}
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

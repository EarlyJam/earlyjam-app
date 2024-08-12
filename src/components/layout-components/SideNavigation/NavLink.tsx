import { ReactNode, useState } from "react";

import { Link } from "@tanstack/react-router";
import { MdArrowDropUp } from "react-icons/md";

import { cn } from "@/utils";

type NavLinkProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  subLinks?: NavLinkProps[];
  active?: boolean;
};

function NavLink(props: NavLinkProps) {
  const { to, label, icon, className, subLinks = [], active } = props;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full">
      <Link
        className={cn(
          "flex h-11.5 w-full flex-row items-center justify-between rounded-lg p-3 text-white hover:bg-primary hover:text-blue-secondary-dark",
          { "bg-primary text-blue-secondary-dark": active },
          className
        )}
        to={to}
      >
        <div className="flex flex-row items-center justify-start">
          <span className="mr-2 h-5 w-5 [&>svg]:h-full [&>svg]:w-full">
            {icon}
          </span>
          <span className="mt-1 font-semibold leading-5.5">{label}</span>
        </div>
        {subLinks.length > 0 && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <MdArrowDropUp
              className={cn("h-5 w-5 transition-transform", {
                "rotate-180": collapsed
              })}
            />
          </span>
        )}
      </Link>
      <div
        className={cn("max-h-96 overflow-hidden transition-all", {
          "max-h-0": collapsed
        })}
      >
        {subLinks.length > 0 && (
          <div className="ml-3">
            {subLinks.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                label={child.label}
                icon={child.icon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavLink;

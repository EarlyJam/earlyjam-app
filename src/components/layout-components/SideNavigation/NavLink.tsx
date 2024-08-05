import { cn } from "@/utils";
import { Link } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";

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
          "flex flex-row items-center justify-between w-full h-11.5 text-white p-3 rounded-lg hover:bg-primary hover:text-blue-secondary-dark",
          { "bg-primary text-blue-secondary-dark": active },
          className,
        )}
        to={to}
      >
        <div className="flex flex-row items-center justify-start">
          <span className="w-5 h-5 mr-2 [&>svg]:h-full [&>svg]:w-full">
            {icon}
          </span>
          <span className="font-semibold mt-1 leading-5.5">{label}</span>
        </div>
        {subLinks.length > 0 && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            className="flex items-center justify-center h-6 w-6 cursor-pointer"
          >
            <MdArrowDropUp
              className={cn("h-5 w-5 transition-transform", {
                "rotate-180": collapsed,
              })}
            />
          </span>
        )}
      </Link>
      <div
        className={cn("max-h-96 transition-all overflow-hidden", {
          "max-h-0": collapsed,
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

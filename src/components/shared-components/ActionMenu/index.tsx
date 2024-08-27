import { PropsWithChildren } from "react";

import { LuMoreHorizontal } from "react-icons/lu";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { MenuItem } from "@/types/global.ts";

type ActionMenuProps = PropsWithChildren<{
  menuItems: MenuItem[];
  onItemClick?(value: string): void;
}>;

function ActionMenu(props: ActionMenuProps) {
  const { menuItems, onItemClick, children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ?? (
          <Button variant="ghost" className="h-auto w-auto p-0">
            <LuMoreHorizontal className="h-5 w-5 text-gray-700" />
          </Button>
        )}
      </DropdownMenuTrigger>
      {menuItems.length > 0 && (
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => onItemClick?.(item.value)}
                className={item.className}
              >
                <span className="mr-2 h-4 w-4">{item.icon}</span>
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default ActionMenu;

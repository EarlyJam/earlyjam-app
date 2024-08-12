import { Children, ComponentProps, ReactElement } from "react";

import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/utils";

type AvatarGroupProps = {
  name?: string;
  children:
    | ReactElement<ComponentProps<typeof Avatar>>
    | ReactElement<ComponentProps<typeof Avatar>>[];
};

function AvatarGroup(props: AvatarGroupProps) {
  const { name = "avatar-group", children } = props;

  const childrenArray = Children.toArray(children);

  return (
    <div className="flex flex-row items-center">
      {childrenArray.map((child, index) => (
        <span
          key={`${name}-${index.toString()}`}
          className={cn("flex", {
            "-ml-2.5": index !== 0
          })}
        >
          {child}
        </span>
      ))}
    </div>
  );
}

export default AvatarGroup;

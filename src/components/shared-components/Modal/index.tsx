import { PropsWithChildren, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import { cn } from "@/utils";

type ModalProps = PropsWithChildren<{
  trigger: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  fullScreen?: boolean;
  contentClassName?: string;
}>;

function Modal(props: ModalProps) {
  const {
    trigger,
    title,
    description,
    footer,
    children,
    fullScreen,
    contentClassName
  } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          {
            "w-modal-full h-modal-full max-w-none": fullScreen,
            "sm:max-w-modal": !fullScreen
          },
          contentClassName
        )}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

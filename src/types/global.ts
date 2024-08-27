import { ReactNode } from "react";

export type LabeledValue = {
  label: string;
  value: string;
};

export type EJFile = {
  id: string;
  name: string;
  url?: string;
  file?: File;
  status?: "uploading" | "uploaded";
};

export type NavItem = {
  label: string;
  value: string;
  to: string;
  icon: ReactNode;
  children?: NavItem[];
};

export type MenuItem = {
  label: string;
  value: string;
  icon?: ReactNode;
  className?: string;
};

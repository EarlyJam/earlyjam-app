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

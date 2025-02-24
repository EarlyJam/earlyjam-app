export type Markup = {
  id: string;
  user_id: string;
  thumb_url?: string;
  type: "file" | "webpage";
  name: string;
  updated_at?: string;
  created_at: string;
};

export type MarkupFile = {
  id: string;
  markup_id: string;
  user_id: string;
  url: string;
  type: string;
  size: number;
  name: string;
  updated_at?: string;
  created_at: string;
};

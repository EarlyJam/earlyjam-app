export type JammerReview = {
  id: string;
  project_id: string;
  jammer_id: string;
  user_id: string;
  review_type: "positive" | "negative";
  summary: string;
  created_at: string;
  updated_at: string;
};

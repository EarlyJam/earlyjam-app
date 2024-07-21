export type Project = {
  id: string;
  user_id: string;
  product_name: string;
  product_description?: string;
  product_problem_statement?: string;
  product_type?: string;
  product_industry?: string[];
  feedback_feature?: string;
  designer_critique_aspects?: string;
  feedback_aspects?: string[];
  feedback_goals?: string[];
  project_link?: { url: string }[];
  project_images?: {
    id: string;
    name: string;
    url: string;
  }[];
  status?: string;
  created_at: string;
  updated_at: string;
};

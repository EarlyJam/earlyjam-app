export const INDUSTRY_OPTIONS = [
  { label: "AI", value: "ai" },
  { label: "Collaboration", value: "collaboration" },
  { label: "Communication", value: "communication" },
  { label: "Crypto & Web3", value: "crypto-web3" },
  { label: "Design", value: "design" },
  { label: "Dev Tools", value: "dev-tools" },
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Events", value: "events" },
  { label: "Finance", value: "finance" },
  { label: "Food & Drink", value: "food-drink" },
  { label: "Gaming", value: "gaming" },
  { label: "Health & Fitness", value: "health-fitness" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Medical", value: "medical" },
  { label: "Music & Audio", value: "music-audio" },
  { label: "News", value: "news" },
  { label: "Photo & Video", value: "photo-video" },
  { label: "Productivity", value: "productivity" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Recruitment", value: "recruitment" },
  { label: "Shopping & Marketplace", value: "shopping-marketplace" },
  { label: "Social", value: "social" },
  { label: "SaaS", value: "saas" },
  { label: "Streaming", value: "streaming" },
  { label: "Travel & Transportation", value: "travel-transportation" },
  { label: "Other", value: "other" }
];

export const INDUSTRY_OPTIONS_MAP = new Map<string, string>(
  INDUSTRY_OPTIONS.map(({ value, label }) => [value, label])
);

export const PROFILE_STATUS_LABELS = {
  active: "Active",
  rejected: "Rejected",
  under_review: "Under Review"
} as const;

export const UPSELL_COST = 2000;

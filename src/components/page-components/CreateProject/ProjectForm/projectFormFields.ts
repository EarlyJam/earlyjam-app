import { z } from "zod";

// Removed import { INDUSTRY_OPTIONS } from "@/constants";
import { FormFieldType } from "@/enums/form";
import { FormField } from "@/types/form";

export const DESIGN_AREAS_OPTIONS = [
  { label: "UI Design", value: "UI Design" },
  { label: "UX Flow", value: "UX Flow" },
  { label: "Branding", value: "Branding" },
  { label: "Visual Hierarchy", value: "Visual Hierarchy" },
  { label: "Accessibility", value: "Accessibility" },
  { label: "Copywriting", value: "Copywriting" },
  { label: "Interaction Design", value: "Interaction Design" },
  { label: "Other", value: "Other" },
];

export const formSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_overview: z.string().min(1, "Product overview is required"),
  key_features: z.array(z.string()).min(1, "At least one key feature is required"),
  product_type: z.string().min(1, "Product type is required"),
  industry: z.array(z.string()).min(1, "At least one industry is required"),
  // Step 2 fields
  design_areas: z.array(z.string()).min(1, "Select at least one area for feedback"),
  additional_notes: z.string().optional(),
});

export const step1Schema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_overview: z.string().min(1, "Product overview is required"),
  key_features: z.array(z.string()).min(1, "At least one key feature is required"),
  product_type: z.string().min(1, "Product type is required"),
  industry: z.array(z.string()).min(1, "At least one industry is required"),
});

export const step2Schema = z.object({
  project_files: z.array(z.any()).min(1, "Please upload at least one file"),
  project_link: z.array(z.object({ url: z.string().url("Enter a valid URL").min(1, "Project link is required") })).min(1, "Add at least one project link"),
  critique_focus: z.string().min(1, "Critique focus is required"),
  feedback_aspects: z.array(z.string()).min(1, "Add at least one feedback aspect"),
  feature_flows: z.array(z.string()).min(1, "Add at least one feature/flow"),
  feedback_goals: z.array(z.string()).min(1, "Add at least one feedback goal"),
});

export type FormType = z.infer<typeof formSchema> & {
  project_files: File[];
  project_link: { url: string }[];
  critique_focus: string;
  feedback_aspects: string[];
  feature_flows: string[];
  feedback_goals: string[];
};

export const PRODUCT_TYPE_OPTIONS = [
  { label: "Mobile App", value: "Mobile App" },
  { label: "Web App", value: "Web App" },
  { label: "Landing Page", value: "Landing Page" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "SaaS dashboard", value: "SaaS dashboard" },
  { label: "Plugin", value: "Plugin" },
  { label: "Design System", value: "Design System" },
];

export const INDUSTRY_OPTIONS = [
  { label: "AI", value: "AI" },
  { label: "Collaboration", value: "Collaboration" },
  { label: "Communication", value: "Communication" },
  { label: "Crypto & Web3", value: "Crypto & Web3" },
  { label: "Design", value: "Design" },
  { label: "Dev Tools", value: "Dev Tools" },
  { label: "Education", value: "Education" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Events", value: "Events" },
  { label: "Finance", value: "Finance" },
  { label: "Food & Drink", value: "Food & Drink" },
  { label: "Gaming", value: "Gaming" },
  { label: "Health & Fitness", value: "Health & Fitness" },
  { label: "Lifestyle", value: "Lifestyle" },
  { label: "Medical", value: "Medical" },
  { label: "Music & Audio", value: "Music & Audio" },
  { label: "News", value: "News" },
  { label: "Photo & Video", value: "Photo & Video" },
  { label: "Productivity", value: "Productivity" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Recruitment", value: "Recruitment" },
  { label: "Shopping & Marketplace", value: "Shopping & Marketplace" },
  { label: "Social", value: "Social" },
  { label: "SaaS", value: "SaaS" },
  { label: "Streaming", value: "Streaming" },
  { label: "Travel", value: "Travel" },
];

export const formFields: Record<number, FormField<FormType>[]> = {
  1: [
    {
      type: FormFieldType.TextField,
      name: "product_name",
      label: "Name of Product",
      fieldData: {
        placeholder: "Enter your product name",
        type: "text"
      }
    },
    {
      type: FormFieldType.TextArea,
      name: "product_overview",
      label: "Product Overview",
      fieldData: {
        placeholder: "Describe your product...",
        maxLength: 100
      }
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "key_features",
      label: "Key Features",
      fieldData: {
        defaultFieldValue: "",
        addButtonText: "Add feature",
        type: FormFieldType.TextField,
        fieldData: {
          placeholder: "Enter a key feature"
        }
      }
    },
    {
      type: FormFieldType.ChipSelection,
      name: "product_type",
      label: "Select your Product Type",
      fieldData: {
        options: PRODUCT_TYPE_OPTIONS,
        singleSelect: true
      }
    },
    {
      type: FormFieldType.ChipSelection,
      name: "industry",
      label: "Select your Industry",
      description: "Select industries that represents your background and experience",
      descriptionPosition: "top",
      fieldData: {
        options: INDUSTRY_OPTIONS
      }
    }
  ],
  2: [
    {
      type: FormFieldType.FileUpload,
      name: "project_files",
      label: "Project File",
      fieldData: {
        multiple: true,
        accept: {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "application/pdf": [".pdf"],
          "application/octet-stream": [".fig"]
        }
      }
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "project_link",
      label: "Project Link",
      fieldData: {
        defaultFieldValue: { url: "" },
        addButtonText: "Add link",
        type: FormFieldType.TextField,
        fieldData: {
          prefixLabel: "http://",
          placeholder: "example.com/user-registration-login"
        },
        dynamicFieldName: "url"
      }
    },
    {
      type: FormFieldType.TextArea,
      name: "critique_focus",
      label: "Critique Focus",
      fieldData: {
        placeholder: "Describe what you want feedback on...",
        maxLength: 500
      }
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "feedback_aspects",
      label: "Feedback Aspects",
      fieldData: {
        defaultFieldValue: "",
        addButtonText: "Add point",
        type: FormFieldType.TextField,
        fieldData: {
          placeholder: "e.g. Overall user experience"
        }
      }
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "feature_flows",
      label: "Feature/Flow",
      fieldData: {
        defaultFieldValue: "",
        addButtonText: "Add point",
        type: FormFieldType.TextField,
        fieldData: {
          placeholder: "e.g. User registration"
        }
      }
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "feedback_goals",
      label: "Feedback Goals",
      fieldData: {
        defaultFieldValue: "",
        addButtonText: "Add point",
        type: FormFieldType.TextField,
        fieldData: {
          placeholder: "e.g. Improve user experience"
        }
      }
    }
  ]
};

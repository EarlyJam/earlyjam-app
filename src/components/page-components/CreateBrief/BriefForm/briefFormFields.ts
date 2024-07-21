import { INDUSTRY_OPTIONS } from "@/constants";
import { FormFieldType } from "@/enums/form";
import { FormField } from "@/types/form";
import { z } from "zod";

export const formSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  product_problem_statement: z.string().min(1, "Problem statement is required"),
  product_type: z.string().min(1, "Product type is required"),
  product_industry: z
    .array(z.string())
    .nonempty("Product industry is required"),
  feedback_feature: z.string().min(1, "Feedback feature is required"),
  designer_critique_aspects: z
    .string()
    .min(1, "Designer critique aspects is required"),
  feedback_aspects: z
    .array(z.string())
    .nonempty("Feedback aspects is required"),
  feedback_goals: z.array(z.string()).nonempty("Feedback goals is required"),
  project_link: z.array(z.object({ url: z.string() })),
  project_images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type FormType = z.infer<typeof formSchema>;

const PRODUCT_TYPE_OPTIONS = [
  { label: "Mobile app", value: "Mobile app" },
  { label: "Website", value: "Website" },
  {
    label: "Software Application",
    value: "Software Application",
  },
  { label: "Other", value: "Other" },
];

const FEEDBACK_ASPECTS_OPTIONS = [
  {
    label: "Overall user experience",
    value: "user_experience",
  },
  { label: "Visual design", value: "visual_design" },
  { label: "Functionality", value: "functionality" },
  {
    label: "Information architecture",
    value: "information_architecture",
  },
  { label: "Accessibility", value: "accessibility" },
  { label: "Responsive design", value: "responsive_design" },
  {
    label: "Conversion elements",
    value: "conversion_elements",
  },
  { label: "Uniqueness", value: "uniqueness" },
];

const FEEDBACK_GOALS_OPTIONS = [
  {
    label: "Increase revenue",
    value: "increase_revenue",
  },
  {
    label: "Improve acquisition",
    value: "improve_acquisition",
  },
  { label: "Improve user experience", value: "improve_ux" },
  {
    label: "Improve retention",
    value: "improve_retention",
  },
];

export const formFields: Record<number, FormField<FormType>[]> = {
  1: [
    {
      type: FormFieldType.TextField,
      name: "product_name",
      label: "Name of product",
      fieldData: {
        placeholder: "Mobile app for fitness startup",
        type: "text",
      },
    },
    {
      type: FormFieldType.TextArea,
      name: "product_description",
      label: "What does your product do?",
      fieldData: {
        placeholder: "Describe what your product does...",
      },
    },
    {
      type: FormFieldType.TextArea,
      name: "product_problem_statement",
      label: "What problem does your product solve for your customers?",
      fieldData: {
        placeholder: "Describe the main challenge your product addresses...",
      },
    },
    {
      type: FormFieldType.Select,
      name: "product_type",
      label: "Product Type",
      fieldData: {
        placeholder: "Select product type",
        options: PRODUCT_TYPE_OPTIONS,
      },
    },
    {
      type: FormFieldType.ChipSelection,
      name: "product_industry",
      label: "What industry represents your product best?",
      description: "Select industries that represents your product",
      descriptionPosition: "top",
      fieldData: {
        options: INDUSTRY_OPTIONS,
      },
    },
  ],
  2: [
    {
      type: FormFieldType.TextArea,
      name: "feedback_feature",
      label: "What feature and/or flow you want feedback for?",
      fieldData: {
        placeholder: "Describe your feature or flow...",
      },
    },
    {
      type: FormFieldType.TextArea,
      name: "designer_critique_aspects",
      label: "What do you want the designer to critique?",
      fieldData: {
        placeholder: "Specify aspects of your design for feedback...",
      },
    },
    {
      type: FormFieldType.CheckboxGroup,
      name: "feedback_aspects",
      label: "What particular aspects do you want feedback on?",
      fieldData: {
        allowCustomInput: true,
        options: FEEDBACK_ASPECTS_OPTIONS,
        className: "grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4",
        containerClassName: "space-y-4.5 sm:space-y-1.5",
      },
    },
    {
      type: FormFieldType.CheckboxGroup,
      name: "feedback_goals",
      label: "What is your product goals from feedback?",
      fieldData: {
        allowCustomInput: true,
        options: FEEDBACK_GOALS_OPTIONS,
        className: "grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4",
        containerClassName: "space-y-4.5 sm:space-y-1.5",
      },
    },
    {
      type: FormFieldType.DynamicFieldList,
      name: "project_link",
      label: "Link to your project",
      fieldData: {
        defaultFieldValue: {
          url: "",
        },
        addButtonText: "Add another link",
        description:
          "Provide link to your prototype, staging environment or product. Please ensure that Jammers have access.",
        type: FormFieldType.TextField,
        fieldData: {
          prefixLabel: "https://",
        },
        dynamicFieldName: "url",
      },
    },
    {
      type: FormFieldType.FileUpload,
      name: "project_images",
      label: "or you can alternatively upload images",
      fieldData: {
        accept: {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
        },
        maxSize: 1024 * 1024 * 200, // 200 MB
      },
    },
  ],
};

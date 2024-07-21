import { INDUSTRY_OPTIONS } from "@/constants";
import { FormFieldType } from "@/enums/form";
import { FormField } from "@/types/form";
import { z } from "zod";

export const formSchema = z.object({
  first_name: z
    .string({ message: "First name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers",
    }),
  last_name: z
    .string({ message: "Last name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers",
    }),
  profile_image: z.string().url({ message: "Invalid image url" }),
  work_experience: z
    .string()
    .min(1, { message: "Work experience is required" })
    .max(164, { message: "Too long" }),
  expertise: z.array(z.string()).nonempty({ message: "Expertise is required" }),
  linkedin_url: z.string(),
  portfolio_links: z.array(z.object({ url: z.string() })),
  project_images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type FormType = z.infer<typeof formSchema>;

export const formFields: Record<number, FormField<FormType>[]> = {
  1: [
    {
      name: "first_name",
      label: "First name",
      type: FormFieldType.TextField,
      className: "col-span-2 sm:col-span-1",
    },
    {
      name: "last_name",
      label: "Last name",
      type: FormFieldType.TextField,
      className: "col-span-2 sm:col-span-1",
    },
    {
      name: "profile_image",
      label: "Upload a profile picture",
      description: "Please upload an actual photo of you",
      descriptionPosition: "top",
      type: FormFieldType.ProfileImage,
      className: "col-span-2",
    },
    {
      name: "work_experience",
      label: "Share your experience",
      type: FormFieldType.TextArea,
      fieldData: {
        placeholder:
          "Share a bit about your work experience, area of expertise and what would make you the right Jammer to work with.",
        maxLength: 164,
        showCharacterCount: true,
      },
      className: "col-span-2",
    },
    {
      type: FormFieldType.ChipSelection,
      name: "expertise",
      label: "Select your expertise",
      description:
        "Select industries that represents your background and experience",
      descriptionPosition: "top",
      fieldData: {
        options: INDUSTRY_OPTIONS,
      },
      className: "col-span-2",
    },
  ],
  2: [
    {
      name: "linkedin_url",
      label: "Your Linkedin",
      type: FormFieldType.TextField,
      fieldData: {
        prefixLabel: "https://",
      },
      className: "col-span-2",
    },
    {
      name: "portfolio_links",
      label: "Portfolio and Examples of work",
      description:
        "Give us link of you profilio work, such as Behance, figma dribbbles. etc",
      descriptionPosition: "top",
      type: FormFieldType.DynamicFieldList,
      fieldData: {
        defaultFieldValue: {
          url: "",
        },
        addButtonText: "Add another link",
        type: FormFieldType.TextField,
        fieldData: {
          prefixLabel: "https://",
        },
        dynamicFieldName: "url",
      },
      className: "col-span-2",
    },
    {
      name: "project_images",
      label: "Update your project’s images",
      type: FormFieldType.FileUpload,
      fieldData: {
        accept: {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
        },
        maxSize: 1024 * 1024 * 200, // 200 MB
        multiple: true,
      },
      className: "col-span-2",
    },
  ],
};

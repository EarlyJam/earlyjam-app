import { Control } from "react-hook-form";

import ChipSelection from "@/components/shared-components/ChipSelection";
import Select from "@/components/shared-components/Select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormType } from "../index";

const industryOptions = [
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
  { label: "Other", value: "other" },
];

type FormFieldsProps = {
  control: Control<FormType>;
};

function FormFields(props: FormFieldsProps) {
  const { control } = props;

  return (
    <>
      <FormField
        control={control}
        name="product_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name of product</FormLabel>
            <FormControl>
              <Input placeholder="Mobile app for fitness startup" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="product_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What does your product do?</FormLabel>
            <FormControl>
              <Textarea
                className="resize-none"
                placeholder="Describe what your product does..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="product_problem_statement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What problem does your product solve for your customers?
            </FormLabel>
            <FormControl>
              <Textarea
                className="resize-none"
                placeholder="Describe the main challenge your product addresses..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="product_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Type</FormLabel>
            <FormControl>
              <Select
                placeholder="Select product type"
                options={[
                  { label: "Mobile app", value: "Mobile app" },
                  { label: "Website", value: "Website" },
                  {
                    label: "Software Application",
                    value: "Software Application",
                  },
                  { label: "Other", value: "Other" },
                ]}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="product_industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What industry represents your product best?</FormLabel>
            <FormDescription>
              Select industries that represents your product
            </FormDescription>
            <FormControl>
              <ChipSelection
                options={industryOptions}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <hr className="border-gray-400-disable border-dashed" />
    </>
  );
}

export default FormFields;

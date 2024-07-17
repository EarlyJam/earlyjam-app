import { Control } from "react-hook-form";

import CheckboxGroup from "@/components/shared-components/CheckboxGroup";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import DynamicFieldList from "@/components/shared-components/DynamicFieldList";
import FileUpload from "@/components/shared-components/FileUpload";
import { Input } from "@/components/ui/input";
import { EJFile } from "@/types/global";
import { FormType } from "../index";

type FormFieldsProps = {
  control: Control<FormType>;
};

function FormFields(props: FormFieldsProps) {
  const { control } = props;

  return (
    <>
      <FormField
        control={control}
        name="feedback_feature"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What feature and/or flow you want feedback for?
            </FormLabel>
            <FormControl>
              <Textarea
                className="resize-none"
                placeholder="Describe your feature or flow..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="designer_critique_aspects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What do you want the designer to critique?</FormLabel>
            <FormControl>
              <Textarea
                className="resize-none"
                placeholder="Specify aspects of your design for feedback..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="feedback_aspects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What particular aspects do you want feedback on?
            </FormLabel>
            <FormControl>
              <CheckboxGroup
                value={field.value}
                onChange={field.onChange}
                allowCustomInput
                options={[
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
                ]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="feedback_goals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is your product goals from feedback?</FormLabel>
            <FormControl>
              <CheckboxGroup
                value={field.value}
                onChange={field.onChange}
                allowCustomInput
                options={[
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
                ]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormItem>
        <FormLabel>Link to your project</FormLabel>
        <FormControl>
          <DynamicFieldList
            control={control}
            name="project_link"
            defaultFieldValue=" "
            addButtonText="Add another link"
            description="Provide link to your prototype, staging environment or product. Please ensure that Jammers have access."
          >
            {({ field }) => (
              <div className="flex flex-row">
                <div className="border border-r-0 border-gray-400-disable rounded-lg rounded-r-none flex items-center justify-center py-2.5 px-3 text-gray-600-secondary h-10">
                  https://
                </div>
                <Input
                  className="w-full rounded-l-none"
                  {...field}
                  value={field.value as string}
                />
              </div>
            )}
          </DynamicFieldList>
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormField
        control={control}
        name="project_images"
        render={({ field }) => (
          <FileUpload
            value={field.value as unknown as EJFile[]}
            onChange={field.onChange}
          />
        )}
      />
      <hr className="border-gray-400-disable border-dashed" />
    </>
  );
}

export default FormFields;

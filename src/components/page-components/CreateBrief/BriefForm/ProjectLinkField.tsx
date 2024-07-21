import { DynamicFieldListComponentProps } from "@/components/shared-components/DynamicFieldList";
import { Input } from "@/components/ui/input";

import { FormType } from "./briefFormFields";

function ProjectLinkField(props: DynamicFieldListComponentProps<FormType>) {
  const { data } = props;
  const { field } = data;

  return (
    <div className="flex flex-row">
      <div className="border border-r-0 border-gray-400-disable rounded-lg rounded-r-none flex items-center justify-center py-2.5 px-3 text-gray-600-secondary h-10">
        https://
      </div>
      <Input
        className="w-full rounded-l-none"
        {...field}
        onChange={(e) => field.onChange({ url: e.target.value })}
        value={(field.value as { url?: string } | undefined)?.url}
      />
    </div>
  );
}

export default ProjectLinkField;

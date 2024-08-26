import {
  ArrayPath,
  ControllerRenderProps,
  FieldPath,
  FieldValues
} from "react-hook-form";

import Button from "@/components/shared-components/Button";
import CheckboxGroup from "@/components/shared-components/CheckboxGroup";
import ChipSelection from "@/components/shared-components/ChipSelection";
import DynamicFieldList from "@/components/shared-components/DynamicFieldList";
import FileUpload from "@/components/shared-components/FileUpload";
import ProfileImageField from "@/components/shared-components/ProfileImageField";
import RecordVideoButton from "@/components/shared-components/RecordVideoButton";
import Select from "@/components/shared-components/Select";
import TextArea from "@/components/shared-components/TextArea";
import TextField from "@/components/shared-components/TextField";
import { FormFieldType } from "@/enums/form";
import { FormField, TextField as TextFieldType } from "@/types/form";

type FieldRendererProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: FormField<TFieldValues, TName>;
  controllerField: ControllerRenderProps<TFieldValues, TName>;
};

function FieldRenderer<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FieldRendererProps<TFieldValues, TName>) {
  const { field, controllerField } = props;

  switch (field.type) {
    case FormFieldType.TextArea:
      return <TextArea {...field.fieldData} {...controllerField} />;
    case FormFieldType.Select:
      return <Select {...field.fieldData} {...controllerField} />;
    case FormFieldType.CheckboxGroup:
      return <CheckboxGroup {...field.fieldData} {...controllerField} />;
    case FormFieldType.ChipSelection:
      return <ChipSelection {...field.fieldData} {...controllerField} />;
    case FormFieldType.FileUpload:
      return <FileUpload {...field.fieldData} {...controllerField} />;
    case FormFieldType.DynamicFieldList:
      return (
        <DynamicFieldList
          {...field.fieldData}
          defaultFieldValue={field.fieldData?.defaultFieldValue}
          {...controllerField}
          name={controllerField.name as ArrayPath<TFieldValues>}
        />
      );
    case FormFieldType.ProfileImage:
      return <ProfileImageField {...field.fieldData} {...controllerField} />;
    case FormFieldType.Button:
      return (
        <Button
          className="w-auto"
          {...field.fieldData}
          {...controllerField}
          startIcon={field.icon}
        />
      );
    case FormFieldType.RecordVideoButton:
      return (
        <RecordVideoButton
          className="w-auto"
          {...field.fieldData}
          {...controllerField}
          startIcon={field.icon}
        />
      );
    case FormFieldType.TextField:
    default:
      return (
        <TextField
          {...(field as TextFieldType).fieldData}
          {...controllerField}
        />
      );
  }
}

export default FieldRenderer;

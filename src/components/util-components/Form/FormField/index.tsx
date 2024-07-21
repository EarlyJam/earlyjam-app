import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadFormField,
} from "@/components/ui/form";
import { FormField as FormFieldType } from "@/types/form";

import FieldRenderer from "./FieldRenderer";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: Omit<FormFieldType<TFieldValues, TName>, "name">;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Partial<Pick<ControllerProps<TFieldValues, TName>, "render">>;

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  const { name, control, render, field, className } = props;

  const { label, description, descriptionPosition = "bottom" } = field;

  return (
    <ShadFormField
      control={control}
      name={name}
      render={(fieldProps) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          {description && descriptionPosition === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormControl>
            {render ? (
              render(fieldProps)
            ) : (
              <FieldRenderer
                field={{ ...field, name } as FormFieldType<TFieldValues, TName>}
                controllerField={fieldProps.field}
              />
            )}
          </FormControl>
          {description && descriptionPosition === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;

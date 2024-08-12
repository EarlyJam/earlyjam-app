import { ComponentType, ReactNode } from "react";

import {
  ArrayPath,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldArray,
  FieldPath,
  FieldValues,
  Path,
  useFieldArray
} from "react-hook-form";
import { LuX } from "react-icons/lu";

import FieldRenderer from "@/components/shared-components/Form/FormField/FieldRenderer";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { DynamicFormField, FormField } from "@/types/form";

export type DynamicFieldListComponentProps<
  TFieldValues extends FieldValues = FieldValues
> = {
  data: {
    index: number;
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  };
  methods: { remove: () => void };
};

export type DynamicFieldListComponent<
  TFieldValues extends FieldValues = FieldValues
> = ComponentType<DynamicFieldListComponentProps<TFieldValues>>;

type DynamicFieldListProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  addButtonText?: ReactNode;
  defaultFieldValue: unknown;
  description?: ReactNode;
  FieldComponent?: DynamicFieldListComponent<TFieldValues>;
  name: ArrayPath<TFieldValues>;
  dynamicFieldName?: string;
} & Pick<ControllerProps<TFieldValues, TName>, "control"> &
  Partial<DynamicFormField>;

function DynamicFieldList<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: DynamicFieldListProps<TFieldValues, TName>) {
  const {
    FieldComponent,
    addButtonText = "Add another",
    control,
    name,
    defaultFieldValue,
    description,
    dynamicFieldName,
    ...rest
  } = props;

  const { append, remove, fields } = useFieldArray<TFieldValues>({
    control,
    name
  });

  return (
    <div className="text-center">
      <div className="space-y-2">
        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex flex-row items-center gap-2">
              <div className="grow">
                <Controller
                  control={control}
                  name={
                    `${name}.${index.toString()}${dynamicFieldName ? "." + dynamicFieldName : ""}` as Path<TFieldValues>
                  }
                  render={({ field }) => {
                    return FieldComponent ? (
                      <FieldComponent
                        data={{ index, field }}
                        methods={{ remove: () => remove(index) }}
                      />
                    ) : (
                      <FieldRenderer
                        field={rest as FormField}
                        controllerField={
                          field as ControllerRenderProps<FieldValues, string>
                        }
                      />
                    );
                  }}
                />
              </div>
              {fields.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg border-gray-400-disable"
                  onClick={() => remove(index)}
                >
                  <LuX className="h-5 w-5 text-blue-secondary-dark" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
      {description && (
        <FormDescription className="text-left">{description}</FormDescription>
      )}
      <Button
        className="mt-4.5 text-sm font-semibold leading-4.5 text-blue-secondary-dark underline"
        variant="link"
        onClick={() =>
          append(
            (typeof defaultFieldValue === "function"
              ? defaultFieldValue()
              : defaultFieldValue) as
              | FieldArray<TFieldValues, ArrayPath<TFieldValues>>
              | FieldArray<TFieldValues, ArrayPath<TFieldValues>>[]
          )
        }
      >
        {addButtonText}
      </Button>
    </div>
  );
}

export default DynamicFieldList;

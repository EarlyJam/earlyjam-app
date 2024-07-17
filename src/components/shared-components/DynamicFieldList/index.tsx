import { X } from "lucide-react";
import { ReactElement } from "react";
import {
  ArrayPath,
  Control,
  Controller,
  ControllerRenderProps,
  FieldArray,
  Path,
  useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";

type DynamicFieldListProps<T extends Record<string, unknown>> = {
  addButtonText?: string;
  defaultFieldValue: unknown;
  description?: string;
  control: Control<T>;
  name: string;
  children: (
    props: { index: number; field: ControllerRenderProps<T, Path<T>> },
    methods: { remove: () => void },
  ) => ReactElement;
};

function DynamicFieldList<T extends Record<string, unknown>>(
  props: DynamicFieldListProps<T>,
) {
  const {
    children,
    addButtonText = "Add another",
    control,
    name,
    defaultFieldValue,
    description,
  } = props;

  const { append, remove, fields } = useFieldArray({
    control,
    name: name as unknown as ArrayPath<T>,
  });

  return (
    <div className="text-center">
      <div className="space-y-2">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-row items-center gap-2">
            <div className="grow">
              <Controller
                control={control}
                name={`${name}.${index.toString()}` as Path<T>}
                key={item.id}
                render={({ field }) =>
                  children({ index, field }, { remove: () => remove(index) })
                }
              />
            </div>
            {fields.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                className="border-gray-400-disable rounded-lg"
                onClick={() => remove(index)}
              >
                <X className="text-blue-secondary-dark h-5 w-5" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {description && (
        <FormDescription className="text-left">{description}</FormDescription>
      )}
      <Button
        className="text-sm font-semibold leading-4.5 text-blue-secondary-dark underline mt-4.5"
        variant="link"
        onClick={() =>
          append(
            defaultFieldValue as
              | FieldArray<T, ArrayPath<T>>
              | FieldArray<T, ArrayPath<T>>[],
          )
        }
      >
        {addButtonText}
      </Button>
    </div>
  );
}

export default DynamicFieldList;

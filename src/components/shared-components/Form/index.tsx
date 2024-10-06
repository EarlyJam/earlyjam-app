import { ReactNode, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeepPartial,
  DefaultValues,
  FormProvider,
  Mode,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormReturn
} from "react-hook-form";
import { z } from "zod";

import FormField from "@/components/shared-components/Form/FormField";
import { FormField as FormFieldType } from "@/types/form";
import { cn } from "@/utils";

type FormProps<
  T extends z.ZodRawShape,
  Schema extends z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>>,
  FormType extends z.infer<Schema> = z.infer<Schema>
> = {
  id?: string;
  schema?: Schema;
  defaultValues?: DeepPartial<FormType>;
  fields: FormFieldType<FormType>[];
  formClassName?: string;
  fieldsContainerClassName?: string;
  formFieldClassName?: string;
  childrenContainerClassName?: string;
  mode?: Mode;
  formResetDependencies?: unknown[];

  onSubmit: SubmitHandler<FormType>;
  onError?: SubmitErrorHandler<FormType>;
  children?:
    | ReactNode
    | ((form: UseFormReturn<FormType>, submitForm: () => void) => ReactNode);
};

function Form<
  T extends z.ZodRawShape,
  Schema extends z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>>
>(props: FormProps<T, Schema>) {
  const {
    id,
    onSubmit,
    onError,
    schema,
    defaultValues,
    fields,
    formClassName,
    fieldsContainerClassName,
    formFieldClassName,
    childrenContainerClassName,
    mode,
    formResetDependencies = [],
    children
  } = props;

  type FormType = z.infer<Schema>;

  const form = useForm<FormType>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as DefaultValues<FormType>,
    mode
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, formResetDependencies);

  return (
    <FormProvider {...form}>
      <form
        className={cn("w-full space-y-6", formClassName)}
        onSubmit={form.handleSubmit(onSubmit, onError)}
        id={id}
      >
        <div className={cn("space-y-5", fieldsContainerClassName)}>
          {fields.map((field) => {
            return (
              <FormField
                key={field.name}
                field={field}
                name={field.name}
                control={form.control}
                className={cn(formFieldClassName, field.className)}
              />
            );
          })}
        </div>
        <div className={childrenContainerClassName}>
          {typeof children === "function"
            ? children(form, () => {
                void form.handleSubmit(onSubmit, onError)();
              })
            : children}
        </div>
      </form>
    </FormProvider>
  );
}

export default Form;

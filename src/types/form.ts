import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from "react";

import { DropzoneOptions } from "react-dropzone";
import { FieldPath, FieldValues } from "react-hook-form";

import { DynamicFieldListComponent } from "@/components/shared-components/DynamicFieldList";
import { FormFieldType } from "@/enums/form";
import { LabeledValue } from "@/types/global";

type CommonFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label?: ReactNode;
  description?: ReactNode;
  descriptionPosition?: "top" | "bottom";
  className?: string;
};

export type TextField = {
  type: FormFieldType.TextField;
  fieldData?: InputHTMLAttributes<HTMLInputElement> & {
    prefixLabel?: string;
  };
};

type TextArea = {
  type: FormFieldType.TextArea;
  fieldData?: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    showCharacterCount?: boolean;
  };
};

type Select = {
  type: FormFieldType.Select;
  fieldData?: {
    options?: LabeledValue[];
    placeholder?: ReactNode;
  };
};

type CheckboxGroup = {
  type: FormFieldType.CheckboxGroup;
  fieldData?: {
    options?: LabeledValue[];
    allowCustomInput?: boolean;
    className?: string;
    containerClassName?: string;
  };
};

type ChipSelection = {
  type: FormFieldType.ChipSelection;
  fieldData?: {
    options?: LabeledValue[];
    singleSelect?: boolean;
  };
};

type FileUpload = {
  type: FormFieldType.FileUpload;
  fieldData?: Partial<Omit<DropzoneOptions, "value" | "onChange">>;
};

type RecordVideoButton = {
  type: FormFieldType.RecordVideoButton;
  icon?: ReactNode;
  fieldData?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type DynamicFieldList<TFieldValues extends FieldValues = FieldValues> = {
  type: FormFieldType.DynamicFieldList;
  fieldData?: {
    defaultFieldValue: unknown;
    addButtonText?: string;
    description?: ReactNode;
    FieldComponent?: DynamicFieldListComponent<TFieldValues>;
    dynamicFieldName?: string;
  } & Partial<DynamicFormField>;
};

type ProfileImage = {
  type: FormFieldType.ProfileImage;
  fieldData?: Record<string, never>;
};

type ButtonField = {
  type: FormFieldType.Button;
  icon?: ReactNode;
  fieldData?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type CardNumberField = {
  type: FormFieldType.CardNumber;
  fieldData?: Record<string, never>;
};

type CardExpiryDateField = {
  type: FormFieldType.CardExpiryDate;
  fieldData?: Record<string, never>;
};

type CardSecurityCodeField = {
  type: FormFieldType.CardSecurityCode;
  fieldData?: Record<string, never>;
};

type PaymentAddressField = {
  type: FormFieldType.PaymentAddress;
  fieldData?: Record<string, never>;
};

export type DynamicFormField =
  | TextField
  | TextArea
  | Select
  | CheckboxGroup
  | ChipSelection
  | FileUpload
  | ProfileImage
  | ButtonField
  | RecordVideoButton
  | CardNumberField
  | CardExpiryDateField
  | CardSecurityCodeField
  | PaymentAddressField;

type TypeFormField<TFieldValues extends FieldValues = FieldValues> =
  | DynamicFormField
  | DynamicFieldList<TFieldValues>;

export type FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = CommonFormField<TFieldValues, TName> & TypeFormField<TFieldValues>;

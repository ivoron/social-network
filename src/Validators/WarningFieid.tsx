import React from "react";
import { WrappedFieldMetaProps, WrappedFieldInputProps } from "redux-form";

export const Input = ({ input, meta, placeholder, type }: FormFieldType) => {
  return (
    <div className="warningField">
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        id={meta.touched && meta.error ? "warning" : undefined}
      />
      <span>{meta.touched && meta.error}</span>
    </div>
  );
};
type FormFieldType = {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  placeholder: string;
  type: string;
};

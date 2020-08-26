import React from "react";
export const Input = ({input, meta, placeholder, type}) => {
  return (
    <div className="warningField">
      <input {...input} placeholder={placeholder} type={type} id={meta.touched && meta.error && "warning"}/>
      <span>{meta.touched && meta.error}</span>
    </div>
  );
};

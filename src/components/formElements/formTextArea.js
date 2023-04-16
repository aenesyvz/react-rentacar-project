
import React from "react";
import { useField } from "formik";

export default function FormTextArea({
  name,
  label = name,
  rows = 3,
  className,
  disabled,
}) {
  const [field, meta] = useField(name);

  return (
    <div className="formInput">
      {/* <label htmlFor={`${name}-textarea`} className='form-label fw-bold'>
        {label}
      </label> */}
       <div htmlFor={`${name}-input`} className="form-label fw-bold">
                {label}
        </div>
      <div className='input-group has-validation'>
        <textarea
          {...field}
          {...{ name, rows }}
          id={`${name}-textarea`}
          className={`form-control form__input ${
            meta.touched && !!meta.error ? "is-invalid" : ""
          }`}
          aria-describedby={`${name}-textarea`}
          disabled={disabled}
        />
        {meta.touched && !!meta.error ? (
          <div id={`${name}-textarea`} className='invalid-feedback'>
            {meta.error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
import React from 'react'
import { useField } from "formik";
function FormFileInput({
    name,
    accept,
    label = name,
    className,
    render,
}) {
    const [, meta, helper] = useField(name);
  return (
    <div className='mb-3'>
    {label && (
      <label htmlFor={`${name}-file-input`} className='form-label fw-bold'>
        {label}
      </label>
    )}
    <div className='input-group has-validation'>
      <input
        {...{ name, accept }}
        type='file'
        onChange={(e) => helper.setValue(e.currentTarget.files[0])}
        id={`${name}-file-input`}
        className={`form-control ${className} ${
          meta.touched && !!meta.error ? "is-invalid" : ""
        }`}
        aria-describedby={`${name}-file-input`}
      />
      {render}
      {meta.touched && !!meta.error ? (
        <div id={`${name}-file-input`} className='invalid-feedback'>
          {meta.error}
        </div>
      ) : null}
    </div>
  </div>
  )
}

export default formFileInput
import React from 'react'
import {useField} from "formik";

import "./styles.css"
function FormInput({
    type,
    name,
    label,
    placeholder = `Please enter ${name}`,
    className,
    render
}) {
    const [field,meta] = useField(name);

  return (
    <div className='formInput'>
        {label && (
            <label htmlFor={`${name}-input`} className="form-label fw-bold">
                {label + ":"}
            </label>
        )}

        <div className='input-group has-validation'>
            <input
                {...field}
                {...{name,placeholder}}
                type={type}
                id={`${name}-input`}
                className={`form-control form__input ${className} ${
                    meta.touched && !!meta.error? "is-invalid" : ""
                }`}
                // aria-describedy={`${name}-input`}
            />
            {render}
            {meta.touched && !!meta.error ? (
                <div id={`${name}-input`} className="invalid-feedback">{meta.error}</div>
            ): null}
        </div>

    </div>
  )
}

export default FormInput
import React, { useState } from "react";
import { useField } from "formik";

export default function FormSelect({
  name,
  options,
  placeholder = `Select ${name}`,
  label = name,
  className,
  search = true,
}) {
  const [filterText, setFilterText] = useState(""),
    [fieldLabel, setFieldLabel] = useState("");

  const [meta, helper] = useField(name);

  const setField = (value, label) => {
    helper.setValue(value);
    setFieldLabel(label);
  };

  return (
    <div className={`mb-3 ${className} formInput`}>
      {label && (
        <label htmlFor={`${name}Select`} className='form-label fw-bold'>
          {label + " :"}
        </label>
      )}

      <div className='dropdown input-group has-validation'>
        {/* <button
          className='position-relative btn btn-white dropdown-toggle w-100 d-flex justify-content-between align-items-center'
          type='button'
          id={`${name}-select`}
          data-bs-toggle='dropdown'
          aria-expanded='false'
        > */}
          {/* {!!meta.error ? <div className='select-input-invalid-feedback'></div> : null} */}
          {/* {fieldLabel || placeholder} */}
        {/* </button> */}

        <div className='dropdown-menu ' aria-labelledby={`${name}-select`}>
          {search && (
            <div className='input-group search'>
              <span className='input-group-text' id={`${name}-search-input-icon`}>
                <i className='bi bi-search' />
              </span>
              <input
                type='text'
                name='filterText'
                className='form-control filterText'
                placeholder='Search'
                aria-describedby={`${name}-search-input-icon`}
                aria-label='Username'
                autoComplete='off'
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          )}
          <select>
            {options
              .filter((o) => o.label.toLowerCase().includes(filterText.toLowerCase()))
              .map((option, index) => (
                <option
                  key={index}
                  onClick={() => setField(option.value, option.label)}
                  className={`dropdown-item cursor-pointer ${fieldLabel === option ? "active" : ""}`}
                >
                  {option.label}
                </option>
              ))}
          </select>
         
        </div>
        {meta.touched && !!meta.error ? (
                <div id={`${name}-input`} className="invalid-feedback">{meta.error}</div>
            ): null}
      </div>
    </div>
  );
}
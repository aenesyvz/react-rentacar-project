import React, { useState } from "react";
import { useField } from "formik";
import Select from "react-select";


export default function FormSelect({
  name,
  options,
  placeholder = `Select ${(name)}`,
  label = (name),
  className,
  search = true,
}) {
  const [selectedOptions, setSelectedOptions] = useState();
  const [, meta, helper] = useField(name);

  const setField = (data) => {
    helper.setValue(data.value);

  };

  return (
    <div className={`mb-3 ${className} formInput`}>
      <div htmlFor={`${name}-input`} className="form-label fw-bold">
        {label}
      </div>
      <Select
        className="form__input"
          options={options}
          placeholder={label + " seçiniz"}
          value={selectedOptions}
          onChange={setField}
          isSearchable={true}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border:0,
              outline:0,
              borderColor:"white",
              boxShadow:state.isFocused ? 0 :0,
              paddingTop: 0,
              paddingBottom: 0,
           
            }),
          }}
        />
    </div>
  );
}
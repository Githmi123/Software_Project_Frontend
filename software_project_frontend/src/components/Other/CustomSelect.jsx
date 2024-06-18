import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "../Other/CustomSelect.css";

const CustomSelect = ({ label, value, onChange, options }) => {
  const newOptionLabel = label === "Module" ? "New Module" : "New Batch";

  return (
    <FormControl id="form-input-field">
      <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}-label`}
        id={`select-${label}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        <MenuItem value={`new-${label.toLowerCase()}`}>
          {newOptionLabel}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

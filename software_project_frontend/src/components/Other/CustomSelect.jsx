import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options }) => (
  <FormControl sx={{ m: 0.5, maxWidth: "auto", width: "46vh",}}>
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
    </Select>
  </FormControl>
);

export default CustomSelect;

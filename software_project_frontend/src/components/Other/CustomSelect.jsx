import React, { useState, useEffect } from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
} from "@mui/material";
import { Button, CircularProgress, TextField, colors } from "@mui/material";
import { styled } from "@mui/system";
import "../Other/CustomSelect.css";

const CustomInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
  },
}));

const CustomSelect = ({ label, value, onChange, options }) => {
  const [filter, setFilter] = useState("");

  const [open, setOpen] = useState(false);
  const newOptionLabel = label === "Module" ? "New Module" : "New Batch";

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = () => {
    setOpen(false);
    setFilter(""); // Reset filter when dropdown closes
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <FormControl id="form-input-field">
      <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}-label`}
        id={`select-${label}`}
        value={value}
        label={label}
        onChange={onChange}
        open={open}
        onOpen={handleSelectOpen}
        onClose={handleSelectClose}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224, // Set a max height for the dropdown
            },
          },
        }}
        renderValue={(selected) => {
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return selectedOption ? selectedOption.label : "";
        }}
      >
        <MenuItem disabled>
          <CustomInput
            autoFocus
            placeholder={`Filter ${label}`}
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </MenuItem>
        {filteredOptions.map((option) => (
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

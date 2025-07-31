import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {FormHelperText} from '@mui/material';

export type MenuItemProps = {
  value: number;
  label: 'Easy' | 'Medium' | 'Hard';
};

export type SelectProps = {
  value: any;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: SelectChangeEvent<any>) => void;
  label: string;
  items: MenuItemProps[];
  required: boolean;
};

const SimpleSelect: React.FC<SelectProps> = ({
  value,
  label,
  handleChange,
  items,
  required = false,
}) => {
  const handleSetNewValue = (valueChanged: SelectChangeEvent) => {
    handleChange(valueChanged);
  };

  return (
    <FormControl style={{margin: '1rem'}} sx={{minWidth: 100, width: '100%'}}>
      <InputLabel
        id={
          required
            ? 'demo-simple-select-required-label'
            : 'demo-simple-select-autowidth-label'
        }>
        {label}
      </InputLabel>
      <Select
        labelId={
          required
            ? 'demo-simple-select-required-label'
            : 'demo-simple-select-autowidth-label'
        }
        id={
          required
            ? 'demo-simple-select-autowidth'
            : 'demo-simple-select-required'
        }
        value={value}
        label={label}
        autoWidth
        onChange={handleSetNewValue}>
        {items.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={`item-${item.value}-${index}`} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      {required && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  );
};

export default SimpleSelect;

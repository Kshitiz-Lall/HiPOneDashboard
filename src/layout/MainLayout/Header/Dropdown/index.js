import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import the useSelector and useDispatch hooks
import './Dropdown.css';

import { setSelectedPlatform } from '../../../../store/dashboardSlice'; // Import your Redux slice

let apps = [
  'Select Category',
  'HIP Automate',
  'Interact with PDF',
  'Interact with URL',
  'CCDA Summarization',
  'Business Intelligence',
  'HIP One'
];

export default function Dropdown() {
  const [product, setProduct] = useState(apps[0]);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <Select className="dropdown_container" labelId="demo-select-small-label" id="demo-select-small" value={product}>
        {apps.map((app) => (
          <MenuItem key={app} value={app}>
            {app}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

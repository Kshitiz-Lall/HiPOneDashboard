// material-ui
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { BottomPanel } from './BottomPanel';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SamplePage = () => {
  const [age, setAge] = useState('');
  const [value, setValue] = useState(0); // Add this line to initialize the 'value' state

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAge()
  };

  return (
    <MainCard style={{marginTop:"20px"}}>
      <Stack direction="row">
        <select value={age} onChange={handleChange} style={{ width: "10%", height: "6vh", borderRight: "none" }}>
          <option value={10}>Ten</option>
        </select>

        <input
          type="text"
          value={age}
          onChange={handleChange}
          placeholder="Enter Url"
          style={{ width: "70%", height: "6vh", borderLeft: "none", outline: "none", border: "1px solid black" }}
        />

        <Button
          sx={{ width: "10%", height: "6vh", borderRadius: '0 4px 4px 0', boxSizing: 'border-box', marginLeft: "2vh" }}
          variant="contained"
        >
          Send
        </Button>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:"10" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{padding:"2vh"}} label="Params" {...a11yProps(0)} />
            <Tab sx={{padding:"2vh"}} label="Authorization" {...a11yProps(1)} />
            <Tab sx={{padding:"2vh"}} label="Headers" {...a11yProps(2)} />
            <Tab sx={{padding:"2vh"}} label="Body" {...a11yProps(3)} />
            <Tab  sx={{padding:"2vh"}} label="Tests" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} style={{height:"37vh"}}>
        New Zealand vs Bangladesh Preview, World Cup 2023: 
        High-flying New Zealand take on Bangladesh in their third 
        World Cup 2023 encounter at the MA Chidambaram Stadium, Chennai.
         The Kiwis are currently second in the points table with two wins 
         from as many matches. 
        They started their campaign with a nine-wicket win over the defen
        ding champions England before beating the Netherlands by 99 runs.
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Three
        </CustomTabPanel>
      </Box>
      <BottomPanel></BottomPanel>
    </MainCard>
  );
};

export default SamplePage;

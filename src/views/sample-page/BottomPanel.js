import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ResizePanel from 'react-resize-panel';

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

export function BottomPanel() {
  const [panelHeight, setPanelHeight] = useState('400px');
  const [isResizing, setResizing] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleResizeStart = () => {
    setResizing(true);
  };

  const handleResizeStop = () => {
    setResizing(false);
  };

  const handleResize = (width, height) => {
    setPanelHeight(`${height}px`);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div className={`panel_Container ${isResizing ? 'resizing' : ''}`}>
        {/* <ResizePanel
          direction="s"
          style={{ backgroundColor: 'black', flexGrow: '1' }}
          onStart={handleResizeStart}
          onStop={handleResizeStop}
          onResize={handleResize}
        >
          <div style={{ backgroundColor: 'white', height: '100%', overflow: 'auto' }}>
            
          </div>
        </ResizePanel> */}
        <Box sx={{ width: '100%', height: '100%', bottom: 0 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Body" {...a11yProps(0)} />
                  <Tab label="Header" {...a11yProps(1)} />
                  <Tab label="Test Results" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {/* Your tab content */}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
            </Box>
      </div>
    </>
  );
}

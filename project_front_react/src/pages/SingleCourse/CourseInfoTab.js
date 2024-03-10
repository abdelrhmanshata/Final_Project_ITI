import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";
import Reviews from "./Reviews";

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
        <Box>
          <Container>{children}</Container>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CourseInfoTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="d-flex mb-3 gap-2 align-items-center">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Curriculum" {...a11yProps(1)} />
            <Tab label="Instructor" {...a11yProps(2)} />
            <Tab label="Reviews" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Overview />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Curriculum />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Instructor />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Reviews />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

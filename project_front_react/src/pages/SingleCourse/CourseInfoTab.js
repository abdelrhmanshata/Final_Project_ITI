import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Overview from "../../components/SingleCourse/Overview";
import Curriculum from "../../components/SingleCourse/CourseCurriculum/index";
import Instructor from "../../components/SingleCourse/Instructor";
import Reviews from "../../components/SingleCourse/Reviews";

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

export default function CourseInfoTab({ data }) {
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
            variant="fullWidth"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Curriculum" {...a11yProps(1)} />
            <Tab label="Instructor" {...a11yProps(2)} />
            <Tab label="Reviews" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Overview course={data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Curriculum course={data} isPlay={false} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Instructor course={data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Reviews course={data} />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserProfileRightPane } from "./UserProfileRightPane/UserProfileRightPane";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "../components/BasicTabs.css";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = {
    minWidth: "120px", 
    width: "100%",
    display: "flex", 
    justifyContent: "center",
  };

  return (
    <Box sx={{ width: "auto", marginLeft: "3vw", marginRight: "3vw" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          id="setting-tabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
  
        >
         
          <Tab
            sx={tabStyles}
            label={
              isSmallScreen ? (
                <AccountCircleIcon />
              ) : (
                <Grid container alignItems="center">
               
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Manage my Account
                  </Typography>
                </Grid>
              )
            }
            {...a11yProps(0)}
          />
      
          <Tab
            sx={tabStyles}
            label={
              isSmallScreen ? (
                <LockIcon />
              ) : (
                <Grid container alignItems="center">
         
                  <Typography variant="body1">Change My password</Typography>
                </Grid>
              )
            }
            {...a11yProps(1)}
          />
      
        </Tabs>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <UserProfileRightPane />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ChangePassword />
        </CustomTabPanel>
      </div>
    </Box>
  );
}

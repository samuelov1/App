import React, { useContext } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Switch
} from "@material-ui/core";
import Tooltip from "./Tooltip";
import { CustomThemeContext } from "./providers/CustomThemeProvider";

const useStyles = makeStyles({
  spacer: {
    flex: 1
  }
});

const Navbar = () => {
  const classes = useStyles();
  const { darkMode, toggleDarkMode } = useContext(CustomThemeContext);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Missions App
        </Typography>
        <div className={classes.spacer} />
        <Tooltip title={`Switch to ${darkMode ? "Light" : "Dark"} mode`} arrow>
          <Switch checked={darkMode} onChange={() => toggleDarkMode()} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

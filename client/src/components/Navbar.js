import React, { useContext } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Tooltip
} from "@material-ui/core";
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
        <Tooltip title={`Switch to ${darkMode ? "Dark" : "Light"} mode`} arrow>
          <Switch checked={darkMode} onChange={() => toggleDarkMode()} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

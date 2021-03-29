import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

import FlexOverflowWrapper from "./FlexOverflowWrapper";
import ListHeader from "./ListHeader";
import MissionList from "./MissionList";
import MissionForm from "./MissionForm";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%"
  }
});

const ListContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <ListHeader />
      <FlexOverflowWrapper>
        <MissionList />
      </FlexOverflowWrapper>
      <MissionForm />
    </Paper>
  );
};

export default ListContainer;

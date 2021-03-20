import React, { useState } from "react";
import { Fab, makeStyles, Paper, Box } from "@material-ui/core";

import FlexOverflowWrapper from "./FlexOverflowWrapper";
import ListHeader from "./ListHeader";
import MissionList from "./MissionList";
import MissionForm from "./MissionForm";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
});

const ListContainer = () => {
  const classes = useStyles();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Paper className={classes.root}>
        <ListHeader />
        <FlexOverflowWrapper>
          <MissionList />
        </FlexOverflowWrapper>
        <Box display="flex" flexDirection="row-reverse" mt="15px">
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => setIsFormOpen(true)}
          >
            <Add />
          </Fab>
        </Box>
      </Paper>
      <MissionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default ListContainer;

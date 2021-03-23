import { makeStyles, Paper, Box } from "@material-ui/core";

import FlexOverflowWrapper from "./FlexOverflowWrapper";
import FilterButton from "./FilterButton";
import MissionsTable from "./MissionsTable";

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  }
});

const TableContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>
        <FilterButton />
      </Box>
      <MissionsTable />
    </Paper>
  );
};

export default TableContainer;

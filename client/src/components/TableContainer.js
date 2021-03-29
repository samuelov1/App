import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Paper, Box } from "@material-ui/core";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

import { getFilteredMissions } from "../redux/selectors";
import FilterButton from "./FilterButton";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
});

const TableContainer = () => {
  const classes = useStyles();
  const missions = useSelector(getFilteredMissions);

  const rows = useMemo(() => {
    return missions;
  }, [missions]);

  const [columns] = useState([
    { name: "content", title: "Content" },
    {
      name: "createdAt",
      title: "Date",
      getCellValue: ({ createdAt }) => new Date(createdAt).toLocaleDateString()
    },
    {
      name: "coordinates",
      title: "Location",
      getCellValue: ({ coordinates }) =>
        `[${coordinates.lat}, ${coordinates.long}]`
    },
    {
      name: "isCompleted",
      title: "Done",
      getCellValue: ({ isCompleted }) => (isCompleted ? "Done" : "Not Done")
    }
  ]);

  return (
    <Paper className={classes.root}>
      <Box ml="10px">
        <FilterButton />
      </Box>
      <Grid rows={rows} columns={columns}>
        <PagingState defaultCurrentPage={0} pageSize={6} />
        <IntegratedPaging />
        <Table height="auto" />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </Paper>
  );
};

export default TableContainer;

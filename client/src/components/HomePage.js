import { Grid, makeStyles } from "@material-ui/core";
import ListContainer from "./ListContainer";

const useStyles = makeStyles({
  root: {
    flex: 1,
    margin: 0,
    width: "100%",
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item container xs={4}>
        <ListContainer />
      </Grid>
      <Grid container item direction="row" xs={8}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
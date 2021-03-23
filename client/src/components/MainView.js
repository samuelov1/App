import { Grid, makeStyles } from "@material-ui/core";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";

const useStyles = makeStyles({
  root: {
    flex: 1,
    margin: 0,
    width: "100%"
  }
});

const MainView = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item container xs={4}>
        <ListContainer />
      </Grid>
      <Grid className={classes.root} container direction="row" spacing={3}>
        <Grid container item xs={12}></Grid>
        <Grid container item xs={12}>
          <MapContainer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainView;

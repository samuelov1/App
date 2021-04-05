import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
  makeStyles,
  Tooltip,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  getFilteredMissions,
  getIsError,
  getIsLoading
} from "../redux/selectors";
import { updateMission, deleteMissions } from "../redux/actions";
import Loader from "./Loader";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  completed: {
    textDecoration: "line-through"
  },
  listItem: {
    "&:hover": {
      "& $deleteButton": {
        visibility: "visible"
      }
    }
  },
  deleteButton: {
    visibility: "hidden"
  }
});

const MissionList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const missions = useSelector(getFilteredMissions);
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Tasks Could not be loaded. <strong>Refresh to try again</strong>
      </Alert>
    );
  }

  const toggleMissionCompleted = async (mission) => {
    try {
      const missionToUpdate = { ...mission, isCompleted: !mission.isCompleted };
      const response = await axios.put("/missions", missionToUpdate);
      const updatedMission = response.data;

      dispatch(updateMission(updatedMission));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMission = async (id) => {
    try {
      const response = await axios.delete(`/missions/${id}`);
      const deletedMissionId = response.data.id;

      dispatch(deleteMissions([deletedMissionId]));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List>
      {missions.map((mission) => {
        const { lat, long } = mission.coordinates;
        const secondaryText = `${new Date(
          mission.createdAt
        ).toLocaleDateString()} at [${lat}, ${long}]`;

        return (
          <div key={mission._id}>
            <ListItem
              ContainerProps={{ className: classes.listItem }}
              role={undefined}
              dense
              button
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={mission.isCompleted}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => toggleMissionCompleted(mission)}
                />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: mission.isCompleted ? classes.completed : null
                }}
                primary={mission.content}
                secondary={secondaryText}
              />
              <ListItemSecondaryAction className={classes.deleteButton}>
                <Tooltip title="Delete Mission" arrow>
                  <span>
                    <IconButton
                      aria-label="delete button"
                      onClick={() => deleteMission(mission._id)}
                    >
                      <Delete />
                    </IconButton>
                  </span>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
          </div>
        );
      })}
    </List>
  );
};

export default MissionList;

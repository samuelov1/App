import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Loader from "./Loader";

const MissionList = () => {
  const missions = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5];
  const isError = false;
  const isLoading = false;

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Tasks Could not be loaded. <strong>Refresh to try again</strong>
      </Alert>
    );
  }

  return (
    <List>
      {missions.map((value, index) => {
        return (
          <>
            <ListItem key={index} role={undefined} dense button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={index % 2 === 0}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={`Line item ${index + 1}`}
                secondary={new Date().toLocaleDateString()}
              />
            </ListItem>
            <Divider light />
          </>
        );
      })}
    </List>
  );
};

export default MissionList;

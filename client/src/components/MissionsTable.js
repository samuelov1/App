import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  getFilteredMissions,
  getIsError,
  getIsLoading
} from "../redux/selectors";
import Loader from "./Loader";

const MissionList = () => {
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

  const rows = missions.map((mission) => ({
    ...mission,
    id: mission._id,
    createdAt: new Date(mission.createdAt).toLocaleDateString(),
    coordinates: [mission.coordinates.lat, mission.coordinates.long]
  }));

  const columns = [
    { field: "content", headerName: "Content", flex: 1 },
    { field: "createdAt", headerName: "Date", type: "date", flex: 1 },
    { field: "coordinates", headerName: "Location", flex: 1 },
    { field: "isCompleted", headerName: "Completed", flex: 1 }
  ];

  return <DataGrid rows={rows} columns={columns} />;
};

export default MissionList;

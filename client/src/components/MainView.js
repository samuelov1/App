import { Box } from "@material-ui/core";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";
import TableContainer from "./TableContainer";

const MainView = () => {
  return (
    <Box display="flex" alignItems="stretch" height="100%">
      <Box margin="10px" flex="1" width="400px">
        <ListContainer />
      </Box>
      <Box display="flex" flexDirection="column" flex="2">
        <Box margin="10px" flex="1">
          <TableContainer />
        </Box>
        <Box margin="10px" flex="1">
          <MapContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainView;

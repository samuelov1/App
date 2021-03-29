import { Box, Typography } from "@material-ui/core";
import FilterButton from "./FilterButton";
import DeleteButton from "./DeleteButton";

const ListHeader = () => {
  return (
    <Box
      padding="15px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5">Missions</Typography>
      <Box>
        <DeleteButton />
        <FilterButton />
      </Box>
    </Box>
  );
};

export default ListHeader;

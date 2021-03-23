import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import FilterButton from "./FilterButton";

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
        <Tooltip title="Delete Completed" arrow>
          <IconButton aria-label="delete button">
            <Delete />
          </IconButton>
        </Tooltip>
        <FilterButton />
      </Box>
    </Box>
  );
};

export default ListHeader;

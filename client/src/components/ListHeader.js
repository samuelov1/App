import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Delete, FilterList } from "@material-ui/icons";

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
        <Tooltip title="Hide Completed" arrow>
          <IconButton aria-label="sort button">
            <FilterList />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ListHeader;

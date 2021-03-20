import React, { useState, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  buttonGroup: {
    "& > *": {
      marginRight: "15px",
    },
  },
  map: {
    height: "300px",
  },
});

const israelCoordinates = [31.732656992968614, 34.81840863714199];

const MissionForm = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [lat, setLat] = useState(israelCoordinates[1]);
  const [long, setLong] = useState(israelCoordinates[0]);

  const isValid = useMemo(() => {
    return content !== "";
  }, [content, lat, long]);

  return (
    <Dialog open={isOpen} className={classes.root}>
      <Box padding="15px">
        <Box mb="15px">
          <Typography variant="h5">Add Mission</Typography>
        </Box>
        <TextField
          variant="outlined"
          label="Mission content"
          color="secondary"
          fullWidth
          size="small"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <Box mt="15px" display="flex">
          <Box mr="15px" flex="1">
            <TextField
              variant="outlined"
              label="Latitude"
              color="secondary"
              size="small"
              type="number"
              value={lat}
              onChange={({ target }) => setLat(target.value)}
              fullWidth
            />
          </Box>
          <Box flex="1">
            <TextField
              variant="outlined"
              label="Longtitude"
              color="secondary"
              size="small"
              type="number"
              value={long}
              onChange={({ target }) => setLong(target.value)}
              fullWidth
            />
          </Box>
        </Box>
        <Box mt="15px" className={classes.buttonGroup}>
          <Button color="default" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" disabled={!isValid}>
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MissionForm;

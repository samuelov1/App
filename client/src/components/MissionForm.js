import axios from "axios";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, TextField, Button, Typography } from "@material-ui/core";
import { getClickedCoordinates } from "../redux/selectors";
import { addMission } from "../redux/actions";

const MissionForm = () => {
  const dispatch = useDispatch();
  const clickedCoordinates = useSelector(getClickedCoordinates);
  const [content, setContent] = useState("");

  const isValid = useMemo(() => {
    return content !== "" && clickedCoordinates.lat && clickedCoordinates.long;
  }, [content, clickedCoordinates]);

  const handleSubmit = async () => {
    try {
      const missionToAdd = { content, coordinates: clickedCoordinates };
      const response = await axios.post("/missions", missionToAdd);
      const addedMission = response.data;

      dispatch(addMission(addedMission));
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <Box mt="15px" display="flex" justifyContent="space-between">
        {clickedCoordinates.lat && clickedCoordinates.long ? (
          <>
            <Typography>
              Latitude:
              <br /> {clickedCoordinates.lat}
            </Typography>
            <Typography>
              Longtitude:
              <br /> {clickedCoordinates.long}
            </Typography>
          </>
        ) : (
          <Typography color="error">
            Please click on a location on the map
          </Typography>
        )}
      </Box>
      <Box mt="15px" display="flex" alignItems="center">
        <Button
          color="secondary"
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default MissionForm;

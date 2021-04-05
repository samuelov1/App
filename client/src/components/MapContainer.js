import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Paper } from "@material-ui/core";

import { getFilteredMissions, getClickedCoordinates } from "../redux/selectors";
import { setClickedCoordinates } from "../redux/actions";

import OSM from "ol/source/OSM";
import Map from "./ol/map/Map";
import TileLayer from "./ol/layers/TileLayer";
import VectorLayer from "./ol/layers/VectorLayer";
import FullscreenControl from "./ol/controls/FullScreenControl";
import ClickControl from "./ol/controls/ClickControl";
import HoverControl from "./ol/controls/HoverControl";
import ScaleLineControl from "./ol/controls/ScaleLineControl";
import Point from "./ol/features/Point";
import Overlay from "./ol/layers/Overlay";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tooltip: {
    padding: "10px",
    maxWidth: "400px",
    transform: "translate(-50%, -125%)",
    wordWrap: "break-word"
  }
});

const israelCoordinates = { long: 31.732656992968614, lat: 34.81840863714199 };

const MapContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const missions = useSelector(getFilteredMissions);
  const clickedCoodinates = useSelector(getClickedCoordinates);
  const [hoveredId, setHoveredId] = useState(null);

  const features = useMemo(
    () =>
      missions.map((mission) => {
        return (
          <Point
            key={mission._id}
            id={mission._id}
            coordinates={mission.coordinates}
          />
        );
      }),
    [missions]
  );

  const handleClick = (coordinates) => {
    const [long, lat] = coordinates;
    dispatch(setClickedCoordinates(lat, long));
  };

  const hoveredMission = useMemo(
    () => missions.find((mission) => mission._id === hoveredId),
    [missions, hoveredId]
  );

  return (
    <Paper className={classes.root}>
      <Map zoom={4} center={israelCoordinates}>
        <TileLayer source={new OSM()} />
        <VectorLayer>
          {features}
          <Point id="clicked_point" coordinates={clickedCoodinates} />
        </VectorLayer>
        <Overlay position={hoveredMission?.coordinates}>
          <Paper className={classes.tooltip}>{hoveredMission?.content}</Paper>
        </Overlay>
        <FullscreenControl />
        <ClickControl onClick={handleClick} />
        <HoverControl onHover={setHoveredId} />
        <ScaleLineControl />
      </Map>
    </Paper>
  );
};

export default MapContainer;

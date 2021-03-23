import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Paper, Box } from "@material-ui/core";

import { getFilteredMissions, getClickedCoordinates } from "../redux/selectors";
import { setClickedCoordinates } from "../redux/actions";

import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
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
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  tooltip: {
    padding: "10px",
    transform: "translate(-50%, -125%)"
  }
});

const israelCoordinates = [31.732656992968614, 34.81840863714199];

const MapContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const missions = useSelector(getFilteredMissions);
  const clickedCoodinates = useSelector(getClickedCoordinates);
  const [hoveredId, setHoveredId] = useState(null);

  const features = missions.map((mission) => {
    const coordinates = fromLonLat([
      mission.coordinates.long,
      mission.coordinates.lat
    ]);
    return (
      <Point key={mission._id} id={mission._id} coordinates={coordinates} />
    );
  });

  const handleClick = (coordinates) => {
    const [long, lat] = coordinates;
    dispatch(setClickedCoordinates(lat, long));
  };

  const hoveredMission = useMemo(
    () => missions.find((mission) => mission._id === hoveredId),
    [missions, hoveredId]
  );

  const hoveredCoordinates = useMemo(() => {
    if (hoveredMission) {
      const { lat, long } = hoveredMission.coordinates;
      return fromLonLat([long, lat]);
    }
  }, [hoveredMission]);

  return (
    <Paper className={classes.root}>
      <Map
        zoom={4}
        center={fromLonLat([israelCoordinates[1], israelCoordinates[0]])}
      >
        <TileLayer source={new OSM()} />
        <VectorLayer>
          {features}
          {clickedCoodinates.lat && clickedCoodinates.long && (
            <Point
              id="clicked_point"
              coordinates={fromLonLat([
                clickedCoodinates.long,
                clickedCoodinates.lat
              ])}
            />
          )}
        </VectorLayer>
        <Overlay position={hoveredCoordinates}>
          {hoveredMission && (
            <Paper className={classes.tooltip}>{hoveredMission.content}</Paper>
          )}
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

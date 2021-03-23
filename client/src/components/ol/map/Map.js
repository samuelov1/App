import React, { useRef, useState, useEffect } from "react";
import "ol/css";
import * as ol from "ol";
import { makeStyles } from "@material-ui/core";
import MapContext from "./MapContext";
import { defaults as defaultControls } from "ol/control";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "100%",
  },
});

const Map = ({ children, zoom, center }) => {
  const classes = useStyles();
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: defaultControls(),
      overlays: [],
    };

    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    map?.getView().setZoom(zoom);
  }, [zoom]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className={classes.map}>
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;

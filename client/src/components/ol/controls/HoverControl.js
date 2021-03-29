import { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";

const HoverControl = ({ onHover }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    map.on("pointermove", handleHover);
    return () => map.un("pointermove", handleHover);
  }, [map]);

  const handleHover = (event) => {
    let hoveredFeature = null;

    map.forEachFeatureAtPixel(event.pixel, (feature) => {
      hoveredFeature = feature;
      return true;
    });

    onHover(hoveredFeature?.getId());
  };

  return null;
};

export default HoverControl;

import { useContext, useEffect } from "react";
import { transform } from "ol/proj";
import MapContext from "../map/MapContext";

const ClickControl = ({ onClick }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    map.on("click", handleClick);
    return () => map.un("click", onClick);
  }, [map]);

  const handleClick = (event) => {
    const clickedCoord = map.getCoordinateFromPixel(event.pixel);
    const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:4326");

    onClick(transormedCoord);
  };

  return null;
};

export default ClickControl;

import { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import OlTileLayer from "ol/layer/Tile";

const TileLayer = ({ source }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileLayer = new OlTileLayer({
      source,
    });

    map.addLayer(tileLayer);

    return () => {
      map?.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

export default TileLayer;

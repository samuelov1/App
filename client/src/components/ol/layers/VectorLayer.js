import { useContext, useEffect, useState } from "react";
import MapContext from "../map/MapContext";
import LayerContext from "./LayerContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const FeatureLayer = ({ children }) => {
  const { map } = useContext(MapContext);
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (!map) return;

    const featureLayer = new VectorLayer({
      source: new VectorSource({ features: [] }),
    });

    map.addLayer(featureLayer);
    setLayer(featureLayer);

    return () => {
      map?.removeLayer(featureLayer);
    };
  }, [map]);

  return (
    <LayerContext.Provider value={{ layer }}>{children}</LayerContext.Provider>
  );
};

export default FeatureLayer;

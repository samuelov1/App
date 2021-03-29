import { useContext, useEffect } from "react";
import Feature from "ol/Feature";
import OlPoint from "ol/geom/Point";
import LayerContext from "../layers/LayerContext";
import { fromLonLat } from "ol/proj";

const Point = ({ id, coordinates }) => {
  const { layer } = useContext(LayerContext);

  useEffect(() => {
    if (!layer) return;

    const point = new OlPoint([]);
    const pointFeature = new Feature(point);
    pointFeature.setId(id);

    layer.getSource().addFeature(pointFeature);

    return () => {
      if (layer) {
        const featureToRemove = layer.getSource().getFeatureById(id);
        layer.getSource().removeFeature(featureToRemove);
      }
    };
  }, [layer]);

  useEffect(() => {
    if (layer && coordinates) {
      const translatesCoordinates = fromLonLat([
        coordinates.long,
        coordinates.lat
      ]);

      layer
        .getSource()
        .getFeatureById(id)
        .getGeometry()
        .setCoordinates(translatesCoordinates);
    }
  }, [coordinates]);

  return null;
};

export default Point;

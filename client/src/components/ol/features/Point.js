import { useContext, useEffect } from "react";
import Feature from "ol/Feature";
import OlPoint from "ol/geom/Point";
import LayerContext from "../layers/LayerContext";

const Point = ({ id, coordinates }) => {
  const { layer } = useContext(LayerContext);

  useEffect(() => {
    if (!layer) return;

    const point = new OlPoint(coordinates);
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
    layer
      ?.getSource()
      .getFeatureById(id)
      .getGeometry()
      .setCoordinates(coordinates);
  }, [coordinates]);

  return null;
};

export default Point;

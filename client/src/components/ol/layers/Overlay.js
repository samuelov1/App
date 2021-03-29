import { useContext, useEffect, useState, useRef } from "react";
import MapContext from "../map/MapContext";
import OlOverlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";

const Overlay = ({ children, position }) => {
  const { map } = useContext(MapContext);
  const overlayRef = useRef();
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    if (!map) return;

    const initialOverlay = new OlOverlay({
      element: overlayRef.current
    });

    map.addOverlay(initialOverlay);
    setOverlay(initialOverlay);

    return () => {
      map.removeOverlay(initialOverlay);
    };
  }, [map]);

  useEffect(() => {
    overlayRef.current.style.display = "none";

    if (overlay && position) {
      const coordinates = fromLonLat([position.long, position.lat]);
      overlay.setPosition(coordinates);
      overlayRef.current.style.display = "";
    }
  }, [position, overlay]);

  return <div ref={overlayRef}>{children}</div>;
};

export default Overlay;

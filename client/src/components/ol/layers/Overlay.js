import { useContext, useEffect, useState, useRef } from "react";
import MapContext from "../map/MapContext";
import OlOverlay from "ol/Overlay";

const Overlay = ({ children, position }) => {
  const { map } = useContext(MapContext);
  const overlayRef = useRef();
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    if (!map) return;

    const initialOverlay = new OlOverlay({
      autoPan: true,
      element: overlayRef.current
    });

    map.addOverlay(initialOverlay);
    setOverlay(initialOverlay);

    return () => {
      map.removeOverlay(initialOverlay);
    };
  }, [map]);

  useEffect(() => {
    if (overlay) {
      overlay.setPosition(position);
    }
  }, [position]);

  return <div ref={overlayRef}>{children}</div>;
};

export default Overlay;

import { useEffect, useRef, useState } from "react";
export const useFullScreen = (callback) => {
  const [state, setState] = useState(false);
  const element = useRef();

  const fullscreenChanged = () => {
    const isFull = document.fullscreen ? true : false;
    setState(isFull);
  };
  useEffect(() => {
    element.current.addEventListener("fullscreenchange", fullscreenChanged);
    return () => {
      element.current.removeEventListener(
        "fullscreenchange",
        fullscreenChanged
      );
    };
  }, []);

  const toggleFullscreen = (event) => {
    if (!document.fullscreen) {
      triggerFull(event);
    } else {
      exitFullscreen(event);
    }
  };
  const triggerFull = (event) => {
    if (element.current) {
      element.current.requestFullscreen();
      // event.target.innerText = "EXIT";
      callback(true);
    }
  };
  const exitFullscreen = (event) => {
    document.exitFullscreen();
    // event.target.innerText = "FULL";
    callback(false);
  };
  return { element, toggleFullscreen, triggerFull, exitFullscreen, state };
};

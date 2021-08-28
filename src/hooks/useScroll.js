import { useEffect, useRef, useState } from "react";
export const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = (event) => {
    setState({ y: window.scrollY, x: window.scrollX });
    console.log("Y: ", window.scrollY, " X: ", window.scrollX);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

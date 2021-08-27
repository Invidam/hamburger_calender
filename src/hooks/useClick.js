import { useEffect, useRef, useState } from "react";
export const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    console.log("IsRENdering??");
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

//mouseenter 로 변경시 useHover

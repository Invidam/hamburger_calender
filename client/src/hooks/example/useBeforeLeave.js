import { useEffect, useRef, useState } from "react";

export const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    if (event.clientY < 0) onBefore();
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => {
      document.removeEventListener("mouseleave", handle);
    };
  }, []);
};

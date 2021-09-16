import { useEffect, useRef, useState } from "react";

export const useNotification = (title, options) => {
  const fireNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);

          console.log("LINKED!");
        } else {
          console.log("NOT LINKED");
          return;
        }
      });
    } else {
      new Notification(title, options);
      console.log("LINKED!");
    }
  };
  //  useEffect
  return fireNotification;
};

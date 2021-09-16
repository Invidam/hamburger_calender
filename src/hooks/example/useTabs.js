import { useState } from "react";
export const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) return;
  return [allTabs[currentIndex], currentIndex, setCurrentIndex];
};

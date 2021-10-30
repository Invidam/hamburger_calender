import { useState } from "react";

export const useTodoSort = (initSortTypeIdx, sortTypeCnt, sortTypes) => {
  const [sortTypeIdx, setSortTypeIdx] = useState(initSortTypeIdx);
  const getNextSortType = (idx) =>
    (idx + 1) % sortTypes === 0 ? idx - sortTypes + 1 : idx + 1;
  const onClickByTabIdx = (tabIdx) => {
    // 같은 소속이었다면
    if (Math.floor(sortTypeIdx / sortTypes) === tabIdx)
      setSortTypeIdx(getNextSortType(sortTypeIdx));
    else setSortTypeIdx(tabIdx * sortTypeCnt + 1);
  };
  return [sortTypeIdx, onClickByTabIdx];
};

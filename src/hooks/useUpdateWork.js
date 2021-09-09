import { useState } from "react";

export const useUpdateWork = (initList) => {
  initList = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : initList
    ? initList
    : [];
  console.log("RET0", initList);
  const [workList, setWorkList] = useState(initList);
  const updateWorkList = (_workList) => {
    setWorkList([..._workList]);
    if (_workList?.length)
      window.localStorage.setItem("workList", JSON.stringify(workList));
  };
  return [workList, updateWorkList];
};

//여기서 useState가 동작을 안한다,. RET1 -> RET 로 ㄴ넘어가지가 않는다. 하

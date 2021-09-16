import { useState } from "react";
import axios from "axios";
export const useUpdateWork = (initList) => {
  initList = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : [];
  const [workList, setWorkList] = useState(initList);
  if (!workList || workList.length < 1)
    axios({
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      url: "/api/worklist",
      method: "get",
    }).then((data) => {
      if (data.data) {
        setWorkList(data?.data);
        window.localStorage.setItem("workList", JSON.stringify(data?.data));
      }
    });
  const updateWorkList = (_workList) => {
    setWorkList(_workList);
    axios.post("api/worklist", { user: "TEST", value: _workList });
    if (_workList?.length)
      window.localStorage.setItem("workList", JSON.stringify(_workList));
    else window.localStorage.removeItem("workList");
  };
  return [workList, updateWorkList];
};

//여기서 useState가 동작을 안한다,. RET1 -> RET 로 ㄴ넘어가지가 않는다. 하

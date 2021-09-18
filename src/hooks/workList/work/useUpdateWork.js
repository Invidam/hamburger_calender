import { useEffect, useState } from "react";
import axios from "axios";
import { getToday } from "../../../tools/time";
export const useUpdateWork = (initList, user, date) => {
  // console.log("UPDATE WORK HOOK DATE: ", date);
  // if (getToday() !== date) window.localStorage.removeItem("workList");
  initList = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : [];
  const [workList, setWorkList] = useState(initList);
  useEffect(() => {
    console.log("DATE CHANG================", date);
    setWorkList(initList);
  }, [date]);
  if (!workList || workList.length < 1)
    axios({
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      url: `/api/${user}/${date}/worklist/worklist`,
      method: "get",
    }).then((data) => {
      if (data.data) {
        setWorkList(data?.data);
        window.localStorage.setItem("workList", JSON.stringify(data?.data));
      }
      //  else {
      //   const emptyWorkList = [];
      //   setWorkList([]);
      //   window.localStorage.removeItem("workList");
      // }
    });
  const updateWorkList = (_workList) => {
    setWorkList(_workList);
    axios.post(`/api/${user}/${date}/worklist/worklist`, {
      user: "TEST",
      value: _workList,
    });
    if (_workList?.length)
      window.localStorage.setItem("workList", JSON.stringify(_workList));
    else window.localStorage.removeItem("workList");
  };
  return [workList, updateWorkList];
};
//:id꼴이 괜히있는게 아니다 ㅋㅋ;
//여기서 useState가 동작을 안한다,. RET1 -> RET 로 ㄴ넘어가지가 않는다. 하

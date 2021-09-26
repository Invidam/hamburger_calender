import { useEffect, useState } from "react";
import { API } from "../../../tools/axiosSetting";

const getEmptyWorkList = () => {
  return [{ workTime: -1 }];
};
const isEmptyWorkList = (workList) =>
  workList ? workList[0]?.workTime === -1 : true;

const checkWorkList = (workList) =>
  isEmptyWorkList(workList) ? getEmptyWorkList() : workList;

export const useUpdateWork = (user, date) => {
  // if (getToday() !== date) window.localStorage.removeItem("workList");
  const initList =
    !user && window.localStorage.getItem("workList")
      ? JSON.parse(window.localStorage.getItem("workList"))
      : [];
  const [workList, setWorkList] = useState(initList);
  useEffect(() => {
    getAndUpdateWorkList();
  }, [date, user]);

  const getAndUpdateWorkList = async () => {
    let resWorkList;
    if (user) {
      const data = await API.get(`/api/${user}/${date}/worklist/worklist`);
      resWorkList = checkWorkList(data?.data);
    } else {
      resWorkList = JSON.parse(localStorage.getItem("workList"));
    }
    setWorkList(resWorkList);
  };

  const updateWorkList = (_workList) => {
    _workList = checkWorkList(_workList);
    // const config = getCustomConfig();
    setWorkList(_workList);
    if (user) {
      API.post(`/api/${user}/${date}/worklist/worklist`, {
        user: "TEST",
        value: _workList,
      });
    } else window.localStorage.setItem("workList", JSON.stringify(_workList));
    // else window.localStorage.removeItem("workList");
  };
  return [workList, updateWorkList];
};
//:id꼴이 괜히있는게 아니다 ㅋㅋ;
//여기서 useState가 동작을 안한다,. RET1 -> RET 로 ㄴ넘어가지가 않는다. 하

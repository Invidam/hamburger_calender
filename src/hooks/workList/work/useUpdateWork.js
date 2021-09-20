import { useEffect, useState } from "react";
import axios from "axios";
import { getToday } from "../../../tools/time";

const getEmptyWorkList = () => {
  return [{ workTime: -1 }];
};
const isEmptyWorkList = (workList) =>
  workList ? workList[0]?.workTime === -1 : true;

const checkWorkList = (workList) =>
  isEmptyWorkList(workList) ? getEmptyWorkList() : workList;

export const useUpdateWork = (initList, user, date) => {
  // if (getToday() !== date) window.localStorage.removeItem("workList");
  initList = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : [];
  const [workList, setWorkList] = useState();
  useEffect(() => {
    getAndUpdateWorkList();
  }, [date]);

  const getAndUpdateWorkList = async () => {
    const data = await axios.get(`/api/${user}/${date}/worklist/worklist`);
    const resWorkList = checkWorkList(data?.data);

    setWorkList(resWorkList);
  };

  const updateWorkList = (_workList) => {
    _workList = checkWorkList(_workList);

    setWorkList(_workList);
    axios.post(`/api/${user}/${date}/worklist/worklist`, {
      user: "TEST",
      value: _workList,
    });
    // if (_workList?.length)
    //   window.localStorage.setItem("workList", JSON.stringify(_workList));
    // else window.localStorage.removeItem("workList");
  };
  return [workList, updateWorkList];
};
//:id꼴이 괜히있는게 아니다 ㅋㅋ;
//여기서 useState가 동작을 안한다,. RET1 -> RET 로 ㄴ넘어가지가 않는다. 하

import { useEffect, useState } from "react";
import { API } from "../../../tools/axiosSetting";

export const useWorkList = (user, date) => {
  const getEmptyWorkList = () => {
    return [{ workTime: -1 }];
  };
  const isEmptyWorkList = (workList) =>
    workList ? workList[0]?.workTime === -1 : true;

  const checkWorkList = (workList) =>
    isEmptyWorkList(workList) ? getEmptyWorkList() : workList;

  const getInitList = (user) =>
    !user && window.localStorage.getItem("workList")
      ? JSON.parse(window.localStorage.getItem("workList"))
      : [];

  const initList = getInitList();
  const [workList, setWorkList] = useState(initList);

  const getWorkList = async () => {
    let resWorkList;
    if (user) {
      const data = await API.get(`/api/${user}/${date}/worklist/worklist`);
      resWorkList = checkWorkList(data?.data);
    } else {
      resWorkList = JSON.parse(localStorage.getItem("workList"));
    }
    setWorkList(resWorkList);
  };
  useEffect(() => {
    getWorkList();
  }, [date, user]);

  const updateWorkList = (_workList) => {
    _workList = checkWorkList(_workList);
    setWorkList(_workList);
    if (user) {
      API.post(`/api/${user}/${date}/worklist/worklist`, {
        user: "TEST",
        value: _workList,
      });
    } else window.localStorage.setItem("workList", JSON.stringify(_workList));
  };
  return [workList, updateWorkList];
};

import { useEffect, useState } from "react";
import { API } from "../../../tools/axiosSetting";

export const useWorkList = (user, date) => {
  const getEmptyWorkList = () => {
    return {};
  };
  const isEmptyWorkList = (workList) =>
    workList ? !Object.keys(workList).length : true;

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
      console.log("WORKLIST, data: ", data?.data);
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
    console.log("BEF UPDATE:", _workList);
    setWorkList(_workList);
    console.log("AFT UPDATE:", workList);
    if (user) {
      // API.post(`/api/${user}/${date}/worklist/worklist`, {
      //   user: "TEST",
      //   value: _workList,
      // });
    } else window.localStorage.setItem("workList", JSON.stringify(_workList));
  };
  return [workList, updateWorkList];
};

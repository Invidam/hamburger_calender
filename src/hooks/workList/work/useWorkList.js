import { useEffect, useState } from "react";
import { API, APIv2 } from "../../../tools/API";
import { LocalStroage } from "../../../tools/LocalStorage";

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
      const data = await APIv2.workList(user, date).get();
      console.log("useWORKLIST, data: ", data?.data);
      resWorkList = checkWorkList(data?.data);
    } else {
      resWorkList = JSON.parse(localStorage.getItem("workList"));
    }
    setWorkList(resWorkList);
  };
  useEffect(() => {
    getWorkList();
  }, [date, user]);

  const setWork = (workObj) => {
    const id = workObj.id;
    const _workList = { ...workList };
    return {
      create: async () => {
        _workList[id] = workObj;
        setWorkList(_workList);
        if (user) await APIv2.workList(user, date).create(workObj);
        else LocalStroage.set(_workList);
      },
      edit: async () => {
        _workList[id] = workObj;
        setWorkList(_workList);
        if (user) await APIv2.workList(user, date).edit(workObj);
        else LocalStroage.set(_workList);
      },
      delete: async () => {
        if (!delete _workList[id]) throw new Error("Cannot Delete WorkItem");
        setWorkList(_workList);
        if (user) await APIv2.workList(user, date).delete(workObj);
        else LocalStroage.set(_workList);
      },
    };
  };
  const updateWorkList = (_workList) => {
    _workList = checkWorkList(_workList);
    setWorkList(_workList);
    if (user) {
      // API.post(`/api/${user}/${date}/worklist/worklist`, {
      //   user: "TEST",
      //   value: _workList,
      // });
    } else window.localStorage.setItem("workList", JSON.stringify(_workList));
  };
  return { workList, updateWorkList, setWork };
};

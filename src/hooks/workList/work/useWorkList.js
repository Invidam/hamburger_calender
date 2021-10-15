import { useEffect, useState } from "react";
import { APIv2 } from "../../../tools/API";
import { LocalStroage } from "../../../tools/LocalStorage";

export const isEmptyWorkList = (workList) =>
  workList ? !Object.keys(workList).length : true;
export const isEmptyWork = (workObj) =>
  workObj ? !Object.keys(workObj).length : true;
const getEmptyWorkList = () => {
  return {};
};
const checkWorkList = (workList) =>
  isEmptyWorkList(workList) ? getEmptyWorkList() : workList;

// const getInitList = (user) =>
//   !user && window.localStorage.getItem("workList")
//     ? JSON.parse(window.localStorage.getItem("workList"))
//     : [];

export const useWorkList = (user, date) => {
  // const initList = getInitList();
  const [isWorkListLoading, setLoad] = useState(false);
  const [workList, setWorkList] = useState();
  const getWorkList = async () => {
    try {
      let resWorkList;
      if (user) {
        console.log("BEF: ", workList);
        setLoad(true);
        const data = await APIv2.workList(user, date).get();
        setLoad(false);
        resWorkList = checkWorkList(data?.data);
        console.log("USEWORKLIST, data catch");
        console.log("USEWORKLIST DATA  CATCH  AFT");
        setWorkList(resWorkList);
      } else {
        resWorkList = LocalStroage.workList().get();
        console.log("USEWORKLIST DATA NO CATCH [][] AFT");
        setWorkList(resWorkList);
      }
    } catch (error) {
      setLoad(false);
      alert(error);
    }
  };
  useEffect(() => {
    console.log("GET WORKLIST START", date, user);
    getWorkList();
    return () => setLoad(false);
  }, [date, user]);

  const setWork = (workObj) => {
    console.log("SET WRORK START");
    const id = workObj.id;
    const _workList = { ...workList };
    return {
      create: async () => {
        _workList[id] = workObj;
        setWorkList(_workList);
        if (user) await APIv2.work(user, date).create(workObj);
        else LocalStroage.workList().set(_workList);
      },
      edit: async () => {
        _workList[id] = workObj;
        setWorkList(_workList);
        if (user) await APIv2.work(user, date).edit(workObj);
        else LocalStroage.workList().set(_workList);
      },
      delete: async () => {
        if (!delete _workList[id]) throw new Error("Cannot Delete WorkItem");
        setWorkList(_workList);
        if (user) await APIv2.work(user, date).delete(workObj);
        else LocalStroage.workList().set(_workList);
      },
    };
  };
  return [workList, setWork, isWorkListLoading];
};

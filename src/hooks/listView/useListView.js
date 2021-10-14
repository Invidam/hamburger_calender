import { useEffect, useState } from "react";
import { APIv2 } from "../../tools/API";
import { getAddedDateObj, getAddedDateStr } from "../../tools/time";

const savedListView = new Map();
export const useListView = (user, date, setDate) => {
  const getStartDate = (date) => getAddedDateStr(date, -2);
  const [startDate, setStratDate] = useState(getStartDate(date));
  const getEndDate = (startDate) => getAddedDateObj(startDate, 4);
  const [listView, setListView] = useState();
  const [isListViewLoading, setLoad] = useState();

  const onClickLeftBtn = () => {
    savedListView["1"] = 2;
    setStratDate(getAddedDateStr(startDate, -1));
  };
  const onClickRightBtn = () => {
    console.log(savedListView);
    setStratDate(getAddedDateStr(startDate, 1));
  };

  useEffect(() => {
    setStratDate(getStartDate(date));
  }, [date]);
  const getListView = async () => {
    try {
      if (user && startDate) {
        setLoad(true);
        const data = await APIv2.listView(user, startDate).get();
        setLoad(false);
        if (!data?.data) throw new Error("List View cann't found");
        console.log("DATA : LISTVIEW ", data?.data);
        setListView(data?.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    //setListView를 좀 더 스마트하게 바꾸어야 한다.
    console.log("Set list view start L or R");
  }, [startDate]);
  useEffect(() => {
    //setListView를 좀 더 스마트하게 바꾸어야 한다.
    console.log("Set list view start");
    getListView();
  }, [startDate]);
  return {
    isListViewLoading,
    startDate,
    listView,
    onClickLeftBtn,
    onClickRightBtn,
  };
};

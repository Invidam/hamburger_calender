import { useEffect, useState } from "react";
import { getAddedDateObj, getAddedDateStr } from "../../tools/time";

const savedListView = new Map();
export const useListView = (user, date, setDate) => {
  const getStartDate = (date) => getAddedDateStr(date, -2);
  const [startDate, setStratDate] = useState(getStartDate(date));
  const [listView, setListView] = useState();
  const [isListViewLoading, setLoad] = useState();

  const onClickAddBtn = () => {
    savedListView["1"] = 2;
    setStratDate(getAddedDateStr(startDate, 1));
  };
  const onClickSubtractBtn = () => {
    console.log(savedListView);
    setStratDate(getAddedDateStr(startDate, -1));
  };

  useEffect(() => {
    setStratDate(getStartDate(date));
  }, [date]);
  useEffect(() => {
    //setListView를 좀 더 스마트하게 바꾸어야 한다.
    console.log("Set list view start");
    setListView(startDate);
  }, [startDate]);
  return {
    isListViewLoading,
    startDate,
    listView,
    onClickAddBtn,
    onClickSubtractBtn,
  };
};

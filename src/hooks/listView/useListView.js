import { useEffect, useState } from "react";
import { Deque } from "../../classes/Deque";
import { Node } from "../../classes/Node";
import { APIv2 } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";
import {
  getAddedDateStr,
  getDiffDayInStr,
  subtractDayInStr,
} from "../../tools/time";
export const DISPLAY_LENGTH = 5;
export const ARRAY_LENGTH = 11;
const makeStartDate = (date) =>
  getAddedDateStr(date, -1 * Math.floor(ARRAY_LENGTH / 2));
// const makeStartDate = (date) => getAddedDateStr(date, -1 * STARTDATEDIFF);
const getStartDate = (date) =>
  LocalStroage.startDate().isEmpty()
    ? makeStartDate(date)
    : LocalStroage.startDate().get();

let befStartDate;
let listDeque;

const turnDeque = (deque, cnt, isLeft) => {
  deque.print("BEF turn");
  // console.log("[listview][deq] ", deque, cnt, isLeft);
  if (isLeft) {
    // <-- 방향으로 이동
    while (cnt--) {
      deque.pop_front();
      deque.print("ING turn L");
      deque.push_back(new Node());
    }
  } else {
    while (cnt--) {
      deque.pop_back();
      deque.print("ING turn R");
      deque.push_front(new Node());
    }
  }
  deque.print("AFT turn R");
};
const setDeque = (deque, arr, cnt, isLeft) => {
  console.log("[deq] BEF set", arr);
  deque.print("BEF set");
  if (isLeft) {
    // <-- 맨앞 요소를 없애고 맨앞에 arr요소들을 넣는다.
    let idx = 0;
    deque.pop_back(cnt);
    while (idx < cnt) {
      deque.print("ing L set");
      console.log("[deq] : arr val : ", idx, arr[idx]);
      deque.push_back(new Node(arr[idx++]));
    }
  } else {
    let idx = 0;
    deque.pop_front(cnt);
    while (cnt--) {
      deque.print("ing R set");
      console.log("[deq] : arr val : ", cnt, arr[cnt]);
      deque.push_front(new Node(arr[cnt]));
    }
  }
  deque.print("AFT set");
};

const getEndDate = (startDate) => getAddedDateStr(startDate, ARRAY_LENGTH - 1);
const getDeqNeedDate = (startDate, dateDiff) => {
  let endDate = getEndDate(startDate);
  const isLeft = dateDiff > 0;
  if (isLeft) {
    startDate = getAddedDateStr(endDate, -1 * dateDiff + 1);
  } else {
    // 왼쪽 버튼 클릭 배열이 오른쪽 이동 왼쪽 요소들이 필요
    endDate = getAddedDateStr(startDate, -1 * dateDiff - 1);
    // startDate = getAddedDateStr(startDate, dateDiff + 1);
  }
  return [startDate, endDate];
};
// getAddedDateStr(startDate, ARRAY_LENGTH - 1);
export const useListView = (user, date, setDate, workList) => {
  // console.log("[listview]LIST VIEW RENDERING");
  const [startDate, setStratDate] = useState(getStartDate(date));
  const [listView, setListView] = useState();
  const [isListViewLoading, setLoad] = useState(false);

  const updateStartDate = (nextDate) => {
    // console.log("[listview]list change");
    LocalStroage.startDate().set(nextDate);
    setStratDate(nextDate);
  };
  const onClickLeftBtn = () => {
    const nextDate = getAddedDateStr(startDate, -1);
    updateStartDate(nextDate);
  };
  const onClickRightBtn = () => {
    const nextDate = getAddedDateStr(startDate, 1);
    updateStartDate(nextDate);
  };

  const getListView = async (startDate, endDate) => {
    try {
      const data = await APIv2.listView(
        user,
        startDate,
        endDate,
        ARRAY_LENGTH
      ).get();
      if (!data?.data) throw new Error("List View cann't found");
      // console.log("[listview][LISTVIEW] GET LIST VIEW:  ", data?.data);
      console.log("[deq] st en", startDate, endDate);
      return data.data;
    } catch (error) {
      alert(error);
    }
  };
  const updateListView = async () => {
    console.log(
      "[deq]UPDATE START?!?!?!#@$@!#(%*#$@%(*#$%#$(*%#$%#",
      startDate,
      getEndDate(startDate)
    );
    if (user && startDate) {
      setLoad(true);
      const response = await getListView(startDate, getEndDate(startDate));
      setLoad(false);
      listDeque = new Deque(response, DISPLAY_LENGTH);
      setListView(listDeque.get());
    }
  };
  const moveListView = async (startDate, dateDiff) => {
    if (user && startDate) {
      const isLeft = dateDiff > 0;
      turnDeque(listDeque, Math.abs(dateDiff), isLeft);
      const [needStartDate, needEndDate] = getDeqNeedDate(startDate, dateDiff);
      setListView(listDeque.get());
      // console.log("[listview]list :::", listView);
      const response = await getListView(needStartDate, needEndDate);
      setDeque(listDeque, response, Math.abs(dateDiff), isLeft);
      // console.log("[listview]lis2222 t :::", listView);
    }
  };
  const MakeListView = async () => {
    //setListView를 좀 더 스마트하게 바꾸어야 한다.

    // console.log(
    //   "[listview]Set list view start",
    //   listDeque,
    //   befStartDate,
    //   startDate
    // );
    const dateDiff = subtractDayInStr(befStartDate, startDate);
    console.log("[deq]", dateDiff);
    if (!listDeque || !befStartDate || dateDiff > 2 || dateDiff < -2)
      updateListView();
    else await moveListView(startDate, dateDiff);
    // updateListView(startDate);
    befStartDate = startDate;
    // return () => setLoad(false);
  };
  useEffect(() => {
    updateStartDate(makeStartDate(date));
  }, [date]);
  useEffect(() => MakeListView(), [startDate]);
  return {
    isListViewLoading,
    startDate,
    listView,
    onClickLeftBtn,
    onClickRightBtn,
  };
};

// startTime 변경이 아닌ㄷ ㅏ른 방식으로 호출하여 에러 해결이 가능할 듯 하나 실제로 필요한진 몰겟드.

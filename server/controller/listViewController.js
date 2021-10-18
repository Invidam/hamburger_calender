import {
  changeFormatYYYYMMDD,
  divideDate,
  getAddedDateStr,
  getDiffDayInStr,
  getTimeStrDiffCode,
} from "../tools/time.js";
// import { divideDate } from "../";
import { db } from "../routes/firebase/config.js";
const YEAR = 2;
const MONTH = 1;
const DAY = 0;
const getIdxByDayDiff = (date1, date2Month, date2Day) =>
  getDiffDayInStr(date1, date2Month.replace("/", "-") + "-" + date2Day);

const getListViewInOtherMonth = async (user, arrLength, startDate, endDate) => {
  const listView = new Array(arrLength).fill(undefined);
  const dividedStartMonth = divideDate(startDate).dividedAddressYYYYMM;
  const dividedEndMonth = divideDate(endDate).dividedAddressYYYYMM;
  const dividedStartDay = divideDate(startDate).day;
  const dividedEndDay = divideDate(endDate).day;

  const startMonthRef = db.ref(`users/${user}/date/${dividedStartMonth}`);
  const endMonthRef = db.ref(`users/${user}/date/${dividedEndMonth}`);
  await startMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      if (enteredWorkList)
        for (const [key, value] of Object.entries(enteredWorkList)) {
          if (key < dividedStartDay) continue;
          // listView.push(value);
          const idx = getIdxByDayDiff(startDate, dividedStartMonth, key);
          listView[idx] = value?.workList;
          // console.log(`[${idx}]`, dividedEndMonth, key);
        }
    }
    // (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  await endMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      // console.log("WL: ", enteredWorkList, typeof enteredWorkList);
      if (enteredWorkList)
        for (const [key, value] of Object.entries(enteredWorkList)) {
          if (key > dividedEndDay) continue;
          // listView.push(value);
          const idx = getIdxByDayDiff(startDate, dividedEndMonth, key);
          listView[idx] = value?.workList;
          // console.log(`[${idx}]`, dividedEndMonth, key);
        }
    }
    // (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  return listView;
};
const getListViewInSameMonth = async (user, arrLength, startDate, endDate) => {
  const listView = new Array(arrLength).fill(undefined);
  const { dividedAddressYYYYMM } = divideDate(startDate);
  const dividedStartDay = divideDate(startDate).day;
  const dividedEndDay = divideDate(endDate).day;
  const ref = db.ref(`users/${user}/date/${dividedAddressYYYYMM}`);
  await ref.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      // console.log("WL: ", enteredWorkList, typeof enteredWorkList);
      if (enteredWorkList)
        for (const [key, value] of Object.entries(enteredWorkList)) {
          if (key < dividedStartDay || key > dividedEndDay) continue;
          // listView.push(value);

          const idx = getIdxByDayDiff(startDate, dividedAddressYYYYMM, key);
          listView[idx] = value?.workList;
          // console.log(`[${idx}]`, dividedAddressYYYYMM, key);
        }
    }
    // (errorObject) => console.log("ERR OBJ: ", errorObject)
  );

  return listView;
};
export const getListView = async (req, res) => {
  const { user } = req.params;
  const { startDate, endDate } = req.query;
  // console.log("LV", startDate, endDate);
  const arrLength = getDiffDayInStr(startDate, endDate) + 1;
  const diffCode = getTimeStrDiffCode(startDate, endDate);
  // console.log(startDate, endDate, diffCode);
  let listView;
  if (diffCode === YEAR || diffCode === MONTH) {
    listView = await getListViewInOtherMonth(
      user,
      arrLength,
      startDate,
      endDate
    );
  } else {
    listView = await getListViewInSameMonth(
      user,
      arrLength,
      startDate,
      endDate
    );
  }
  // console.log("LV: ", listView?.length, listView);
  res.json(listView);
};

//년도 다를
//월만 다를
//일만 다를

// 자료구조 사용
// controller에서 어떻게 보낼건지 (변수정보에 따라)
// 그걸 어떻게 표시할건지 + 좌우 버튼과 날짜 변경에 따른 데이터 요청 및 표시의 차이점을 만들기.
// Local 이용해서 달력인한 이동 새로고침 인한 이동 좌우버튼 인한 이동
//날짜 클릭 인한 이동으,ㄹ 어떻게 처리할지 고민하기

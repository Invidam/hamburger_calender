import {
  changeFormatYYYYMMDD,
  divideDate,
  getAddedDateStr,
  getDiffDayInStr,
  getTimeStrDiffCode,
} from "../tools/time.js";
// import { divideDate } from "../";
import { db } from "../routes/firebase/config.js";

export const getListView = async (req, res) => {
  const listView = new Array(5);
  const YEAR = 2;
  const MONTH = 1;
  const DAY = 0;
  const { user, startDate } = req.params;
  const endDate = getAddedDateStr(startDate, 4);
  const diffCode = getTimeStrDiffCode(startDate, endDate);
  console.log(startDate, endDate, diffCode);
  if (diffCode === YEAR || diffCode === MONTH) {
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
        console.log("WL: ", enteredWorkList, typeof enteredWorkList);
        if (enteredWorkList)
          for (const [key, value] of Object.entries(enteredWorkList)) {
            if (key < dividedStartDay) continue;
            // listView.push(value);
            listView[
              getDiffDayInStr(
                startDate,
                dividedStartMonth.replace("/", "-") + "-" + key
              )
            ] = value?.workList;
          }
      },
      (errorObject) => console.log("ERR OBJ: ", errorObject)
    );
    await endMonthRef.once(
      "value",
      (workList) => {
        const enteredWorkList = workList.val();
        console.log("WL: ", enteredWorkList, typeof enteredWorkList);
        if (enteredWorkList)
          for (const [key, value] of Object.entries(enteredWorkList)) {
            if (key > dividedEndDay) continue;
            // listView.push(value);
            listView[
              getDiffDayInStr(
                startDate,
                dividedEndMonth.replace("/", "-") + "-" + key
              )
            ] = value?.workList;
          }
      },
      (errorObject) => console.log("ERR OBJ: ", errorObject)
    );
  } else {
    const { dividedAddressYYYYMM } = divideDate(startDate);
    const dividedStartDay = divideDate(startDate).day;
    const dividedEndDay = divideDate(endDate).day;
    const ref = db.ref(`users/${user}/date/${dividedAddressYYYYMM}`);
    await ref.once(
      "value",
      (workList) => {
        const enteredWorkList = workList.val();
        console.log("WL: ", enteredWorkList, typeof enteredWorkList);
        if (enteredWorkList)
          for (const [key, value] of Object.entries(enteredWorkList)) {
            if (key < dividedStartDay || key > dividedEndDay) continue;
            // listView.push(value);
            listView[
              getDiffDayInStr(
                startDate,
                dividedAddressYYYYMM.replace("/", "-") + "-" + key
              )
            ] = value?.workList;
          }
      },
      (errorObject) => console.log("ERR OBJ: ", errorObject)
    );
  }
  console.log(listView);
  res.json(listView);
};

//년도 다를
//월만 다를
//일만 다를

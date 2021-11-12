import {
  changeFormatYYYYMMDD,
  divideDate,
  getAddedHHMM,
  getDifference,
  HHMMcompare,
} from "../tools/time.js";
// import { divideDate } from "../";
import { db } from "../routes/firebase/config.js";
const emptyTimeObj = { hour: null, minute: null };
export const postTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time edit success" });
  }
};
export const putTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time put success" });
  }
};
export const editTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time edit success" });
  }
};

export const getTime = (req, res) => {
  const { key, user, date } = req.params;
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`);

  ref.once(
    "value",
    (timeObj) => {
      const time = timeObj.val();
      return res.json(time);
    },
    (errorObject) => res.send(errorObject)
  );
};
export const deleteTime = (req, res) => {
  const { key, user, date } = req.params;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    const ref = db.ref(`users/${user}/date/${dividedAddress}/workList`);
    ref.child(key).remove();
    return res.status(200).json({ status: "delete time success" });
  }
};
export const putWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "push work success" });
  }
};

export const editWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;
  console.log("EDIT BODY: ", req.body, typeof req.body);
  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "edit work success" });
  }
};

export const deleteWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    const ref = db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/`
    );
    ref.child(value.id).remove();
    return res.status(200).json({ status: "delete work success" });
  }
};
export const editWorkList = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;
  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/workList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getWorkList = (req, res) => {
  const { user, date } = req.params;
  // const {}
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/workList/workList`);
  ref.once(
    "value",
    (workListObj) => {
      const workList = workListObj.val();
      if (!workList) return res.end();
      else return res.json(workList);
    },
    (errorObject) => res.send(errorObject)
  );
};

const getDateRange = (date) => {
  const getDate = (year, month, day) => new Date(year, month, day);
  const getDateDay = (date) => date.getDay();
  const isSunday = (date) => getDateDay(date) === 0;
  const isSaturday = (date) => getDateDay(date) === 6;
  const getFirstDay = (date) => {
    // const prevMonthDayList = [];
    const prevDateMonth = ((new Date(date).getMonth() + 12 - 1) % 12) + 1;
    const prevDateYear = new Date(date).getMonth()
      ? new Date(date).getFullYear()
      : new Date(date).getFullYear() - 1;
    let lastDay = 0;
    let prevDate = getDate(prevDateYear, prevDateMonth, lastDay);
    while (!isSunday(prevDate)) {
      // prevMonthDayList.push(changeFormatYYYYMMDD(prevDate, false));
      lastDay--;
      prevDate = getDate(prevDateYear, prevDateMonth, lastDay);
    }
    return changeFormatYYYYMMDD(prevDate, false);
    // return prevMonthDayList;
  };
  const getLastDay = (date) => {
    // const nextMonthDayList = [];
    const nextDateMonth = (new Date(date).getMonth() + 1) % 12;
    const nextDateYear = new Date(date).getMonth()
      ? new Date(date).getFullYear()
      : new Date(date).getFullYear() + 1;
    let firstDay = 1;
    let nextDate = getDate(nextDateYear, nextDateMonth, firstDay);
    while (!isSaturday(nextDate)) {
      // nextMonthDayList.push(changeFormatYYYYMMDD(nextDate, false));
      firstDay++;
      nextDate = getDate(nextDateYear, nextDateMonth - 1, firstDay);
    }
    return changeFormatYYYYMMDD(nextDate, false);
    // return nextMonthDayList;
  };
  // const getCurrMonthDay = (date) => {
  //   const currMonthDayList = [];
  //   const currDateYear = new Date(date).getFullYear();
  //   const currDateMonth = new Date(date).getMonth();
  //   let firstDay = 1;
  //   let currDate = getDate(currDateYear, currDateMonth, firstDay);
  //   while (currDate.getMonth() === currDateMonth) {
  //     currMonthDayList.push(changeFormatYYYYMMDD(currDate, false));
  //     currDate = getDate(currDateYear, currDateMonth, ++firstDay);
  //   }
  //   return currMonthDayList;
  // };
  const firstDay = getFirstDay(date);
  const lastDay = getLastDay(date);
  return [firstDay, lastDay];
};

export const getDateInfo = async (req, res) => {
  const { user, date } = req.params;
  const [firstDay, lastDay] = getDateRange(date);
  console.log("FIRST: ", firstDay, "LAST: ", lastDay);

  const dividedFirstDay = divideDate(firstDay).dividedAddressYYYYMM;
  const dividedAddress = divideDate(date).dividedAddressYYYYMM;
  const dividedLastDay = divideDate(lastDay).dividedAddressYYYYMM;

  const prevMonthRef = db.ref(`users/${user}/date/${dividedFirstDay}`);
  const currMonthRef = db.ref(`users/${user}/date/${dividedAddress}`);
  const nextMonthRef = db.ref(`users/${user}/date/${dividedLastDay}`);
  const dateInfo = [];
  await prevMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      if (enteredWorkList)
        Object.keys(enteredWorkList).forEach((keys) => {
          const dateStr = `${dividedFirstDay.replace("/", "-")}-${keys}`;
          if (firstDay <= dateStr && dateStr <= lastDay) dateInfo.push(dateStr);
        });
    },
    (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  await currMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      console.log("CURR MONTH: ", enteredWorkList);
      if (enteredWorkList)
        Object.keys(enteredWorkList).forEach((keys) => {
          const dateStr = `${dividedAddress.replace("/", "-")}-${keys}`;
          if (firstDay <= dateStr && dateStr <= lastDay) dateInfo.push(dateStr);
          console.log(
            "CURR day clac: ",
            firstDay,
            dateStr,
            lastDay,
            firstDay <= dateStr,
            dateStr <= lastDay
          );
        });
    },
    (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  await nextMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      if (enteredWorkList)
        Object.keys(enteredWorkList).forEach((keys) => {
          const dateStr = `${dividedLastDay.replace("/", "-")}-${keys}`;
          if (firstDay <= dateStr && dateStr <= lastDay) dateInfo.push(dateStr);
        });
    },
    (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  console.log("ENDD", dateInfo);
  return res.json(dateInfo);
};
// };

const RECORDTIME_LIMIT_HOUR = 2;
const RECORDTIME_MAX_GRADE = 2;
const WORKLIST_LIMIT_HOUR = 6;
const WORKLIST_MAX_GRADE = 6;
const getWorkListTimeSum = async (user, date) => {
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/workList`);
  let workListRes,
    workTimeSum = 0;
  await ref.once(
    "value",
    (Object) => {
      workListRes = Object.val();
    },
    (errorObject) => {
      throw new Error(errorObject);
    }
  );
  if (workListRes?.workList) {
    Object.values(workListRes.workList).forEach((workItem, idx) => {
      workTimeSum += workItem.workTime;
    });
  }

  const workListObj = {
    wakeTime: workListRes?.wakeTime || emptyTimeObj,
    bedTime: workListRes?.bedTime || emptyTimeObj,
    workTimeSum,
  };
  return workListObj;
};
export const getSetting = async (user) => {
  const ref = db.ref(`users/${user}/setting`);
  let ret;
  await ref.once(
    "value",
    (settingObj) => {
      const setting = settingObj.val();
      if (!setting) throw new Error("Can't find Setting");
      else ret = setting;
    },
    (errorObject) => {
      throw new Error(errorObject);
    }
  );
  const retObj = {
    wakeTimeTarget: ret?.targetWakeTime || undefined,
    bedTimeTarget: ret?.targetBedTime || undefined,
    workTimeTarget: ret?.targetWorkTime,
  };
  console.log("RET target: ", ret, retObj);
  return retObj;
};
const isEmptyTimeObj = (timeObj) =>
  !timeObj || timeObj?.hour === null || timeObj?.minute === null;
const getGradeInRecordTime = (time1, time2) => {
  const maxTime = { hour: 24, minute: 0 };
  const minTime = { hour: 0, minute: 0 };
  // if (isEmptyTimeObj(time1) || isEmptyTimeObj(time2)) return [];
  const cand1 = getDifference(time1, time2);
  const cand2 = getAddedHHMM(
    getDifference(maxTime, time1),
    getDifference(minTime, time2)
  );
  const cand3 = getAddedHHMM(
    getDifference(maxTime, time2),
    getDifference(minTime, time1)
  );
  const diff = HHMMcompare(cand1, cand2)
    ? HHMMcompare(cand1, cand3)
      ? cand1
      : cand3
    : HHMMcompare(cand2, cand3)
    ? cand2
    : cand3;
  //F- t1 + t2   24 - 23 + 1 = 2
  const diffHour = diff.hour + diff.minute / 60;
  const makeGreadeInRecordTime = (limit, max, time) => {
    const ret = Math.ceil(max - (time / limit) * max);
    return ret > max ? max : ret < 0 ? 0 : ret;
  };
  return [
    makeGreadeInRecordTime(
      RECORDTIME_LIMIT_HOUR,
      RECORDTIME_MAX_GRADE,
      diffHour
    ),
    diff,
  ];
};
const getGradeInWorkList = (hour1, hour2) => {
  const diff = Math.abs(hour1 - hour2);
  const makeGreadeInWorkList = (limit, max, time) => {
    const ret = Math.floor((time / limit) * max);
    return ret > max ? max : ret;
  };
  return [
    makeGreadeInWorkList(WORKLIST_LIMIT_HOUR, WORKLIST_MAX_GRADE, diff),
    diff,
  ];
};
export const makeGrade = (workListObj, settingObj) => {
  try {
    if (
      !settingObj?.wakeTimeTarget ||
      !settingObj?.bedTimeTarget ||
      !settingObj?.workTimeTarget
    )
      throw new Error("can't find Target time Object");
    const emptyGrade = [0, -1];
    const [wakeTimeGrade, wakeTimeDiff] =
      workListObj?.wakeTime && !isEmptyTimeObj(workListObj?.wakeTime)
        ? getGradeInRecordTime(settingObj.wakeTimeTarget, workListObj.wakeTime)
        : emptyGrade;
    const [bedTimeGrade, bedTimeDiff] =
      workListObj?.bedTime && !isEmptyTimeObj(workListObj?.bedTime)
        ? getGradeInRecordTime(settingObj.bedTimeTarget, workListObj.bedTime)
        : emptyGrade;
    const [workListGrade, workTimeDiff] = workListObj?.workTimeSum
      ? getGradeInWorkList(settingObj.workTimeTarget, workListObj.workTimeSum)
      : emptyGrade;
    return {
      grade: {
        wakeTimeGrade,
        bedTimeGrade,
        workListGrade,
      },
      difference: {
        wakeTimeDiff,
        bedTimeDiff,
        workTimeDiff,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
};
// export const getGrade = async (user, date) => {
//   //db에서 날짜 자체를 ㄱ가져옴 workSum, wakeTime, bedTime 가져옴
//   //db에서 target 을 가져옴
//   // target을 이용해 별점을 매겨 worksum wT bT와 함게 리턴
//   const date = "2021-10-21";
//   const user = "Invidam";
//   try {
//     const workListObj = await getWorkListTimeSum(user, date);
//     const settingObj = await getSetting(user);
//     console.log(workListObj, settingObj);
//     const grade = makeGrade(workListObj, settingObj);
//     console.log({ grade, value: workListObj, target: settingObj });
//   } catch (error) {
//     console.error(error);
//   }
// };
export const getGrade = async (req, res) => {
  const { user, date } = req.params;
  try {
    const workListObj = await getWorkListTimeSum(user, date);
    const settingObj = await getSetting(user);
    console.log(workListObj, settingObj);
    const { grade, difference } = makeGrade(workListObj, settingObj);
    return res.json({
      point: grade,
      value: workListObj,
      target: settingObj,
      difference,
    });
  } catch (error) {
    console.log("ERR", error);
    return res.status(400).json({
      status: "error",
      error: error,
    });
  }
};

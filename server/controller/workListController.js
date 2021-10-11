import { changeFormatYYYYMMDD, divideDate } from "../tools/time.js";
// import { divideDate } from "../";
import { db } from "../routes/firebase/config.js";

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
    do {
      // prevMonthDayList.push(changeFormatYYYYMMDD(prevDate, false));
      lastDay--;
      prevDate = getDate(prevDateYear, prevDateMonth, lastDay);
    } while (!isSunday(prevDate));
    return changeFormatYYYYMMDD(prevDate, false);
    // return prevMonthDayList;
  };
  const getLastDay = (date) => {
    // const nextMonthDayList = [];
    const nextDateMonth = (new Date(date).getMonth() + 2) % 12;
    const nextDateYear =
      new Date(date).getMonth() !== 11
        ? new Date(date).getFullYear()
        : new Date(date).getFullYear() + 1;
    let firstDay = 1;
    let nextDate = getDate(nextDateYear, nextDateMonth - 1, firstDay);
    do {
      // nextMonthDayList.push(changeFormatYYYYMMDD(nextDate, false));
      firstDay++;
      nextDate = getDate(nextDateYear, nextDateMonth - 1, firstDay);
    } while (!isSaturday(nextDate));
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
          dateInfo.push(`${dividedFirstDay.replace("/", "-")}-${keys}`);
        });
    },
    (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  await currMonthRef.once(
    "value",
    (workList) => {
      const enteredWorkList = workList.val();
      if (enteredWorkList)
        Object.keys(enteredWorkList).forEach((keys) => {
          dateInfo.push(`${dividedAddress.replace("/", "-")}-${keys}`);
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
          dateInfo.push(`${dividedLastDay.replace("/", "-")}-${keys}`);
        });
    },
    (errorObject) => console.log("ERR OBJ: ", errorObject)
  );
  console.log("ENDD", dateInfo);
  return res.json(dateInfo);
};
// };

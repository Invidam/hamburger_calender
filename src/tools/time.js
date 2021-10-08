export const UTCtoKTC = (date) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const korDay = new Date(date - offset);
  return korDay;
};

export const changeFormatYYYYMMDD = (date, isKOR) => {
  if (!isKOR) date = UTCtoKTC(date);
  return date.toISOString().slice(0, 10);
};
export const getToday = () => {
  return changeFormatYYYYMMDD(new Date(), true);
};
export const makeDisplayTime = (num) => (num < 10 ? "0" + num : num);

export const getDifference = (timeObj1, timeObj2) => {
  const diff = Math.abs(
    timeObj1.hour * 60 +
      timeObj1.minute -
      (timeObj2.hour * 60 + timeObj2.minute)
  );
  const hour = Math.floor(diff / 60);
  const minute = diff % 60;
  return { hour, minute };
};

export const divideDate = (date) => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const dividedAddress = `${year}/${month}/${day}`;

  const dividedAddressYYYYMM = `${year}/${month}`;
  return { year, month, day, dividedAddress, dividedAddressYYYYMM };
};

export const isEqualYYYYMMDateObj = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth();
export const isEqualYYYYMMDateStr = (date1, date2) =>
  date1.substr(0, 7) === date2.substr(0, 7);

export const getAddedDateStr = (date, value) => {
  if (typeof date === "string") date = new Date(date);
  let tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + value);
  return changeFormatYYYYMMDD(tomorrow, true);
};

export const getAddedDateObj = (date, value) => {
  if (typeof date === "string") date = new Date(date);
  let tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + value);
  return tomorrow;
};

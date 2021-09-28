export const UTCtoKTC = (date) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const korDay = new Date(date - offset);
  return korDay;
};
export const getToday = () => {
  return changeFormatYYYYMMDD(new Date(), true);
};

export const changeFormatYYYYMMDD = (date, isKOR) => {
  if (!isKOR) date = UTCtoKTC(date);
  return date.toISOString().slice(0, 10);
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

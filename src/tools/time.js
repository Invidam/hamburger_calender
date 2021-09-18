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

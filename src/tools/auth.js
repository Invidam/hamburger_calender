export const isLoggedin = () =>
  !!localStorage.getItem("access_token") &&
  localStorage.getItem("access_token") !== "undefined";

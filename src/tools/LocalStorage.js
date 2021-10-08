export class LocalStroage {
  static workList() {
    return {
      isEmpty: () =>
        localStorage.getItem("workList")
          ? !JSON.parse(localStorage.getItem("workList")).length
          : true,
      get: () => {
        if (!localStorage.getItem("workList"))
          localStorage.setItem("workList", "{}");
        return JSON.parse(localStorage.getItem("workList"));
      },
      set: (workList) =>
        localStorage.setItem("workList", JSON.stringify(workList)),
      remove: () => localStorage.setItem("workList", "{}"),
    };
  }
  static recordTime(key) {
    return {
      isEmpty: () =>
        localStorage.getItem(key)
          ? !JSON.parse(localStorage.getItem(key)).length
          : true,
      get: () => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, "{}");
        return JSON.parse(localStorage.getItem(key));
      },
      set: (timeObj) => {
        timeObj = JSON.stringify(timeObj);
        localStorage.setItem(key, timeObj);
      },
      remove: () => localStorage.setItem(key, "{}"),
    };
  }
  static accessToken() {
    return {
      isEmpty: () =>
        localStorage.getItem("access_token")
          ? localStorage.getItem("access_token") === "undefined"
          : true,
      get: () => {
        if (!localStorage.getItem("access_token"))
          localStorage.setItem("access_token", "undefined");
        return JSON.parse(localStorage.getItem("access_token"));
      },
      set: (token) => {
        token = JSON.stringify(token);
        localStorage.setItem("access_token", token);
      },
      remove: () => localStorage.setItem("access_token", "undefined"),
    };
  }
  static date() {
    return {
      isEmpty: () =>
        localStorage.getItem("date")
          ? localStorage.getItem("date") === "undefined"
          : true,
      get: () => {
        if (!localStorage.getItem("date"))
          localStorage.setItem("date", "undefined");
        return JSON.parse(localStorage.getItem("date"));
      },
      set: (dateObj) => {
        dateObj = JSON.stringify(dateObj);
        localStorage.setItem("date", dateObj);
      },
      remove: () => localStorage.setItem("date", "undefined"),
    };
  }
}

//API.workList("SR","1212-12-12").create({ab:"c"});
//setWork().create(workObj)
//Work.create(workObj)

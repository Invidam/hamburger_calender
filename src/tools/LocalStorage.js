import { APIv2 } from "./API";

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
        if (this.accessToken().isEmpty()) {
          localStorage.setItem("access_token", "undefined");
          return undefined;
        }
        return JSON.parse(localStorage.getItem("access_token"));
      },
      set: (token) => {
        token = JSON.stringify(token);
        localStorage.setItem("access_token", token);
        APIv2.updateHeader();
      },
      remove: () => {
        localStorage.setItem("access_token", "undefined");
        APIv2.updateHeader();
      },
    };
  }
  static date() {
    return {
      isEmpty: () =>
        localStorage.getItem("date")
          ? localStorage.getItem("date") === "undefined"
          : true,
      get: () => {
        if (this.date().isEmpty()) {
          localStorage.setItem("date", "undefined");
          return undefined;
        }
        return JSON.parse(localStorage.getItem("date"));
      },
      set: (dateObj) => {
        dateObj = JSON.stringify(dateObj);
        localStorage.setItem("date", dateObj);
      },

      remove: () => localStorage.setItem("date", "undefined"),
    };
  }
  static startDate() {
    return {
      isEmpty: () =>
        localStorage.getItem("startDate")
          ? localStorage.getItem("startDate") === "undefined"
          : true,
      get: () => {
        if (this.startDate().isEmpty()) {
          localStorage.setItem("startDate", "undefined");
          return undefined;
        }
        return JSON.parse(localStorage.getItem("startDate"));
      },
      set: (dateObj) => {
        dateObj = JSON.stringify(dateObj);
        localStorage.setItem("startDate", dateObj);
      },
      remove: () => localStorage.setItem("startDate", "undefined"),
    };
  }
  static todoList() {
    return {
      isEmpty: () =>
        localStorage.getItem("todoList")
          ? !Object.values(JSON.parse(localStorage.getItem("todoList"))).length
          : true,
      get: () => {
        if (!localStorage.getItem("todoList"))
          localStorage.setItem("todoList", "{}");
        return JSON.parse(localStorage.getItem("todoList"));
      },
      set: (todoList) =>
        localStorage.setItem("todoList", JSON.stringify(todoList)),
      remove: () => localStorage.setItem("todoList", "{}"),
    };
  }
}

//API.workList("SR","1212-12-12").create({ab:"c"});
//setWork().create(workObj)
//Work.create(workObj)

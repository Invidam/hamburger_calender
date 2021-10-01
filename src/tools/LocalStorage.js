export class LocalStroage {
  static workList() {
    return {
      isEmpty: () =>
        localStorage.getItem("workList")
          ? !JSON.parse(window.localStorage.getItem("workList")).length
          : true,
      get: () => JSON.parse(window.localStorage.getItem("workList")),
      set: (workList) => window.localStorage.setItem("workList", workList),
    };
  }
}

//API.workList("SR","1212-12-12").create({ab:"c"});
//setWork().create(workObj)
//Work.create(workObj)

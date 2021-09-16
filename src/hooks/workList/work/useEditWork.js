export const useEditWork = (workList, setWorkList, idx, callback) => {
  const validator = (workObj) => {
    return workObj.workName && workObj.workTime && workObj.workColor;
  };
  let workColor = workList.length > idx ? workList[idx].workColor : undefined;
  const hexToRgba = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return "rgba(" + r + "," + g + "," + b + ", 1)";
  };
  const onSubmitColor = (color) => {
    if (!color) {
      console.log("NO", color);
    } else if (color.substr(0, 1) === "#") {
      color = hexToRgba(color);
    }
    workColor = color;
  };
  const onEditWork = (event, idx) => {
    event.preventDefault();
    const workName = event.target.workName.value;
    const workTime = parseInt(event.target.workTime.value);
    const workObj = { workName, workTime, workColor };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      const workListTemp = [...workList];
      workListTemp.splice(idx, 1, workObj);
      setWorkList(workListTemp);
    } else {
      let errText = `[ERROR] ${workName ? "" : "WorkName"}${
        !workTime + !workColor > 0 && !workName ? ", " : ""
      }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
        workColor ? "" : "WorkColor"
      } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
      alert(errText);
    }
  };
  return { onSubmitColor, onEditWork };
};

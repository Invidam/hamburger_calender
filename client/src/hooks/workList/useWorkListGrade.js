import { useState } from "react";
import { API } from "../../tools/API";
const baseSetting = {
  targetWorkTime: 6,
  targetWakeTime: { hour: 8, minute: 0 },
  targetBedTime: { hour: 0, minute: 0 },
};
export const useWorkListGrade = (user, date) => {
  const [gradeInfo, setGradeInfo] = useState();
  // const [difference, setDifference] = useState();
  // const [target, setTarget] = useState();
  // const [value, setValue] = useState();
  const [isGradeLoading, setLoad] = useState(false);
  const updateInfo = async () => {
    try {
      setLoad(true);
      if (user) {
        const res = await API.workList(user, date).grade();
        console.log(res.data);
        if (!res?.data) throw new Error("[Error] WorkList Grade cannot load");
        const resGradeInfo = res.data;
        setGradeInfo(resGradeInfo);
      } else {
        setGradeInfo(baseSetting);
      }
      // setGrade(gradeInfo.grade);
      // setDifference(gradeInfo.difference);
      // setTarget(gradeInfo.target);
      // setValue(gradeInfo.value);
      setLoad(false);
    } catch (error) {
      alert(error);
      setLoad(false);
    }
  };
  return [gradeInfo, isGradeLoading, updateInfo];
  //return [grade, difference, target, value, isGradeLoading, updateInfo];
};

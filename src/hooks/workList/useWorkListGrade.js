import { useState } from "react";
import { APIv2 } from "../../tools/API";

export const useWorkListGrade = (user, date) => {
  const [gradeInfo, setGradeInfo] = useState();
  // const [difference, setDifference] = useState();
  // const [target, setTarget] = useState();
  // const [value, setValue] = useState();
  const [isGradeLoading, setLoad] = useState(false);
  const updateInfo = async () => {
    try {
      setLoad(true);
      const res = await APIv2.workList(user, date).grade();
      console.log(res.data);
      if (!res?.data) throw new Error("[Error] WorkList Grade cannot load");
      const resGradeInfo = res.data;
      setGradeInfo(resGradeInfo);
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

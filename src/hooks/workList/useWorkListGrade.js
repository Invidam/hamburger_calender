import { useState } from "react";
import { APIv2 } from "../../tools/API";

export const useWorkListGrade = (user, date) => {
  const [grade, setGrade] = useState();
  const [difference, setDifference] = useState();
  const [target, setTarget] = useState();
  const [value, setValue] = useState();
  const [isGradeLoading, setLoad] = useState(false);
  const updateInfo = async () => {
    try {
      setLoad(true);
      const res = await APIv2.workList(user, date).grade();
      console.log(res.data);
      if (!res?.data) throw new Error("[Error] WorkList Grade cannot load");
      const gradeInfo = res.data;
      setGrade(gradeInfo.grade);
      setDifference(gradeInfo.difference);
      setTarget(gradeInfo.target);
      setValue(gradeInfo.value);
      setLoad(false);
    } catch (error) {
      alert(error);
      setLoad(false);
    }
  };
  return [grade, difference, target, value, isGradeLoading, updateInfo];
};

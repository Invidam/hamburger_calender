export const useDeleteWork = (workList, setWorkList, callback) => {
  const onDeleteWork = (event, idx) => {
    const deleteAction = () => {
      callback();
      workList.splice(idx, 1);
      console.log("WORKL IST AFT DELETE ", workList);
      setWorkList(workList);
    };
    const cancelAction = () => {
      console.log("CANCEL DELETE WORK");
    };
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteAction();
    } else {
      cancelAction();
    }
  };
  return { onDeleteWork };
};

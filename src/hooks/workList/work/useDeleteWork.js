export const useDeleteWork = (workList, setWorkList, callback) => {
  const onDeleteWork = (event, idx) => {
    event.preventDefault();
    const deleteAction = () => {
      callback();
      const workListTemp = [...workList];
      workListTemp.splice(idx, 1);
      setWorkList(workListTemp);
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

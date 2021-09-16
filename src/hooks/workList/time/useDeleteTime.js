export const useDeleteTime = (recordTime, updateRecordTime, callback) => {
  const onDeleteTime = (event) => {
    event.preventDefault();
    const deleteAction = () => {
      callback();
      updateRecordTime(undefined);
    };
    const cancelAction = () => {
      console.log("CANCEL DELETE Time");
    };
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteAction();
    } else {
      cancelAction();
    }
  };
  return { onDeleteTime };
};

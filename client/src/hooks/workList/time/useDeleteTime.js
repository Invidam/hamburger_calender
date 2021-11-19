export const useDeleteTime = (recordTime, setTime, callback) => {
  const onDeleteTime = (event) => {
    try {
      event.preventDefault();

      const deleteTime = async () => await setTime(recordTime).delete();
      const deleteAction = () => {
        callback();
        deleteTime(undefined);
      };
      const cancelAction = () => {
        console.log("CANCEL DELETE Time");
      };
      if (window.confirm("Are you sure you want to delete this item?")) {
        deleteAction();
      } else {
        cancelAction();
      }
    } catch (error) {
      alert(error);
    }
  };
  return { onDeleteTime };
};

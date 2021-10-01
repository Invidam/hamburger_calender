export const useDeleteWork = (workItem, setWork, callback) => {
  const onDeleteWork = (event) => {
    try {
      event.preventDefault();

      const deleteWorkItem = async () => await setWork(workItem).delete();
      const deleteAction = () => {
        callback();
        deleteWorkItem();
      };
      const cancelAction = () => {
        console.log("CANCEL DELETE WORK");
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
  return { onDeleteWork };
};

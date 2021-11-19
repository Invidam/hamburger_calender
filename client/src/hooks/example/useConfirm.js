export const useConfirm = (message, callback, onCancel) => {
  if (typeof callback !== "function") return;
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

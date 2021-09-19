import { useState } from "react";
import Modal from "react-modal";
import { useDeleteTime } from "../../../../hooks/workList/time/useDeleteTime";
// import { useDeleteWork } from "../../../../hooks/workList/work/useDeleteWork";
import { useEditTime } from "../../../../hooks/workList/time/useEditTime";
import { EditTimeWindow } from "../../window/time/EditTimeWindow";
// import {EditTimeWindow} from "."

Modal.setAppElement("#root");
const customStyles = {
  content: {
    // top: "40vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(245, 235, 220)",
    border: "none",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};
export const TimeRecordDisplay = ({ recordTime, isWake, updateRecordTime }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);

  const closeEditModal = (event) => setEditModalIsOpen(false);
  const { onEditRecordTime } = useEditTime(
    recordTime,
    updateRecordTime,
    isWake,
    closeEditModal
  );
  const { onDeleteTime } = useDeleteTime(
    recordTime,
    updateRecordTime,
    closeEditModal
  );
  const editTimeWindow = (
    <EditTimeWindow
      recordTime={recordTime}
      isWake={isWake}
      onEditTime={onEditRecordTime}
    />
  );
  const editModal = (
    <Modal
      isOpen={editModalIsOpen}
      onRequestClose={closeEditModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="Overlay"
    >
      {editTimeWindow}
      <button
        className="modalWindow__btn"
        onClick={(event) => onDeleteTime(event)}
      >
        DELETE
      </button>
      <button
        className="modalWindow__close modalWindow__btn"
        onClick={closeEditModal}
      >
        CLOSE
      </button>
    </Modal>
  );
  return (
    <div>
      <li
        className={
          isWake
            ? "workList__wakeTime-display workList__time-display workList__time workList__wakeTime"
            : "workList__bedTime-display workList__time-display workList__time workList__bedTime"
        }
        onClick={openEditModal}
      >
        {isWake ? "Wake at " : "Sleep at "}
        {recordTime.hour < 10 ? "0" + recordTime.hour : recordTime.hour}:
        {recordTime.minute < 10 ? "0" + recordTime.minute : recordTime.minute}
      </li>
      {editModal}
    </div>
  );
};

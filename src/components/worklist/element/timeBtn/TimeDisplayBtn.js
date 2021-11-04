import { useState } from "react";
import Modal from "react-modal";
import { useDeleteTime } from "../../../../hooks/workList/time/useDeleteTime";
// import { useDeleteWork } from "../../../../hooks/workList/work/useDeleteWork";
import { useEditTime } from "../../../../hooks/workList/time/useEditTime";
import {
  getDifference,
  makeDisplayTime,
  timeObjToStr,
} from "../../../../tools/time";
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
export const TimeRecordDisplay = ({
  recordTime,
  isWake,
  setTime,
  targetTime,
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);

  const closeEditModal = (event) => setEditModalIsOpen(false);
  const editTimeHook = useEditTime(recordTime, setTime, isWake, closeEditModal);
  const { onDeleteTime } = useDeleteTime(recordTime, setTime, closeEditModal);
  const editTimeWindow = (
    <EditTimeWindow
      recordTime={recordTime}
      isWake={isWake}
      editTimeHook={editTimeHook}
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
  const targetElement = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">TargetTime:</span>
      <span className="tooltip-box__value">{timeObjToStr(targetTime)}</span>
    </div>
  );
  const valueElement = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">
        {isWake ? "WakeTime: " : "BedTime: "}
      </span>
      <span className="tooltip-box__value">{timeObjToStr(recordTime)}</span>
    </div>
  );
  const diffTime = getDifference(targetTime, recordTime);
  const diffElement = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">Difference:</span>
      <span className="tooltip-box__value">{timeObjToStr(diffTime)}</span>
    </div>
  );
  // <span className="tooltip_box__value">{`${isWake ? "Wake" : "Bed"}Time: ${
  //   recordTime.hour
  // }: ${recordTime.minute}`}</span>;
  const tooltipBox = (
    <div className="tooltip-content">
      <div className="tooltip-box">
        {targetTime.hour !== -1 ? targetElement : ""}
        {valueElement}
        {targetTime.hour !== -1 ? diffElement : ""}
      </div>
    </div>
  );
  return (
    <div>
      <li
        className={
          isWake
            ? "workList__wakeTime-display workList__time-display workList__time workList__wakeTime tooltip"
            : "workList__bedTime-display workList__time-display workList__time workList__bedTime tooltip"
        }
        onClick={openEditModal}
      >
        {isWake ? "Wake at " : "Sleep at "}
        {makeDisplayTime(recordTime.hour)}: {makeDisplayTime(recordTime.minute)}
        {tooltipBox}
      </li>
      {editModal}
    </div>
  );
};

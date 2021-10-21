import { useState } from "react";
import Modal from "react-modal";
import { useModal } from "../../../../hooks/example/useModal";
import { useDeleteWork } from "../../../../hooks/workList/work/useDeleteWork";
import { getDifference, makeDisplayTime } from "../../../../tools/time";
import { EditWorkWindow } from "../../window/work/EditWorkWindow";
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
export const Work = ({ workItem, setWork, targetTime, workTimeSum }) => {
  const { id } = workItem;
  const { editModalIsOpen, openEditModal, closeEditModal } = useModal();
  const { onDeleteWork } = useDeleteWork(workItem, setWork, closeEditModal);

  const editWorkWindow = (
    <EditWorkWindow
      workItem={workItem}
      setWork={setWork}
      callback={closeEditModal}
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
      {editWorkWindow}
      <button className="modalWindow__btn" onClick={onDeleteWork}>
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
      <span className="tooltip-box__value">{targetTime}h</span>
    </div>
  );
  const valueElement = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">Worktime Sum:</span>
      <span className="tooltip-box__value">{workTimeSum}h</span>
    </div>
  );

  const valueElement2 = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">Worktime :</span>
      <span className="tooltip-box__value">{workItem.workTime}h</span>
    </div>
  );
  const diffTime = targetTime - workTimeSum;
  console.log("[wt] ", targetTime, workTimeSum, diffTime);
  const diffElement = (
    <div className="tooltip-box__target">
      <span className="tooltip-box__key">Difference:</span>
      <span className="tooltip-box__value">
        {/* {diffTime > 0 ? "+" : "-"} */}
        {diffTime}h
      </span>
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
        {/* {valueElement2} */}
        {targetTime.hour !== -1 ? diffElement : ""}
      </div>
    </div>
  );
  // const tooltipBox = (
  //   <span className="tooltip-content" key={id}>
  //     {workItem.workName} {workItem.workTime}h targetTime workTimeSum
  //   </span>
  // );
  console.log("[WORK]");
  return (
    <div>
      <li
        className="workList__work tooltip"
        style={{ backgroundColor: workItem.workColor }}
        key={"_" + id}
        onClick={openEditModal}
      >
        {workItem.workName} {workItem.workTime}h{tooltipBox}
      </li>
      {editModal}
    </div>
  );
};

import { useState } from "react";
import Modal from "react-modal";
import { useEditWork } from "../../../../hooks/useEditWork";
import { EditWorkWindow } from "../../window/EditWindow";
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
export const Work = ({ workItem, workList, setWorkList, idx }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = (event) => setEditModalIsOpen(false);

  const {
    workListEdit = workList,
    onEditColor,
    onEditWork,
  } = useEditWork(workList, setWorkList, idx, closeEditModal);
  workList = workListEdit;
  const editWorkWindow = (
    <EditWorkWindow
      workList={workList}
      idx={idx}
      onEditColor={onEditColor}
      onEditWork={onEditWork}
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
        className="workList__work tooltip"
        style={{ backgroundColor: workItem.workColor }}
        key={idx}
        onClick={openEditModal}
      >
        {workItem.workName} {workItem.workTime}h
        <span className="tooltip-content" key={idx}>
          {workItem.workName} {workItem.workTime}h
        </span>
      </li>
      {editModal}
    </div>
  );
};

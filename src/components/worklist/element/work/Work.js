import { useState } from "react";
import Modal from "react-modal";
import { useDeleteWork } from "../../../../hooks/workList/work/useDeleteWork";
import { useEditWork } from "../../../../hooks/workList/work/useEditWork";
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
export const Work = ({ workItem, workList, setWorkList, idx }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = (event) => setEditModalIsOpen(false);

  const { onDeleteWork } = useDeleteWork(workList, setWorkList, closeEditModal);

  const editWorkWindow = (
    <EditWorkWindow
      workList={workList}
      setWorkList={setWorkList}
      idx={idx}
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
      <button
        className="modalWindow__btn"
        onClick={(event) => onDeleteWork(event, idx)}
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

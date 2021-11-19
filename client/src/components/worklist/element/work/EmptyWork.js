import Modal from "react-modal";
import { useState } from "react";
import { AddWorkWindow } from "../../window/work/AddWorkWindow";
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
export const EmptyWork = ({ setWork }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const openAddModal = () => setAddModalIsOpen(true);
  const closeAddModal = () => setAddModalIsOpen(false);
  const addWorkWindow = (
    <AddWorkWindow setWork={setWork} callback={closeAddModal} />
  );
  const addModal = (
    <Modal
      isOpen={addModalIsOpen}
      onRequestClose={closeAddModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="Overlay"
    >
      {addWorkWindow}
      <button
        className="modalWindow__close modalWindow__btn"
        onClick={closeAddModal}
      >
        CLOSE
      </button>
    </Modal>
  );
  console.log("[EMPTY] WORK");
  return (
    <div>
      <li
        className={"workList__work empty-element workList__element-empty"}
        onClick={openAddModal}
      >
        Add your work
      </li>
      {addModal}
    </div>
  );
};

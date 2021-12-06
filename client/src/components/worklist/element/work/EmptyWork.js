import Modal from "react-modal";
import { useState } from "react";
import { AddWorkWindow } from "../../window/work/AddWorkWindow";
import { customStyles } from "../../../../hooks/example/useModal";
Modal.setAppElement("#root");
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

import Modal from "react-modal";
import { useState } from "react";
import { usePushWork } from "../../hooks/usePushWork";
import { AddWorkWindow } from "./window/AddWindow";
import { WorkList } from "./WorkList";
import { WorkListTemplate } from "./WorkListTemplate";
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

export const WorkListComponent = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log("OPEN", modalIsOpen);
    setIsOpen(true);
    console.log("OPEN", modalIsOpen);
  };
  const closeModal = () => {
    console.log("CLOSE1", modalIsOpen);
    setIsOpen(false);
    console.log("CLOSE2", modalIsOpen);
  };
  const { workList, onSubmitWork } = usePushWork(closeModal);
  const addWorkWindow = (
    <AddWorkWindow workList={workList} onSubmitWork={onSubmitWork} />
  );
  const modal = (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="Overlay"
    >
      {addWorkWindow}
      <button onClick={closeModal}> CLOSE</button>
    </Modal>
  );

  console.log("In worklist, list: ", workList);
  const workListDisplay = (
    <WorkList
      workList={workList}
      addWorkWindow={addWorkWindow}
      modal={modal}
      openModal={openModal}
    />
  );
  return <WorkListTemplate workList={workListDisplay} />;
};

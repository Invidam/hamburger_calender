import "../../../../css/modam.css";

export const EmptyWork = ({ addWorkWindow, modal, openModal }) => {
  return (
    <div>
      <li
        className={"empty-element workList__element-empty"}
        onClick={openModal}
      >
        Add your work
      </li>
      {modal}
    </div>
  );
};

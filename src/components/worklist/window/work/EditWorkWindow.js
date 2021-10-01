import "../../../../css/workList/window.css";
import { useTabs } from "../../../../hooks/example/useTabs";
import { useEditWork } from "../../../../hooks/workList/work/useEditWork";
import { CustomizeColor } from "./tabs/CustomizeColor";
import { IngredientList } from "./tabs/IngredientList";
export const EditWorkWindow = ({ workItem, setWork, callback }) => {
  const { id } = workItem;
  const { onChangeWorkColor, onChangeWorkName, onChangeWorkTime, onEditWork } =
    useEditWork(workItem, setWork, callback);
  const Recommended = <IngredientList onChangeWorkColor={onChangeWorkColor} />;
  const Favorite = <h1>Favorite</h1>;
  const Customize = <CustomizeColor onChangeWorkColor={onChangeWorkColor} />;
  const tabNames = ["Recommended", "Favorite", "Customize"];
  const Tabs = [Recommended, Favorite, Customize];
  const [currentItem, currentIdx, changeItem] = useTabs(0, Tabs);
  console.log("WIN", id);
  return (
    <div className="modalWindow">
      <div className="modalWindow__column">
        <span className="addWinodw__title">Input Work</span>
      </div>
      <div className="modalWindow__column modalWindow__inputSpace">
        <span className="modalWindow__desc modalWindow__desc-name">Name:</span>
        <input
          className="modalWindow__input modalWindow__input-name"
          type="text"
          name="workName"
          autoComplete="off"
          defaultValue={workItem?.workName}
          onChange={({ target: { value } }) => onChangeWorkName(value)}
        ></input>
        <span className="modalWindow__desc modalWindow__desc-time">Time:</span>
        <input
          className="modalWindow__input modalWindow__input-time"
          type="number"
          step="1"
          min="0"
          max="24"
          name="workTime"
          placeholder="0"
          defaultValue={workItem?.workTime}
          onChange={({ target: { value } }) => onChangeWorkTime(value)}
        ></input>
        h
      </div>
      <div className="modalWindow__column">
        <span className="addWinodw__title">Pick Color</span>{" "}
      </div>
      <div className="modalWindow_column">
        {Tabs.map((section, idx) => {
          return (
            <button
              key={idx}
              className={
                currentIdx === idx
                  ? "modalWindow__tab-focus modalWindow__tab"
                  : "modalWindow__tab"
              }
              onClick={(event) => {
                event.preventDefault();
                changeItem(idx);
              }}
            >
              {tabNames[idx]}
            </button>
          );
        })}
      </div>
      <div className="modalWindow__tab-content">{currentItem}</div>
      <button
        className="modalWindow__submit modalWindow__btn"
        onClick={onEditWork}
      >
        SUBMIT
      </button>
    </div>
  );
};

import "../../../css/addWindow.css";
import { useTabs } from "../../../hooks/useTabs";
export const AddWorkWindow = ({ workList, onSubmitWork }) => {
  const Recommended = <h1>Recommended</h1>;
  const Favorite = <h1>Favorite</h1>;
  const Customize = <h1>Customize</h1>;
  const tabNames = ["Recommended", "Favorite", "Customize"];
  const Tabs = [Recommended, Favorite, Customize];
  const [currentItem, currentIdx, changeItem] = useTabs(0, Tabs);
  if (workList.length)
    window.localStorage.setItem("workList", JSON.stringify(workList));
  return (
    <form className="addWindow" autocomplete="off" onSubmit={onSubmitWork}>
      {/* {WorkList.workList} */}
      <div className="addWindow__column">
        <span className="addWinodw__title">Input Work</span>{" "}
      </div>
      <div className="addWindow__column addWindow__inputSpace">
        <span className="addWindow__desc addWindow__desc-name">Name:</span>
        <input
          className="addWindow__input addWindow__input-name"
          type="text"
          name="workName"
        ></input>
        <span className="addWindow__desc addWindow__desc-time">Time:</span>
        <input
          className="addWindow__input addWindow__input-time"
          type="number"
          step="1"
          min="0"
          max="24"
          name="workTime"
          placeholder="0"
        ></input>
        h
      </div>
      <div className="addWindow__column">
        <span className="addWinodw__title">Pick Color</span>{" "}
      </div>
      <div className="addWindow_column">
        {Tabs.map((section, idx) => {
          return (
            <button
              className={
                currentIdx === idx
                  ? "addWindow__tab-focus addWindow__tab"
                  : "addWindow__tab"
              }
              onClick={() => changeItem(idx)}
            >
              {" "}
              {tabNames[idx]}
            </button>
          );
        })}
      </div>
      {currentItem}
      <input type="color" name="workColor"></input>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

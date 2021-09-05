import "../../../css/addWindow.css";
import { useTabs } from "../../../hooks/useTabs";
import { IngredientList } from "./IngredientList";
export const AddWorkWindow = ({ workList, onSubmitWork }) => {
  const Recommended = <IngredientList />;
  const Favorite = <h1>Favorite</h1>;
  const Customize = (
    <input
      type="color"
      onChange={() => {
        console.log(this.value);
      }}
      name="workColor"
    ></input>
  );
  const tabNames = ["Recommended", "Favorite", "Customize"];
  const Tabs = [Recommended, Favorite, Customize];
  const [currentItem, currentIdx, changeItem] = useTabs(0, Tabs);
  if (workList.length)
    window.localStorage.setItem("workList", JSON.stringify(workList));
  return (
    <form className="addWindow" autoComplete="off" onSubmit={onSubmitWork}>
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
      {currentItem}
      <input type="submit" value="SUBMIT"></input>
    </form>
  );
};

/*
hook을 사용하여 문제 해결하기.
useSubmit => set Name set Time set Color을 리턴하여
각 탭에서 set Color을 사용하기. (이래야 저장한 색이 유지될듯. + 제출 시에 )
왜냐면 네이티브가 아니기 때문이다.
계속 submit되는 문제는 탭할 때 onTab에서 event.preventDefault()을 이용하여 해결하였음.

*/

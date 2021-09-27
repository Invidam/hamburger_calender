import { useState } from "react";
import "../../../../css/workList/window.css";
import { useTabs } from "../../../../hooks/example/useTabs";
import { usePushWork } from "../../../../hooks/workList/work/usePushWork";
import { CustomizeColor } from "./tabs/CustomizeColor";
import { IngredientList } from "./tabs/IngredientList";
export const AddWorkWindow = ({ workList, setWorkList, callback }) => {
  const {
    onChangeWorkColor,
    onChangeWorkName,
    onChangeWorkTime,
    onSubmitWork,
  } = usePushWork(workList, setWorkList, callback);
  const Recommended = <IngredientList onChangeWorkColor={onChangeWorkColor} />;
  const Favorite = <h1>Favorite</h1>;
  const Customize = <CustomizeColor onChangeWorkColor={onChangeWorkColor} />;
  const tabNames = ["Recommended", "Favorite", "Customize"];
  const Tabs = [Recommended, Favorite, Customize];
  const [currentItem, currentIdx, changeItem] = useTabs(0, Tabs);
  // if (workList.length)
  //   window.localStorage.setItem("workList", JSON.stringify(workList));
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
          onChange={({ target: { value } }) => onChangeWorkTime(value)}
        ></input>
        h
      </div>
      <div className="modalWindow__column">
        <span className="modalWindow__title">Pick Color</span>{" "}
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
        onClick={onSubmitWork}
      >
        SUBMIT
      </button>
    </div>
  );
};

/*
hook을 사용하여 문제 해결하기.
useSubmit => set Name set Time set Color을 리턴하여
각 탭에서 set Color을 사용하기. (이래야 저장한 색이 유지될듯. + 제출 시에 )
왜냐면 네이티브가 아니기 때문이다.
계속 submit되는 문제는 탭할 때 onTab에서 event.preventDefault()을 이용하여 해결하였음.

*/

import "../../../../css/ingredientList.css";
import { useTabs } from "../../../../hooks/useTabs";
const themeList = new Map();
const cheezeTheme = {
  backgroundColor: "rgba(255, 166, 0, 1)",
};
const meetTheme = {
  backgroundColor: "rgba(69, 1, 1, 1)",
};

const vegetableTheme = {
  backgroundColor: "rgba(50, 199, 4, 1)",
};
const add = () => {
  console.log("1");
};

const tomatoTheme = {
  backgroundColor: "rgba(227, 26, 0, 1)",
};
themeList.set("tomato", tomatoTheme);
themeList.set("cheeze", cheezeTheme);
themeList.set("meet", meetTheme);
themeList.set("vegetable", vegetableTheme);
export const IngredientEx = ({ ingredienName }) => {
  return (
    <li onClick={add} style={themeList[ingredienName]}>
      test li{" "}
    </li>
  );
};

export const IngredientList = ({ onSubmitColor }) => {
  const themeArray = [...themeList];
  let isFirst = true;
  const [currentItem, currentIdx, setCurrentIndex] = useTabs(0, themeArray);
  const onClick = (event, style, idx) => {
    isFirst = false;
    event.preventDefault();
    console.log(event.target, style.backgroundColor);
    setCurrentIndex(idx);
    onSubmitColor(style.backgroundColor);
    // event.target.workColor.value = style.backgroundColor;
  };
  return (
    <div className="ingredient__list">
      {[...themeList].map(([key, value], idx) => {
        return (
          <button
            className={
              idx === currentIdx && !isFirst
                ? "ingredient__item ingredient__item-focus"
                : "ingredient__item"
            }
            onClick={(event) => onClick(event, value, idx)}
            key={idx}
          >
            <div className="ingredient__color" style={value}></div>
            <span className="ingredient__title">{key}</span>
          </button>
        );
      })}
    </div>
  );
};

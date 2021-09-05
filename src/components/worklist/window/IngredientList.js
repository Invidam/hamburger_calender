import "../../../css/ingredientList.css";
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

export const IngredientList = () => {
  const onClick = (event, style) => {
    console.log(event.target, style.backgroundColor);
    // event.target.workColor.value = style.backgroundColor;
  };
  console.log();
  return (
    <ol className="ingredient__list">
      {[...themeList].map(([key, value]) => {
        return (
          <li
            className="ingredient__item"
            onClick={(event) => onClick(event, value)}
          >
            <div className="ingredient__color" style={value}></div>
            <span className="ingredient__title">{key}</span>
          </li>
        );
      })}
    </ol>
  );
};
//background-color: white;

/*
방법 생각해보기
버튼 클릭 -> () => 색상 지정 (DB에도 저장) => 색상 표시

에서, 버튼 클릭에 따라 어떻게 색상을 지정할 것인지 고민해보기.
*/

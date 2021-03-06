import "../../../../../css/workList/customizeColor.css";
export const CustomizeColor = ({ onChangeWorkColor }) => {
  return (
    <div className="addWindow__customColor">
      <span className="addWindow__customColor-text">
        Set your Ingredient's Color
      </span>
      <div className="addWindow__customColor-bread addWindow__customColor-bread-top"></div>
      <div className="addWindow__customColor-pickColor">
        <span className="addWindow__customColor-pickColor-input">
          Click this ➡
        </span>
        <input
          className="addWindow__customColor-pickColor-input"
          type="color"
          onChange={({ target: { value } }) => {
            onChangeWorkColor(value);
          }}
          name="workColor"
        ></input>

        <span className="addWindow__customColor-pickColor-input">
          ⬅ Click this
        </span>
      </div>
      <div className="addWindow__customColor-bread addWindow__customColor-bread-bottom"></div>
    </div>
  );
};

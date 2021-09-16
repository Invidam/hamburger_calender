import "../../../../css/window.css";
export const EditTimeWindow = ({ recordTime, isWake, onEditTime }) => {
  return (
    <form
      className="modalWindow"
      autoComplete="off"
      onSubmit={(event) => onEditTime(event, isWake)}
    >
      <div className="modalWindow__column">
        <span className="addWinodw__title">{`Input ${
          isWake ? "Wake" : "Bed "
        } Time`}</span>
      </div>
      <div className="modalWindow__column modalWindow__inputSpace">
        <input
          className="modalWindow__input modalWindow__input-hour"
          type="number"
          step="1"
          min="0"
          max="23"
          name="hour"
          placeholder="0"
          defaultValue={recordTime?.hour}
        ></input>
        h
        <input
          className="modalWindow__input modalWindow__input-minute"
          type="number"
          step="1"
          min="0"
          max="59"
          name="minute"
          placeholder="0"
          defaultValue={recordTime?.minute}
        ></input>
        m
      </div>
      <input
        className="modalWindow__submit modalWindow__btn"
        type="submit"
        value="SAVE"
      ></input>
    </form>
  );
};

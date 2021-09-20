import "../../../../css/window.css";
export const EditTimeWindow = ({ recordTime, isWake, editTimeHook }) => {
  const { onChangeHour, onChangeMinute, onEditRecordTime } = editTimeHook;
  return (
    <div className="modalWindow">
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
          onChange={({ target: { value } }) => onChangeHour(value)}
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
          onChange={({ target: { value } }) => onChangeMinute(value)}
        ></input>
        m
      </div>
      <button
        className="modalWindow__submit modalWindow__btn"
        onClick={onEditRecordTime}
      >
        SAVE
      </button>
    </div>
  );
};

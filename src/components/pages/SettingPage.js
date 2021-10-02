import "../../css/pages/pages.css";
export const SettingPage = ({ updateSettingHook }) => {
  //const = {user,history,location } = props;
  const {
    onEditTargetTime,
    targetWorkTime,
    onChangeTargetWorkTime,
    targetWakeHour,
    targetBedHour,
    targetWakeMinute,
    targetBedMinute,
    onChangeTargetWakeHour,
    onChangeTargetBedHour,
    onChangeTargetWakeMinute,
    onChangeTargetBedMinute,
  } = updateSettingHook;
  return (
    <section className="page">
      <div className="page-input-box">
        <h1>Setting Page</h1>

        <div className="setting-box">
          <div className="setting-column">
            <span className="setting__text">TargetWorkTime: </span>
            <div className="setting__input-box">
              <input
                value={targetWorkTime || 0}
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
                placeholder="0"
                className="setting__input setting__input-username"
                onChange={({ target: { value } }) =>
                  onChangeTargetWorkTime(value)
                }
              />
              h
            </div>
          </div>
          <div className="setting-column">
            <span className="setting__text">TargetWakeTime: </span>
            <div className="setting__input-box">
              <input
                value={targetWakeHour || 0}
                className="setting__input setting__input-email"
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
                placeholder="0"
                onChange={({ target: { value } }) =>
                  onChangeTargetWakeHour(value)
                }
              />
              h
              <input
                value={targetWakeMinute || 0}
                type="number"
                step="1"
                min="0"
                max="59"
                name="minute"
                placeholder="0"
                className="setting__input setting__input-username"
                onChange={({ target: { value } }) =>
                  onChangeTargetWakeMinute(value)
                }
              />
              m
            </div>
          </div>
          <div className="setting-column">
            <span className="setting__text">TargetBedTime: </span>
            <div className="setting__input-box">
              <input
                value={targetBedHour || 0}
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
                placeholder="0"
                className="setting__input setting__input-password"
                onChange={({ target: { value } }) =>
                  onChangeTargetBedHour(value)
                }
              />
              h
              <input
                value={targetBedMinute || 0}
                type="number"
                step="1"
                min="0"
                max="59"
                name="minute"
                placeholder="0"
                className="setting__input setting__input-username"
                onChange={({ target: { value } }) =>
                  onChangeTargetBedMinute(value)
                }
              />
              m
            </div>
          </div>
          <button
            className="page-input-box__btn page-input-box__btn-login"
            onClick={onEditTargetTime}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

import "../../css/pages/pages.css";
import { useTargetSettingOnPage } from "../../hooks/user/useTargetSettingOnPage";
export const SettingPage = ({ updateSettingHook }) => {
  //const = {user,history,location } = props;
  // const { onEditTargetTime, targetSetting } = updateSettingHook;
  const {
    displayObj,
    onChangeTargetWorkTime,
    onChangeTargetWakeHour,
    onChangeTargetBedHour,
    onChangeTargetWakeMinute,
    onChangeTargetBedMinute,
    onEditTargetTime,
  } = useTargetSettingOnPage(updateSettingHook);
  return (
    <section className="page">
      <div className="page-input-box">
        <h1 className="setting-title">Setting Page</h1>
        <div className="page-input__form setting-box">
          <div className="setting-column">
            <span className="setting__text">TargetWorkTime: </span>
            <div className="setting__input-box">
              <input
                value={displayObj.targetWorkTime}
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
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
                value={displayObj.targetWakeTime.hour}
                className="setting__input setting__input-email"
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
                onChange={({ target: { value } }) =>
                  onChangeTargetWakeHour(value)
                }
              />
              h
              <input
                value={displayObj.targetWakeTime.minute}
                type="number"
                step="1"
                min="0"
                max="59"
                name="minute"
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
                value={displayObj.targetBedTime.hour}
                type="number"
                step="1"
                min="0"
                max="23"
                name="hour"
                className="setting__input setting__input-password"
                onChange={({ target: { value } }) =>
                  onChangeTargetBedHour(value)
                }
              />
              h
              <input
                value={displayObj.targetBedTime.minute}
                type="number"
                step="1"
                min="0"
                max="59"
                name="minute"
                className="setting__input setting__input-username"
                onChange={({ target: { value } }) =>
                  onChangeTargetBedMinute(value)
                }
              />
              m
            </div>
          </div>
        </div>
        <button
          className="page-input-box__btn page-input-box__btn-login"
          onClick={onEditTargetTime}
        >
          Save
        </button>
      </div>
    </section>
  );
};

import "../../css/pages/pages.css";
import { useEditSetting } from "../../hooks/user/useEditSetting";
export const SettingPage = (props) => {
  //const = {user,history,location } = props;
  const {
    targetWorkTime,
    targetWakeTime,
    targetBedTime,
    onChangeTargetWorkTime,
    onChangeTargetWakeTime,
    onChangeTargetBedTime,
    onEditTargetTime,
  } = useEditSetting(props);
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
                value={targetWakeTime || 0}
                className="setting__input setting__input-email"
                type="number"
                onChange={({ target: { value } }) =>
                  onChangeTargetWakeTime(value)
                }
              />
              h
            </div>
          </div>
          <div className="setting-column">
            <span className="setting__text">TargetBedTime: </span>
            <div className="setting__input-box">
              <input
                value={targetBedTime || 0}
                type="number"
                className="setting__input setting__input-password"
                onChange={({ target: { value } }) =>
                  onChangeTargetBedTime(value)
                }
              />
              h
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

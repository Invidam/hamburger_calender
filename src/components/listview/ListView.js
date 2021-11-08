import {
  ARRAY_LENGTH,
  DISPLAY_LENGTH,
  useListView,
} from "../../hooks/listView/useListView";
import "../../css/listView/listView.css";
import { View } from "./View";
import { getAddedDateObj, getAddedDateStr, getToday } from "../../tools/time";
import { LoadingElement } from "../Loading";
import { EmptyView } from "./EmptyView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { LocalStroage } from "../../tools/LocalStorage";

const leftCaret = <FontAwesomeIcon icon={faCaretLeft} size="5x" />;
const rightCaret = <FontAwesomeIcon icon={faCaretRight} size="5x" />;
export const ListView = ({ user, date, setDate, listViewHook }) => {
  const {
    isListViewLoading,
    startDate,
    listView,
    onClickRightBtn,
    onClickLeftBtn,
  } = listViewHook;
  return isListViewLoading ? (
    <LoadingElement text={"WorkList Loading. . ."} />
  ) : (
    <ol
      className={
        isListViewLoading ? "listView-list listView-loading" : "listView-list"
      }
    >
      <li
        className={`listView-element listView-element__btn ${
          isListViewLoading ? "listView-loading" : ""
        }`}
        onClick={onClickLeftBtn}
        // disabled={isListViewLoading}
      >
        <span className={`listView-element__btn-text`}>{leftCaret} </span>
      </li>
      {listView
        ? listView.map((view, idx) => {
            console.log("LV TEST", listView, view);
            const viewDate = getAddedDateStr(
              startDate,
              idx + Math.floor((ARRAY_LENGTH - DISPLAY_LENGTH) / 2)
            );
            return (
              <li
                className={`listView-element ${
                  isListViewLoading ? "listView-loading" : ""
                }${
                  LocalStroage.date().get().clickedDate === viewDate
                    ? "listView-element__clickedDate"
                    : ""
                }${getToday() === viewDate ? "listView-element__today" : ""}`}
                key={idx}
              >
                {view ? (
                  <View
                    viewObj={view}
                    setDate={setDate}
                    isLoad={isListViewLoading}
                    viewDate={viewDate}
                  />
                ) : (
                  <EmptyView
                    viewObj={view}
                    setDate={setDate}
                    isLoad={isListViewLoading}
                    viewDate={viewDate}
                  />
                )}
              </li>
            );
          })
        : "NO"}
      <li
        className={`listView-element listView-element__btn ${
          isListViewLoading ? "listView-loading" : ""
        }`}
        onClick={onClickRightBtn}
        disabled={isListViewLoading}
      >
        <span className="listView-element__btn-text">{rightCaret}</span>
      </li>
    </ol>
  );
  return <h2> List View </h2>;
  // startDate 바꾸기
  // date 바꾸기 (setDate 상위 state의)
  // refresh 하기
};

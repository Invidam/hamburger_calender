import {
  ARRAY_LENGTH,
  DISPLAY_LENGTH,
  useListView,
} from "../../hooks/listView/useListView";
import "../../css/listView/listView.css";
import { View } from "./View";
import { getAddedDateObj, getAddedDateStr } from "../../tools/time";
import { LoadingElement } from "../Loading";
import { EmptyView } from "./EmptyView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const leftCaret = <FontAwesomeIcon icon={faCaretLeft} size="5x" />;
const rightCaret = <FontAwesomeIcon icon={faCaretRight} size="5x" />;
export const ListView = ({ user, date, setDate, workList }) => {
  const {
    isListViewLoading,
    startDate,
    listView,
    onClickRightBtn,
    onClickLeftBtn,
  } = useListView(user, date, setDate, workList);
  return (
    <ol className="listView-list">
      <li
        className="listView-element listView-element__btn"
        onClick={onClickLeftBtn}
        // disabled={isListViewLoading}
      >
        <span className="listView-element__btn-text">{leftCaret} </span>
      </li>
      {listView
        ? listView.map((view, idx) => {
            return (
              <li className="listView-element" key={idx}>
                {view ? (
                  <View
                    viewObj={view}
                    setDate={setDate}
                    isLoad={isListViewLoading}
                    viewDate={getAddedDateStr(
                      startDate,
                      idx + Math.floor((ARRAY_LENGTH - DISPLAY_LENGTH) / 2)
                    )}
                  />
                ) : (
                  <EmptyView
                    viewObj={view}
                    setDate={setDate}
                    isLoad={isListViewLoading}
                    viewDate={getAddedDateStr(
                      startDate,
                      idx + Math.floor((ARRAY_LENGTH - DISPLAY_LENGTH) / 2)
                    )}
                  />
                )}
              </li>
            );
          })
        : "NO"}
      <li
        className="listView-element listView-element__btn"
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

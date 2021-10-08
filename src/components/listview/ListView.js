import { useListView } from "../../hooks/listView/useListView";
import "../../css/listView/listView.css";
export const ListView = ({ user, date, setDate }) => {
  const {
    isListViewLoading,
    startDate,
    listView,
    onClickAddBtn,
    onClickSubtractBtn,
  } = useListView(user, date, setDate);
  return (
    <ol className="listView-list">
      <li className="listView-element" onClick={onClickSubtractBtn}>
        ◀
      </li>
      <li className="listView-element" onClick={onClickAddBtn}>
        test
      </li>
      <li className="listView-element" onClick={onClickAddBtn}>
        ▶
      </li>
    </ol>
  );
  return <h2> List View </h2>;
  // startDate 바꾸기
  // date 바꾸기 (setDate 상위 state의)
  // refresh 하기
};

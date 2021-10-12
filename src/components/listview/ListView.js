import { useListView } from "../../hooks/listView/useListView";
import "../../css/listView/listView.css";
export const ListView = ({ user, date, setDate }) => {
  const {
    isListViewLoading,
    startDate,
    listView,
    onClickRightBtn,
    onClickLeftBtn,
  } = useListView(user, date, setDate);
  return (
    <ol className="listView-list">
      <li className="listView-element" onClick={onClickLeftBtn}>
        ◀
      </li>
      <li className="listView-element" onClick={onClickRightBtn}>
        test
      </li>
      {JSON.stringify(listView)}
      <li className="listView-element" onClick={onClickRightBtn}>
        ▶
      </li>
    </ol>
  );
  return <h2> List View </h2>;
  // startDate 바꾸기
  // date 바꾸기 (setDate 상위 state의)
  // refresh 하기
};

import ReactLoading from "react-loading";
import "../css/element/loading.css";
export const LoadingElement = ({ text }) => (
  <div className="loading">
    <div className="loading-bar">{LoadingContent}</div>
    <h1 className="loading__text"> {text}</h1>
  </div>
);

const LoadingContent = (
  <ReactLoading
    type={"spinningBubbles"}
    height={"10em"}
    width={"10em"}
    color={"#663333"}
  ></ReactLoading>
);
export const LoadingElementSmall = ({ text }) => (
  <div className="loading-small">
    <div className="loading-bar-small">{LoadingContentSmall}</div>
    <h1 className="loading__text-small"> {text}</h1>
  </div>
);

const LoadingContentSmall = (
  <ReactLoading
    type={"spinningBubbles"}
    height={"2em"}
    width={"2em"}
    color={"#663333"}
  ></ReactLoading>
);

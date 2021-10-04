import ReactLoading from "react-loading";
import "../css/element/loading.css";
export const LoadingElement = ({ text }) => (
  <section className="loading">
    <div className="loading-bar">{LoadingContent}</div>
    <h1 className="loading__text"> {text}</h1>
  </section>
);

const LoadingContent = (
  <ReactLoading
    type={"spinningBubbles"}
    height={"10em"}
    width={"10em"}
    color={"#663333"}
  ></ReactLoading>
);

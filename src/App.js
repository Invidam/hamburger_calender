// import logo from './logo.svg';
import axios from "axios";
import "./App.css";
import { WorkListTemplate } from "./components/worklist/WorkListTemplate";
import { useAxios } from "./hooks/useAxios";

function App() {
  return (
    <main>
      <article>test</article>
      <article>
        <WorkListTemplate />
      </article>
    </main>
  );
}

export default App;

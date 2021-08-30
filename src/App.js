// import logo from './logo.svg';
import "./App.css";
import { WorkListComponent } from "./components/worklist/workListComponent";
import { WorkListTemplate } from "./components/worklist/WorkListTemplate";

function App() {
  return (
    <main>
      <article>test</article>
      <article>
        <WorkListComponent />
        {/* <WorkListTemplate /> */}
      </article>
    </main>
  );
}

export default App;

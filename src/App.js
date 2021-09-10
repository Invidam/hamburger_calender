// import logo from './logo.svg';
import axios from "axios";
import "./App.css";
import { WorkListTemplate } from "./components/worklist/WorkListTemplate";
import { useAxios } from "./hooks/useAxios";

function App() {
  const { loading, data, error, refetch } = useAxios({
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    method: "post",
    url: "/api/world",
    data: { test: "TEST" },
  });
  console.log("STATE: ", JSON.parse(data?.config.data));
  return (
    <main>
      <article>
        test
        {/* axios.post("http") */}
        {`load: ${loading} 
        data: ${data.config.data} 
        
        error: ${error}`}
        <button onClick={refetch}> CLICK </button>
      </article>
      <article>
        <WorkListTemplate />
      </article>
    </main>
  );
}

export default App;

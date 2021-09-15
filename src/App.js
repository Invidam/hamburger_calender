// import logo from './logo.svg';
import axios from "axios";
import { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";
import { WorkListTemplate } from "./components/worklist/WorkListTemplate";
import { useAxios } from "./hooks/useAxios";
// import "react-calendar/dist/Calendar.css";
import "./css/calendar.css";

function App() {
  const [value, onChange] = useState(new Date());
  const clickDay = (event, value) => alert("Clicked day: ", value);
  const changeFormatYYYYMMDD = (date) => date.toISOString().slice(0, 10);
  const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  return (
    <main>
      <header>
        <h1>Hamburger App</h1>
        {changeFormatYYYYMMDD(value)}
      </header>
      <section>
        <article>
          <Calendar
            className="caldendar"
            onChange={onChange}
            value={value}
            locale={"en"}
            calendarType={"US"}
            onClickDay={(value, event) =>
              console.log("Clic123ked day: ", value)
            }
            tileClassName={({ date, view }) => {
              console.log(date);
              if (
                mark.find(
                  (markedDate) => markedDate === changeFormatYYYYMMDD(date)
                )
              )
                return "highlight";
              //data: Sun Sep 12 2021 00:00:00 GMT+0900 (한국 표준시)
              // if (mark.find((x) => x === date.format("DD-MM-YYYY"))) {
              //   return "highlight";
              // }
            }}
            //DB에 있는 날짜는 체크표시 해야함.
          />
        </article>
        <article>
          <WorkListTemplate date={value} />
        </article>
      </section>
      <footer>footer</footer>
    </main>
  );
}

export default App;

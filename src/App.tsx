import {DateRangePicker} from "./components";

function App() {
  return (
    <div className="mainContainer">
      <DateRangePicker
        startDate={new Date("2023-02-17")}
        endDate={new Date("2022-03-28")}
      />
    </div>
  );
}

export default App;

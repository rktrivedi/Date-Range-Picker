import {DateRangePicker} from "./components";

function App() {
  return (
    <div className="mainContainer">
      <DateRangePicker
        startDate={new Date("2024-02-06")}
        endDate={new Date("2024-03-31")}
      />
    </div>
  );
}

export default App;

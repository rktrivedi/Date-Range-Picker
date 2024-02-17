import {DateRangePicker} from "./components";

function App() {
  return (
    <div className="mainContainer">
      <DateRangePicker
        // startDate={new Date("2024-02-06")}
        // endDate={new Date("2024-02-26")}
        onChange={(range) => {
          console.log(range);
        }}
      />
    </div>
  );
}

export default App;

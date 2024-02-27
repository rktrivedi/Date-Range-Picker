import React, {useState} from "react";
import {DateRangePicker} from "../DateRangePicker";

const OpenButton = () => {
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

  const handleToggleDateRangePicker = () => {
    setIsDateRangePickerOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        className={isDateRangePickerOpen ? "closeButton" : "openButton"}
        onClick={handleToggleDateRangePicker}
      >
        {isDateRangePickerOpen
          ? "📅 Close Date Range Selector"
          : "📅 Open Date Range Selector"}
      </button>

      {isDateRangePickerOpen && (
        <DateRangePicker
          // startDate={new Date("2024-02-06")}
          // endDate={new Date("2024-02-26")}
          onChange={(range) => {
            console.log(range);
          }}
        />
      )}
    </div>
  );
};

export default OpenButton;

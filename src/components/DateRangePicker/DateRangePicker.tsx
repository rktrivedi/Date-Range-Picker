import React from "react";
import style from "./dateRangePicker.module.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Checking Leap Year
const getFirstDateOfMonth = (startDate: Date) =>
  new Date(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-01`);

const getCalendarDate = (
  rowIndex: number,
  colIndex: number,
  startDateIdx: number,
  numberOfDays: number
) => {
  // First Row of Calendar Month
  if (rowIndex === 0) {
    if (colIndex === startDateIdx) {
      return "1";
    }
    if (colIndex < startDateIdx) {
      return "";
    }
    if (colIndex > startDateIdx) {
      return colIndex - startDateIdx + 1;
    }
  }

  const daysInFistWeek = 7 - startDateIdx;
  const weekOffset = (rowIndex - 1) * 7;
  const currentDayOfWeek = colIndex + 1;
  const currentDateOfMonth = daysInFistWeek + weekOffset + currentDayOfWeek;
  return currentDateOfMonth <= numberOfDays ? currentDateOfMonth : "";
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
}) => {
  console.log(startDate, endDate, "date");
  const currentYear = startDate.getFullYear();
  const isLeapYear = currentYear % 4 === 0;
  const numberOfDays = isLeapYear
    ? daysInLeapYear[startDate.getMonth()]
    : daysInMonth[startDate.getMonth()];

  const firtsDateOfMonth = getFirstDateOfMonth(startDate).getDay();

  return (
    <div className={style.calendarWrapper}>
      {startDate.toDateString()}
      <div className={style.calendarHeader}>
        {[...new Array(7)].map((_, idx) => (
          <div className={style.calendarColumn} key={`calendarHeader${idx}`}>
            {daysOfWeek[idx]}
          </div>
        ))}
      </div>
      {
        [...new Array(5)].map((_, rowIdx) => (
          <div key={`row${rowIdx}`} className={style.calendarRow}>
            {[...new Array(7)].map((_, colIdx) => (
              <div
                className={`${style.calendarColumn} ${
                  getCalendarDate(
                    rowIdx,
                    colIdx,
                    firtsDateOfMonth,
                    numberOfDays
                  ) === startDate.getDate()
                    ? style.activestartDate
                    : ""
                }`}
                key={`column${colIdx}`}
              >
                {getCalendarDate(
                  rowIdx,
                  colIdx,
                  firtsDateOfMonth,
                  numberOfDays
                )}
              </div>
            ))}
          </div>
        ))
        // row and column
        // start date -> month -> first day
        // start date -> month -> days
        // start date -> week -> number
      }
    </div>
  );
};

export {DateRangePicker};

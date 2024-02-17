import React from "react";
import style from "./dateRangePicker.module.css";
import {
  daysInLeapYear,
  daysInMonth,
  months,
  daysOfWeek,
  getActiveClass,
  getCalendarDate,
  getFirstDateOfMonth,
  parseEndDate,
  parseStartDate,
} from "./helper";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: start,
  endDate: end,
}) => {
  const startDate = parseStartDate(start);
  const endDate = parseEndDate(end);
  const currentYear = startDate.getFullYear();
  const isLeapYear = currentYear % 4 === 0;
  const numberOfDays = isLeapYear
    ? daysInLeapYear[startDate.getMonth()]
    : daysInMonth[startDate.getMonth()];

  const firtsDateOfMonth = getFirstDateOfMonth(startDate).getDay();
  const startYear = startDate.getFullYear() - 25;

  return (
    <div className={style.calendarWrapper}>
      <div className={style.yearMonthDate}>
        {startDate.toDateString()}
        <div className={style.yearMonth}>
          <select>
            <option>Year</option>
            {[...new Array(50)].map((_, idx) => (
              <option
                value={startYear + idx}
                selected={startYear + idx === startDate.getFullYear()}
              >
                {startYear + idx}
              </option>
            ))}
          </select>
          <select>
            <option>Month</option>
            {months.map((month, idx) => {
              return (
                <option value={idx} selected={idx === startDate.getMonth()}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className={style.calendarHeader}>
        {[...new Array(7)].map((_, idx) => (
          <div className={style.calendarColumn} key={`calendarHeader${idx}`}>
            {daysOfWeek[idx]}
          </div>
        ))}
      </div>
      {[...new Array(5)].map((_, rowIdx) => (
        <div key={`row${rowIdx}`} className={style.calendarRow}>
          {[...new Array(7)].map((_, colIdx) => (
            <div
              className={`${style.calendarColumn} ${getActiveClass(
                rowIdx,
                colIdx,
                firtsDateOfMonth,
                numberOfDays,
                startDate,
                endDate
              )}`}
              key={`column${colIdx}`}
            >
              {getCalendarDate(rowIdx, colIdx, firtsDateOfMonth, numberOfDays)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export {DateRangePicker};

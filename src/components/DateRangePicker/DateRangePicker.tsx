import React, {useState} from "react";
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
  const [year, setYear] = useState(startDate.getFullYear());
  const [month, setMonth] = useState(startDate.getMonth());
  const isLeapYear = year % 4 === 0;
  const numberOfDays = isLeapYear ? daysInLeapYear[month] : daysInMonth[month];

  const firtsDateOfMonth = getFirstDateOfMonth(year, month).getDay();
  const startYear = startDate.getFullYear() - 25;

  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = e.target.value;
    if (yearValue) {
      setYear(Number(e.target.value));
    }
  };
  const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = e.target.value;
    if (monthValue) {
      setMonth(Number(e.target.value));
    }
  };

  return (
    <div className={style.calendarWrapper}>
      <div className={style.yearMonthDate}>
        {startDate.toDateString()}
        <div className={style.yearMonth}>
          <select onChange={handleYear} defaultValue={year}>
            <option value="">Year</option>
            {[...new Array(50)].map((_, idx) => (
              <option value={startYear + idx} key={`year${idx}`}>
                {startYear + idx}
              </option>
            ))}
          </select>
          <select onChange={handleMonth} defaultValue={month}>
            <option value="">Month</option>
            {months.map((value, idx) => {
              return (
                <option value={idx} key={`month${idx}`}>
                  {value}
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
      {[...new Array(6)].map((_, rowIdx) => (
        <div key={`row${rowIdx}`} className={style.calendarRow}>
          {[...new Array(7)].map((_, colIdx) => (
            <div
              className={`${style.calendarColumn} ${getActiveClass(
                rowIdx,
                colIdx,
                firtsDateOfMonth,
                numberOfDays,
                startDate,
                endDate,
                month,
                year
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

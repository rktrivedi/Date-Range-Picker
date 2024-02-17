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
  parseDate,
  getDateString,
  getWeekends,
} from "./helper";

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (range: [[string, string], string[]]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: start,
  endDate: end,
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    parseStartDate(start)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(parseEndDate(end));
  const [year, setYear] = useState(
    startDate?.getFullYear() || new Date().getFullYear()
  );
  const [month, setMonth] = useState(
    startDate?.getMonth() || new Date().getMonth()
  );
  const isLeapYear = year % 4 === 0;
  const numberOfDays = isLeapYear ? daysInLeapYear[month] : daysInMonth[month];

  const firtsDateOfMonth = getFirstDateOfMonth(year, month).getDay();
  const startYear = 1990;

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

  const handleClick = (value: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(value);
      setEndDate(undefined);
    } else if (value > startDate) {
      setEndDate(value);
      onChange?.([
        [getDateString(startDate), getDateString(value)],
        getWeekends(startDate, value),
      ]);
    }
  };

  const handleRange = (day: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - day);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className={style.calendarWrapper}>
      <div className={style.yearMonthDate}>
        <span>{startDate?.toDateString()}</span>
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
                month,
                year,
                startDate,
                endDate
              )}`}
              key={`column${colIdx}`}
              onClick={() => {
                if ([0, 6].includes(colIdx)) {
                  return;
                }
                handleClick(
                  parseDate(
                    Number(
                      getCalendarDate(
                        rowIdx,
                        colIdx,
                        firtsDateOfMonth,
                        numberOfDays
                      )
                    ),
                    month,
                    year
                  )
                );
              }}
            >
              {getCalendarDate(rowIdx, colIdx, firtsDateOfMonth, numberOfDays)}
            </div>
          ))}
        </div>
      ))}
      <div>
        <button onClick={() => handleRange(7)}>Last 7 Days</button>
        <button onClick={() => handleRange(30)}>Last 30 Days </button>
      </div>
    </div>
  );
};

export {DateRangePicker};

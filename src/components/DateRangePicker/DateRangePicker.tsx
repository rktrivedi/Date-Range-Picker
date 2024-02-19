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
  const [startYear, setStartYear] = useState(
    startDate?.getFullYear() || new Date().getFullYear()
  );
  const [startMonth, setStartMonth] = useState(
    startDate?.getMonth() || new Date().getMonth()
  );
  const [endYear, setEndYear] = useState(
    endDate?.getFullYear() || new Date().getFullYear()
  );
  const [endMonth, setEndMonth] = useState(
    endDate?.getMonth() || new Date().getMonth() + 1
  ); // Added +1 to show next month in the second calendar
  const isLeapYear = startYear % 4 === 0;
  const numberOfDaysStart = isLeapYear
    ? daysInLeapYear[startMonth]
    : daysInMonth[startMonth];
  const numberOfDaysEnd = isLeapYear
    ? daysInLeapYear[endMonth]
    : daysInMonth[endMonth];

  const firstDateOfMonthStart = getFirstDateOfMonth(
    startYear,
    startMonth
  ).getDay();
  const firstDateOfMonthEnd = getFirstDateOfMonth(endYear, endMonth).getDay();
  const initialYear = 2024;

  const handleStartYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = e.target.value;
    if (yearValue) {
      setStartYear(Number(yearValue) || startYear);
    }
  };
  const handleStartMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = e.target.value;
    if (monthValue) {
      setStartMonth(Number(monthValue) || startMonth);
    }
  };

  const handleEndYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = e.target.value;
    if (yearValue) {
      setEndYear(Number(yearValue) || endYear);
    }
  };

  const handleEndMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = e.target.value;
    if (monthValue) {
      setEndMonth(Number(monthValue) || endMonth);
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
    const processedStartDate = parseStartDate(startDate);
    const processedEndDate = parseEndDate(endDate);
    const processedStartMonth = processedStartDate?.getMonth() ?? startMonth;
    const processedEndMonth = processedEndDate?.getMonth() ?? endMonth;
    setEndMonth(processedEndMonth);
    setStartMonth(
      processedEndMonth === processedStartMonth
        ? processedEndMonth - 1
        : processedStartMonth
    );
    setEndYear(processedEndDate?.getFullYear() || endYear);
    setStartYear(processedStartDate?.getFullYear() || startYear);
    setStartDate(processedStartDate);
    setEndDate(processedEndDate);
    if (processedStartDate && processedEndDate) {
      onChange?.([
        [getDateString(processedStartDate), getDateString(processedEndDate)],
        getWeekends(processedStartDate, processedEndDate),
      ]);
    }
  };

  return (
    <div className={style.calendarWrapper}>
      <div className={style.mainContainer}>
        <div className={style.heading}>
          {(startDate && <span>{getDateString(startDate)}</span>) ||
            "Start Date"}
          &emsp;-&emsp;
          {(endDate && <span>{getDateString(endDate)}</span>) || "End Date"}
        </div>
        <div className={style.box1}>
          <div className={style.dropDown}>
            <div className={style.yearMonthDate}>
              <select onChange={handleStartYear} value={startYear}>
                <option value="">Year</option>

                {[...new Array(30)].map((_, idx) => (
                  <option value={initialYear + idx} key={`startYear${idx}`}>
                    {initialYear + idx}
                  </option>
                ))}
              </select>
              <select onChange={handleStartMonth} value={startMonth}>
                <option value="">Month</option>
                {months.map((value, idx) => {
                  return (
                    <option value={idx} key={`startMonth${idx}`}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={style.daysOfWeek}>
            <div className={style.calendarHeader}>
              {[...new Array(7)].map((_, idx) => (
                <div
                  className={style.calendarColumn}
                  key={`startCalendarHeader${idx}`}
                >
                  {daysOfWeek[idx]}
                </div>
              ))}
            </div>
          </div>
          <div className={style.calendarDates}>
            {[...new Array(6)].map((_, rowIdx) => (
              <div key={`startRow${rowIdx}`} className={style.calendarRow}>
                {[...new Array(7)].map((_, colIdx) => (
                  <div
                    className={`${style.calendarColumn} ${getActiveClass(
                      rowIdx,
                      colIdx,
                      firstDateOfMonthStart,
                      numberOfDaysStart,
                      startMonth,
                      startYear,
                      startDate,
                      endDate
                    )}`}
                    key={`startColumn${colIdx}`}
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
                              firstDateOfMonthStart,
                              numberOfDaysStart
                            )
                          ),
                          startMonth,
                          startYear
                        )
                      );
                    }}
                  >
                    {getCalendarDate(
                      rowIdx,
                      colIdx,
                      firstDateOfMonthStart,
                      numberOfDaysStart
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={style.seperator}></div>
        <div className={style.box2}>
          <div className={style.dropDown}>
            <div className={style.yearMonthDate}>
              <select onChange={handleEndYear} value={endYear}>
                <option value="">Year</option>

                {[...new Array(30)].map((_, idx) => (
                  <option value={initialYear + idx} key={`endYear${idx}`}>
                    {initialYear + idx}
                  </option>
                ))}
              </select>
              <select onChange={handleEndMonth} value={endMonth}>
                <option value="">Month</option>
                {months.map((value, idx) => {
                  return (
                    <option value={idx} key={`endMonth${idx}`}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={style.daysOfWeek}>
            <div className={style.calendarHeader}>
              {[...new Array(7)].map((_, idx) => (
                <div
                  className={style.calendarColumn}
                  key={`endCalendarHeader${idx}`}
                >
                  {daysOfWeek[idx]}
                </div>
              ))}
            </div>
          </div>
          <div className={style.calendarDates}>
            {[...new Array(6)].map((_, rowIdx) => (
              <div key={`endRow${rowIdx}`} className={style.calendarRow}>
                {[...new Array(7)].map((_, colIdx) => (
                  <div
                    className={`${style.calendarColumn} ${getActiveClass(
                      rowIdx,
                      colIdx,
                      firstDateOfMonthEnd,
                      numberOfDaysEnd,
                      endMonth,
                      endYear,
                      startDate,
                      endDate
                    )}`}
                    key={`endColumn${colIdx}`}
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
                              firstDateOfMonthEnd,
                              numberOfDaysEnd
                            )
                          ),
                          endMonth,
                          endYear
                        )
                      );
                    }}
                  >
                    {getCalendarDate(
                      rowIdx,
                      colIdx,
                      firstDateOfMonthEnd,
                      numberOfDaysEnd
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={style.buttons}>
          <button onClick={() => handleRange(7)}>Last 7 Days</button>
          <button onClick={() => handleRange(30)}>Last 30 Days </button>
        </div>
      </div>
    </div>
  );
};

export {DateRangePicker};

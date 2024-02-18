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

  const handleStartYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = e.target.value;
    if (yearValue) {
      setStartYear(Number(e.target.value));
    }
  };
  const handleStartMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = e.target.value;
    if (monthValue) {
      setStartMonth(Number(e.target.value));
    }
  };

  const handleEndYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = e.target.value;
    if (yearValue) {
      setEndYear(Number(e.target.value));
    }
  };

  const handleEndMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = e.target.value;
    if (monthValue) {
      setEndMonth(Number(e.target.value));
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
    setStartDate(parseStartDate(startDate));
    setEndDate(parseEndDate(endDate));
  };

  return (
    <div className={style.calendarWrapper}>
      <div className={style.mainContainer}>
        <div className={style.heading}>
          {startDate && endDate && (
            <span>{`${getDateString(startDate)} - ${getDateString(
              endDate
            )}`}</span>
          )}
        </div>
        <div className={style.box1}>
          <div className={style.dropDown}>
            <div className={style.yearMonthDate}>
              <select onChange={handleStartYear} defaultValue={startYear}>
                <option value="">Year</option>

                {[...new Array(50)].map((_, idx) => (
                  <option value={startYear + idx} key={`year${idx}`}>
                    {startYear + idx}
                  </option>
                ))}
              </select>
              <select onChange={handleStartMonth} defaultValue={startMonth}>
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
                    key={`startcolumn${colIdx}`}
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
            <div className={style.yearMonth}>
              <select onChange={handleEndYear} defaultValue={startYear}>
                <option value="">Year</option>

                {[...new Array(50)].map((_, idx) => (
                  <option value={startYear + idx} key={`endYear${idx}`}>
                    {startYear + idx}
                  </option>
                ))}
              </select>
              <select onChange={handleEndMonth} defaultValue={startMonth}>
                <option value="">Month</option>
                {months.map((value, idx) => {
                  return (
                    <option value={idx} key={`endmonth${idx}`}>
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
                  key={`endcalendarHeader${idx}`}
                >
                  {daysOfWeek[idx]}
                </div>
              ))}
            </div>
          </div>
          <div className={style.calendarDates}>
            {[...new Array(6)].map((_, rowIdx) => (
              <div key={`row${rowIdx}`} className={style.calendarRow}>
                {[...new Array(7)].map((_, colIdx) => (
                  <div
                    className={`${style.calendarColumn} ${getActiveClass(
                      rowIdx,
                      colIdx,
                      firstDateOfMonthEnd,
                      numberOfDaysEnd,
                      startMonth,
                      startYear,
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

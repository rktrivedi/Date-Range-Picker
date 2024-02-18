import style from "./dateRangePicker.module.css";

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const getFirstDateOfMonth = (year: number, month: number) =>
  new Date(`${year}-${month + 1}-01`);

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

const getActiveClass = (
  rowIndex: number,
  colIndex: number,
  startDateIdx: number,
  numberOfDays: number,
  month: number,
  year: number,
  startDate?: Date,
  endDate?: Date
) => {
  const getDate = getCalendarDate(
    rowIndex,
    colIndex,
    startDateIdx,
    numberOfDays
  );
  const currDate = new Date(`${year}-${month + 1}-${getDate}`);

  if (currDate.getDay() === 0 || currDate.getDay() === 6 || getDate === "") {
    return "";
  }

  if (
    currDate.toString() === startDate?.toString() ||
    currDate.toString() === endDate?.toString()
  ) {
    return style.activestartDate;
  } else if (
    startDate &&
    endDate &&
    currDate > startDate &&
    currDate < endDate
  ) {
    return style.rangeSelector;
  } else {
    return "";
  }
};

const parseStartDate = (startDate?: Date) => {
  if (!startDate) {
    return;
  }
  const day = startDate.getDay();
  const offset = day === 0 ? 1 : day === 6 ? 2 : 0;
  return new Date(
    `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${
      startDate.getDate() + offset
    }`
  );
};

const parseEndDate = (endDate?: Date) => {
  if (!endDate) {
    return;
  }
  const day = endDate.getDay();
  const offset = day === 0 ? 2 : day === 6 ? 1 : 0;
  return new Date(
    `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${
      endDate.getDate() - offset
    }`
  );
};

const parseDate = (date: number, month: number, year: number): Date =>
  new Date(`${year}-${month + 1}-${date}`);

const getDateString = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

const getWeekends = (startDate: Date, endDate: Date) => {
  var weekendDates = [];
  while (startDate <= endDate) {
    const weekDay = startDate.getDay();
    if ([0, 6].includes(weekDay)) {
      weekendDates.push(getDateString(startDate));
    }
    var date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    startDate = date;
  }
  return weekendDates;
};

export {
  daysInMonth,
  daysInLeapYear,
  daysOfWeek,
  months,
  getFirstDateOfMonth,
  getActiveClass,
  parseEndDate,
  getCalendarDate,
  parseStartDate,
  parseDate,
  getDateString,
  getWeekends,
};

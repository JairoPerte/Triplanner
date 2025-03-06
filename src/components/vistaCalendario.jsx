import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ selectedDate, setSelectedDate }) => {
  return <Calendar onChange={setSelectedDate} value={selectedDate} />;
};

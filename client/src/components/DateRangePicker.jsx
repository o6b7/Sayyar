import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'lucide-react';

const DateRangePicker = ({ startDate, endDate, onDateChange, minDate, filterDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    const formatDate = (date) => {
      if (!date) return '';
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      return localDate.toISOString().split('T')[0];
    };

    onDateChange({
      startDate: formatDate(start),
      endDate: formatDate(end),
    });

    if (start && end) setShowDatePicker(false);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium text-gray-600 mb-2 block">فترة الحجز</label>

      {/* Input trigger */}
      <button
        type="button"
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-between text-right bg-white focus:ring-2 focus:ring-primary focus:border-primary shadow-sm hover:border-primary transition"
      >
        <span className="truncate">
          {startDate && endDate
            ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`
            : 'اختر فترة الحجز'}
        </span>
        <CalendarIcon className="h-5 w-5 text-gray-500" />
      </button>

      {/* Calendar dropdown */}
      {showDatePicker && (
        <div className="absolute mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-3 right-0">
          <DatePicker
            selected={startDateObj}
            onChange={handleDateChange}
            startDate={startDateObj}
            endDate={endDateObj}
            selectsRange
            inline
            monthsShown={2}
            minDate={minDate || new Date()}
            filterDate={filterDate}
            dateFormat="dd/MM/yyyy"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowDatePicker(false)}
              className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dull transition"
            >
              تأكيد
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'lucide-react';

const DateRangePicker = ({ startDate, endDate, onDateChange, minDate, filterDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        
        // Fix timezone issue by using local date without time component
        const formatDate = (date) => {
            if (!date) return '';
            const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            return localDate.toISOString().split('T')[0];
        };
        
        onDateChange({
            startDate: formatDate(start),
            endDate: formatDate(end)
        });
        
        start && end && setShowDatePicker(false);
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    // Convert string dates to Date objects for the DatePicker
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    return (
        <div className="flex flex-col items-start gap-2 w-full">
            <label className='block text-gray-700 mb-2 text-right'>فترة الحجز</label>
            <div className="relative w-full">
                <button
                    type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4166] focus:border-transparent text-right flex items-center justify-between"
                >
                    <span>
                        {startDate && endDate 
                            ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`
                            : 'اختر فترة الحجز'
                        }
                    </span>
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                </button>
                
                {showDatePicker && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg right-0">
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
                            className="border-0"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateRangePicker;
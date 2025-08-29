export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'غير محدد';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'غير محدد';
    
    const defaultOptions = {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    };
    
    // Change locale from 'ar-SA' to 'en-GB' for Gregorian calendar
    // You can also use 'en-US' if you prefer MM/DD/YYYY format
    return new Intl.DateTimeFormat('en-GB', {
      ...defaultOptions,
      ...options
    }).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'غير محدد';
  }
};

export const calculateDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    const timeDiff = Math.abs(end - start);
    return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  } catch (error) {
    console.error('Date calculation error:', error);
    return 0;
  }
};

export const isDateInPast = (date) => {
  return new Date(date) < new Date();
};
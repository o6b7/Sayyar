import React from 'react'
import { cityList, main_car } from '../assets/assets'
import { Search } from 'lucide-react'
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import DateRangePicker from '../components/DateRangePicker';

const Hero = () => {
  const { 
    pickup_date, 
    set_pickup_date, 
    return_date, 
    set_return_date, 
    pickup_location, 
    set_pickup_location, 
    navigate 
  } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickup_location || !pickup_date || !return_date) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    navigate(`/cars?pickup_location=${pickup_location}&pickup_date=${pickup_date}&return_date=${return_date}`)
  };

  const handleDateChange = ({ startDate, endDate }) => {
    set_pickup_date(startDate);
    set_return_date(endDate);
  };

  return (
    <AnimatedContainer className="min-h-screen flex flex-col items-center justify-center gap-14 bg-light px-4 text-center">
      <AnimatedItem>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          سيارات فاخرة للإيجار!
        </h1>
      </AnimatedItem>

      <AnimatedItem>
        <form 
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-stretch gap-6 bg-white shadow-xl p-6 md:p-8 rounded-2xl w-full max-w-5xl"
        >
          {/* Pickup Location */}
          <div className="flex flex-col w-full md:flex-1">
            <label htmlFor="pickup-location" className="text-sm font-medium text-gray-600 mb-2">
              مكان الإستلام
            </label>
            <select 
              id="pickup-location"
              required 
              value={pickup_location} 
              onChange={(e) => set_pickup_location(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">اختر مكان الاستلام</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col w-full md:flex-1">
            <DateRangePicker
              startDate={pickup_date}
              endDate={return_date}
              onDateChange={handleDateChange}
              minDate={new Date()}
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end w-full md:w-auto">
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3 w-full md:w-auto bg-primary hover:bg-primary-dull text-white rounded-lg shadow-md hover:scale-105 transition"
            >
              <Search className="w-5 h-5" />
              بحث
            </button>
          </div>
        </form>
      </AnimatedItem>

      <AnimatedItem>
        <img 
          src={main_car} 
          alt="car" 
          className="max-h-72 object-contain drop-shadow-lg"
        />
      </AnimatedItem>
    </AnimatedContainer>
  )
}

export default Hero

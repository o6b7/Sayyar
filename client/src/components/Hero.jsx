import React, { useState } from 'react'
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
        <AnimatedContainer className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
            <AnimatedItem>
                <h1 className='text-4xl md:text-5xl font-semibold'>سيارات فاخرة للإيجار!</h1>
            </AnimatedItem>

            <AnimatedItem>
                <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center
                justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
                bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] shadow-2xl' action="">
                    
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-10 ml-0 md:ml-8 w-full'>
                        {/* Pickup Location */}
                        <div className='flex flex-col items-start gap-2 w-full md:w-41'>
                            <label htmlFor="pickup-location" className='text-sm text-gray-500'>مكان الإستلام</label>
                            <select 
                                id="pickup-location"
                                required 
                                value={pickup_location} 
                                onChange={(e) => set_pickup_location(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md'
                            >
                                <option value="">اختر مكان الاستلام</option>
                                {cityList.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Picker */}
                        <DateRangePicker
                            startDate={pickup_date}
                            endDate={return_date}
                            onDateChange={handleDateChange}
                            minDate={new Date()}
                        />

                        <div className='w-full md:w-auto'>
                            <button 
                                type="submit"
                                className="flex items-center justify-center gap-1 px-9 py-3 w-full md:w-auto mt-4 md:mt-0
                                bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer hover:scale-105 duration-200"
                            >
                                <Search className='brightness-300 w-4 h-4'/>
                                بحث
                            </button>
                        </div>
                    </div>
                </form>
            </AnimatedItem>

            <AnimatedItem>
                <img src={main_car} alt="car" className='max-h-70' />
            </AnimatedItem>
        </AnimatedContainer>
    )
}

export default Hero;
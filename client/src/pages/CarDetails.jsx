import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { currency_black } from '../assets/assets';
import { ArrowLeft, CarIcon, CheckIcon, FuelIcon, LocateIcon, UserIcon } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { withErrorHandling } from '../utils/apiErrorHandler';
import DateRangePicker from '../components/DateRangePicker';
import Skeleton from '../components/common/Skeleton';

const CarDetails = () => {
    const { id } = useParams();
    const { cars, axios, token, setShowAuthModal, pickup_date, return_date, set_pickup_date, set_return_date } = useAppContext();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [unavailableDates, setUnavailableDates] = useState([]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const { data } = await axios.get(`/api/user/car/${id}`);
                if (data.success) {
                    setCar(data.car);
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
                // Fallback to local cars array
                const foundCar = cars.find(car => car._id === id);
                if (foundCar) {
                    setCar(foundCar);
                } else {
                    toast.error('السيارة غير موجودة');
                    navigate('/cars');
                }
            }
        };

        fetchCarDetails();
    }, [id, cars, axios, navigate]);


    useEffect(() => {
        if (!car) return;
        
        const fetchUnavailableDates = async () => {
            try {
                const { data } = await axios.get(`/api/booking/unavailable-dates/${car._id}`);
                data.success && setUnavailableDates(data.unavailableDates.map(dateStr => new Date(dateStr)));
            } catch (error) {
                console.error('Error fetching unavailable dates:', error);
            }
        };

        fetchUnavailableDates();
    }, [car, axios]);

    useEffect(() => {
        if (!pickup_date || !return_date) return;
        
        const checkAvailability = async () => {
            try {
                const { data } = await axios.post('/api/booking/check-availability', {
                    carId: car._id,
                    pickup_date,
                    return_date
                });
                
                setIsAvailable(data.isAvailable);
                !data.isAvailable && toast.error('السيارة غير متوفرة في التواريخ المحددة');
            } catch (error) {
                console.error('Error checking availability:', error);
            }
        };

        const pickup = new Date(pickup_date);
        const return_ = new Date(return_date);
        
        if (return_ <= pickup) {
            toast.error('تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء');
            set_return_date('');
            return;
        }
        
        checkAvailability();
    }, [pickup_date, return_date, car, axios, set_return_date]);

    useEffect(() => {
        if (!pickup_date || !return_date || !car) return;
        
        const pickup = new Date(pickup_date);
        const return_ = new Date(return_date);
        
        if (return_ > pickup) {
            const days = Math.ceil((return_ - pickup) / (1000 * 60 * 60 * 24));
            setTotalDays(days);
            setTotalPrice(car.price_per_day * days);
        }
    }, [pickup_date, return_date, car]);

    const isDateUnavailable = (date) => {
        return unavailableDates.some(unavailableDate => 
            date.toDateString() === unavailableDate.toDateString()
        );
    };

    const filterDate = (date) => {
        return date >= new Date().setHours(0, 0, 0, 0) && !isDateUnavailable(date);
    };

    const handleDateChange = ({ startDate, endDate }) => {
        set_pickup_date(startDate);
        set_return_date(endDate);
    };

    const handleBooking = async () => {
        if (!token) return setShowAuthModal(true);
        if (!pickup_date || !return_date) return toast.error('يرجى اختيار تاريخ البدء والانتهاء');

        setLoading(true);
        await withErrorHandling(
            () => axios.post('/api/booking/create', { car: car._id, pickup_date, return_date }),
            (data) => {
                toast.success(data.message);
                navigate('/my-bookings');
            }
        );
        setLoading(false);
    };

    if (!car) return <Skeleton type='carDetails' />;
    
    const carSpecs = [
        {icon: <UserIcon className="w-5 h-5"/>, text: `${car.seating_capacity} مقاعد`},
        {icon: <FuelIcon className="w-5 h-5"/>, text: car.fuel_type},
        {icon: <LocateIcon className="w-5 h-5"/>, text: car.location},
        {icon: <CarIcon className="w-5 h-5"/>, text: car.transmission},
    ];


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className='px-4 md:px-8 lg:px-12 xl:px-16 py-12 max-w-7xl mx-auto'>
                <AnimatedItem className="group flex items-center gap-2 mb-8 text-gray-600 hover:text-[#1B4166] transition-all duration-300">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2">
                        <ArrowLeft className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:opacity-100 opacity-80"/>
                        <span className="text-sm md:text-base transition-all duration-300 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                            رجوع لصفحة السيارات
                        </span>
                    </button>
                </AnimatedItem>
                
                <AnimatedContainer className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-sm'>
                    <div className='lg:col-span-2'>
                        <AnimatedItem whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
                            <img src={car.image} alt={`${car.brand} ${car.model}`} className='w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-md'/>
                        </AnimatedItem>
                        
                        <AnimatedContainer className='space-y-8'>
                            <AnimatedItem className='text-right'>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{car.brand} {car.model}</h1>
                                <p className="text-gray-500 text-lg mt-1">{car.category} | {car.year}</p>
                            </AnimatedItem>
                            
                            <AnimatedItem className='border-t border-gray-200'/>
                            
                            <AnimatedContainer className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                {carSpecs.map(({icon, text}) => (
                                    <AnimatedItem key={text} whileHover={{ y: -3 }} className='flex flex-col items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-[#1B4166] transition-colors duration-200'>
                                        <div className='text-[#1B4166] mb-2'>{icon}</div>
                                        <span className='text-sm md:text-base'>{text}</span>
                                    </AnimatedItem>
                                ))}
                            </AnimatedContainer>
                            
                            <AnimatedItem className='text-right'>
                                <h2 className='text-xl font-medium mb-4 text-gray-800'>الوصف</h2>
                                <p className='text-gray-600 leading-relaxed'>{car.description}</p>
                            </AnimatedItem>

                            <AnimatedItem className='text-right'>
                                <h2 className='text-xl font-medium mb-4 text-gray-800'>المميزات</h2>
                                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    {car.features?.length > 0 ? (
                                        car.features.map((item) => (
                                            <AnimatedItem key={item} whileHover={{ x: 5 }} className='flex items-center justify-start text-gray-600 hover:text-[#1B4166] transition-colors duration-200'>
                                                <CheckIcon className='h-4 w-4 text-green-500 mr-2'/>
                                                <span>{item}</span>
                                            </AnimatedItem>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">لا توجد مميزات مضافة</p>
                                    )}
                                </ul>
                            </AnimatedItem>
                        </AnimatedContainer>
                    </div>
                    
                    <AnimatedItem className='bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-8' whileHover={{ scale: 1.02 }}>
                        <div className='text-right space-y-6'>
                            <h3 className='text-xl font-bold text-gray-800'>حجز السيارة</h3>
                            
                            <div className='flex items-center justify-end gap-1'>
                                <span className='text-gray-600'>السعر اليومي:</span>
                                <span className='font-medium'>{car.price_per_day?.toLocaleString()}</span>
                                <img src={currency_black} alt="ريال" className='w-4 h-4' />
                            </div>
                            
                            <div className='space-y-4'>
                                <DateRangePicker
                                    startDate={pickup_date}
                                    endDate={return_date}
                                    onDateChange={handleDateChange}
                                    minDate={new Date()}
                                    filterDate={filterDate}
                                />
                            </div>
                            
                            <AnimatedItem whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <button onClick={handleBooking} disabled={!pickup_date || !return_date || loading || !isAvailable} className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg ${!isAvailable ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-[#1B4166] hover:bg-[#0D2E4D] text-white'}`}>
                                    {!isAvailable ? 'غير متاحة' : (loading ? 'جاري الحجز...' : 'احجز الآن')}
                                </button>
                            </AnimatedItem>
                            
                            <AnimatedContainer className='pt-4 border-t border-gray-200 space-y-2'>
                                <AnimatedItem className='flex items-center justify-between'>
                                    <span className='text-gray-600'>عدد الأيام:</span>
                                    <span className='font-medium'>{totalDays}</span>
                                </AnimatedItem>
                                <AnimatedItem className='flex items-center justify-between'>
                                    <span className='text-gray-600'>السعر اليومي:</span>
                                    <div className='flex items-center gap-1'>
                                        <span>{car.price_per_day?.toLocaleString()}</span>
                                        <img src={currency_black} alt="ريال" className='w-3 h-3' />
                                    </div>
                                </AnimatedItem>
                                <AnimatedItem className='flex items-center justify-between pt-2 border-t border-gray-200'>
                                    <span className='text-gray-800 font-medium'>المجموع:</span>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-lg font-bold'>{totalPrice.toLocaleString()}</span>
                                        <img src={currency_black} alt="ريال" className='w-4 h-4' />
                                    </div>
                                </AnimatedItem>
                            </AnimatedContainer>
                        </div>
                    </AnimatedItem>
                </AnimatedContainer>
            </div>
        </div>
    )
}

export default CarDetails;
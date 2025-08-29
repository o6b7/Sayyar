import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { FilterIcon, Search } from 'lucide-react';
import CarCard from '../components/CarCard';
import { AnimatedContainer, AnimatedItem, itemVariants } from '../utils/animation/containerVariants';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Skeleton from '../components/common/Skeleton';

const Cars = () => {
    const { cars, axios, loading: contextLoading } = useAppContext();

    // Getting search param from the url
    const [searchParams] = useSearchParams();
    const pickup_location = searchParams.get('pickup_location');
    const pickup_date = searchParams.get('pickup_date');
    const return_date = searchParams.get('return_date');
    const isFiltersExist = pickup_location && pickup_date && return_date;

    const [filteredCars, setFilteredCars] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Function to check car availability
    const checkCarAvailability = async (carId) => {
        try {
            const { data } = await axios.post('/api/booking/check-availability', {
                carId,
                pickup_date,
                return_date
            });
            return data.isAvailable;
        } catch (error) {
            console.error('Error checking availability:', error);
            return false;
        }
    };

    const searchCarAvailability = async () => {
        setLoading(true);
        
        try {
            // Check availability for each car
            const availabilityResults = await Promise.all(
                cars.map(async (car) => {
                    const isAvailable = await checkCarAvailability(car._id);
                    return { car, isAvailable };
                })
            );
            
            // Filter only available cars
            const availableCars = availabilityResults
                .filter(result => result.isAvailable)
                .map(result => result.car);
            
            setFilteredCars(availableCars);
            
            if (availableCars.length === 0) {
                toast.error('لا توجد سيارات متاحة في التاريخ والموقع المحددين');
            }
        } catch (error) {
            console.error('Error searching car availability:', error);
            // Fallback: Show all cars if availability check fails
            setFilteredCars(cars);
        }
        
        setLoading(false);
    };

    useEffect(() => {
        // If cars are loaded and this is the initial load
        if (cars.length > 0 && isInitialLoad) {
            if (isFiltersExist) {
                searchCarAvailability();
            } else {
                setFilteredCars(cars);
            }
            setIsInitialLoad(false);
        }
    }, [isFiltersExist, cars, pickup_location, pickup_date, return_date, axios]);

    const searchedCars = filteredCars.filter(car => 
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission?.toLowerCase().includes(input.toLowerCase()) ||
        car.fuel_type?.toLowerCase().includes(input.toLowerCase())
    );

    // Show loading if context is still loading cars or we're processing
    const showLoading = contextLoading || loading || isInitialLoad;

    return (
        <>
            {showLoading ? (
                <Skeleton type='cars' />
            ) : (
                <AnimatedContainer className='mb-10'>
                    <AnimatedItem className='flex flex-col items-center py-20 bg-light max-md:px-4'>
                        <Title title='السيارات المتاحة' subTitle='تصفح افضل السيارات من اختيارنا لمغامرتك التالية!'/>
                        
                        <motion.div 
                            className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Search className='w-4.5 h-4.5 ml-2' />
                            <input 
                                onChange={(e) => setInput(e.target.value)} 
                                value={input} 
                                type="text" 
                                placeholder='ابحث بواسطة الماركة، الموديل، او المواصفات'
                                className='w-full h-full outline-none text-gray-500'
                            />
                            <FilterIcon className='w-4.5 h-4.5 mr-2'/>
                        </motion.div>
                    </AnimatedItem>

                    <AnimatedContainer className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
                        <AnimatedItem>{searchedCars.length} سيارات</AnimatedItem>
                        
                        <AnimatedContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
                            {searchedCars.length > 0 ? (
                                searchedCars.map((car, index) => (
                                    <AnimatedItem key={car._id || index}>
                                        <CarCard car={car} />
                                    </AnimatedItem>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12">
                                    <p className="text-gray-500">لا توجد سيارات متطابقة مع بحثك</p>
                                </div>
                            )}
                        </AnimatedContainer>
                    </AnimatedContainer>
                </AnimatedContainer>
            )}
        </>
    );
}

export default Cars;
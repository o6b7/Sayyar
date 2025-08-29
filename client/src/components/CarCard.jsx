import React from 'react'
import { currency_white } from '../assets/assets'
import { CarIcon, FuelIcon, LocateIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {

    const navigate = useNavigate();

  return (
    <div onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0, 0)}} className="group relative rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white border border-gray-100 hover:shadow-xl">
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Availability Badge */}
        {car.isAvailable && (
          <p className="absolute top-4 right-1/2 transform -translate-x-1/2 bg-primary/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            متاحة الآن!
          </p>
        )}
      </div>

      {/* Price Tag with Currency Image */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center">
        <img 
          src={currency_white} 
          alt="Currency" 
          className="h-5 w-5 ml-2" 
        />
        <span className="font-bold text-lg">{car.price_per_day}</span>
        <span className="text-sm text-white/80 mr-1"> / لليوم</span>
      </div>

      {/* Details Section */}
      <div className="p-4 sm:p-5">
        {/* Title and Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
          <p className="text-gray-500 text-sm">{car.category} | {car.year}</p>
        </div>

        {/* Specifications Grid */}
        <div className="mt-4 grid grid-cols-2 gap-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{car.seating_capacity} مقاعد</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FuelIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LocateIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard
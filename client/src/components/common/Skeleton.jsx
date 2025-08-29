import React from 'react';

const Skeleton = ({ type = 'dashboard' }) => {
  if (type === 'dashboard') {
    return (
      <div className='px-4 pt-6 pb-10 md:px-8 flex-1'>
        {/* Title Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-80"></div>
        </div>
        
        {/* Stats Cards Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 w-full'>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-4 items-center p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm animate-pulse">
              <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-200'></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-300 rounded w-10"></div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 w-full'>
          {/* Recent Bookings Skeleton */}
          <div className='flex-1 p-3 sm:p-4 lg:p-5 border border-gray-100 rounded-lg bg-white shadow-sm animate-pulse'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2'>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className='space-y-3 sm:space-y-4'>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className='flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-lg gap-2'>
                  <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200'></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto'>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue Skeleton */}
          <div className='lg:w-96 p-5 border border-gray-100 rounded-lg bg-white shadow-sm animate-pulse'>
            <div className='mb-4 space-y-2'>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className='flex flex-col items-center justify-center h-40 text-center space-y-3'>
              <div className='flex justify-center'>
                <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-200'></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-28"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'manageCars') {
    return (
      <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
        {/* Title Skeleton */}
        <div className='pt-8 sm:pt-12 mb-8'>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-80"></div>
        </div>

        {/* Table Skeleton */}
        <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6 animate-pulse'>
          <div className='w-full border-collapse text-right text-sm text-gray-600'>
            {/* Table Header Skeleton */}
            <div className='text-gray-500 bg-gray-50 p-3 grid grid-cols-5 gap-4'>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            
            {/* Table Body Skeleton */}
            <div className='space-y-4 p-3'>
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className='grid grid-cols-5 gap-4 py-3'>
                  <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-md bg-gray-200'></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded hidden md:block"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cars') {
    return (
      <div className='mb-10'>
        {/* Header section skeleton */}
        <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
          <div className="text-center mb-6">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
          </div>
          
          {/* Search bar skeleton */}
          <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow animate-pulse'>
            <div className="w-4.5 h-4.5 ml-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 bg-gray-200 rounded mx-2"></div>
            <div className="w-4.5 h-4.5 mr-2 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Cars grid skeleton */}
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
          <div className="h-5 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
                {/* Image skeleton */}
                <div className="w-full h-48 bg-gray-200"></div>
                
                {/* Content skeleton */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'myBookings') {
    return (
      <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
        {/* Title Skeleton */}
        <div className='pt-8 sm:pt-12 mb-8'>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>

        {/* Bookings list skeleton */}
        <div className='space-y-6'>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className='grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-white shadow-sm animate-pulse'
            >
              {/* Car Image + Info */}
              <div className='sm:col-span-1'>
                <div className='w-full h-32 bg-gray-200 rounded-md mb-3'></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>

              {/* Booking Details */}
              <div className='sm:col-span-2 space-y-2'>
                {[1, 2, 3, 4].map((line) => (
                  <div key={line} className='flex justify-between'>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                  </div>
                ))}
              </div>

              {/* Price + Button */}
              <div className='flex flex-col justify-between'>
                <div className='flex justify-between items-center mb-4'>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'carDetails') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className='px-4 md:px-8 lg:px-12 xl:px-16 py-12 max-w-7xl mx-auto'>
          {/* Back Button Skeleton */}
          <div className="flex items-center gap-2 mb-8 text-gray-600">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-sm'>
            <div className='lg:col-span-2'>
              {/* Image Skeleton */}
              <div className='w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-xl mb-8 animate-pulse'></div>
              
              <div className='space-y-8'>
                {/* Title Skeleton */}
                <div className='text-right space-y-2'>
                  <div className="h-8 bg-gray-200 rounded w-3/4 ml-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
                </div>
                
                <div className='border-t border-gray-200'/>
                
                {/* Specs Skeleton */}
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='flex flex-col items-center bg-gray-50 p-4 rounded-lg border border-gray-200'>
                      <div className='w-5 h-5 bg-gray-200 rounded-full mb-2'></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
                
                {/* Description Skeleton */}
                <div className='text-right space-y-2'>
                  <div className="h-6 bg-gray-200 rounded w-1/4 ml-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>

                {/* Features Skeleton */}
                <div className='text-right space-y-2'>
                  <div className="h-6 bg-gray-200 rounded w-1/4 ml-auto"></div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className='flex items-center justify-start'>
                        <div className='h-4 w-4 bg-gray-200 rounded mr-2'></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Panel Skeleton */}
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-8'>
              <div className='text-right space-y-6'>
                <div className="h-7 bg-gray-200 rounded w-1/3 ml-auto"></div>
                
                <div className='flex items-center justify-end gap-1'>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className='w-4 h-4 bg-gray-200 rounded'></div>
                </div>
                
                <div className='space-y-4'>
                  {/* Date Picker Skeleton */}
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                
                {/* Book Button Skeleton */}
                <div className="h-12 bg-gray-200 rounded"></div>
                
                <div className='pt-4 border-t border-gray-200 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="flex items-center gap-1">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                      <div className='w-3 h-3 bg-gray-200 rounded'></div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className='w-4 h-4 bg-gray-200 rounded'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return null;
};

export default Skeleton;
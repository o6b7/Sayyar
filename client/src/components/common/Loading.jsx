import React from 'react'
import Title from '../Title';

const Loading = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
      <div className='pt-8 sm:pt-12 mb-8'>
        <Title
          title='إدارة السيارات' 
          subTitle='اطلع على جميع السيارات المعروضة، وحدّث تفاصيلها، أو احذفها من منصة الحجز.' 
          align="left"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500">جاري تحميل البيانات...</p>
      </div>
    </div>
  );

}

export default Loading;
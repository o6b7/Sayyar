import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { Trash2Icon, ToggleLeftIcon, ToggleRightIcon } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Skeleton from '../../components/common/Skeleton';
import { showConfirmationDialog } from '../../utils/ConfirmationDialog'; 
import { withErrorHandling } from '../../utils/apiErrorHandler';

const ManageCars = () => {
  const { isOwner, axios, currency_black } = useAppContext();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerCars = async () => {
    setLoading(true);
    await withErrorHandling(
      () => axios.get('/api/owner/cars'),
      (data) => setCars(data.cars),
      () => setCars([])
    );
    setLoading(false);
  };

  const toggleAvailability = async (carId) => {
    await withErrorHandling(
      () => axios.post('/api/owner/toggle-car', { carId }),
      (data) => {
        toast.success(data.message);
        setCars(cars.map(car => 
          car._id === carId ? { ...car, isAvailable: !car.isAvailable } : car
        ));
      }
    );
  };
  
  const handleDeleteCar = async (carId) => {
    showConfirmationDialog({
      title: 'هل أنت متأكد من حذف السيارة؟',
      text: 'لا يمكن التراجع عن هذه العملية بعد الحذف',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'تراجع',
      onConfirm: async () => {
        await withErrorHandling(
          () => axios.post('/api/owner/delete-car', { carId }),
          (data) => {
            toast.success(data.message);
            setCars(cars.filter(car => car._id !== carId));
          }
        );
      }
    });
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  if (loading) return <Skeleton type="manageCars" />;

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
      <div className='pt-8 sm:pt-12 mb-8'>
        <Title 
          title='إدارة السيارات' 
          subTitle='اطلع على جميع السيارات المعروضة، وحدّث تفاصيلها، أو احذفها من منصة الحجز.' 
          align="left"
        />
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد سيارات مسجلة حتى الآن</p>
        </div>
      ) : (
        <AnimatedContainer className='w-full rounded-md overflow-hidden border border-borderColor mt-6'>
          {/* Desktop Table */}
          <div className='hidden md:block'>
            <table className='w-full border-collapse text-right text-sm text-gray-600'>
              <thead className='text-gray-500 bg-gray-50'>
                <tr>
                  {['السيارة', 'الصنف', 'السعر', 'الحالة', 'الفعل'].map((header, i) => (
                    <AnimatedItem key={header} index={i} as="th" className='p-3 font-medium'>
                      {header}
                    </AnimatedItem>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cars.map((car, i) => (
                  <AnimatedItem key={car._id} index={i} as="tr" className='border-t border-borderColor hover:bg-gray-50 transition-colors'>
                    <td className='p-3 flex items-center gap-3 justify-start'>
                      <img src={car.image} alt="car" className='h-12 w-12 aspect-square rounded-md object-cover'/>
                      <div className='text-right'>
                        <p className='font-medium'>{car.brand} {car.model}</p>
                        <p className='text-xs text-gray-500'>{car.seating_capacity} مقاعد | {car.transmission}</p>
                      </div>
                    </td>
                    <td className='p-3'>{car.category}</td>
                    <td className='p-3 font-medium'>
                      <span className='flex items-center justify-start gap-1'>
                        {car.price_per_day}
                        <img src={currency_black} alt="ريال سعودي" className='w-3 h-3 object-contain' />
                        <span className='text-xs text-gray-500'>/اليوم</span>
                      </span>
                    </td>
                    <td className='p-3'>
                      <span className={`px-2 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {car.isAvailable ? 'متاحة' : 'غير متاحة'}
                      </span>
                    </td>
                    <td className='p-3'>
                      <div className='flex gap-2 justify-start'>
                        <button onClick={() => toggleAvailability(car._id)} className='p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-transform hover:scale-110 active:scale-95'>
                          {car.isAvailable ? <ToggleRightIcon className='h-4 w-4 text-green-600' /> : <ToggleLeftIcon className='h-4 w-4 text-gray-400' />}
                        </button>
                        <button onClick={() => handleDeleteCar(car._id)} className='p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-transform hover:scale-110 active:scale-95'>
                          <Trash2Icon className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </AnimatedItem>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden'>
            {cars.map((car, i) => (
              <AnimatedItem key={car._id} index={i} className='border-t border-borderColor p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex items-center gap-3'>
                    <img src={car.image} alt="car" className='h-14 w-14 aspect-square rounded-md object-cover'/>
                    <div className='text-right'>
                      <p className='font-medium'>{car.brand} {car.model}</p>
                      <p className='text-xs text-gray-500'>{car.seating_capacity} مقاعد | {car.transmission}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {car.isAvailable ? 'متاحة' : 'غير متاحة'}
                  </span>
                </div>
                
                <div className='flex justify-between items-center'>
                  <div className='text-right'>
                    <p className='text-xs text-gray-500 mb-1'>الصنف</p>
                    <p className='font-medium'>{car.category}</p>
                  </div>
                  
                  <div className='text-right'>
                    <p className='text-xs text-gray-500 mb-1'>السعر</p>
                    <span className='font-medium flex items-center justify-start gap-1'>
                      {car.price_per_day}
                      <img src={currency_black} alt="ريال سعودي" className='w-3 h-3 object-contain' />
                      <span className='text-xs text-gray-500'>/اليوم</span>
                    </span>
                  </div>
                  
                  <div className='flex gap-2'>
                    <button onClick={() => toggleAvailability(car._id)} className='p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-transform hover:scale-110 active:scale-95'>
                      {car.isAvailable ? <ToggleRightIcon className='h-5 w-5 text-green-600' /> : <ToggleLeftIcon className='h-5 w-5 text-gray-400' />}
                    </button>
                    <button onClick={() => handleDeleteCar(car._id)} className='p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-transform hover:scale-110 active:scale-95'>
                      <Trash2Icon className='h-5 w-5' />
                    </button>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedContainer>
      )}
    </div>
  );
};

export default ManageCars;
import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Modal from 'react-modal';
import BookingDetails from '../components/common/BookingDetails';
import Skeleton from '../components/common/Skeleton';
import { motion } from 'framer-motion';
import { showConfirmationDialog, showSuccessMessage, showErrorMessage } from '../utils/ConfirmationDialog';
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { handleApiError, withErrorHandling } from '../utils/apiErrorHandler';
import { formatDate, isDateInPast } from '../utils/dateFormatter';

Modal.setAppElement('#root');

const MyBookings = () => {
  const { axios, user, currency_black } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchUserBookings = async () => {
    if (!user || !user._id) {
      if (!initialLoad) {
        toast.error("الرجاء تسجيل الدخول للوصول إلى حجوزاتك.");
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    
    await withErrorHandling(
      () => axios.get('/api/booking/user'),
      (data) => {
        setBookings(data.bookings);
      },
      () => {
        setBookings([]);
      }
    );
    
    setLoading(false);
    setInitialLoad(false);
  };

  // Check if car is deleted
  const isCarDeleted = (booking) => {
    return !booking.car.owner;
  };

  // Check if booking should be automatically cancelled
  const shouldBeCancelled = (booking) => {
    // If return date has passed and booking is not completed or cancelled
    const returnDatePassed = isDateInPast(booking.return_date);
    const isActiveStatus = ['pending', 'confirmed', 'قيد التنفيذ'].includes(booking.status);
    
    return returnDatePassed && isActiveStatus;
  };

  // Get status text with appropriate logic
  const getStatusText = (booking) => {
    // First check if booking should be automatically cancelled
    if (shouldBeCancelled(booking)) {
      return 'ملغي (انتهى تاريخ الاسترجاع)';
    }
    
    // Then check if car is deleted
    if (isCarDeleted(booking) && booking.status !== 'مكتمل' && booking.status !== 'completed') {
      return 'ملغي (تم حذف السيارة)';
    }
    
    // Map status to Arabic
    const statusMap = {
      'pending': 'قيد الانتظار',
      'confirmed': 'مؤكد',
      'cancelled': 'ملغي',
      'completed': 'مكتمل',
      'قيد التنفيذ': 'قيد التنفيذ',
      'مكتمل': 'مكتمل',
      'ملغي': 'ملغي'
    };
    
    return statusMap[booking.status] || booking.status;
  };

  // Get status color class
  const getStatusColor = (booking) => {
    const statusText = getStatusText(booking);
    
    if (statusText.includes('ملغي')) {
      return "text-red-600";
    } else if (statusText === 'مكتمل' || statusText === 'مؤكد') {
      return "text-green-600";
    } else {
      return "text-blue-600";
    }
  };

  // Check if refund should be displayed
  const shouldShowRefund = (booking) => {
    const statusText = getStatusText(booking);
    return statusText.includes('ملغي');
  };

  const canCancelBooking = (booking) => {
    // Can't cancel if already cancelled, completed, or car is deleted
    if (booking.status === 'cancelled' || 
        booking.status === 'completed' || 
        booking.status === 'مكتمل' || 
        isCarDeleted(booking)) {
      return false;
    }
    
    const now = new Date();
    const pickupDate = new Date(booking.pickup_date);
    const timeDifference = pickupDate - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
    return hoursDifference >= 3;
  };

  const handleCancel = async (booking) => {
    showConfirmationDialog({
      title: 'تأكيد الإلغاء',
      text: 'هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟',
      confirmButtonText: 'نعم، إلغاء الحجز',
      cancelButtonText: 'تراجع',
      onConfirm: async () => {
        try {
          const response = await axios.post('/api/booking/cancel', {
            bookingId: booking._id
          });
          
          if (response.data.success) {
            showSuccessMessage('تم الإلغاء', 'تم إلغاء الحجز بنجاح وسيتم استرداد المبلغ');
            fetchUserBookings(); // Refresh bookings
          }
        } catch (error) {
          handleApiError(error, 'حدث خطأ أثناء إلغاء الحجز');
        }
      }
    });
  };

  // Auto-cancel bookings that should be cancelled (frontend only approach)
  useEffect(() => {
    const autoCancelBookings = () => {
      const updatedBookings = bookings.map(booking => 
        shouldBeCancelled(booking) 
          ? {...booking, status: 'cancelled'} 
          : booking
      );
      
      // Only update state if there are changes
      if (JSON.stringify(updatedBookings) !== JSON.stringify(bookings)) {
        setBookings(updatedBookings);
      }
    };

    if (bookings.length > 0) {
      autoCancelBookings();
    }
  }, [bookings]);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    } else {
      if (!initialLoad) {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && initialLoad) {
        setLoading(false);
        setInitialLoad(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, initialLoad]);

  if (loading) {
    return <Skeleton type="myBookings" />;
  }

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
      <div className='pt-8 sm:pt-12 mb-8'>
        <Title title='حجوزاتي' subTitle='عرض وإدارة جميع الحجوزات' align="left"/>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد حجوزات حالية</p>
        </div>
      ) : (
        <AnimatedContainer className="space-y-6 mb-12">
          {bookings.map((booking, index) => (
            <AnimatedItem 
              key={booking._id}
              index={index}
              className='grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-white shadow-sm'
            >
              <div className='sm:col-span-1'>
                <img src={booking.car.image} alt={`${booking.car.brand} ${booking.car.model}`} 
                  className='w-full h-auto aspect-video object-cover rounded-md mb-3'/>
                <p className='text-base sm:text-lg font-medium'>{booking.car.brand} {booking.car.model}</p>
                <p className='text-gray-500 text-sm sm:text-base'>{booking.car.year} | {booking.car.category}</p>
                
                {/* Show refund message if applicable */}
                {shouldShowRefund(booking) && (
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    (سيتم استرداد المبلغ)
                  </p>
                )}
              </div>

              <div className='sm:col-span-2 text-right space-y-2 sm:space-y-3'>
                {[
                  ['رقم الحجز', booking._id],
                  ['التاريخ', `${formatDate(booking.pickup_date)} إلى ${formatDate(booking.return_date)}`],
                  ['مكان الاستلام', booking.car.location],
                  ['الحالة', 
                    <span className={`font-medium ${getStatusColor(booking)}`}>
                      {getStatusText(booking)}
                    </span>
                  ],
                  ...(booking.cancellationReason ? [['سبب الإلغاء', booking.cancellationReason]] : [])
                ].map(([label, value], i) => (
                  <AnimatedItem 
                    key={label} 
                    index={i}
                    className='flex justify-between text-sm sm:text-base'
                  >
                    <span className='text-gray-500'>{label}</span>
                    <span>{value}</span>
                  </AnimatedItem>
                ))}
              </div>

              <div className='text-right space-y-3 sm:space-y-4'>
                <AnimatedItem 
                  index={0}
                  className='flex justify-between items-center'
                >
                  <span className='text-gray-500 text-sm sm:text-base'>المجموع:</span>
                  <span className='text-base sm:text-lg font-bold flex items-center gap-1'>
                    {booking.price}
                    <img src={currency_black} alt="عملة" className="w-3 h-3 object-contain"/>
                  </span>
                </AnimatedItem>
                <div className='flex flex-col gap-2'>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsModalOpen(true);
                    }}
                    className='px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1B4166] text-white rounded hover:bg-[#0D2E4D] transition-colors text-sm sm:text-base'
                  >
                    عرض التفاصيل
                  </motion.button>
                  
                  {canCancelBooking(booking) && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCancel(booking)}
                      className='px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm sm:text-base'
                    >
                      إلغاء الحجز
                    </motion.button>
                  )}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: { 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            inset: 'auto',
            width: '90%',
            maxWidth: '800px',
            border: 'none',
            background: 'none',
            padding: 0,
            overflow: 'visible'
          }
        }}
      >
        <AnimatedContainer>
          <BookingDetails 
            booking={selectedBooking} 
            closeModal={() => setIsModalOpen(false)} 
            onCancel={handleCancel}
            canCancel={selectedBooking ? canCancelBooking(selectedBooking) : false}
            isCarDeleted={selectedBooking ? isCarDeleted(selectedBooking) : false}
            shouldShowRefund={selectedBooking ? shouldShowRefund(selectedBooking) : false}
          />
        </AnimatedContainer>
      </Modal>
    </div>
  );
};

export default MyBookings;
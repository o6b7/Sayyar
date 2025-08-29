import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', damping: 25, stiffness: 500 }
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.2 } }
};

const BookingDetails = ({ booking, closeModal }) => {
  // Check if booking data exists
  if (!booking || !booking.car) {
    return (
      <AnimatePresence>
        <motion.div
          key="modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-white rounded-xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B4166]">تفاصيل الحجز</h2>
            <motion.button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              &times;
            </motion.button>
          </div>
          <div className="py-8 text-center text-gray-500">
            لا توجد بيانات للحجز
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Calculate days between pickup and return
  const calculateDays = () => {
    try {
      const pickup = new Date(booking.pickup_date);
      const returnDate = new Date(booking.return_date);
      const timeDiff = returnDate.getTime() - pickup.getTime();
      return Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    } catch (error) {
      console.error("Error calculating days:", error);
      return 1;
    }
  };

  const days = calculateDays();
  const totalPrice = booking.price || (booking.car?.price_per_day || 0) * days;

  // Format date safely
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'غير محدد';
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'غير محدد' : date.toLocaleDateString('en-GB');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'غير محدد';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl mx-4"
      >
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center border-b pb-3 sm:pb-4">
            <AnimatedItem index={0} as="h2" className="text-xl sm:text-2xl font-bold text-[#1B4166]">
              تفاصيل الحجز
            </AnimatedItem>
            <motion.button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              &times;
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              ['معلومات السيارة', [
                ['الماركة', booking.car.brand || 'غير محدد'],
                ['الموديل', booking.car.model || 'غير محدد'],
                ['السنة', booking.car.year || 'غير محدد'],
                ['النوع', booking.car.category || 'غير محدد'],
                ['المقاعد', booking.car.seating_capacity || 'غير محدد']
              ]],
              ['تفاصيل الحجز', [
                ['رقم الحجز', booking._id || 'غير متوفر'],
                ['تاريخ الحجز', formatDate(booking.createdAt)],
                ['فترة التأجير', `${formatDate(booking.pickup_date)} إلى ${formatDate(booking.return_date)}`],
                ['مكان الاستلام', booking.car?.location || 'غير محدد'],
                ['طريقة الدفع', booking.payment_method || '—']
              ]]
            ].map(([title, items], sectionIndex) => (
              <div key={title}>
                <AnimatedItem 
                  index={sectionIndex * 0.1} 
                  as="h3" 
                  className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                >
                  {title}
                </AnimatedItem>
                
                <AnimatedContainer className="space-y-2 sm:space-y-3">
                  {items.map(([label, value], i) => (
                    <AnimatedItem 
                      key={label}
                      index={i}
                      className="flex justify-between text-sm sm:text-base"
                    >
                      <span className="text-gray-600">{label}</span>
                      <span>{value}</span>
                    </AnimatedItem>
                  ))}
                </AnimatedContainer>
              </div>
            ))}
          </div>

          <AnimatedItem 
            index={0.3}
            className="pt-3 sm:pt-4 border-t"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">الملخص المالي</h3>
            <AnimatedContainer className="space-y-1 sm:space-y-2">
              {[
                ['السعر اليومي', `${booking.car?.price_per_day || 0} ر.س`],
                ['عدد الأيام', days],
                ['المجموع', <span className="font-bold" key="total">{totalPrice} ر.س</span>]
              ].map(([label, value], i) => (
                <AnimatedItem 
                  key={label}
                  index={i}
                  className="flex justify-between text-sm sm:text-base"
                >
                  <span className="text-gray-600">{label}</span>
                  <span>{value}</span>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </AnimatedItem>

          <AnimatedItem 
            index={0.4}
            className="flex justify-end pt-4 sm:pt-6"
          >
            <motion.button
              onClick={closeModal}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#1B4166] text-white rounded-lg hover:bg-[#0D2E4D] transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              إغلاق
            </motion.button>
          </AnimatedItem>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetails;
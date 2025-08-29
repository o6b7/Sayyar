import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import BookingDetails from '../../components/common/BookingDetails';
import Modal from 'react-modal';
import Skeleton from '../../components/common/Skeleton';
import { motion } from 'framer-motion';
import { showConfirmationDialog } from '../../utils/ConfirmationDialog';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { withErrorHandling } from '../../utils/apiErrorHandler';
import { formatDate, calculateDaysDifference } from '../../utils/dateFormatter';

Modal.setAppElement('#root');

const ManageBookings = () => {
  const { currency_black, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOwnerBookings = async () => {
    setLoading(true);
    await withErrorHandling(
      () => axios.get('/api/booking/owner'),
      (data) => setBookings(data.bookings),
      () => setBookings([])
    );
    setLoading(false);
  };

  const changeBookingStatus = async (bookingId, status) => {
    await withErrorHandling(
      () => axios.post('/api/booking/change-status', { bookingId, status }),
      (data) => {
        toast.success(data.message);
        fetchOwnerBookings();
      }
    );
  };

  useEffect(() => { fetchOwnerBookings(); }, []);

  const handleCancel = (booking) => {
    showConfirmationDialog({
      title: 'هل أنت متأكد من إلغاء الحجز؟',
      text: 'سيتم إلغاء حجز العميل ولن يتمكن من استخدام السيارة',
      confirmButtonText: 'نعم، ألغ الحجز',
      onConfirm: () => changeBookingStatus(booking._id, 'cancelled'),
    });
  };

  const handleConfirm = (booking) => {
    showConfirmationDialog({
      title: 'هل أنت متأكد من تأكيد الحجز؟',
      text: 'سيتم تأكيد حجز العميل ويمكنه استخدام السيارة',
      confirmButtonText: 'نعم، أكد الحجز',
      onConfirm: () => changeBookingStatus(booking._id, 'confirmed'),
    });
  };

  const statusMap = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    cancelled: 'ملغي',
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      pending: <Clock className="h-4 w-4 text-yellow-600" />,
      cancelled: <XCircle className="h-4 w-4 text-red-600" />,
    };
    return icons[status] || null;
  };

  const getStatusClass = (status) => {
    return status === 'confirmed' ? 'bg-green-100 text-green-800' :
           status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
  };

  if (loading) return <Skeleton type="manageCars" />;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto">
      <div className="pt-8 sm:pt-12 mb-8">
        <Title
          title="إدارة الحجوزات"
          subTitle="تابع جميع حجوزات العملاء، وافق على الطلبات أو ألغها، وأدرج حالة الحجز"
          align="left"
        />
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد حجوزات حالية</p>
        </div>
      ) : (
        <AnimatedContainer className="w-full rounded-md overflow-hidden border border-borderColor mt-6">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-right text-sm text-gray-600">
              <thead className="text-gray-500 bg-gray-50">
                <tr>
                  {['السيارة', 'فترة الحجز', 'المبلغ', 'الحالة', 'الإجراءات'].map((header, i) => (
                    <AnimatedItem as="th" key={header} index={i} className="p-3 font-medium">
                      {header}
                    </AnimatedItem>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, i) => {
                  const days = calculateDaysDifference(booking.pickup_date, booking.return_date);
                  return (
                    <AnimatedItem as="tr" key={booking._id} index={i} className="border-t border-borderColor hover:bg-gray-50 transition-colors">
                      <td className="p-3 flex items-center gap-3 justify-start">
                        <img src={booking.car?.image} alt="car" className="h-12 w-12 aspect-square rounded-md object-cover" />
                        <div className="text-right">
                          <p className="font-medium">{booking.car?.brand} {booking.car?.model}</p>
                          <p className="text-xs text-gray-500">{booking.car?.location}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span>{formatDate(booking.pickup_date)}</span>
                          <span className="text-xs text-gray-500">إلى {formatDate(booking.return_date)}</span>
                        </div>
                      </td>
                      <td className="p-3 font-medium">
                        <span className="flex items-center justify-start gap-1">
                          {booking.price || 0}
                          <img src={currency_black} alt="ريال سعودي" className="w-3 h-3 object-contain" />
                          <span className="text-xs text-gray-500">لـ {days} أيام</span>
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 justify-start">
                          {getStatusIcon(booking.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(booking.status)}`}>
                            {statusMap[booking.status] || booking.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2 justify-start">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelectedBooking(booking); setIsModalOpen(true); }} className="px-3 py-1.5 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                            تفاصيل
                          </motion.button>
                          {booking.status === 'pending' && (
                            <>
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleConfirm(booking)} className="px-3 py-1.5 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100">
                                تأكيد
                              </motion.button>
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCancel(booking)} className="px-3 py-1.5 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                                إلغاء
                              </motion.button>
                            </>
                          )}
                        </div>
                      </td>
                    </AnimatedItem>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {bookings.map((booking, i) => {
              const days = calculateDaysDifference(booking.pickup_date, booking.return_date);
              return (
                <AnimatedItem key={booking._id} index={i} className="border-t border-borderColor p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img src={booking.car?.image} alt="car" className="h-14 w-14 aspect-square rounded-md object-cover" />
                      <div className="text-right">
                        <p className="font-medium">{booking.car?.brand} {booking.car?.model}</p>
                        <p className="text-xs text-gray-500">{booking.car?.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(booking.status)}`}>
                        {statusMap[booking.status] || booking.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">فترة الحجز</p>
                      <div className="flex flex-col">
                        <span className="text-sm">{formatDate(booking.pickup_date)}</span>
                        <span className="text-xs text-gray-500">إلى {formatDate(booking.return_date)}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">المبلغ</p>
                      <span className="font-medium flex items-center justify-start gap-1">
                        {booking.price || 0}
                        <img src={currency_black} alt="ريال سعودي" className="w-3 h-3 object-contain" />
                        <span className="text-xs text-gray-500">لـ {days} أيام</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2 justify-start">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelectedBooking(booking); setIsModalOpen(true); }} className="px-3 py-1.5 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                      تفاصيل
                    </motion.button>
                    {booking.status === 'pending' && (
                      <>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleConfirm(booking)} className="px-3 py-1.5 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100">
                          تأكيد
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCancel(booking)} className="px-3 py-1.5 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                          إلغاء
                        </motion.button>
                      </>
                    )}
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimatedContainer>
      )}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        content: { position: 'relative', inset: 'auto', width: '90%', maxWidth: '800px', border: 'none', background: 'none', padding: 0, overflow: 'visible' }
      }}>
        {selectedBooking && <BookingDetails booking={selectedBooking} closeModal={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default ManageBookings;
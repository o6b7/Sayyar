import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { CarIcon, CheckCheckIcon, ListIcon, MessageCircleWarningIcon, TrendingUp } from 'lucide-react'
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants'
import { motion } from 'framer-motion'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Skeleton from '../../components/common/Skeleton'
import { Link } from 'react-router-dom'
import { handleApiError, withErrorHandling } from '../../utils/apiErrorHandler'
import { formatDate } from '../../utils/dateFormatter'

const Dashboard = () => {
  const {axios, isOwner, currency_black} = useAppContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalCars: 0, totalBookings: 0, pendingBookings: 0, completedBookings: 0,
    recentBookings: [], monthlyRevenue: 0,
  })
  
  const dashboardCards = [
    { title: "مجموع السيارات", value: data.totalCars, icon: <CarIcon className='h-5 w-5 text-primary'/>, bg: 'bg-blue-50' },
    { title: "مجموع الحجوزات", value: data.totalBookings, icon: <ListIcon className='h-5 w-5 text-green-600'/>, bg: 'bg-green-50' },
    { title: "حجوزات قيد المراجعة", value: data.pendingBookings, icon: <MessageCircleWarningIcon className='h-5 w-5 text-amber-600'/>, bg: 'bg-amber-50' },
    { title: "حجوزات مؤكدة", value: data.completedBookings, icon: <CheckCheckIcon className='h-5 w-5 text-emerald-600'/>, bg: 'bg-emerald-50' },
  ]

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const result = await withErrorHandling(
        () => axios.get('/api/owner/dashboard'),
        (data) => {
          setData(data.dashboardData);
        },
        () => {
          // Set empty data on error
          setData({
            totalCars: 0, totalBookings: 0, pendingBookings: 0, completedBookings: 0,
            recentBookings: [], monthlyRevenue: 0,
          });
        }
      );
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]); 

  if (loading) {
    return <Skeleton type="dashboard" />;
  }

  return (
    <div className='px-4 pt-6 pb-10 md:px-8 flex-1'>
      <Title title="لوحة تحكم المدير" subTitle="راقب أداء المنصة الإجمالي بما في ذلك إجمالي السيارات والحجوزات والإيرادات والأنشطة الأخيرة" />

      {/* Stats Cards */}
      <AnimatedContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 w-full'>
        {dashboardCards.map((c, i) => (
          <AnimatedItem key={i} index={i} className={`flex gap-4 items-center p-4 rounded-lg border border-gray-100 ${c.bg} shadow-sm`}>
            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm'>{c.icon}</div>
            <div><h1 className='text-sm text-gray-600'>{c.title}</h1><p className='text-xl font-bold text-gray-800'>{c.value}</p></div>
          </AnimatedItem>
        ))}
      </AnimatedContainer>

      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 w-full'>
        {/* Recent Bookings */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex-1 p-3 sm:p-4 lg:p-5 border border-gray-100 rounded-lg bg-white shadow-sm'
        >
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2'>
            <div><h1 className='text-base sm:text-lg font-semibold text-gray-800'>الحجوزات السابقة</h1><p className='text-xs sm:text-sm text-gray-500'>آخر 5 حجوزات تمت على المنصة</p></div>
            <Link to='/owner/manage-bookings' className='text-xs sm:text-sm text-primary hover:text-primary-dark'>عرض الكل</Link>
          </div>
          <div className='space-y-3 sm:space-y-4'>
            {data.recentBookings.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className='flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors gap-2'
              >
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10'>
                    <ListIcon className='h-3 w-3 sm:h-4 sm:w-4 text-primary'/>
                  </div>
                  <div>
                    <p className='text-sm sm:font-medium text-gray-800'>{b.car.brand} {b.car.model}</p>
                    <p className='text-xs text-gray-500'>{formatDate(b.createdAt)}</p>
                  </div>
                </div>
                <div className='flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto'>
                  <p className='text-xs sm:text-sm font-medium text-gray-700'>
                    {b.price} <img src={currency_black} alt="currency" className='w-2 sm:w-3 inline' />
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs w-16 sm:w-20 text-center ${
                    b.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                    b.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>{b.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className='lg:w-96 p-5 border border-gray-100 rounded-lg bg-white shadow-sm'
        >
          <div className='mb-4'><h1 className='text-lg font-semibold text-gray-800'>الإيرادات الشهرية</h1><p className='text-sm text-gray-500'>إجمالي الإيرادات لشهر الحالي</p></div>
          <div className='flex flex-col items-center justify-center h-40 text-center'>
            <div className='flex justify-center mb-3'><div className='flex items-center justify-center w-16 h-16 rounded-full bg-purple-50'><TrendingUp className='h-6 w-6 text-purple-600'/></div></div>
            <p className='text-2xl font-bold text-gray-800'>{data.monthlyRevenue.toLocaleString()} <img src={currency_black} alt="currency" className='w-3 inline' /></p>
            <p className='text-sm text-gray-500 mt-1'>زيادة 12% عن الشهر الماضي</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
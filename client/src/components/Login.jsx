import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { handleApiError, withErrorHandling } from '../utils/apiErrorHandler';

const AuthModal = () => {

  const { setShowAuthModal, axios, setToken, navigate } = useAppContext();
  
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Extract only the needed fields based on view
    const payload = view === 'login' 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };
    
    await withErrorHandling(
      () => axios.post(`/api/user/${view === 'login' ? 'login' : 'register'}`, payload),
      (data) => {
        toast.success(view === 'login' ? 'تم تسجيل الدخول بنجاح' : 'تم إنشاء الحساب بنجاح');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowAuthModal(false);
        navigate('/');
      }
    );
    
    setLoading(false);
  };

  const switchView = () => {
    setView(view === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 400 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowAuthModal(false)}
        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden'
        >
          <AnimatedContainer className="p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <AnimatedItem index={0} as="h2" className="text-2xl font-bold text-gray-800">
                {view === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </AnimatedItem>
              <AnimatedItem index={0.1}>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl transition-transform hover:scale-110"
                >
                  &times;
                </button>
              </AnimatedItem>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {(view === 'register') ? (                
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-gray-700">الاسم الكامل</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required={view === 'register'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
              ) : ''}

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-gray-700">كلمة المرور</label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

              <AnimatedItem index={0.4} className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dull hover:shadow-md'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري المعالجة...
                    </span>
                  ) : (
                    view === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'
                  )}
                </button>
              </AnimatedItem>

              <AnimatedItem index={0.5} className="text-center pt-2">
                <div className="text-sm">
                  <button 
                    type="button"
                    onClick={switchView}
                    className="text-primary hover:text-dark font-medium"
                  >
                    {view === 'login' ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
                  </button>
                </div>
              </AnimatedItem>

              {view === 'login' && (
                <AnimatedItem index={0.6} className="text-center pt-2">
                  <button 
                    type="button"
                    className="text-primary hover:text-dark text-sm font-medium"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </AnimatedItem>
              )}
            </form>
          </AnimatedContainer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
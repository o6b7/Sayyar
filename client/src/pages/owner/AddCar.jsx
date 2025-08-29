import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { ImagePlusIcon, PencilOffIcon, TrashIcon } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { cityList } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const categories = ["سيدان","هاتشباك","كوبيه","كشف","دفع رباعي","كروس أوفر","ڤان","ميني ڤان","بيك أب","رياضية","ليموزين","شاحنة خفيفة","شاحنة ثقيلة","كهربائية","هجينة"];
const transmissions = ["يدوي","أوتوماتيكي","نصف أوتوماتيكي"];
const fuels = ["بنزين","ديزل","كهربائي","هجينة","غاز"];

const fieldClass = 'px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary transition-all';

const InputField = ({ label, ...props }) => (
  <div className='flex flex-col'>
    <label>{label}</label>
    <input className={fieldClass} {...props} />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className='flex flex-col'>
    <label>{label}</label>
    <select className={fieldClass} {...props}>
      <option value="">اختر {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default function AddCar() {
  
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '', model: '', year: '', price_per_day: '', category: '',
    transmission: '', fuel_type: '', seating_capacity: '', location: '', description: ''
  });
  
  const {axios, currency_black, isOwner} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isOwner) {
      navigate('/');
      toast.error('ليس لديك صلاحية الوصول إلى هذه الصفحة');
    }
  }, [isOwner, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading || !image) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('carData', JSON.stringify(car));

      const {data} = await axios.post('/api/owner/add-car', formData);
      data.success ? toast.success(data.message) : toast.error(data.message);
      
      if (data.success) {
        setImage(null);
        setCar({
          brand: '', model: '', year: '', price_per_day: '', category: '',
          transmission: '', fuel_type: '', seating_capacity: '', location: '', description: ''
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCar = (field) => (e) => setCar({ ...car, [field]: e.target.value });

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 max-w-7xl mx-auto'>
      <div className='pt-8 sm:pt-12 mb-8'>
        <Title 
          title="أضف سيارة جديدة" 
          subTitle="أدخل التفاصيل لإدراج سيارة جديدة للحجز، بما في ذلك السعر والتوافر ومواصفات السيارة." 
          align="left"
        />
      </div>

      <form onSubmit={onSubmitHandler}>
        <AnimatedContainer className='flex flex-col gap-6 text-gray-700 text-sm my-6 max-w-xl'>
          {/* Image Upload */}
          <AnimatedItem index={0}>
            <div className='space-y-3'>
              <label className='block text-sm font-medium'>صورة السيارة</label>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4' dir="rtl">
                <label htmlFor="car_image" className={`relative flex flex-col items-end justify-center w-full sm:w-40 h-32 border-2 border-dashed rounded-lg cursor-pointer 
                  ${image ? 'border-gray-200' : 'border-gray-300 hover:border-primary/50'} transition-colors`}>
                  {image ? (
                    <>
                      <img src={URL.createObjectURL(image)} alt="Car preview" className="w-full h-full object-contain rounded-lg bg-gray-50" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PencilOffIcon className="h-5 w-5 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-right w-full">
                      <ImagePlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">اضغط لرفع صورة</span>
                    </div>
                  )}
                </label>
                {image && (
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button" 
                    onClick={() => setImage(null)} 
                    className='text-xs text-red-500 hover:text-red-700 flex items-center gap-1'
                    whileHover={{ scale: 1.05 }}
                  >
                    <TrashIcon className='h-3 w-3' /> إزالة الصورة
                  </motion.button>
                )}
                <input type="file" id='car_image' accept='image/*' className='hidden' onChange={(e) => e.target.files[0] && setImage(e.target.files[0])} required />
              </div>
            </div>
          </AnimatedItem>

          {/* Brand & Model */}
          <AnimatedItem index={1}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <InputField label="البراند" type="text" placeholder='مثلا: تويوتا، هيونداي' required value={car.brand} onChange={updateCar('brand')} />
              <InputField label="الموديل" type="text" placeholder='مثلا: كامري، إلنترا' required value={car.model} onChange={updateCar('model')} />
            </div>
          </AnimatedItem>

          {/* Year, Price, Category */}
          <AnimatedItem index={2}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              <InputField label="سنة الصنع" type="number" placeholder='2025' min="1900" max={new Date().getFullYear() + 1} required value={car.year} onChange={updateCar('year')} />
              <InputField label={<span>السعر لليوم الواحد (<img src={currency_black} alt="ريال سعودي" width={14} className='inline' />)</span>} type="number" placeholder='180' min="0" required value={car.price_per_day} onChange={updateCar('price_per_day')} />
              <SelectField label="الصنف" options={categories} required value={car.category} onChange={updateCar('category')} />
            </div>
          </AnimatedItem>

          {/* Transmission, Fuel Type, Seats */}
          <AnimatedItem index={3}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              <SelectField label="ناقل الحركة" options={transmissions} required value={car.transmission} onChange={updateCar('transmission')} />
              <SelectField label="نوع الوقود" options={fuels} required value={car.fuel_type} onChange={updateCar('fuel_type')} />
              <InputField label="عدد المقاعد" type="number" placeholder='مثلاً: 5' min="1" max="20" required value={car.seating_capacity} onChange={updateCar('seating_capacity')} />
            </div>
          </AnimatedItem>

          {/* Location */}
          <AnimatedItem index={4}>
            <SelectField 
              label="الموقع" 
              options={cityList} 
              required 
              value={car.location} 
              onChange={updateCar('location')} 
            />
          </AnimatedItem>

          {/* Description */}
          <AnimatedItem index={5}>
            <div className='flex flex-col'>
              <label>الوصف</label>
              <textarea rows={4} placeholder='اكتب وصفًا للسيارة...' className={`${fieldClass} resize-none`} value={car.description} onChange={updateCar('description')} required />
            </div>
          </AnimatedItem>

          {/* Submit */}
          <AnimatedItem index={6}>
            <motion.button 
              type="submit" 
              className='px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading || !image}
            >
              {isLoading ? 'يتم اضافة السيارة' : 'أضف السيارة'}
            </motion.button>
          </AnimatedItem>
        </AnimatedContainer>
      </form>
    </div>
  );
}
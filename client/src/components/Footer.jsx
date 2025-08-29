import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'

const Footer = () => {
  return (
    <AnimatedContainer className="bg-[#1B4166] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <AnimatedItem className="text-right">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-white/20">عن سيَّار</h3>
            <p className="text-white/80 mb-4">
              منصة رائدة لتأجير السيارات الفاخرة في الوطن العربي، نوفر حلولاً مبتكرة لمالكي السيارات والمستأجرين.
            </p>
            <div className="flex justify-start space-x-4">
              <a href="https://www.linkedin.com/in/qusaiabdullah/" className="text-white hover:text-blue-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/qusaiabdullah/" className="text-white hover:text-blue-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/qusaiabdullah/" className="text-white hover:text-blue-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/qusaiabdullah/" className="text-white hover:text-blue-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </AnimatedItem>

          {/* Quick Links */}
          <AnimatedItem className="text-right">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-white/20">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">السيارات المتاحة</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">اعرض سيارتك</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </AnimatedItem>

          {/* Contact Info */}
          <AnimatedItem className="text-right" style={{direction: "rtl"}}>
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-white/20">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="ml-2"><FaPhoneAlt /></span>
                <span>+966 550 11 2341</span>
              </li>
              <li className="flex items-center ">
                <span className="ml-2"><FaEnvelope /></span>
                <span>info@sayyar.com</span>
              </li>
              <li className="flex items-center ">
                <span className="ml-2"><FaMapMarkerAlt /></span>
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </AnimatedItem>

          {/* Newsletter */}
          <AnimatedItem className="text-right">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-white/20">النشرة البريدية</h3>
            <p className="text-white/80 mb-4">
              اشترك ليصلك كل جديد عن عروضنا وخدماتنا
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="py-2 px-4 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder-white/60"
                dir="rtl"
              />
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
              >
                اشتراك
              </button>
            </form>
          </AnimatedItem>
        </AnimatedContainer>

        {/* Divider */}
        <AnimatedItem className="border-t border-white/20 my-6"></AnimatedItem>

        {/* Bottom Footer */}
        <AnimatedContainer className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <AnimatedItem className="mb-4 md:mb-0">
            © {new Date().getFullYear()} سيَّار. جميع الحقوق محفوظة
          </AnimatedItem>
          <AnimatedItem className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الاسترجاع</a>
          </AnimatedItem>
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  );
};

export default Footer;
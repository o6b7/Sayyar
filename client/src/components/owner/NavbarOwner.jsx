import React from 'react';
import { Link } from 'react-router-dom';
import { logoNoBackground } from '../../assets/assets';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user} = useAppContext();  

  return (
    <AnimatedContainer 
      className={`flex items-center justify-between px-6 md:px-10 py-4 
    text-gray-500 border-b border-borderColor relative transition-all`}
      dir="rtl"
      scrollTrigger={false}
    >
      {/* Right: Logo */}
      <AnimatedItem>
        <Link to="/" className="group">
          <img 
            src={logoNoBackground} 
            alt="logo" 
            className='h-10 transition-transform duration-300 group-hover:scale-105' 
          />
        </Link>
      </AnimatedItem>

      {/* left: Welcome Message */}
      <AnimatedItem className={`flex-1 flex justify-end`}>
        <p>مرحباً، {user?.name || "المالك"}</p>
      </AnimatedItem>

    </AnimatedContainer>
  );
};

export default NavbarOwner;
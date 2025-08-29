import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { testimonials } from '../assets/assets';
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'
import { motion } from 'framer-motion';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <AnimatedContainer className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedItem className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B4166]">آراء عملائنا</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            انظر كيف غيرنا تجربة تأجير السيارات للناس
          </p>
        </AnimatedItem>

        <div className="relative max-w-4xl mx-auto h-96">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white p-8 rounded-2xl shadow-xl flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-start mb-6">
                  <img 
                    src={testimonials[currentIndex].img} 
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div className="mr-4 text-right">
                    <h4 className="text-xl font-bold">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                <div className="mb-6 flex justify-start">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-2xl ${i < testimonials[currentIndex].stars ? 'text-amber-400' : 'text-gray-200'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-right">
                  "{testimonials[currentIndex].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute mb-3 bottom-0 left-0 right-0 flex justify-center space-x-12">
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Testimonial;
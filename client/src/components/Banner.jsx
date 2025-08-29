import React from 'react'
import { banner_car_image } from '../assets/assets'
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'

const Banner = () => {
    return (
        <AnimatedContainer className='mb-20 flex flex-col md:flex-row md:items-start items-center
        justify-between px-8 py-10 bg-gradient-to-r from-[#748ba8] 
        to-[#1B4166] w-full max-w-[70%] mx-auto rounded-2xl overflow-hidden'>
            
            <AnimatedItem className='text-white'>
                <h2 className='text-3xl font-medium'>هل تمتلك سيارة فاخرة؟</h2>
                <p className='mt-2'>حقق دخلا من سيارتك بسهولة من خلال ادراجها في سيَّار!</p>
                <p className='max-w-[300px]'>التأمين، التحقق من أهليَّة المستأجر، الدفع، كلهم علينا! حتى تقدر تحقق دخل جانبي بدون ضغط!</p>

                <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all
                text-primary rounded-lg text-sm mt-4 cursor-pointer'>
                    اعرض سيارتك للإيجار!
                </button>
            </AnimatedItem>

            <AnimatedItem>
                <img src={banner_car_image} alt="car" className='max-h-[180px] mt-10 md:mt-0 scale-x-[-1]'/>
            </AnimatedItem>

        </AnimatedContainer>
    )
}

export default Banner
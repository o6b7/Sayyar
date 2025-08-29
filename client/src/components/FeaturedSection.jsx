import Title from './Title'
import CarCard from './carCard'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {

    const {cars} = useAppContext();
    
    const navigate = useNavigate();

    return (
        <AnimatedContainer className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
            <AnimatedItem>
                <Title title='أفضل السيارات' subTitle='تصفح افضل السيارات من اختيارنا لمغامرتك التالية!'/>
            </AnimatedItem>

            <AnimatedContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                {cars.slice(0, 6).map((car) => (
                    <AnimatedItem key={car._id}>
                        <CarCard car={car}/>
                    </AnimatedItem>
                ))}
            </AnimatedContainer>

            <AnimatedItem>
                <button 
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-borderColor rounded-md mt-18 cursor-pointer
                                bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300
                                shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    onClick={() => { navigate('/cars'); scrollTo(0, 0) }}
                >
                    استكشف جميع السيارات
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </AnimatedItem>
        </AnimatedContainer>
    )
}

export default FeaturedSection
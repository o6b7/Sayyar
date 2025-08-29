import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoNoBackground, menuLinks } from '../assets/assets'
import { Menu, Search, SidebarClose } from "lucide-react"
import { AnimatedContainer, AnimatedItem } from '../utils/animation/containerVariants'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const {setShowAuthModal, user, logout, isOwner, axios, setIsOwner} = useAppContext();

    const changeRole = async () => {
        try {
            const {data} = await axios.post(`/api/owner/change-role`)

            if (data.success) {
                setIsOwner(data.isOwner || true)
                toast.success(data.message)
                navigate('/owner');
            } else {
                toast.error(data.message)
            }
        } catch(err) {
            toast.error(err.response?.data?.message || err.message)
        }
    }

    return (
        <AnimatedContainer 
            className={`flex flex-row-reverse items-center justify-between px-6 md:px-16 lg:px-24
            xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all
            ${location.pathname === "/" && "bg-light"}`} 
            dir="rtl"
            scrollTrigger={false} 
        >
            {/* Left: Login + Dashboard */}
            <AnimatedItem className='flex items-center gap-4'>
                <div className='hidden sm:flex items-center gap-4'>

                        <AnimatedItem>
                            <button 
                                onClick={() => isOwner ? navigate('/owner') : changeRole()} 
                                className='cursor-pointer relative group'
                            >
                                {isOwner ? 'لوحة التحكم' : 'إضافة سيارة'}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </AnimatedItem>
                    
                    <AnimatedItem>
                        {user ? (
                            <button 
                                onClick={logout} 
                                className="cursor-pointer px-6 py-2 bg-primary
                                hover:bg-primary-dull transition-all duration-300 text-white rounded-lg
                                shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                تسجيل الخروج
                            </button>
                        ) : (
                            <button 
                                onClick={() => setShowAuthModal(true)} 
                                className="cursor-pointer px-6 py-2 bg-primary
                                hover:bg-primary-dull transition-all duration-300 text-white rounded-lg
                                shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                تسجيل الدخول
                            </button>
                        )}
                    </AnimatedItem>
                </div>

                {/* Mobile Menu Button */}
                <AnimatedItem>
                    <button 
                        onClick={() => setOpen(!open)} 
                        className='sm:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
                    >
                        {open ? <SidebarClose className="text-primary" /> : <Menu />}
                    </button>
                </AnimatedItem>
            </AnimatedItem>

            {/* Mobile Sidebar */}
            <AnimatedItem>
                <div className={`sm:hidden fixed top-16 left-0 w-full h-screen bg-white z-50 p-4
                transition-all duration-300 ease-in-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <AnimatedContainer scrollTrigger={false} >
                        <div className='flex flex-col gap-4 mt-4 text-center'>
                            {menuLinks.map((link) => (
                                <AnimatedItem key={link.name}>
                                    <Link 
                                        to={link.path} 
                                        onClick={() => setOpen(false)}
                                        className="py-2 px-4 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </AnimatedItem>
                            ))}
                        </div>

                        <AnimatedContainer scrollTrigger={false} className='flex flex-col gap-4 mt-4 items-center'>
                            
                        <AnimatedItem>
                            <button 
                                onClick={() => {
                                if (isOwner) {
                                    navigate('/owner'); 
                                    setOpen(false);
                                } else {
                                    changeRole();
                                }}}
                            className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors duration-200 text-center w-full max-w-xs'
                            >
                                {isOwner ? 'لوحة التحكم' : 'إضافة سيارة'}
                            </button>
                        </AnimatedItem>
                            
                            <AnimatedItem className="w-full flex justify-center">
                                <button 
                                    onClick={() => {
                                        user ? logout() : setShowAuthModal(true);
                                        setOpen(false);
                                    }} 
                                    className="cursor-pointer px-6 py-2 bg-primary
                                    hover:bg-primary-dull transition-all duration-300 text-white rounded-lg
                                    shadow-md hover:shadow-lg w-full max-w-xs"
                                >
                                    {user ? 'تسجيل الخروج' : 'تسجيل الدخول'}
                                </button>
                            </AnimatedItem>
                        </AnimatedContainer>
                    </AnimatedContainer>
                </div>
            </AnimatedItem>
            
            {/* Center: Links + Search */}
            <AnimatedItem className={`flex-1 flex justify-center`}>
                <AnimatedContainer scrollTrigger={false} className={`hidden sm:flex items-center gap-6`}>
                    {menuLinks.map((link) => (
                        <AnimatedItem key={link.name}>
                            <Link 
                                to={link.path}
                                className="relative group transition-all duration-200"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </AnimatedItem>
                    ))}

                </AnimatedContainer>
            </AnimatedItem>

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
        </AnimatedContainer>
    )
}

export default Navbar
import { 
  LayoutDashboard, 
  PlusCircle, 
  Car, 
  ListOrdered, 
  Edit, 
  Check, 
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { dummyUserData, ownerMenuLinks } from '../../assets/assets';
import { AnimatedContainer, AnimatedItem } from '../../utils/animation/containerVariants';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const {user, axios, fetchUser} = useAppContext();

  const updateImage = async (file) => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const {data} = await axios.post('/api/owner/update-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        await fetchUser();
        toast.success(data.message);
        setImage(null); 
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error(err.response?.data?.message || 'فشل في رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  }  
  
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      updateImage(file);
    }
  };

  const iconComponents = {
    'dashboard': <LayoutDashboard className="w-5 h-5" />,
    'dashboard-colored': <LayoutDashboard className="w-5 h-5 text-primary" />,
    'add-car': <PlusCircle className="w-5 h-5" />,
    'add-car-colored': <PlusCircle className="w-5 h-5 text-primary" />,
    'manage-cars': <Car className="w-5 h-5" />,
    'manage-cars-colored': <Car className="w-5 h-5 text-primary" />,
    'manage-bookings': <ListOrdered className="w-5 h-5" />,
    'manage-bookings-colored': <ListOrdered className="w-5 h-5 text-primary" />
  };

  // Safe navigation menu links with fallback
  const safeMenuLinks = Array.isArray(ownerMenuLinks) ? ownerMenuLinks : [];

  return (
    <AnimatedContainer 
      className={`flex flex-col h-screen bg-white border-l border-borderColor transition-all duration-300 ease-in-out  top-0 right-0 z-40
        ${isCollapsed ? 'w-20' : 'lg:w-64 md:w-100 w-100'}`}
      dir="rtl"
      scrollTrigger={true}
    >
      {/* Collapse Button */}
      <div className="fixed bottom-4 right-5 z-50">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-light hover:bg-primary/10 transition-colors shadow-sm"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5 text-primary" />
          ) : (
            <PanelLeftClose className="h-5 w-5 text-primary" />
          )}
        </button>
      </div>

      {/* User Profile */}
      <AnimatedItem className="flex flex-col items-center py-6 border-b border-borderColor" scrollTrigger={true}>
        <div className="group relative">
          <label htmlFor="image" className="cursor-pointer">
            <img 
              src={
                image ? URL.createObjectURL(image) : 
                user?.image || dummyUserData.image
              } 
              alt="صورة المستخدم" 
              className={`rounded-full object-cover border-2 border-primary/20 transition-all
                ${isCollapsed ? 'w-12 h-12' : 'w-16 h-16'}`}
              onError={(e) => {
                e.target.src = dummyUserData.image;
              }}
            />
            <input 
              type="file" 
              id="image" 
              accept="image/*" 
              hidden 
              disabled={isUploading}
              onChange={handleImageChange}
            />
            {!isUploading && (
              <div className="absolute inset-0 bg-black/10 rounded-full hidden group-hover:flex items-center justify-center">
                <Edit className="w-4 h-4 text-white" />
              </div>
            )}
          </label>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <AnimatedContainer scrollTrigger={true}>
            <AnimatedItem scrollTrigger={true}>
              <div className="mt-3 text-center">
                <h3 className="font-bold text-dark text-sm">{user?.name || "المالك"}</h3>
                <p className="text-xs text-gray-500 mt-1">{user?.email || ""}</p>
              </div>
            </AnimatedItem>
          </AnimatedContainer>
        )}
      </AnimatedItem>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <AnimatedContainer className="space-y-1 p-2" scrollTrigger={true}>
          {safeMenuLinks.map((link, index) => (
            <AnimatedItem key={link.path || index} scrollTrigger={true} transition={{ delay: index * 0.1 }}>
              <NavLink
                to={link.path || '/'}
                end
                onClick={() => setIsCollapsed(true)}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-600 hover:bg-light'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive ? iconComponents[link.coloredIcon] : iconComponents[link.icon]}
                    {!isCollapsed && <span className="text-sm">{link.name}</span>}
                  </>
                )}
              </NavLink>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </nav>
    </AnimatedContainer>
  );
};

export default Sidebar;
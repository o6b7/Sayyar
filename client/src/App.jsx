// App.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Layout from './pages/owner/Layout';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import AuthModal from './components/Login';
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext';

const App = () => {
  const {showAuthModal, setShowAuthModal, isOwnerPath} = useAppContext();

  return (
    <>
      <Toaster />

      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal}/>}

      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />

        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} /> 
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} /> 
        </Route>
      </Routes>
      
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default App
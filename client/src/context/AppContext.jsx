import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import saudi_riyal_white from "../assets/saudi_riyal_white.png";
import saudi_riyal_black from "../assets/saudi_riyal_black.png";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const currency_white = saudi_riyal_white;
    const currency_black = saudi_riyal_black;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pickup_date, set_pickup_date] = useState(''); 
    const [return_date, set_return_date] = useState('');
    const [pickup_location, set_pickup_location] = useState(''); 
    const [cars, setCars] = useState([]);
    const isOwnerPath = useLocation().pathname.startsWith('/owner');

    // Check if user is logged in
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }            
        } catch (error) {
            // Only show error if it's not a 401 (unauthorized)
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || error.message);
            }
            // You might want to set some default cars or empty array here
            setCars([]);
        }
    }

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '';
        toast.success('تم تسجيل الخروج بنجاح');
        navigate('/');
    }

    // useEffect to retrieve the token from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, []);

    // useEffect to fetch user data and cars when token is available
    useEffect(() => {
        if (token) {
            fetchUser();
            fetchCars();
        } else {
            fetchCars(); 
        }
    }, [token]);


    const value = {
        navigate,
        currency_white,
        currency_black,
        token,
        setToken,
        user,
        setUser,
        isOwner,
        setIsOwner,
        showAuthModal,
        setShowAuthModal,
        pickup_date,
        set_pickup_date,
        return_date,
        set_return_date,
        pickup_location, 
        set_pickup_location, 
        cars,
        setCars,
        fetchUser,
        fetchCars,
        logout,
        isOwnerPath,
        axios
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}
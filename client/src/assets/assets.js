import main_carr from "../assets/main_car.jpg"
import banner_car_imagee from "../assets/banner_car_image.png"
import saudi_riyal_white from "../assets/saudi_riyal_white.png"
import saudi_riyal_black from "../assets/saudi_riyal_black.png"

import toyota_camry from "./cars/toyota-camry.jpg";
import hyundai_elantra from "./cars/hyundai-elantra.jpg";
import nissan_sunny from "./cars/nissan-sunny.jpg";
import ford_explorer from "./cars/ford-explorer.jpg";
import chevrolet_malibu from "./cars/chevrolet-malibu.jpg";
import toyota_hilux from "./cars/toyota-hilux.png";
import hyundai_tucson from "./cars/hyundai-tucson.jpg";
import kia_sportage from "./cars/kia-sportage.jpeg";

import personal_photo from "./profile.png";

export const logo = "/logo.png";
export const logoNoBackground = "/logo-no-background.png";

export const main_car = main_carr;
export const banner_car_image = banner_car_imagee;

export const currency_white = saudi_riyal_white;
export const currency_black = saudi_riyal_black;


export const menuLinks =[
  {name: "الصفحة الرئيسية", path: "/"},
  {name: "السيارات", path: "/cars"},
  {name: "حجوزاتي", path: "/my-bookings"}
]

export const dummyUserData = {
  name: "قصي عبدالله",
  image: personal_photo,
};

export const ownerMenuLinks = [
  { 
    name: "لوحة التحكم", 
    path: "/owner", 
    icon: "dashboard",
    coloredIcon: "dashboard-colored" 
  },
  { 
    name: "إضافة سيارة", 
    path: "/owner/add-car", 
    icon: "add-car",
    coloredIcon: "add-car-colored" 
  },
  { 
    name: "إدارة السيارات", 
    path: "/owner/manage-cars", 
    icon: "manage-cars",
    coloredIcon: "manage-cars-colored" 
  },
  { 
    name: "إدارة الحجوزات", 
    path: "/owner/manage-bookings", 
    icon: "manage-bookings",
    coloredIcon: "manage-bookings-colored" 
  },
];

export const cityList = [
    "أبها", "أبو عريش", "أبو قعر", "أحد رفيده", "أضم", "ام الساهك", "ام القيوين", 
    "الباحة", "البدائع", "الجبيل", "الجموم", "الخرج", "الخبر", "الخبراء", "الخضراء", 
    "الخفجي", "الخفس", "الخرمة", "الخريبة", "الخوبة", "الدرب", "الدرعية", "الدلم", 
    "الدوادمي", "الدمام", "الرس", "الرياض", "الزلفي", "السليل", "الشنان", "الشماسية", 
    "الظهران", "الطائف", "العارض", "العرضيات", "العلا", "العويقيلة", "الغاط", "الغزالة", 
    "الفيصلية", "الفريش", "الفويلق", "القنفذة", "القوز", "القريات", "القطيف", "القرين", 
    "المبرز", "المجاردة", "المجمعة", "المذنب", "المدينة المنورة", "المظيلف", "المعظم", 
    "المخواة", "المخرم", "الملاحة", "المنطقة", "المندق", "النماص", "النعيرية", "النباك", 
    "الوجه", "الوجاج", "بدر", "بريدة", "بقيق", "بقعاء", "بلجرشي", "بني عمرو", "بيشة", 
    "تبوك", "تثليث", "تاروت", "تندحة", "تيماء", "ثادق", "ثول", "جازان", "جبل شدا", "جدة", 
    "حائل", "حريملاء", "حقل", "حوطة بني تميم", "خباش", "خميس مشيط", "خيبر", "دومة الجندل", 
    "رابغ", "رأس تنورة", "رنية", "زلفة", "ساجر", "سكاكا", "شرورة", "شرائع المجاهدين", 
    "شقراء", "صبيا", "صامطة", "ضباء", "ضرما", "ضرية", "طبرجل", "طريف", "ظهران الجنوب", 
    "عرعر", "عفيف", "عنيزة", "عنك", "غرمول", "فيد", "قرية العليا", "قبة", "قيالين", "كبد", 
    "محايل", "محافظة النبهانية", "مكة المكرمة", "مهد الذهب", "مليجة", "نجران", "نجد", 
    "وادي الدواسر", "وادي الفرع", "هدية", "الهياثم", "ينبع", "ابار قنا", "الحائر", "الحجرة", 
    "الحريق", "الحوطة", "الحويطة", "الحناكية"
];

export const dummyCarData = [
  {
    _id: 1,
    image: toyota_camry,
    isAvailable: true,
    pricePerDay: 250,
    brand: "تويوتا",
    model: "كامري",
    category: "سيدان",
    year: 2022,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "الرياض",
    description: "تويوتا كامري 2022 تجمع بين الأناقة والراحة، مثالية للتنقلات اليومية والرحلات الطويلة بفضل استهلاكها الاقتصادي للوقود."
  },
  {
    _id: 2,
    image: hyundai_elantra,
    isAvailable: true,
    pricePerDay: 200,
    brand: "هيونداي",
    model: "إلنترا",
    category: "سيدان",
    year: 2023,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "جدة",
    description: "إلنترا 2023 توفر أداءً ديناميكياً مع تصميم عصري وتقنيات متقدمة، خيار مثالي للقيادة في المدينة."
  },
  {
    _id: 3,
    image: nissan_sunny,
    isAvailable: false,
    pricePerDay: 180,
    brand: "نيسان",
    model: "صنّي",
    category: "سيدان",
    year: 2021,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "الدمام",
    description: "نيسان صني 2021 سيارة عملية واقتصادية بامتياز، مثالية للاستخدام اليومي بتكلفة منخفضة."
  },
  {
    _id: 4,
    image: ford_explorer,
    isAvailable: true,
    pricePerDay: 350,
    brand: "فورد",
    model: "إكسبلورر",
    category: "دفع رباعي",
    year: 2023,
    seating_capacity: 7,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "الرياض",
    description: "فورد إكسبلورر 2023 تجمع بين القوة والرحابة، مناسبة للعائلات الكبيرة ولمغامرات الطرق الوعرة."
  },
  {
    _id: 5,
    image: chevrolet_malibu,
    isAvailable: true,
    pricePerDay: 220,
    brand: "شفروليه",
    model: "ماليبو",
    category: "سيدان",
    year: 2022,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "مكة المكرمة",
    description: "شفروليه ماليبو توفر قيادة سلسة وتجربة راقية، مثالية للراغبين في الراحة والأداء."
  },
  {
    _id: 6,
    image: toyota_hilux,
    isAvailable: true,
    pricePerDay: 300,
    brand: "تويوتا",
    model: "هايلكس",
    category: "بيك أب",
    year: 2023,
    seating_capacity: 5,
    fuel_type: "ديزل",
    transmission: "أوتوماتيك",
    location: "الطائف",
    description: "تويوتا هايلكس 2023 تتميز بالاعتمادية والقوة، مثالية للأعمال الشاقة والطرق الوعرة."
  },
  {
    _id: 7,
    image: hyundai_tucson,
    isAvailable: false,
    pricePerDay: 280,
    brand: "هيونداي",
    model: "توسان",
    category: "دفع رباعي",
    year: 2022,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "المدينة المنورة",
    description: "هيونداي توسان 2022 توفر تجربة قيادة مريحة ومساحة داخلية واسعة مع تقنيات أمان حديثة."
  },
  {
    _id: 8,
    image: kia_sportage,
    isAvailable: true,
    pricePerDay: 270,
    brand: "كيا",
    model: "سبورتاج",
    category: "دفع رباعي",
    year: 2023,
    seating_capacity: 5,
    fuel_type: "بنزين",
    transmission: "أوتوماتيك",
    location: "الخبر",
    description: "كيا سبورتاج 2023 تجمع بين التصميم العصري والراحة والأداء الممتاز في جميع الظروف."
  }
];


export const testimonials = [
  {
    id: 1,
    name: "Ahmed Al-Saadi",
    role: "مستأجر",
    address: "Riyadh, Saudi Arabia",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
    quote: "سيَّار غيرت طريقة تأجير السيارات بالنسبة لي. الخدمة سريعة والموثوقية عالية!"
  },
  {
    id: 2,
    name: "Sarah Mohammed",
    role: "مؤجر",
    address: "Jeddah, Saudi Arabia",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 4,
    quote: "تجربة رائعة! السيارات نظيفة والدفع سهل. أوصي بهم لأي شخص يبحث عن تأجير سيارات فاخرة."
  },
  {
    id: 3,
    name: "Sarah Mohammed",
    role: "مستأجر",
    address: "Jeddah, Saudi Arabia",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 4,
    quote: "تجربة رائعة! السيارات نظيفة والدفع سهل. أوصي بهم لأي شخص يبحث عن تأجير سيارات فاخرة."
  },
  {
    id: 4,
    name: "Sarah Mohammed",
    role: "مؤجر",
    address: "Jeddah, Saudi Arabia",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 4,
    quote: "تجربة رائعة! السيارات نظيفة والدفع سهل. أوصي بهم لأي شخص يبحث عن تأجير سيارات فاخرة."
  },
  {
    id: 5,
    name: "Khalid Al-Farsi",
    role: "مستأجر",
    address: "Dammam, Saudi Arabia",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    stars: 5,
    quote: "أفضل تطبيق لتأجير السيارات في المنطقة. الدعم الفني ممتاز والخصومات رائعة!"
  }
];

export const dummyBookingsData = [
  {
    _id: 1,
    car: dummyCarData[0], 
    pickupLocation: "الرياض",
    startDate: "2023-06-15",
    endDate: "2023-06-20",
    totalDays: 6,
    totalPrice: 1500,
    status: "مكتمل",
    paymentMethod: "بطاقة ائتمان",
    bookingDate: "2023-06-10"
  },
  {
    _id: 2,
    car: dummyCarData[3], 
    pickupLocation: "جدة",
    startDate: "2023-07-01",
    endDate: "2023-07-07",
    totalDays: 7,
    totalPrice: 2450,
    status: "قيد التنفيذ",
    paymentMethod: "تحويل بنكي",
    bookingDate: "2023-06-25"
  },
  {
    _id: 3,
    car: dummyCarData[5], 
    pickupLocation: "الطائف",
    startDate: "2023-08-10",
    endDate: "2023-08-15",
    totalDays: 6,
    totalPrice: 1800,
    status: "ملغي",
    paymentMethod: "بطاقة ائتمان",
    bookingDate: "2023-07-30",
    cancellationReason: "تغيير في الخطط"
  },
  {
    _id: 4,
    car: dummyCarData[2], 
    pickupLocation: "الدمام",
    startDate: "2023-09-05",
    endDate: "2023-09-10",
    totalDays: 6,
    totalPrice: 1080,
    status: "مكتمل",
    paymentMethod: "بطاقة ائتمان",
    bookingDate: "2023-08-20"
  },
  {
    _id: 5,
    car: dummyCarData[7], 
    pickupLocation: "الخبر",
    startDate: "2023-10-01",
    endDate: "2023-10-05",
    totalDays: 5,
    totalPrice: 1350,
    status: "قيد التنفيذ",
    paymentMethod: "الدفع عند الاستلام",
    bookingDate: "2023-09-15"
  }
];

export const dummyDashboardData = {
  totalCars: 8,
  totalBookings: 24,
  pendingBookings: 5,
  completedBookings: 19,
  monthlyRevenue: 18500,
  recentBookings: [
    {
      _id: 1,
      car: {
        brand: "تويوتا",
        model: "كامري",
        image: toyota_camry
      },
      price: 1500,
      status: "مكتمل",
      createdAt: "2023-06-20T10:30:00Z"
    },
    {
      _id: 2,
      car: {
        brand: "فورد",
        model: "إكسبلورر",
        image: ford_explorer
      },
      price: 2450,
      status: "قيد التنفيذ",
      createdAt: "2023-07-07T14:45:00Z"
    },
    {
      _id: 3,
      car: {
        brand: "نيسان",
        model: "صنّي",
        image: nissan_sunny
      },
      price: 1080,
      status: "مكتمل",
      createdAt: "2023-09-10T09:15:00Z"
    },
    {
      _id: 4,
      car: {
        brand: "كيا",
        model: "سبورتاج",
        image: kia_sportage
      },
      price: 1350,
      status: "قيد التنفيذ",
      createdAt: "2023-10-05T16:20:00Z"
    },
    {
      _id: 5,
      car: {
        brand: "هيونداي",
        model: "توسان",
        image: hyundai_tucson
      },
      price: 1680,
      status: "ملغي",
      createdAt: "2023-08-15T11:10:00Z"
    }
  ]
};
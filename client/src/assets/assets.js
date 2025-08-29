import main_carr from "../assets/main_car.jpg"
import banner_car_imagee from "../assets/banner_car_image.png"
import saudi_riyal_white from "../assets/saudi_riyal_white.png"
import saudi_riyal_black from "../assets/saudi_riyal_black.png"

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

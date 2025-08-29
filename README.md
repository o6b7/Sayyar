# 🚗 Sayyar (سيَّار) – Car Rental Platform

Sayyar (**سيَّار** in Arabic, meaning *“car”*) is a modern **Car Rental Web Application** built with the **MERN stack**. It provides a seamless and intuitive experience for users to **browse, book, and manage car rentals** while giving admins and owners tools to manage their fleets efficiently.  

This project is designed with **performance, scalability, and user experience** in mind, using technologies such as **MongoDB, Express.js, React, Node.js, TailwindCSS**, and **ImageKit** for optimized image storage and delivery.

---

## 🌟 Features

### 🔑 User Features
- **Browse Cars** – Search and filter cars by name, category, availability, and price.  
- **Search & Filter** – Dynamic car search with live results.  
- **Car Booking** – Rent cars for specific dates with availability checks.  
- **Authentication & Authorization** – Secure sign-up/login system with JWT.  
- **Profile Management** – Update user profile and view booking history.  
- **Responsive UI** – Mobile-first design with TailwindCSS and Framer Motion animations.  

### 🛠️ Admin/Owner Features
- **Car Management** – Add, edit, and remove cars with details (name, price, availability).  
- **Booking Management** – View and manage customer bookings.  
- **Image Management** – Cars images uploaded and optimized with **ImageKit**.  
- **Secure Routes** – Protected API endpoints with role-based access control.  

---

## 🖼️ Tech Stack

| Layer        | Technology Used |
|--------------|-----------------|
| **Frontend** | React.js, TailwindCSS, Framer Motion |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Image Storage** | ImageKit |
| **Deployment** | Vercel (Frontend & Backend), MongoDB Atlas |

---

## 📂 Project Structure

```

Sayyar/
│── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (CarCard, Navbar, etc.)
│   │   ├── pages/          # React pages (Home, Booking, Profile, Admin)
│   │   ├── utils/          # Helper functions (API calls, animations)
│   │   ├── App.jsx         # Main app
│   │   └── index.js
│   └── package.json
│
│── server/                 # Backend (Node.js + Express)
│   ├── models/             # MongoDB models (User, Car, Booking)
│   ├── routes/             # Express routes (auth, cars, bookings)
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth & error handling middleware
│   ├── server.js           # Express app entry
│   └── package.json
│
├── README.md
├── .env.example            # Example environment variables
└── package.json

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/o6b7/Sayyar.git
cd Sayyar
````

### 2️⃣ Setup Environment Variables

Create a `.env` file in the **server** directory with the following:

```env
MONGO_URI=your-mongodb-atlas-url
JWT_SECRET=your-secret-key
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=your-imagekit-endpoint
```

### 3️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 4️⃣ Run Development Servers

#### Run Backend

```bash
cd server
npm run dev
```

#### Run Frontend

```bash
cd client
npm start
```

The app should now be running at:

* **Frontend:** `http://localhost:3000`
* **Backend:** `http://localhost:5000`

---

## 🚀 Deployment

* **Frontend:** Deploy with [Vercel](https://vercel.com/)
* **Backend:** Deploy with [Vercel](https://vercel.com/)
* **Database:** MongoDB Atlas for cloud database
* **Images:** ImageKit for storage and delivery

---

## 🔒 Authentication Flow

1. User registers/logs in → JWT issued
2. JWT stored securely (HTTP-only cookie or local storage)
3. Protected routes verified via middleware
4. Role-based access: `user`, `owner`

---

## 🎨 UI/UX Highlights

* **TailwindCSS** for responsive styling
* **Framer Motion** for smooth animations
* **Clean Dashboard** for managing cars & bookings

---

## 📸 Screenshots

<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 14 19 PM" src="https://github.com/user-attachments/assets/4c6a1e77-7d59-45a4-b727-5768af90072d" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 14 16 PM" src="https://github.com/user-attachments/assets/d8e480c3-7d37-4c64-a76d-0ce886c54415" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 14 05 PM" src="https://github.com/user-attachments/assets/ee91fd27-99a2-40f0-b512-7ed36252955f" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 13 47 PM" src="https://github.com/user-attachments/assets/ebaa1bf5-ada7-4acd-87ad-1ced0f66970c" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 13 22 PM" src="https://github.com/user-attachments/assets/58540a3a-f564-4856-8cbf-433a8c41a2f0" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 13 09 PM" src="https://github.com/user-attachments/assets/afcc0deb-34a2-4bde-bda2-446b42959120" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 13 00 PM" src="https://github.com/user-attachments/assets/a89a3406-a6cf-494a-a777-43c8ec5aae10" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 12 55 PM" src="https://github.com/user-attachments/assets/84eb7512-12f8-43fe-aa64-459bc1a98a12" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 12 31 PM" src="https://github.com/user-attachments/assets/bb25b606-3752-4f94-aa8c-49dec49db972" />
<img width="1421" height="815" alt="Screenshot 2025-08-29 at 8 06 59 PM" src="https://github.com/user-attachments/assets/5d35e500-3ec7-4ac9-97ff-f9e4009d46c0" />

---

## 🛡️ Future Enhancements

* ✅ Payment Integration (Stripe/PayPal)
* ✅ Real-time Booking Notifications
* ✅ Multi-language Support (Arabic + English)
* ✅ Ratings & Reviews System
* ✅ AI-powered Car Suggestions

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit pull requests.

---

## 👨‍💻 Author

**Sayyar (سيَّار) Project**
Developed by [Qusai Abdullah](https://github.com/o6b7)
LinkedIn (https://www.linkedin.com/in/qusaiabdullah/)
Portfolio (https://qusaiabdullah-c6624.web.app)

```

---

⚡Would you like me to also **add professional GitHub badges (shields.io)** for technologies, license, build, etc. at the very top? That will make it stand out even more.
```

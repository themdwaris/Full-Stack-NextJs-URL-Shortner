# URL Shortener App

A powerful and modern full-stack URL Shortener web application built using **Next.js**, **MongoDB**, and **Tailwind CSS**, with user authentication, click tracking, QR code generation, and a sleek UI.

---

## 🔥 Features

* ✅ User authentication (manual JWT-based login/signup)
* ✅ Shorten long URLs with a custom short code
* ✅ Track total clicks
* ✅ Click statistics over time (date, time, IP, city, region)
* ✅ Visual stats via Chart.js (Bar & Line Chart)
* ✅ Copy short URL to clipboard
* ✅ QR code generation & download
* ✅ Dark/light theme support via `next-themes`
* ✅ Secure delete for only authenticated user's own links
* ✅ Fully responsive UI using Tailwind CSS

---

## 🚀 Tech Stack

**Frontend:**

* Next.js (App Router)
* Tailwind CSS
* Chart.js (`react-chartjs-2`)
* next-themes
* html-to-image

**Backend:**

* Next.js API routes
* MongoDB (Mongoose)
* JWT for auth (manual handling)
* IP Geolocation via ipapi.co

---

## 🗂 Folder Structure

```
├── app
│   ├── api
│   │   ├── shorten            # POST to shorten URL
│   │   └── [shortCode]       # GET for redirection, DELETE for deletion
│   ├── dashboard             # Protected dashboard
│   ├── login / register      # Auth pages
│   └── layout.js             # Global layout with ThemeProvider
├── components
│   ├── DarkModeToggle.js     # Theme switch
│   ├── Hero.js               # Main landing page form
│   ├── URLCard.js            # Card to display each shortened URL
│   ├── Stats.js              # Chart.js visualisation
│   ├── StatsPopup.js         # Popup wrapper
│   └── Footer.js             # Footer
├── context
│   └── urlContext.js         # URL fetch context
├── model
│   └── urlModel.js           # Mongoose URL + ClickStats schema
├── utils
│   └── auth.js               # getCurrentUser helper
├── config
│   └── db.js                 # MongoDB connection setup
├── public
│   └── favicon.ico etc.
├── .env.local                # Local env vars
├── tailwind.config.js        # Tailwind setup
└── README.md
```

---

## ⚙️ How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/url-shortener-app.git
cd url-shortener-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the dev server

```bash
npm run dev
```

### 5. Open in browser

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment (Vercel)

* Push code to GitHub
* Connect GitHub repo with [Vercel](https://vercel.com/)
* Add your env variables in Vercel → Project Settings → Environment Variables
* Redeploy after adding the live domain to `NEXT_PUBLIC_API_URL`

---

## 🙌 Author

**Mohammad Waris**
Feel free to reach out for improvements, issues, or collaborations!


# 🎓 SkillStack — Modern Full-Stack Learning Management System

> A production-grade, enterprise-ready Learning Management System (LMS) featuring DRM-protected video streaming, dual-token JWT authentication, real-time WebSockets notification system, Redis session caching, rolling 12-month analytics, and seamless Stripe payment integration.

---

## 📌 Overview

**SkillStack** is a full-stack e-learning platform built to provide a modern, secure, and performant environment for online course delivery. It bridges the gap between content creators who need robust protection for their intellectual property and students seeking an intuitive, uninterrupted learning experience.

### 💡 The Problem It Solves
1. **Video Piracy & IP Theft:** Standard HTTP video links can be easily extracted, downloaded, and distributed illegally. SkillStack integrates VdoCipher DRM to provide dynamic OTP authentication and encrypted stream delivery, preventing unauthorized video downloads.
2. **High Latency & DB Overload:** LMS platforms suffer from high read loads when thousands of students view course content concurrently. SkillStack incorporates Redis session & content caching to reduce MongoDB queries by up to 80%.
3. **Session Hijacking & Insecure Tokens:** Plain local-storage JWTs expose users to XSS attacks. SkillStack implements dual-token HTTP-only cookie-based authentication with Redis session tracking and automatic token rotation.
4. **Delayed Notification Delivery:** Course announcements, question replies, and order updates often get lost in email. SkillStack combines real-time Socket.io WebSocket events with automated background email delivery (Nodemailer + EJS templates).

### 👥 Target Audience
- **Students:** Interactive course access, DRM video player with resolution controls, Q&A discussion threads, rating & review systems, and personal learning dashboard.
- **Instructors & Admins:** Full curriculum builder, content management system (CMS), role-based user management, revenue & enrollment analytics, and customizable platform layout (Hero, FAQs, Categories).

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Dual-Token JWT Security:** Short-lived `accessToken` and long-lived `refreshToken` delivered via HTTP-only, `sameSite: "none"` secure cookies.
- **Email & OTP Activation:** 4-digit numeric activation code generated via JWT and delivered through Nodemailer with custom EJS HTML email templates.
- **Social OAuth Integration:** Google and GitHub single sign-on (SSO) using NextAuth.js on the client, mapped seamlessly to backend social user provisioning.
- **Role-Based Access Control (RBAC):** Middleware-enforced route protection separating `user` and `admin` permissions.

### 📚 Student Experience
- **Course Discovery & Filtering:** Browse public courses, filter by categories, levels, and keywords with optimized response times.
- **Interactive Course Workspace:** Clean side-by-side interface featuring a video player, section accordion, lesson selector, and multi-tab resource views.
- **DRM Video Playback:** Watermarked, encrypted video streams powered by VdoCipher with dynamic short-lived OTP generation.
- **Q&A & Discussion Forums:** Lesson-specific Q&A threads allowing students to ask questions and receive email notifications when instructors or peers reply.
- **Rating & Reviews:** Enrolled students can rate courses and post detailed reviews; course average ratings update automatically.
- **Resource Downloads:** Access lesson attachments, reference links, and downloadable materials directly inside the lesson workspace.

### 🛠️ Admin & Instructor Tools
- **Multi-Stage Curriculum Builder:** 5-step intuitive wizard for course creation (Course Information, Prerequisites & Benefits, Section/Lesson Builder, Content Preview, & Pricing Options).
- **Platform Customization (CMS):** Dynamically edit platform Hero text/images, Category listings, and FAQ accordions directly from the admin dashboard.
- **User & Team Management:** Searchable data tables to inspect registered users, change roles (user <-> admin), or delete accounts.
- **Invoice & Order Management:** Comprehensive transaction records with student details, purchase timestamps, and payment statuses.

### 💳 Payments & Automated Enrollment
- **Stripe Payment Gateway:** Fully integrated with Stripe React Elements (`PaymentElement` and `LinkAuthenticationElement`).
- **Server-Side Payment Verification:** Backend retrieves `PaymentIntent` status directly from Stripe API before granting course access.
- **Instant Enrollment:** Automated course entitlement, user document updates, Redis cache invalidation, and automated order confirmation email dispatch upon successful checkout.

### 🛡️ Video Security & DRM Protection
- **VdoCipher OTP Integration:** Video URLs are never exposed to the client. The backend requests dynamic playback OTPs (`ttl: 300s`) from VdoCipher.
- **Encrypted Media Playback:** Videos are rendered inside secure, encrypted iframe containers with anti-piracy protection.

### 📊 Analytics & Reporting
- **Rolling 12-Month Analytics:** Custom aggregation engine calculating monthly totals, averages, and peak performance for Users, Courses, and Revenue.
- **Visual Dashboards:** Rendered using Recharts with Area, Bar, and Line visualizations for real-time business insights.

### ⚡ Real-Time Features
- **Socket.io WebSockets:** Live event broadcasting for new order purchases and Q&A updates.
- **Admin Audio Notifications:** Audio alerts accompanied by unread badges and drop-down notification management.
- **Automated Cron Cleanups:** Midnight Node-Cron job automatically purging unread notifications older than 30 days.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Custom CSS Tokens, Next-Themes (Dark/Light mode support)
- **UI Components:** Shadcn UI (Radix UI primitives), Lucide React Icons, React Icons
- **State Management:** Redux Toolkit & RTK Query
- **Authentication Client:** NextAuth.js v4 (Google & GitHub OAuth)
- **Form Handling:** Formik, React Hook Form, Yup, Zod validation
- **Payments Client:** `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Real-Time Client:** `socket.io-client`
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js v5 (with `express-async-handler`)
- **Language:** TypeScript (`tsx` dev runner, `tsc` compiler)
- **Database:** MongoDB via Mongoose v8
- **Caching:** Redis via `ioredis` v5
- **Authentication:** `jsonwebtoken`, `bcryptjs`, `cookie-parser`
- **Email Service:** Nodemailer, EJS Templates, `@sendgrid/mail`
- **Media Storage:** Cloudinary SDK v2
- **Video Security:** VdoCipher API integration (Axios HTTP client)
- **Payments Server:** Stripe Node SDK v19
- **Scheduling:** `node-cron`
- **WebSockets Server:** `socket.io` v4

---

## 🏗️ System Architecture

```
                                  +-----------------------+
                                  |     Next.js Client    |
                                  |  (App Router / React) |
                                  +-----------+-----------+
                                              |
                        +---------------------+---------------------+
                        |                                           |
             REST API (Axios / RTK Query)                   WebSockets (Socket.io)
                        |                                           |
                        v                                           v
            +-----------------------+                   +-----------------------+
            |   Express API Server  | <-----------------|    Socket.io Server   |
            |     (TypeScript)      |                   +-----------------------+
            +-----------+-----------+
                        |
       +----------------+----------------+----------------+----------------+
       |                |                |                |                |
       v                v                v                v                v
+--------------+ +--------------+ +--------------+ +--------------+ +--------------+
|   MongoDB    | |    Redis     | |  Cloudinary  | |  VdoCipher   | |    Stripe    |
| (Mongoose)   | |  (Sessions)  | |   (Images)   | |  (DRM Video) | |  (Payments)  |
+--------------+ +--------------+ +--------------+ +--------------+ +--------------+
```

### 1. Authentication Flow
```
User -> POST /api/v1/users/login -> Verify Password (bcrypt) -> Generate Access + Refresh Token
                                                                   |
                                                                   v
                                                     Store Session in Redis (7 Days)
                                                                   |
                                                                   v
                                                     Set HTTP-Only Cookies in Response
```

### 2. Payment & Enrollment Workflow
```
Client -> Request Payment Intent (/api/v1/orders/new-payment) -> Stripe API
                                                                      |
User Completes Payment -> Client Calls /api/v1/orders/create-order ---+
                                  |
                                  v
                  Verify PaymentIntent Status (Stripe SDK)
                                  |
                                  v
              Update User Enrolled Courses & Course Order Count
                                  |
                                  +---> Invalidate Redis Caches (allCourses, userSession)
                                  +---> Dispatch Order Email (Nodemailer + EJS)
                                  +---> Emit Socket.io 'notification' Event to Admin
```

### 3. DRM Video Streaming Workflow
```
Student Requests Lesson Video -> POST /api/v1/courses/getVdoCipherOTP (videoId)
                                                |
                                                v
                             Express Server -> POST VdoCipher API
                             (Auth: Apisecret VDOCIPHER_API_SECRET, ttl: 300)
                                                |
                                                v
                             Returns { otp, playbackInfo }
                                                |
                                                v
                             Client Renders Iframe Player:
     https://player.vdocipher.com/v2/?otp={otp}&playbackInfo={playbackInfo}
```

---

## 📁 Project Structure

```
SkillStack/
├── client/                      # Next.js 15 Frontend Application
│   ├── src/
│   │   ├── app/                 # Next.js App Router Routes
│   │   │   ├── (home)/          # Student & Public Layout (Landing, Courses, Profile, Course Access)
│   │   │   │   ├── course-access/ # Interactive Lesson & Video Player Workspace
│   │   │   │   ├── courses/     # Public Course Listing & Single Course Details
│   │   │   │   └── profile/     # User Account & Enrolled Courses Dashboard
│   │   │   ├── admin/           # Protected Admin Dashboard Pages
│   │   │   │   ├── courses/     # Course Table & Curriculum Editor
│   │   │   │   ├── courses-analytics/ # Recharts Course Metrics
│   │   │   │   ├── create-course/# 5-Stage Step-by-Step Wizard
│   │   │   │   ├── invoices/    # Order Receipts & Invoices Table
│   │   │   │   └── users/       # Role Management & User Control
│   │   │   ├── api/auth/        # NextAuth.js API Handlers (Google/GitHub)
│   │   │   ├── globals.css      # Tailwind v4 Configuration & Modern CSS Tokens
│   │   │   └── layout.tsx       # Root Layout & Redux Provider Wrapper
│   │   ├── components/
│   │   │   ├── features/        # Feature-Specific UI Components
│   │   │   │   ├── admin/       # Analytics, CMS, Course Builder, Invoices, User Tables
│   │   │   │   ├── auth/        # Login Modal, Signup Modal, Verification Dialog
│   │   │   │   ├── course/      # Course Card, Single Course View, CourseAccessSection
│   │   │   │   └── payment/     # Stripe Checkout Form & Payment Dialog
│   │   │   ├── shared/          # Reusable Components (Header, Footer, CoursePlayer, Sidebar)
│   │   │   └── ui/              # Base UI primitives & Spinners
│   │   ├── redux/               # Redux Toolkit State Management
│   │   │   ├── features/        # RTK Query API Slices (auth, course, order, user, analytics)
│   │   │   └── store.ts         # Centralized Redux Store & App Initialization
│   │   ├── shadcn/              # Custom Shadcn UI Components
│   │   └── utils/               # Client Helper Functions & Date Formatters
│   ├── package.json
│   └── tsconfig.json
│
└── server/                      # Express v5 Backend Application
    ├── controllers/             # Request Handlers (User, Course, Order, Analytics, Layout, Notification)
    ├── mails/                   # EJS HTML Email Templates (activation, order, Q&A reply)
    ├── middleware/              # Auth Protection, Role Authorization, Global Error Handler
    ├── models/                  # Mongoose Schemas (User, Course, Order, Notification, Layout)
    ├── routes/                  # Express Route Registrations
    ├── services/                # Business Logic & Database Service Layers
    ├── utils/                   # Redis Client, JWT Signer, Nodemailer SMTP, Analytics Generator
    ├── app.ts                   # Express Application Configuration & Middleware Assembly
    ├── server.ts                # HTTP Server Entry Point & Socket.io Initialization
    ├── socketServer.ts          # Socket.io Event Handling & Broadcasting Logic
    ├── package.json
    └── tsconfig.json
```

---

## 🗄️ Database Design

```
+------------------------------------+       +------------------------------------+
|               User                 |       |               Course               |
+------------------------------------+       +------------------------------------+
| _id: ObjectId                      |       | _id: ObjectId                      |
| name: String                       |       | name: String                       |
| email: String (Unique)             |       | description: String                |
| password: String (Hashed, Select)  |       | category: String                   |
| role: String ("user"|"admin")      |       | price: Number                      |
| isVerified: Boolean                |       | discountedPrice: Number            |
| avatar: { public_id, url }         |       | thumbnail: { public_id, url }      |
| provider: "manual"|"google"|"github|       | tags: String                       |
| courses: [{ courseId: String }] ---+---+   | level: String                      |
+------------------------------------+   |   | demoUrl: String                    |
                                         |   | benefits: [{ title: String }]      |
                                         |   | prerequisites: [{ title: String }]|
+------------------------------------+   |   | ratings: Number                    |
|               Order                |   |   | purchased: Number                  |
+------------------------------------+   |   | reviews: [ReviewSchema]            |
| _id: ObjectId                      |   +-->| sections: [SectionSchema]           |
| course: { courseId, name, price }  |       +------------------------------------+
| user: { userId, name, email }      |                         |
| payment_info: Object               |                         v
| createdAt: Date                    |       +------------------------------------+
+------------------------------------+       |    SectionSchema / LessonSchema    |
                                             +------------------------------------+
+------------------------------------+       | title: String                      |
|            Notification            |       | lessons: [{                        |
+------------------------------------+       |   title, description, videoUrl,    |
| _id: ObjectId                      |       |   videoLength, videoPlayer,        |
| userId: String                     |       |   links: [{ title, url }],         |
| title: String                      |       |   questions: [CommentSchema]       |
| message: String                    |       | }]                                 |
| status: "unread" | "read"          |       +------------------------------------+
+------------------------------------+
```

---

## 🔌 API Overview

### 👤 User Endpoints (`/api/v1/users`)
- `POST /registration` — Register new account and trigger 4-digit OTP email.
- `POST /activate-user` — Verify 4-digit OTP and create user record.
- `POST /login` — Authenticate user and issue HTTP-only JWT cookies.
- `GET /logout` — Invalidate user session in Redis and clear cookies.
- `GET /update-access-token` — Refresh expired access token using refresh token cookie.
- `POST /social-auth` — Provision or log in user via Google/GitHub OAuth.
- `GET /me` — Retrieve active authenticated user profile.
- `PUT /update-user-info` — Update name and user metadata.
- `PUT /update-password` — Update user password with current password check.
- `PUT /update-profile-picture` — Upload and update avatar to Cloudinary.
- `GET /get-all-users-admin` — *(Admin)* Paginated list of users filtered by role.
- `PUT /update-user-role-admin` — *(Admin)* Update user role (`user` / `admin`).
- `DELETE /delete-user-admin/:id` — *(Admin)* Permanently delete user.

### 📖 Course Endpoints (`/api/v1/courses`)
- `GET /get-all-courses` — Fetch public course catalog (cached in Redis).
- `GET /get-course/:id` — Fetch public course details (cached in Redis).
- `GET /get-course-with-content/:id` — Enrolled student full course workspace access.
- `POST /create-course` — *(Admin)* Create new course with thumbnail upload.
- `PUT /edit-course/:id` — *(Admin)* Edit existing course and clear Redis cache.
- `DELETE /delete-course-admin/:id` — *(Admin)* Delete course by ID.
- `POST /getVdoCipherOTP` — Generate dynamic short-lived OTP for VdoCipher player.
- `PUT /add-question` — Add question thread to lesson.
- `PUT /add-answer` — Answer lesson question & send notification email.
- `PUT /add-review` — Submit course star rating and review.
- `PUT /add-reply-to-review` — *(Admin)* Reply to user course review.

### 💳 Order Endpoints (`/api/v1/orders`)
- `GET /get-stripe-publishable-key` — Retrieve public Stripe configuration key.
- `POST /new-payment` — Create Stripe `PaymentIntent` for checkout.
- `POST /create-order` — Verify Stripe transaction, enroll user, and send receipt.
- `GET /get-all-orders-admin` — *(Admin)* Paginated order history.

### 📊 Analytics & System Endpoints (`/api/v1/analytics`, `/api/v1/layouts`, `/api/v1/notifications`)
- `GET /api/v1/analytics/get-users-analytics` — *(Admin)* 12-month user growth chart data.
- `GET /api/v1/analytics/get-courses-analytics` — *(Admin)* 12-month course creation metrics.
- `GET /api/v1/analytics/get-orders-analytics` — *(Admin)* 12-month revenue metrics.
- `GET /api/v1/layouts/get-layout-by-type` — Get Hero banner, Categories, or FAQs.
- `PUT /api/v1/layouts/edit-layout` — *(Admin)* Update platform Hero, Categories, or FAQs.
- `GET /api/v1/notifications/get-all-notifications` — *(Admin)* List admin notifications.
- `PUT /api/v1/notifications/update-notification-status/:id` — *(Admin)* Mark notification as read.

---

## ⚙️ Engineering Challenges & Technical Solutions

### 1. DRM Video Protection & Anti-Piracy Architecture
- **Problem:** Video course piracy can destroy LMS revenue. Standard static video links or standard HLS URLs can be downloaded via browser extensions.
- **Why It Matters:** High-value course content needs enterprise-grade protection.
- **Solution:** SkillStack integrates VdoCipher DRM video hosting. Video IDs are stored in MongoDB instead of direct MP4/HLS URLs. When an authorized student loads a lesson, the backend makes an authenticated API call to Vdocipher generating a dynamic OTP with a 300-second TTL. The client renders an encrypted iframe player using this single-use OTP, ensuring stream security.

### 2. High-Throughput Caching with Redis & Invalidation
- **Problem:** Public course pages and user authentication endpoints create excessive database read load.
- **Why It Matters:** MongoDB connection bottlenecks degrade user experience during peak traffic.
- **Solution:** Integrated an IoRedis caching layer. Public courses (`allCourses`) and individual course details are cached in Redis. When an admin updates or deletes a course, or when a student purchases a course, targeted cache key invalidation (`redis.del(courseId)`) runs immediately to guarantee data consistency.

### 3. Secure Dual-Token Authentication with HttpOnly Cookies
- **Problem:** Storing JWT tokens in `localStorage` leaves applications vulnerable to Cross-Site Scripting (XSS) attacks.
- **Why It Matters:** Compromised admin or user tokens put user data and payment history at risk.
- **Solution:** Engineered a dual-token mechanism (`accessToken` and `refreshToken`) stored strictly in HTTP-only, `sameSite: "none"`, `secure: true` cookies. Active sessions are mirrored in Redis for instant revocation upon logout or password change.

### 4. Rolling 12-Month Analytics Engine
- **Problem:** Calculating monthly trends for users, courses, and orders dynamically on every dashboard request can cause slow query performance.
- **Why It Matters:** Administrators need fast-loading metrics without triggering heavy DB aggregations.
- **Solution:** Created a reusable MongoDB aggregation utility `generateLast12MonthsData<T>` in `analyticsGenerator.ts`. It executes single-pass date boundary count queries over the last 12 calendar months to output clean monthly datasets, peak months, totals, and averages formatted for Recharts.

---

## 🔒 Security Implementation

- **HttpOnly Cookies:** Protection against XSS token extraction.
- **Bcrypt Password Hashing:** Salted password hashing (cost factor 10) executed via Mongoose pre-save hooks.
- **Server-Side Stripe Verification:** Payment validity verified against Stripe's API before granting course entitlement.
- **VdoCipher OTP Delivery:** Dynamic 5-minute video tokens prevent link sharing and unauthorized downloads.
- **Role-Based Authorization Middleware:** Multi-tiered middleware (`isAuthenticated` and `authorizeRoles("admin")`) safeguarding sensitive API endpoints.
- **Rate-Limiting Middleware Infrastructure:** Configured with `express-rate-limit` for DDoS and brute-force mitigation.
- **Regex Input Validation:** Server-side email format validation enforcing RFC 5322 compliance.

---

## ⚡ Performance Optimizations

- **Redis Session & Query Caching:** Sub-millisecond user session lookups and public course catalogue reads.
- **RTK Query Automated Caching:** Frontend client-side state caching with automatic tag-based cache invalidation.
- **Server-Side Projection:** Mongoose queries exclude heavy fields (`.select("-sections.lessons.videoUrl...")`) on public routes to reduce payload size.
- **Server-Side Pagination:** Admin tables (Users, Courses, Orders) utilize skips and limits to handle large datasets efficiently.
- **Turbopack Build System:** Next.js 15 optimized compilation and asset bundling.

---

## 🖼️ Screenshots

> *Placeholder sections for platform screenshots.*

| View | Screenshot Placeholder |
| :--- | :--- |
| **Landing Page** | ![Landing Page Banner](https://via.placeholder.com/800x450?text=SkillStack+Landing+Page) |
| **Course Catalogue** | ![Course Catalogue](https://via.placeholder.com/800x450?text=Course+Catalog+View) |
| **Course Player Workspace** | ![Course Player Workspace](https://via.placeholder.com/800x450?text=DRM+Video+Player+%26+Q%26A) |
| **Student Dashboard** | ![Student Dashboard](https://via.placeholder.com/800x450?text=Student+Enrolled+Courses) |
| **Admin Dashboard** | ![Admin Dashboard](https://via.placeholder.com/800x450?text=Admin+Control+Panel) |
| **Analytics Dashboard** | ![Analytics Dashboard](https://via.placeholder.com/800x450?text=12-Month+Analytics+Charts) |
| **Stripe Checkout Modal** | ![Checkout](https://via.placeholder.com/800x450?text=Secure+Stripe+Checkout) |
| **Auth & OTP Modal** | ![Auth Modal](https://via.placeholder.com/800x450?text=Authentication+%26+OTP+Modal) |
| **Mobile Responsive View** | ![Mobile View](https://via.placeholder.com/400x700?text=Mobile+Responsive+Layout) |

---

## 🎥 Demo

- 🌐 **Live Application Demo:** [https://skillstack.example.com](https://skillstack.example.com) *(Demo Link Placeholder)*
- 📹 **Walkthrough Video:** [YouTube Demo Link](https://youtube.com/example) *(Video Link Placeholder)*

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js:** v18.x or higher
- **npm / yarn / pnpm**
- **MongoDB:** Local instance or MongoDB Atlas cluster
- **Redis:** Local instance or Redis Cloud database
- **Cloudinary Account:** For avatar and course thumbnail uploads
- **VdoCipher Account:** For DRM video hosting
- **Stripe Account:** For payment processing keys

### 1. Clone Repository
```bash
git clone https://github.com/your-username/SkillStack.git
cd SkillStack
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:
```env
PORT=5000
ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Database & Cache
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillstack
REDIS_URL=redis://default:<password>@<redis-host>:<port>

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# JWT & Activation Secrets
ACTIVATION_SECRET=your_activation_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
ACCESS_TOKEN_EXPIRE=5m
REFRESH_TOKEN_EXPIRE=7d

# Email SMTP
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password

# VdoCipher DRM
VDOCIPHER_API_SECRET=your_vdocipher_secret_key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Start Backend Server:
```bash
# Development mode with live reload
npm run dev

# Production build and run
npm run build
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env.local` file inside the `client/` directory:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000/api/v1/
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# NextAuth Social Providers
NEXT_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_GITHUB_CLIENT_ID=your_github_client_id
NEXT_GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_SECRET=your_nextauth_secret_key
```

Start Frontend Client:
```bash
# Development mode
npm run dev

# Production build and start
npm run build
npm start
```

---

## 🔑 Environment Variables Reference

| Environment Variable | Location | Description |
| :--- | :--- | :--- |
| `PORT` | Server | HTTP port where Express server listens (default: 5000) |
| `FRONTEND_URL` | Server | Client origin allowed by CORS policy |
| `DB_URL` | Server | MongoDB connection string |
| `REDIS_URL` | Server | Redis database URI connection string |
| `CLOUDINARY_NAME` | Server | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Server | Cloudinary API access key |
| `CLOUDINARY_SECRET_KEY` | Server | Cloudinary API secret key |
| `ACTIVATION_SECRET` | Server | Secret for signing 4-digit activation code JWTs |
| `ACCESS_TOKEN_SECRET` | Server | Secret key for signing user session Access JWTs |
| `REFRESH_TOKEN_SECRET` | Server | Secret key for signing user Refresh JWTs |
| `ACCESS_TOKEN_EXPIRE` | Server | Expiration duration for Access Token (e.g. `5m`) |
| `REFRESH_TOKEN_EXPIRE` | Server | Expiration duration for Refresh Token (e.g. `7d`) |
| `EMAIL_USER` | Server | Gmail / SMTP sender email address |
| `EMAIL_PASS` | Server | Gmail App Password for Nodemailer authentication |
| `VDOCIPHER_API_SECRET` | Server | VdoCipher secret key for dynamic video OTP generation |
| `STRIPE_SECRET_KEY` | Server | Stripe API secret key for payment processing |
| `STRIPE_PUBLISHABLE_KEY` | Server | Stripe publishable key for client elements |
| `NEXT_PUBLIC_SERVER_URL` | Client | Backend API base URL accessible to client |
| `NEXT_PUBLIC_SOCKET_SERVER_URL` | Client | Socket.io server WebSocket endpoint |
| `NEXT_GOOGLE_CLIENT_ID` | Client | Google OAuth Client ID for NextAuth |
| `NEXT_GOOGLE_CLIENT_SECRET` | Client | Google OAuth Client Secret for NextAuth |
| `NEXT_GITHUB_CLIENT_ID` | Client | GitHub OAuth Client ID for NextAuth |
| `NEXT_GITHUB_CLIENT_SECRET` | Client | GitHub OAuth Client Secret for NextAuth |
| `NEXT_SECRET` | Client | Secret key for encrypting NextAuth session JWTs |

---

## 🚀 Future Enhancements

- 📜 **Automated PDF Certificate Generation:** Generate verifiable PDF certificates upon 100% course completion.
- 💬 **Direct Peer-to-Peer Messaging:** Real-time chat rooms for enrolled students and instructors.
- 📝 **Interactive Quizzes & Assignments:** Add quiz creation tools with automated scoring.
- 📱 **Native Mobile Application:** React Native / Flutter app utilizing existing Express REST API.
- 🌐 **Multi-Language Support (i18n):** Internationalization for global accessibility.

---

## 👨‍💻 Author

**Ehtesham Zahid**
- **GitHub:** [@Ehtesham-Zahid](https://github.com/Ehtesham-Zahid)
- **Portfolio:** [Portfolio Link](https://ehtesham.dev)
- **LinkedIn:** [Ehtesham Zahid](https://linkedin.com/in/ehtesham-zahid)

---

<p align="center">Made with ❤️ for modern online education.</p>

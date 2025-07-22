# RationGuard

A Real-Time Ration Issue Reporting Web Application

## 🧾 Overview

**RationGuard** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to empower citizens to report ration-related issues across shops. The platform ensures transparency and accountability by enabling users to submit detailed reports with photos, track their reports, and get timely updates — all under a secure authentication system.
<img width="1895" height="906" alt="image" src="https://github.com/user-attachments/assets/04466dfe-bae9-4663-a98b-50a5e15379bf" />


## 🌟 Features

### 👤 User
- 🔐 **JWT Authentication** (Signup / Login)
- 📤 **Submit Ration Issues** with details and optional image proof
- 📂 **My Reports Page** to:
  - View your reports
  - 📝 Edit reports
  - ❌ Delete reports with confirmation modal
- 🧾 **Dashboard** with:
  - Count of reports submitted and resolved
  - Personalized greeting: “Hi, [username]”
  
### 📊 Admin (Planned/Under Development)
- View all user reports
- Mark issues as resolved
- Analytics on issue types and shops

### 💅 UI/UX
- Mobile-first responsive layout
- Sidebar navigation (Dashboard, Report Issue, My Reports, Logout)
- Soft color scheme: `#B0905F`, `#ACBD6B`, `#536293`, `#EEB8B6`

---

## 🛠️ Tech Stack

| Technology    | Description                            |
|---------------|----------------------------------------|
| **Frontend**  | React.js + Tailwind CSS (MUI optional) |
| **Backend**   | Node.js + Express.js                   |
| **Database**  | MongoDB + Mongoose                     |
| **Auth**      | JWT + bcrypt                           |
| **File Uploads** | Multer for image proof uploads     |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rationguard.git
cd rationguard

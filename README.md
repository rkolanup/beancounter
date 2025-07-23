# 🫘 BeanCounter

**BeanCounter** is a full-stack personal finance management app that helps users track income, expenses, budgets, and financial goals with an intuitive UI and secure backend.

---

## ✨ Features

- 🔐 JWT-based Authentication
- 💸 Track expenses, income, and loans
- 📊 Visualize spending with charts
- 🧾 Export transactions as Excel
- 📚 API documentation with Swagger
- ⚙️ Admin dashboard (WIP)

---

## 🧱 Tech Stack

### Frontend
- Next.js 15
- React 19
- MUI (Material UI)
- Tailwind CSS
- TypeScript
- xlsx & file-saver for downloads

### Backend
- Node.js + Express
- TypeORM + PostgreSQL
- JWT Auth
- Swagger for API docs
- TypeScript

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL
- npm or yarn

---

### Clone the Repo

```bash
git clone https://github.com/your-username/beancounter.git
cd beancounter

### Backend Setup
cd backend
cp .env.example .env   # Update with DB credentials

npm install
npm run build
npm run migration:run
npm run start:dev

### frontend Setup
cd frontend
npm install
npm run dev


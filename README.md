# Task Manager Frontend

A modern React-based task management application with role-based access control.

## 🚀 Environment Setup

### Local Development
1. Copy `.env.example` to `.env.local`
2. Set your local backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Production Deployment
1. Set environment variables in your hosting platform:
   ```
   VITE_API_BASE_URL=https://task-manager-backend-1-8c2v.onrender.com
   ```
2. Build for production:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder

## 🌍 Environment Variables

The application automatically uses different URLs based on the environment:

- **Local Development**: Uses `http://localhost:8080` (from `.env.local`)
- **Production**: Uses `https://task-manager-backend-1-8c2v.onrender.com` (from hosting platform)

## 📱 Live Application

- **Frontend**: https://task-manager-frontend-drab-one.vercel.app
- **Backend**: https://task-manager-backend-1-8c2v.onrender.com

## 🎯 Features

- Role-based authentication (Admin, Manager, Employee)
- Task creation, editing, and deletion
- Real-time task status updates
- Responsive design
- Clean and scalable code architecture

## 🛠️ Tech Stack

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

## 📁 Project Structure

```
src/
├── api/           # API layer
├── components/    # Reusable components
├── constants/     # Application constants
├── pages/         # Page components
├── routes/        # Route protection
├── utils/         # Utility functions
└── styles.css     # Global styles
```

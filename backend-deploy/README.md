# Backend Deployment Files

## 📁 Files to Copy to Backend Repository

### 1. application.properties
Copy to: `task-manager-backend/src/main/resources/application.properties`

### 2. CorsConfig.java  
Copy to: `task-manager-backend/src/main/java/com/nitish/task_manager/config/CorsConfig.java`

## 🚀 Deployment Steps

1. Copy these files to your backend repository
2. Commit and push to GitHub
3. Render will auto-deploy
4. Set environment variables in Render

## 🔧 Render Environment Variables
```
MONGODB_URI=mongodb+srv://nitish_db_user:nitish%401231@task-manager-cluster.ggcoxrj.mongodb.net/taskdb
MONGODB_DATABASE=taskdb
PORT=8080
CORS_ALLOWED_ORIGINS=https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app
```

## ✅ Expected Result
- Backend returns 200 OK
- No more 500 errors
- Real authentication works
- Frontend connects to real backend

# Task Manager Frontend

A modern React-based task management application with role-based access control.

---

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

---

## 🚧 Deployment Status

> ⚠️ To be deployed

Deployment is currently in progress. The application will be hosted soon.

---

## 🌍 Environment Variables

* **Local Development**: `http://localhost:8080`
* **Production**: Will be configured after deployment

---

## 📸 Screenshots

![Screenshot 1](./Screenshot%202026-05-04%20032741.png)
![Screenshot 2](./Screenshot%202026-05-04%20032806.png)
![Screenshot 3](./Screenshot%202026-05-04%20032820.png)

---

## 🎯 Features

* Role-based authentication (Admin, Manager, Employee)
* Task creation, editing, and deletion
* Real-time task status updates
* Responsive design
* Clean and scalable code architecture

---

## 🔄 Workflow & Role Permissions

### 👑 Admin

* Can create tasks
* Can delete **any task**
* Can update task status
* Has full control over the system

---

### 🧑‍💼 Manager

* Can assign tasks to employees
* Can create tasks
* Can update task status
* Can delete tasks **only within their group**
* ❗ Cannot delete tasks created/assigned by Admin (even if assigned to them or their employees)

---

### 👨‍💻 Employee

* Can view all assigned tasks
* Can update task status
* ❌ Cannot delete any task
* ❌ Cannot create tasks

---

### ⚙️ Permission Logic (Summary)

* **Admin > Manager > Employee** (Hierarchy-based control)
* Task deletion is **restricted based on role & ownership**
* Managers have **limited control**, restricted by Admin authority
* Employees have **read + update access only**

---


## 🛠️ Tech Stack

* React 18
* Vite
* React Router
* Axios
* Tailwind CSS

---

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

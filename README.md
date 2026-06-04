# Multi-Tenant SaaS Dashboard

## Overview

A Full Stack Multi-Tenant SaaS Dashboard built using **Next.js**, **React**, **Django REST Framework**, and **JWT Authentication**. The platform provides tenant management, subscription tracking, payment monitoring, analytics, notifications, and role-based access control for administrators and users.

---

## Live Demo

### Frontend (Vercel)

[[YOUR_VERCEL_URL](https://multi-tenant-saas-dashboard-project.vercel.app/)]

### Backend API (Render)

[[YOUR_RENDER_URL](https://multi-tenant-saas-dashboard-project.onrender.com/admin/login/?next=/admin/)]

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control
* Forgot Password
* Google Authentication

### Tenant Management

* Create Tenant
* View Tenants
* Update Tenant Details
* Tenant Status Management

### Subscription Management

* Create Subscription
* Track Active Subscriptions
* Plan Assignment
* Subscription Analytics

### Payment Management

* Payment Tracking
* Invoice Generation
* Transaction Records
* Revenue Monitoring

### Analytics Dashboard

* Total Users
* Total Tenants
* Total Plans
* Active Subscriptions
* Revenue Statistics
* Notifications Count

### Notifications

* User Notifications
* Tenant Notifications
* Read/Unread Status

### Admin Panel

* Django Administration Portal
* User Management
* Group Management
* Database Monitoring

---

## Tech Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Firebase Authentication

### Backend

* Django
* Django REST Framework
* Simple JWT

### Database

* SQLite

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
saas-dashboard/
│
├── frontend/
│   ├── src/app
│   ├── components
│   ├── services
│   └── utils
│
├── backend/
│   ├── accounts
│   ├── tenants
│   ├── plans
│   ├── subscriptions
│   ├── payments
│   ├── notifications_app
│   ├── analytics_app
│   ├── audit_logs
│   └── config
│
└── requirements.txt
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/forgot-password/
```

### Tenants

```http
GET /api/tenants/
POST /api/tenants/
```

### Plans

```http
GET /api/plans/
POST /api/plans/
```

### Subscriptions

```http
GET /api/subscriptions/
POST /api/subscriptions/
```

### Payments

```http
GET /api/payments/
POST /api/payments/
```

### Notifications

```http
GET /api/notifications/
POST /api/notifications/
```

### Analytics

```http
GET /api/dashboard/
GET /api/dashboard/user-dashboard/
```

---

## Screenshots

### Login Page

(Add Screenshot Here)

### Admin Dashboard

(Add Screenshot Here)

### User Dashboard

(Add Screenshot Here)

### Django Admin Panel

(Add Screenshot Here)

### Analytics Dashboard

(Add Screenshot Here)

---

## Installation

### Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Render

---
# Screenshots

## Login Page

![Login Page](screenshots/login-page.png)

## Registration Page

![Register Page](screenshots/register-page.png)

## Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

## Tenant Management

![Tenant Management](screenshots/tenant.png)

## User Management

![Users](screenshots/users.png)

## Subscription Plans

![Plans](screenshots/plans.png)

## Subscriptions

![Subscriptions](screenshots/subscriptions.png)

## Payments

![Payments](screenshots/payments.png)

## Notifications

![Notifications](screenshots/notifications.png)

## Analytics Dashboard

![Analytics](screenshots/analytics.png)

## Django Admin Login

![Django Login](screenshots/django-login.png)

## Render Deployment Success

![Render Deployment](screenshots/render-successful.png)

## Vercel Deployment Success

![Vercel Deployment](screenshots/vercel-successful.png)

## Author

**Venkateswarlu Vennampalli**

Email: [venkateswarlu4466@gmail.com](mailto:venkateswarlu4466@gmail.com)

GitHub: https://github.com/Venkateswarlu1813

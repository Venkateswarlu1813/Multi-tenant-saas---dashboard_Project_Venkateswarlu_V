# Multi-Tenant SaaS Dashboard

## Overview

A full-stack Multi-Tenant SaaS Dashboard built using Next.js, Django REST Framework, JWT Authentication, and SQLite. The platform provides separate Admin and User dashboards with tenant management, subscription management, payment tracking, analytics, notifications, and revenue monitoring.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* Google Login
* JWT Authentication
* Role-Based Access Control (Admin/User)
* Forgot Password Support

### Admin Dashboard

* Dashboard Overview
* User Management
* Tenant Management
* Plan Management
* Subscription Management
* Payment Management
* Revenue Analytics
* Notification Management
* Profile Management

### User Dashboard

* Dashboard Overview
* User Profile
* Subscription Details
* Billing & Invoice History
* Notifications
* Logout Functionality

### Revenue Management

* Automatic Revenue Calculation
* Payment Tracking
* Revenue Analytics Dashboard
* Real-time Revenue Updates Based on Subscriptions

---

## Technology Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Axios
* Recharts
* React Icons

### Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite

### Authentication

* JWT Tokens
* Google Authentication (Firebase)

---

## Project Structure

```bash
frontend/
│
├── src/
├── app/
├── components/
├── services/
└── public/

backend/
│
├── accounts/
├── tenants/
├── plans/
├── subscriptions/
├── payments/
├── notifications_app/
├── analytics_app/
└── config/
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Venkateswarlu1813/Multi-tenant-saas---dashboard_Project_Venkateswarlu_V.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## API Features

### Authentication

* Register User
* Login User
* JWT Token Management

### Tenants

* Create Tenant
* Update Tenant
* Delete Tenant
* List Tenants

### Plans

* Create Plans
* Update Plans
* Delete Plans

### Subscriptions

* Create Subscription
* Auto Payment Creation
* Revenue Update

### Payments

* Payment Records
* Revenue Calculation
* Invoice Tracking

### Notifications

* User Notifications
* Admin Notifications

### Analytics

* Revenue Analytics
* User Statistics
* Tenant Statistics
* Subscription Statistics

---

## Key Functionalities

### Automatic Revenue Tracking

When an Admin creates a Subscription:

1. Subscription is created.
2. Payment record is generated automatically.
3. Revenue is updated automatically.
4. Analytics dashboard reflects updated revenue.

---

## Author

**Venkateswarlu Vennampalli**


GitHub:
https://github.com/Venkateswarlu1813

---



# Doctor & Appointment Management System

I built a full-stack web application that allows admins to manage doctors and patients to seamlessly book appointments with time validation and constraints.

---

## Live Demo

- Frontend (Vercel): https://gem3s-frontend.vercel.app  
- Backend (Render): https://gem3s-backend.onrender.com  
- Postman API Docs: https://documenter.getpostman.com/view/51097643/2sBXqJLgn3  
- Figma Design: https://www.figma.com/design/GJQ6XixDMeAAKkup3q01MN/Gem3s-Assign?node-id=0-1&t=rBcFYIbGiXqpt7iU-1  

---

## Objective

This project enables:

- Admins to add and view doctors  
- Patients to book appointments  
- System to enforce real-world scheduling constraints  

---

## Features

### Add Doctor (Admin)

- Add doctor with:
  - Name  
  - Specialization  
  - Email  
  - Available start & end time  
  - Time zone  

---

### List Doctors

- View all doctors with:
  - Name  
  - Specialization  
  - Email  
  - Working hours  
  - Time zone  

---

### Book Appointment

Patients can:

- Select doctor  
- Choose date & time  
- Enter:
  - Name  
  - Age  
  - Problem description  

---

### View Appointments

- Displays:
  - Patient name  
  - Doctor name  
  - Date & time  
  - Status (Scheduled)  

---

## Constraints Implemented

### 1. No Overlapping Appointments

- Prevents double booking for the same doctor  
- Example:  
  - 10:15–10:45 is invalid if 10:00–10:30 exists  

---

### 2. Booking Within Working Hours

- Appointments must fall within doctor availability  
- Invalid bookings are rejected  

---

## Tech Stack

### Frontend
- Next.js  
- TypeScript  
- Tailwind CSS  

### Backend
- NestJS  
- REST API  

### Database
- MongoDB  

### Other Tools
- Postman (API documentation)  
- Figma (UI design)  
- Vercel (Frontend deployment)  
- Render (Backend deployment)  

---


---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)  
- npm / yarn  
- MongoDB  

---

### Backend Setup (NestJS)

```bash
cd backend
npm install

###  Configure Environment Variables

Create .env file:

DATABASE_URL=database_url
PORT=5000

Run Backend
npm run start:dev

Backend runs on:
http://localhost:5000

###  Frontend Setup (Next.js)
cd frontend
npm install
Configure Environment Variables

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000
Run Frontend
npm run dev

Frontend runs on:
http://localhost:3000

---

###  API Documentation

Full API collection available via Postman:
https://documenter.getpostman.com/view/51097643/2sBXqJLgn3

Includes:

- Auth APIs
- Patient APIs
- Admin APIs

---
###  UI/UX Design

Designed using Figma:
https://www.figma.com/design/GJQ6XixDMeAAKkup3q01MN/Gem3s-Assign?node-id=0-1&t=rBcFYIbGiXqpt7iU-1

Includes:

- Doctor listing page
- Booking flow
- User dashboard

###  Assumptions Made
- Appointment duration is user-defined but cannot exceed 30 minutes
- Doctors are assumed to be available daily within their configured working hours
- Authentication is implemented with role-based dashboards (admin/patient)
- Each doctor is uniquely identified using their email address to prevent duplication

### Deployment
Frontend
- Deployed on Vercel
Backend
- Deployed on Render
Database
- Hosted on MongoDB Atlas

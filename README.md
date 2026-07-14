# 🚀 Job Portal & Applicant Tracking System (ATS)

![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D)

> **Backend Study Group Final Project – UKM CCI**

A RESTful API for a **Job Portal & Applicant Tracking System (ATS)** built using **Node.js**, **Express.js**, **Prisma ORM**, and **MySQL**.

This project was developed as the **Final Project (Tugas Besar)** for the **Backend Study Group - UKM CCI**. The system provides authentication, authorization, company management, job posting, and applicant tracking features following REST API best practices.

---

# 📌 Project Overview

The system allows **Recruiters** to manage companies and job vacancies, while **Job Seekers** can search for jobs, submit applications, and monitor their application status.

The backend is designed using a modular architecture consisting of Controllers, Routes, Middleware, Services, Validators, and Prisma ORM.

---

# 🎯 Objectives

This project aims to:

* Build a secure RESTful API
* Implement JWT Authentication
* Implement Refresh Token Authentication
* Apply Role-Based Access Control (RBAC)
* Design a relational database using Prisma ORM
* Apply request validation using Zod
* Document APIs using Swagger (OpenAPI)
* Follow clean and modular backend architecture

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Access Token
* Refresh Token
* Logout
* Get Current User Profile

---

## 🔒 Security

* JWT Authentication
* Refresh Token
* Password Hashing (bcrypt)
* Protected Routes
* Role-Based Access Control (RBAC)

---

## 👥 User Roles

### 👨‍💼 Recruiter

Recruiters can:

* Register & Login
* Create Company
* Update Company
* Delete Company
* Create Job Vacancy
* Update Job Vacancy
* Delete Job Vacancy
* View Applicants
* Update Application Status

---

### 👨‍🎓 Job Seeker

Job Seekers can:

* Register & Login
* Browse Job Listings
* Search Jobs
* Filter Jobs
* Apply for Jobs
* View My Applications
* Track Application Status

---

# 🏢 Company Module

Recruiters can:

* Create Company
* View Company
* Update Company
* Delete Company

---

# 💼 Job Module

Recruiters can:

* Create Job
* Update Job
* Delete Job

Public Users can:

* View Job List
* View Job Detail

Additional Features:

* Search
* Filter
* Pagination
* Sorting

---

# 📄 Applicant Tracking System (ATS)

Job Seekers:

* Apply Job
* View My Applications

Recruiters:

* View Applicants
* Update Application Status

Application Status:

* PENDING
* REVIEWED
* INTERVIEW
* ACCEPTED
* REJECTED

---

# 🗄 Database Design

## Tables

* User
* Company
* Job
* Application
* RefreshToken

---

## Database Relationships

```
User
│
├── One Recruiter
│      └── Many Companies
│
└── One Job Seeker
       └── Many Applications

Company
│
└── Many Jobs

Job
│
└── Many Applications
```

---

# 🏗 Project Architecture

```
src
│
├── config/
├── controllers/
├── docs/
├── middleware/
├── routes/
├── services/
├── validators/
├── utils/
│
├── app.js
└── server.js
```

Architecture Pattern

```
Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Prisma ORM

↓

MySQL Database
```

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MySQL
* Prisma ORM

## Authentication

* JWT
* bcrypt

## Validation

* Zod

## Documentation

* Swagger UI (OpenAPI 3)

## Development Tools

* VS Code
* Thunder Client
* Git
* GitHub

---

# ⚙ Installation

Clone repository

```bash
git clone https://github.com/reffylesmana/job-portal-api.git
```

Go to project

```bash
cd job-portal-api
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file

```env
PORT=3000

DATABASE_URL="mysql://username:password@localhost:3306/job_portal"

JWT_SECRET=your_super_secret_key

JWT_REFRESH_SECRET=your_refresh_secret_key
```

---

# 🗄 Database Setup

Run migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

(Optional)

```bash
npx prisma studio
```

---

# ▶ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📖 API Documentation (Swagger)

This project uses **Swagger (OpenAPI 3.0)** to provide interactive API documentation. It allows developers to explore and test every available endpoint directly from the browser without using external API clients.

After running the project, open:

```text
http://localhost:3000/api-docs
```

## 📸 Swagger Preview

> The image below shows the interactive Swagger UI used to document and test the API.

![Swagger Preview](docs/swagger-preview.png)

Swagger provides:

- 📌 Complete API Documentation
- 📝 Request Body Schema
- 🔍 Query Parameters
- 📍 Path Parameters
- 🔐 JWT Bearer Authentication
- 📤 Response Examples
- 📊 HTTP Status Codes
- ⚡ Interactive **Try it Out** feature for testing endpoints directly

---

## 🔐 Using Authorization in Swagger

1. Login using:

```
POST /api/auth/login
```

2. Copy the Access Token.

3. Click **Authorize** on Swagger.

4. Enter:

```
Bearer YOUR_ACCESS_TOKEN
```

5. Click **Authorize**

6. Protected endpoints can now be tested directly from Swagger UI.

---

# 📚 API Modules

## Authentication

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | /api/auth/register      |
| POST   | /api/auth/login         |
| POST   | /api/auth/refresh-token |
| POST   | /api/auth/logout        |
| GET    | /api/auth/profile       |
| GET    | /api/auth/recruiter     |
| GET    | /api/auth/admin         |

---

## Company

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/companies     |
| GET    | /api/companies/me  |
| PUT    | /api/companies/:id |
| DELETE | /api/companies/:id |

---

## Job

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/jobs     |
| GET    | /api/jobs/:id |
| POST   | /api/jobs     |
| PUT    | /api/jobs/:id |
| DELETE | /api/jobs/:id |

Supports:

* Search
* Filter
* Pagination
* Sorting

---

## Application

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/applications            |
| GET    | /api/applications/me         |
| GET    | /api/applications/job/:jobId |
| PUT    | /api/applications/:id/status |

---

# 📊 API Coverage

| Module         |   Total Endpoint |
| -------------- | ---------------: |
| Authentication |                7 |
| Company        |                4 |
| Job            |                5 |
| Application    |                4 |
| **Total**      | **20 Endpoints** |

---

# ⭐ Bonus Features

* File Upload (CV Upload)
* JWT Authentication
* Refresh Token
* RBAC
* Global Error Handling
* Zod Validation
* Search
* Filter
* Pagination
* Sorting
* Swagger Documentation

---

# ✅ Assessment Rubric Mapping (Backend Study Group - UKM CCI)

| Assessment Criteria       | Status         |
| ------------------------- | -------------- |
| JWT Authentication        | ✅              |
| Access Token              | ✅              |
| Refresh Token             | ✅              |
| Password Hashing (bcrypt) | ✅              |
| Role Based Access Control | ✅              |
| Database Relationships    | ✅              |
| Business Logic            | ✅              |
| Request Validation (Zod)  | ✅              |
| Modular Architecture      | ✅              |
| Global Error Handling     | ✅              |
| HTTP Status Code          | ✅              |
| Swagger Documentation     | ✅              |
| Search                    | ✅              |
| Filter                    | ✅              |
| Pagination                | ✅              |
| Sorting                   | ✅              |
| Upload CV                 | ✅              |

---

# 🚀 Future Improvements

* Company Logo Upload
* Email Notification
* Rate Limiting
* Unit Testing
* Docker Support
* CI/CD Pipeline

---

# 👨‍💻 Author

**Muhammad Reffy Lesmana**

Bachelor of Informatics

Faculty of Informatics

Telkom University

Backend Study Group — UKM CCI

2026

---

# 📄 License

This project was developed for educational purposes as the Final Project of the **Backend Study Group – UKM CCI**.

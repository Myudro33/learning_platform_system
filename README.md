# Project 3: Learning Management System (LMS) Backend API

---

## პროექტის აღწერა

შექმენი ონლაინ სასწავლო პლატფორმის Backend, სადაც შესაძლებელია კურსების შექმნა, ლექციების მართვა, სტუდენტების რეგისტრაცია და დავალებების ატვირთვა.

---

## ძირითადი რესურსები (Entities)

### 1. User

**User მოდელის ველები:**

- `id`
- `name`
- `email`
- `password`
- `role` — "admin" | "instructor" | "student"
- `avatar`

### 2. Course

**Course მოდელის ველები:**

- `id`
- `title`
- `description`
- `createdBy` — instructorId
- `students[]` — მომხმარებლების ID-ები

### 3. Lecture

**Lecture მოდელის ველები:**

- `id`
- `title`
- `content`
- `courseId`
- `videoUrl`
- `attachments[]`

### 4. Assignment

**Assignment მოდელის ველები:**

- `id`
- `title`
- `description`
- `courseId`
- `dueDate`

### 5. Submission

**Submission მოდელის ველები:**

- `id`
- `assignmentId`
- `studentId`
- `file`
- `submittedAt`
- `grade`

### 6. File

**File მოდელის ველები:**

- `id`
- `filename`
- `url`
- `uploadedBy`

---

## Authentication და Authorization

- JWT-based ავტორიზაცია
- Middleware დაცვა როლების მიხედვით

---

## API Endpoint-ები

### Authentication

- `POST /auth/register`
- `POST /auth/login`

### Users

- `GET /users/me`
- `GET /users/` (მხოლოდ Admin)

### Courses

- `POST /courses` — (Admin ან Instructor)
- `GET /courses`
- `POST /courses/:id/enroll` — (Student)
- `GET /courses/:id`

### Lectures

- `POST /courses/:id/lectures` — (Instructor)
- `GET /courses/:id/lectures`

### Assignments

- `POST /courses/:id/assignments` — (Instructor)
- `GET /courses/:id/assignments`
- `POST /assignments/:id/submit` — (Student)
- `GET /assignments/:id/submissions` — (Instructor)

### Files

- `POST /files/upload`
- `GET /files/:id`

---

## ფუნქციონალი

- პაროლის ჰეშირება (bcrypt)
- როლებზე დაფუძნებული Middleware
- JWT
- Email შეტყობინებები Nodemailer-ით
- ფაილების ატვირთვა Multer-ის მეშვეობით
- Swagger დოკუმენტაცია (`/api-docs`)
- Error Handling
- CORS კონფიგურაცია

---

## Deployment

- Heroku
- MongoDB Atlas ან PostgreSQL (Prisma)
- .env პარამეტრები:
  - `JWT_SECRET`
  - `DATABASE_URL`
  - `EMAIL_USER`, `EMAIL_PASS`

---

## ტექნოლოგიები

- Node.js / Express.js
- MongoDB (Mongoose) ან PostgreSQL (Prisma)
- Multer
- Nodemailer
- JWT
- Swagger
- dotenv

---

## პროცესის მიმოხილვა

```
1. Admin ქმნის ინსტრუქტორს და კურსებს
2. ინსტრუქტორი ამატებს ლექციებს და დავალებებს
3. სტუდენტი დარეგისტრირდება კურსზე
4. ნახავს ლექციებს, ატვირთავს დავალებებს
5. ინსტრუქტორი შეაფასებს დავალებებს
6. ყველა Endpoint აღწერილია Swagger-ში
7. პროექტი განთავსებულია ონლაინ
```
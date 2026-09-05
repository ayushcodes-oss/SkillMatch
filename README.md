# SkillMatch

SkillMatch is a job matching platform that connects students with recruiters based on skills and job requirements. Students can create profiles, search and apply for jobs, while recruiters can post jobs, manage applications, and update application statuses.

## Features

### Authentication
- Student and recruiter registration
- User login
- Password hashing
- JWT-based authentication
- Role-based access control

### Student Features
- Create and manage profile
- Add bio, skills, education and experience
- Add GitHub and LinkedIn links
- Add resume link
- Browse available jobs
- Search jobs by title or company
- Filter jobs by skill, location and job type
- Pagination for job listings
- Apply for jobs
- Prevent duplicate applications
- View personal applications and their status

### Recruiter Features
- Recruiter-only dashboard
- Create jobs
- View posted jobs
- Update jobs
- Delete jobs
- View applications received for their jobs
- Update application status
- View application statistics

### Application Statuses
- Applied
- Shortlisted
- Rejected
- Selected

## Project Structure

```text
SkillMatch/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── profileController.js
│   │   └── recruiterController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   ├── Job.js
│   │   ├── Profile.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── profileRoutes.js
│   │   └── recruiterRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Profile

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/profile` | Create profile | Authenticated |
| GET | `/api/profile` | Get profile | Authenticated |
| PUT | `/api/profile` | Update profile | Authenticated |
| DELETE | `/api/profile` | Delete profile | Authenticated |

### Jobs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/jobs` | Create a job | Recruiter |
| GET | `/api/jobs` | Get jobs | Authenticated |
| GET | `/api/jobs/:id` | Get a single job | Authenticated |
| PUT | `/api/jobs/:id` | Update a job | Recruiter |
| DELETE | `/api/jobs/:id` | Delete a job | Recruiter |

### Recruiter

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/recruiter/dashboard` | Get recruiter statistics | Recruiter |
| GET | `/api/recruiter/jobs` | Get recruiter's jobs | Recruiter |

### Applications

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/applications` | Apply for a job | Authenticated |
| GET | `/api/applications/my` | Get my applications | Authenticated |
| GET | `/api/applications/recruiter` | Get applications for recruiter's jobs | Authenticated |
| PUT | `/api/applications/:id/status` | Update application status | Recruiter |

## Job Search & Filters

The jobs endpoint supports search, filters and pagination.

### Search

```text
GET /api/jobs?search=developer
```

Searches by:
- Job title
- Company name

### Filter by Skill

```text
GET /api/jobs?skill=Java
```

### Filter by Location

```text
GET /api/jobs?location=Delhi
```

### Filter by Job Type

```text
GET /api/jobs?jobType=Internship
```

Available job types:

```text
Full-time
Part-time
Internship
```

### Pagination

```text
GET /api/jobs?page=1&limit=10
```

Maximum jobs per page is 50.

### Multiple Filters

```text
GET /api/jobs?search=developer&skill=Java&location=Delhi&jobType=Full-time&page=1&limit=10
```

## Authentication

Protected endpoints require a JWT token.

Add the following header in Postman or the frontend:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is returned after successful login.

## User Roles

SkillMatch currently supports two roles:

```text
student
recruiter
```

### Student

Students can:
- Manage profiles
- Browse jobs
- Search and filter jobs
- Apply for jobs
- View their applications

### Recruiter

Recruiters can:
- Create jobs
- Manage their jobs
- View applications
- Update application statuses
- View dashboard statistics

## Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` to GitHub.

Example `.gitignore`:

```gitignore
node_modules/
.env
```

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd SkillMatch
```

Go to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add your MongoDB connection string and JWT secret.

Start the server:

```bash
node server.js
```

The server will run at:

```text
http://localhost:3000
```

You can check the server using:

```text
GET /
```

Expected response:

```text
api is running well
```

## Testing with Postman

A typical testing flow is:

### 1. Register

```text
POST /api/auth/register
```

Example body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456",
  "role": "student"
}
```

### 2. Login

```text
POST /api/auth/login
```

Save the JWT token returned by the API.

### 3. Add Authorization

For protected endpoints:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### 4. Create Profile

```text
POST /api/profile
```

Example:

```json
{
  "bio": "Computer Science student",
  "skills": ["Java", "JavaScript", "MongoDB"],
  "education": "B.Tech Computer Science",
  "experience": "Fresher",
  "github": "https://github.com/example",
  "linkedin": "https://linkedin.com/in/example",
  "resume": "https://example.com/resume.pdf"
}
```

### 5. Recruiter Creates a Job

Login using a recruiter account and use:

```text
POST /api/jobs
```

Example:

```json
{
  "title": "Software Developer",
  "company": "ABC Technologies",
  "description": "Looking for a software developer.",
  "skills": ["Java", "JavaScript", "MongoDB"],
  "location": "Delhi",
  "salary": "6-10 LPA",
  "jobType": "Full-time"
}
```

### 6. Student Applies

Use the student's JWT token:

```text
POST /api/applications
```

Example:

```json
{
  "job": "JOB_ID"
}
```

### 7. Check Applications

Student:

```text
GET /api/applications/my
```

Recruiter:

```text
GET /api/applications/recruiter
```

### 8. Update Application Status

Recruiter can update an application:

```text
PUT /api/applications/APPLICATION_ID/status
```

Example:

```json
{
  "status": "Shortlisted"
}
```

## Dashboard Statistics

Recruiters can access:

```text
GET /api/recruiter/dashboard
```

The dashboard provides:

- Total jobs
- Total applications
- Shortlisted applications
- Rejected applications
- Selected applications

Example response:

```json
{
  "totalJobs": 5,
  "totalApplications": 20,
  "shortlisted": 7,
  "rejected": 5,
  "selected": 2
}
```

## Validation & Security

The backend includes:

- Password hashing using bcrypt
- JWT authentication
- Role-based authorization
- Protected API routes
- Duplicate application prevention
- Job existence validation
- Application status validation
- Recruiter ownership checks
- Mongoose schema validation
- Centralized error handling
- Environment variables for sensitive configuration
- CORS support

## Database Models

### User

Stores:

- Name
- Email
- Password
- Role

### Profile

Stores:

- User reference
- Bio
- Skills
- Education
- Experience
- GitHub
- LinkedIn
- Resume

### Job

Stores:

- Recruiter reference
- Job title
- Company
- Description
- Skills
- Location
- Salary
- Job type

### Application

Stores:

- Student reference
- Job reference
- Application status
- Application date

## Future Improvements

Planned improvements can include:

- React frontend
- Skill-based job matching
- Recommendation system
- Resume upload
- Profile picture upload
- Email notifications
- Advanced recruiter analytics
- Admin panel
- Saved jobs
- Job alerts
- Application deadline support
- AI-powered job recommendations

## Project Goal

The goal of SkillMatch is to create a practical job matching platform where students can discover relevant opportunities and recruiters can efficiently manage job postings and applications.

## Author

**Ayush Kharya**

---

If you found this project useful, consider giving the repository a ⭐ on GitHub.

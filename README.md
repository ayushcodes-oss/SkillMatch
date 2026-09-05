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

---

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

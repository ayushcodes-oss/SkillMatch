const Joi = require("joi");


// =========================
// COMMON OBJECT ID
// =========================

const objectId = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
        "string.pattern.base": "Invalid MongoDB ID"
    });


// =========================
// AUTH
// =========================

const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(100)
        .required(),

    role: Joi.string()
        .valid("student", "recruiter")
        .default("student")
});


const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .required()
});


// =========================
// CHANGE PASSWORD
// =========================

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required(),

    newPassword: Joi.string()
        .min(6)
        .max(100)
        .required()
});


// =========================
// RESET PASSWORD
// =========================

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
});


const resetPasswordSchema = Joi.object({
    token: Joi.string()
        .required(),

    newPassword: Joi.string()
        .min(6)
        .max(100)
        .required()
});


// =========================
// PROFILE
// =========================

const profileSchema = Joi.object({
    bio: Joi.string()
        .trim()
        .max(500)
        .allow(""),

    skills: Joi.array()
        .items(
            Joi.string()
                .trim()
                .max(50)
        )
        .max(30),

    education: Joi.string()
        .trim()
        .max(200)
        .allow(""),

    experience: Joi.string()
        .trim()
        .max(1000)
        .allow(""),

    github: Joi.string()
        .uri()
        .allow(""),

    linkedin: Joi.string()
        .uri()
        .allow(""),

    resume: Joi.string()
        .uri()
        .allow("")
});


// =========================
// JOB
// =========================

const jobSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    company: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .min(10)
        .max(5000)
        .required(),

    skills: Joi.array()
        .items(
            Joi.string()
                .trim()
                .max(50)
        )
        .max(30)
        .default([]),

    location: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    salary: Joi.string()
        .trim()
        .max(100)
        .allow(""),

    jobType: Joi.string()
        .valid(
            "Full-time",
            "Part-time",
            "Internship"
        )
        .default("Full-time")
});


const jobIdSchema = Joi.object({
    id: objectId.required()
});


// =========================
// APPLICATION
// =========================

const applicationSchema = Joi.object({
    job: objectId.required()
});


const applicationStatusSchema = Joi.object({
    status: Joi.string()
        .valid(
            "Applied",
            "Shortlisted",
            "Rejected",
            "Selected"
        )
        .required()
});


const applicationIdSchema = Joi.object({
    id: objectId.required()
});


module.exports = {
    registerSchema,
    loginSchema,

    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,

    profileSchema,

    jobSchema,
    jobIdSchema,

    applicationSchema,
    applicationStatusSchema,
    applicationIdSchema
};
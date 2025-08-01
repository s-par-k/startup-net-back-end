import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },

    // Basic Info
    startupName: { type: String },   // Displayed name
    companyName: { type: String },   // Optional
    industry: { type: String },
    customIndustry: { type: String }, // For "Other"
    foundingYear: { type: String },
    foundingDate: { type: String },   // or use Date type
    stage: { type: String },          // e.g., Seed, Series A
    companySize: { type: String },
    teamSize: { type: String },
    description: { type: String },

    // Role
    role: {
      type: String,
      default: 'startup'
    },

    // Logo (URL or Buffer)
    logo: {
      type: mongoose.Schema.Types.Mixed
    },

    // Website and Social
    website: { type: String },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String }
    },

    // Location Info
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
      phone: { type: String },
      landmark: { type: String }
    },

    // Hiring/Job Info
    hiringRoles: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('startup', startupSchema);

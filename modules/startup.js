import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  companyName: { type: String }, // or `name`
  name: { type: String },        // optional alternative
  startupName: { type: String }, // in case you want to keep original field

  industry: { type: String },
  customIndustry: { type: String },
  foundingYear: { type: String },
  foundingDate: { type: String }, // can also be Date if desired
  companySize: { type: String },
  teamSize: { type: String },
  stage: { type: String },        // e.g., Pre-seed, Seed, etc.

  type: { type: String },         // e.g., 'startup'
  role: { type: String },         // duplicate, but useful if distinct

  website: { type: String },
  description: { type: String },
  logo: { type: mongoose.Schema.Types.Mixed }, // can be refined to Buffer or URL if needed

  location: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    phone: { type: String },
    landmark: { type: String }
  },

  hiringRoles: [{ type: String }],
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String }
  }

}, { timestamps: true });

export default mongoose.model('startup', startupSchema);

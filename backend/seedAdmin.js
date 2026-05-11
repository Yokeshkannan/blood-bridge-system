import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Admin from "./models/adminModel.js";

// Set DNS servers to Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

const seedAdmin = async () => {
  try {
    // Remove existing admin with same email
    await Admin.deleteMany({ email: "mt@admin.com" });

    // Create new admin
    const admin = new Admin({
      name: "Tameem mohammad",
      email: "mt@admin.com",
      password: "bbms@admin", // will be hashed automatically
      role: "admin",
    });

    await admin.save();
    console.log("Admin seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();

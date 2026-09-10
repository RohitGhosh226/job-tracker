import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
const app = express();
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use(express.json());
app.use(cors());
app.use("/jobs",jobRoutes);
app.use("/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("Job Tracker API is running");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });
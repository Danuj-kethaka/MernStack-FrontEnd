import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.route.js";
import appointmentRoutes from "./routes/Appointment.route.js"
import petprofileRoutes from "./routes/PetProfile.route.js"
import PetAdoption from "./routes/PetAdoption.route.js"
import adminRoutes from "./routes/Admin.route.js"
import path from "path"
import cors from "cors";

dotenv.config();
const app = express(); 

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-stack-front-end.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

//User Routes
app.use("/api/users", userRoutes);

//Appointment Routes
app.use("/api/appointments",appointmentRoutes);

//Pet Profile Routes
app.use("/api/petprofile",petprofileRoutes)

//Pet Adoption Routes
app.use("/api/petadoption",PetAdoption);

//Admin create Route
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get((req, res, next) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      next();
    }
  });
}


app.listen(PORT, () => {
connectDB();
console.log("Server started at http://localhost:" + PORT);
});

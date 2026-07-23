import express from "express";
import "dotenv/config";
import connectDatabase from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";


const app =express();
app.use(express.json());

connectDatabase();

app.use("/api/auth", authRoutes);

app.use("/api/rooms", roomRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`);
})
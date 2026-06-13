require("dotenv").config();
const express = require('express');
const cors= require("cors");
const connectDB=require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes=require("./src/routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
connectDB();

app.get("/",(req,res)=>{
    res.send("Server is running");
});


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});
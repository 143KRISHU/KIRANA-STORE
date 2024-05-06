import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
      origin:process.env.CORS_ORIGIN,
      credentials:true
}));

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

// Customer Routes Import
import customerRouter from "./routes/cutomer.route.js";
// routes declaration
app.use("/api/v1/customer",customerRouter);

//Admin Routes Import
import adminRouter from "./routes/admin.routes.js";
app.use("/api/v1/admin",adminRouter);

export default app;
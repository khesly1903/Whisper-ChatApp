import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

dotenv.config()

const PORT = process.env.PORT;

// middlewares
app.use(express.json()) // extract data from body (req.body)
app.use(cookieParser()) // to grap the cookies like req.cookies.jwt 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log("server is running on port 5001")
    connectDB()
})


import express from "express"
import { checkAuth, login, logout, signup, updateProfile, searchUser} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()
// protectRoute: if person autheticates, then can update
// auth.middleware

// authentication routes
router.post("/signup", signup)
router.post("/login",  login)
router.post("/logout", logout)

// profile update
router.put("/updateProfile", protectRoute, updateProfile)

// eg, if the user refresh the page, need to know that user auth or not
// basic control
router.get("/check", protectRoute, checkAuth)

// search user by nickname
router.get("/searchUser", protectRoute, searchUser)


export default router
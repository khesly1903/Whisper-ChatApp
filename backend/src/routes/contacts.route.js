import express from "express"

import {
sendContactRequest, 
  acceptContactRequest, 
  cancelContactRequest,
  rejectContactRequest, 
  getContactRequests,
  getContacts     
}from "../controllers/contact.controller.js"

import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router()

router.post("/sendContactRequest",protectRoute,sendContactRequest)
router.post("/acceptContactRequest",protectRoute,acceptContactRequest)
router.post("/cancelContactRequest",protectRoute,cancelContactRequest)
router.post("/rejectContactRequest",protectRoute,rejectContactRequest)
router.get("/getContactRequests",protectRoute,getContactRequests)
router.get("/getContacts",protectRoute,getContacts)


export default router
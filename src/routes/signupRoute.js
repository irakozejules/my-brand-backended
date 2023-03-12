import express from "express"
import signupController from "../controllers/signup.controller.js";
const router = express.Router()


//Create it's post method
router.post("/", signupController)



export default router; 
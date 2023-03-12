import express from "express"
import blogRoute from "./blogRoute.js"
import loginRoute from "./loginRoute.js"
import signupRoute from "./signupRoute.js"




const router= express.Router()

// All routes
router.use("/blogs", blogRoute)
router.use("/login", loginRoute)
router.use("/signup", signupRoute)

export default router
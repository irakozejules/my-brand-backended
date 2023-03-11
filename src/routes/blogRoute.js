import express from "express"
import blogController from "../controllers/blogController.js"
import restrictDelete from "../middleware/restrictdelete.js"

const router = express.Router()

router.get("/", blogController.getblogs)
//get one blog
router.get("/:id", blogController.getBlog)
//Create it's post method
router.post("/", blogController.createBlog)
//Update its Put method
router.put("/:id", blogController.updateBlog)
//Delete Blog
router.delete("/:id", restrictDelete, blogController.deleteBlog)

export default router; 




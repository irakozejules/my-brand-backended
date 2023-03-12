import Blog from "../model/blog.js";
import uploadImage from "../uploadImage.js";
//import { blogs } from "../model/dummy.js";



class blogController{

    // CRUD -operation(Create, Read, Update, and Delete)

    //get all blog
    static async getblogs(req, res){
        try {
            
            const blogs= await Blog.find()
            res.status(200).json({
                data: blogs
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:"Server Error"
            })
            
        }
    }


//GET ONE BLOG

static async getBlog(req, res){
    const {id}= req.params
    // const blogId=Number(id)

    const blog= await Blog.findOne({_id: id})
    if(!blog){
        return res.status(404).json({
            message:`Blog with id:${id} was not found`
        });
    }else{
        return res.status(200).json({
            data: blog
        })
    }
}

    // CREATE BLOG

    static async createBlog(req, res){
        try {

             const {title, author, content}= req.body;
            let img
            if(req.files){
                const {image}=req.files;
                const images= await uploadImage(image.tempFilePath);
                // console.log(image.secure_url)
                img=images.secure_url
            }

             const newBlog= await Blog.create({image:img, title, author, content})
           
            res.status(201).json({
                message: "New blog Created",
                data: newBlog
            });

          
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "server error"
            });

        }
    }




    //UPDATE
    static async updateBlog(req, res){
        try {
           // const id = req.params.id ES5 SYNTAX
           const {id} = req.params //ES6
        //    const blogId=Number(id)
           // Body to be Updated
           const {title, content}=req.body;
           const _id=id;

           const BlogUpdated= await Blog.findByIdAndUpdate(_id, {title,content}, {new:true})

           if(!BlogUpdated){

            return res.status(404).json({
                message: `Blog with id: ${id} was not found`
            })
           }
           else{
            // console.log(BlogToBeUpdated)
            // BlogToBeUpdated.title=title;
            // BlogToBeUpdated.content=content;
            return res.status(200).json({
                message:"Blog updated Successfully",
                data: BlogUpdated
            
            })
           }
            
        } catch (error) {
            res.status(500).json({
                message:"Server Error"
            });
            
        }
    }


    //Delete Blog
    static async deleteBlog(req, res){
        try {

            const {id} = req.params
            // const blogId= Number(id)
            const _id=id

            //find blog
            // const index= blogs.findIndex(blog=> blog.id=== blogId)

            const blogToBeDeleted= await Blog.findByIdAndDelete(_id)

            //condition
            if(!blogToBeDeleted){
                return res.status(404).json({
                    message: `blog with id: ${id} was not found`
                })

            }else{
                // blogs.splice(index, 1)
                res.status(200).json({
                    message:"blog deleted successfully",
                
                })
            }
            
        } catch (error) {
            
            res.status(500).json({
                message:"Server Error"
            })
        }
    }

}

export default blogController
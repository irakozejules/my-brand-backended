import {v2 as cloudinary} from "cloudinary"

//configuration
cloudinary.config({
    cloud_name: "dlnhbnmll",
    api_key:"174648194341157",
    api_secret:"MjBpUGVk-l6Wp5KMzEz8DCFElgc"
})


// Upload
export default async (file)=>{
const image = cloudinary.uploader.upload(file, {resource_type: "auto"},(result)=>result);
console.log(image)
return image


}

































// const opts={
//     overwrite:true,
//     invalidate: true,
//     resource_type: "auto"
// };

// module.exports = (image) =>{ // image is converted to base64 format
//     return new promise((resolve, reject)=>{
//         cloudinary.aploader.upload(image, opts,(error,result)=>{
//             if(result&& result.secure_url){
//                 console.log(result.secure_url)
//                 return resolve(result.secure_url)
//             }
//             console.log(error.message)
//             return resolve({message: error.message})
//         })
//     })

// }
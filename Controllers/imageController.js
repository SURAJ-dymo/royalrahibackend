const AsyncError = require("../Middelwares/AsyncError");
const Image = require("../Model/imageModel");
const cloudinary = require("cloudinary");
const ErrorHandler=require("../Utils/ErrorHandler")

exports.addImage = AsyncError(async (req, res, next) => {
  const { iname,idesc,ilink,icat,designCode,featured } = req.body;

const isExist=await Image.findOne({designCode:designCode});

if(isExist){

  
  res.status(200).json({
    success: true,
    image: {},
    message:"Desing pattern Already Available..."
  })

}else{
  const startIndex=ilink.lastIndexOf("/");
   
    const len=ilink.length;
   
    const myLink=ilink.slice(startIndex+1,len);

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

 
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "buildingimages",
     
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }


  req.body.images = imagesLinks;
  req.body.iname = req.iname;

  const image = await Image.create({
    designCode:designCode,
    iname: iname,
    idesc: idesc,
    ilink: myLink,
    icat: icat,
    images: imagesLinks,
    featured:featured
  })



  res.status(200).json({
    success: true,
    image: image,
    message:"Image Uploaded Successfully..."
  })



}

})


exports.allImagesCategoryWise = AsyncError(async (req, res, next) => {

  const page = req.query.page || 1;
  const icat = req.query.icat;
  

  
  const item_per_page = 5;
  const skip = (page - 1) * item_per_page;

  const NoOfImages = await Image.countDocuments();
  const NoOfPages = Math.ceil(NoOfImages / item_per_page)
  // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
  if(icat=="all"){
   
    const allImages = await Image.find({}).sort({ createdAt: -1 }).limit(item_per_page).skip(skip);
    res.status(200).json({
      success: true,
      images: allImages,
      NoOfImages,
      NoOfPages
  
    })
  }else{
    const NoOf = await Image.find({icat:icat});
    const NoOfImages=NoOf.length;
    const NoOfPages = Math.ceil(NoOfImages / item_per_page)
  
    const allImages = await Image.find({icat:icat}).sort({ createdAt: -1 }).limit(item_per_page).skip(skip);

    
    res.status(200).json({
      success: true,
      images: allImages,
      NoOfImages,
      NoOfPages
  
    })
  }
  


  



})




exports.ImageCodeWise = AsyncError(async (req, res, next) => {

  
  const {designCode} = req.params;
  
    const codeImage = await Image.find({designCode:designCode})
        if(codeImage.length==0){
        
          res.status(200).json({
            success: true,
            image: [],
           
        
          })
        }else{
   
    res.status(200).json({
      success: true,
      image: codeImage,
     
  
    })
  }



})





exports.ImagesFeatureWise = AsyncError(async (req, res, next) => {

  const page = req.query.page || 1;
  
  

  
  const item_per_page = 5;
  const skip = (page - 1) * item_per_page;

 
  
  
    const allFeaturedImages1 = await Image.find({featured:true})
    const allFeaturedImages = await Image.find({featured:true}).sort({ createdAt: -1 }).limit(item_per_page).skip(skip);
    const NoOfImages= allFeaturedImages1.length;
    const NoOfPages = Math.ceil(NoOfImages / item_per_page)
    res.status(200).json({
      success: true,
      images: allFeaturedImages,
      NoOfImages,
      NoOfPages
  
    })
  
  



})





exports.deletingImage = AsyncError(async (req, res, next) => {


  const image = await Image.findById(req.params.id);
  // Deleting Images From Cloudinary
  for (let i = 0; i < image.images.length; i++) {
    await cloudinary.v2.uploader.destroy(image.images[i].public_id);
  }

  await image.remove();


  res.status(200).json({
    success: true,
    isDeleted: true

  })



})

exports.gettingImage = AsyncError(async (req, res, next) => {
  const { id } = req.params;
  

  const image = await Image.findOne({ _id: id });



  res.status(200).json({
      success: true,
      image

  })



})

exports.updatingImage = AsyncError(async (req, res, next) => {
    
  const {designCode,iname,idesc,ilink,images:commingImage,featured}=req.body;
const {toTop}=req.query;

const tos=JSON.parse(toTop);

  const startIndex=ilink.lastIndexOf("/");
   
  const len=ilink.length;
 
  const myLink=ilink.slice(startIndex+1,len);

  let product = await Image.findById(req.params.id);
 const {createdAt:oldDate}=product

   
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }else{



  
        // Images Start Here
       let images = [];

     if(commingImage){

             
               if (typeof req.body.images === "string") {
               
               images.push(req.body.images);
             } else {
             images = req.body.images;
            
                }


            const imagesLinks = [];

            if (images !== undefined) {
           // Deleting Images From Cloudinary
         
           let imgi = await Image.findById(req.params.id);
            
            for (let i = 0; i < imgi.images.length; i++) {
            await cloudinary.v2.uploader.destroy(imgi.images[i].public_id);
           
            }

  

          for (let i = 0; i < images.length; i++) {

          const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "buildingimages",
          });

         imagesLinks.push({
          public_id: result.public_id,
         url: result.secure_url,
         });

        
        }

  
        }



           if(tos){
          
    
          const updatedImage = await Image.findByIdAndUpdate(req.params.id,{
          designCode:designCode,
          iname:iname,
          idesc:idesc,
           ilink:myLink,
          images:imagesLinks,
          featured:featured,
          createdAt:Date.now()
     
         }, {
           new: true,
       runValidators: true,
        useFindAndModify: false,
           });


         res.status(200).json({
       success: true,
          isUpdated:true,
   
        })


         }
        else{

    
         const updatedImage = await Image.findByIdAndUpdate(req.params.id,{
          designCode:designCode,
    iname:iname,
    idesc:idesc,
    ilink:myLink,
    featured:featured,
    images:imagesLinks,
    
     
}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });


res.status(200).json({
    success: true,
    isUpdated:true,
   
})


  
}

 








}else{

 
  
  if(tos){
    
    
 
   const updatedImage = await Image.findByIdAndUpdate(req.params.id,{
    designCode:designCode,
   iname:iname,
   idesc:idesc,
   featured:featured,
    ilink:myLink,
    createdAt:Date.now()
   
  
  

  }, {
    new: true,
runValidators: true,
 useFindAndModify: false,
    });


  res.status(200).json({
success: true,
   isUpdated:true,

 })


  }
 else{
 


  const updatedImage = await Image.findByIdAndUpdate(req.params.id,{
    designCode:designCode,
iname:iname,
idesc:idesc,
ilink:myLink,
featured:featured,




}, {
new: true,
runValidators: true,
useFindAndModify: false,
});


res.status(200).json({
success: true,
isUpdated:true,

})



}




  



  








}


  }

})




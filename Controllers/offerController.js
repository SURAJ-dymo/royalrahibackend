const AsyncError = require("../Middelwares/AsyncError");
const Offer = require("../Model/offerModel");
const cloudinary = require("cloudinary");
const ErrorHandler=require("../Utils/ErrorHandler")

exports.addOffer = AsyncError(async (req, res, next) => {
  const { odesc,olink } = req.body;

  const startIndex=olink.lastIndexOf("/");
   
    const len=olink.length;
   
    const myLink=olink.slice(startIndex+1,len);

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

  const offer = await Offer.create({
   
    odesc: odesc,
    olink:olink,
    images: imagesLinks,
   
  })



  res.status(200).json({
    success: true,
    offer: offer,
    message:"Offer Uploaded Successfully..."
  })





})


exports.allOffers= AsyncError(async (req, res, next) => {

  const page = req.query.page || 1;
  
  

  
  const item_per_page = 5;
  const skip = (page - 1) * item_per_page;

  const NoOfOffers = await Offer.countDocuments();
  const NoOfPages = Math.ceil(NoOfOffers / item_per_page)
  

   
    const allOffers = await Offer.find({}).limit(item_per_page).skip(skip);
    res.status(200).json({
      success: true,
      offers: allOffers,
      NoOfOffers,
      NoOfPages
  
    })
 
  


  



})












exports.deletingOffer = AsyncError(async (req, res, next) => {


  const offer = await Offer.findById(req.params.id);
  // Deleting Images From Cloudinary
  for (let i = 0; i < offer.images.length; i++) {
    await cloudinary.v2.uploader.destroy(offer.images[i].public_id);
  }

  await offer.remove();


  res.status(200).json({
    success: true,
    isDeleted: true

  })



})

exports.gettingOffer = AsyncError(async (req, res, next) => {
  const { id } = req.params;
  

  const offer = await Offer.findOne({ _id: id });



  res.status(200).json({
      success: true,
      offer

  })



})

exports.updatingOffer = AsyncError(async (req, res, next) => {
    
  const {odesc,olink}=req.body;

  const startIndex=olink.lastIndexOf("/");
   
  const len=olink.length;
 
  const myLink=olink.slice(startIndex+1,len);

  let offer = await Offer.findById(req.params.id);


   
  if (!offer) {
    return next(new ErrorHandler("Offer not found", 404));
  }else{

        // Images Start Here
       let images = [];

       if (typeof req.body.images === "string") {
               
        images.push(req.body.images);
      } else {
      images = req.body.images;
     
         }


         const imagesLinks = [];


         if (images !== undefined) {
            // Deleting Images From Cloudinary
          
           
             
             for (let i = 0; i < offer.images.length; i++) {
             await cloudinary.v2.uploader.destroy(offer.images[i].public_id);
            
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

         const updatedImage = await Offer.findByIdAndUpdate(req.params.id,{
           odesc:odesc,
           olink:myLink,
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

     


}




  



  











  

})




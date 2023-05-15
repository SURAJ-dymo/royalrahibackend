const AsyncError = require("../Middelwares/AsyncError");
const Imagef = require("../Model/imagefModel");
const cloudinary = require("cloudinary");


exports.addImagef = AsyncError(async (req, res, next) => {
  const { iname,idesc,ilink } = req.body;

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

  const imagef = await Imagef.create({
    iname: iname,
    idesc: idesc,
    ilink: myLink,
   
    imagesf: imagesLinks
  })



  res.status(200).json({
    success: true,
    imagef: imagef
  })



})


exports.allImagesf = AsyncError(async (req, res, next) => {

  const page = req.query.page || 1;
  const item_per_page = 5;
  const skip = (page - 1) * item_per_page;

  const NoOfImages = await Imagef.countDocuments();
  const NoOfPages = Math.ceil(NoOfImages / item_per_page)
  // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
  
   
    const allImagesf = await Imagef.find({}).sort({ createdAt: -1 }).limit(item_per_page).skip(skip);
    res.status(200).json({
      success: true,
      imagesf: allImagesf,
      NoOfImages,
      NoOfPages
  
    })

})

exports.deletingImagef = AsyncError(async (req, res, next) => {


  const image = await Imagef.findById(req.params.id);
  // Deleting Images From Cloudinary
  for (let i = 0; i < image.imagesf.length; i++) {
    await cloudinary.v2.uploader.destroy(image.imagesf[i].public_id);
  }

  await image.remove();


  res.status(200).json({
    success: true,
    isDeleted: true

  })



})

exports.gettingImagef = AsyncError(async (req, res, next) => {
  const { id } = req.params;
  

  const imagef = await Imagef.findOne({ _id: id });



  res.status(200).json({
      success: true,
      imagef

  })



})

exports.updatingImagef = AsyncError(async (req, res, next) => {
    
  const {iname,idesc,ilink}=req.body;
  const startIndex=ilink.lastIndexOf("/");
   
  const len=ilink.length;
 
  const myLink=ilink.slice(startIndex+1,len);
  
 
  
  const updatedImage = await Imagef.findByIdAndUpdate(req.params.id,{
      iname:iname,
      idesc:idesc,
      ilink:myLink,
       
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });


  res.status(200).json({
      success: true,
      isUpdated:true,
     
  })

})





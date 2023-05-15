const AsyncError=require("../Middelwares/AsyncError");
const Dist=require("../Model/distModel")


exports.addDist = AsyncError(async (req, res, next) => {


    const {dname}=req.body;

    
   

    const savedDist = await Dist.create({
        dname:dname,
       
        
       
    })
    
    res.status(200).json({
        success: true,
        dist: savedDist
    })



})

exports.allDist = AsyncError(async (req, res, next) => {

    //  const siteId=req.query.siteId ;
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    const allDist = await Dist.find({})
    
    
    res.status(200).json({
        success: true,
        dists: allDist
    })



})

exports.deletingDist = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allSites = await Dist.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingDist = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const dist = await Dist.findOne({ _id: id });



    res.status(200).json({
        success: true,
        dist

    })



})


exports.updatingDist = AsyncError(async (req, res, next) => {
    
    const {dname}=req.body;

   
   
    
    const updatedSite = await Category.findByIdAndUpdate(req.params.id,{
    dname:dname,
       
       
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

const AsyncError=require("../Middelwares/AsyncError");
const Category=require("../Model/categoryModel")


exports.addCategory = AsyncError(async (req, res, next) => {


    const {cname}=req.body;

    
   

    const savedCategory = await Category.create({
        cname:cname,
       
        
       
    })
    
    res.status(200).json({
        success: true,
        category: savedCategory
    })



})

exports.allCategories = AsyncError(async (req, res, next) => {

    //  const siteId=req.query.siteId ;
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    const allCategories = await Category.find({})
    
    
    res.status(200).json({
        success: true,
        categories: allCategories
    })



})

exports.deletingCategory = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allSites = await Category.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingCategory = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const category = await Category.findOne({ _id: id });



    res.status(200).json({
        success: true,
        category

    })



})


exports.updatingCategory = AsyncError(async (req, res, next) => {
    
    const {cname}=req.body;

   
   
    
    const updatedSite = await Category.findByIdAndUpdate(req.params.id,{
        cname:cname,
       
       
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

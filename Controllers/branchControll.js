const AsyncError=require("../Middelwares/AsyncError");
const Branch=require("../Model/branchModel")
const ErrorHander=require("../Utils/ErrorHandler");


exports.addBranch = AsyncError(async (req, res, next) => {


    const {bnumber,tname,bDesc,blink,bDist}=req.body;

    
   const isExist=await Branch.findOne({bnumber:bnumber});

   if(isExist){
    res.status(200).json({
        success: true,
        branch: {},
        message:"Branch Already Present..."
    })

   }else{

    const savedBranch = await Branch.create({
        bnumber,
        tname,
        bDesc,
        blink,
        bDist
       
    })
    
    res.status(200).json({
        success: true,
        branch: savedBranch,
        message:"यशस्वीरित्या अपलोड झाला...."
    })
}



})

exports.allBranch = AsyncError(async (req, res, next) => {

    //  const siteId=req.query.siteId ;
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);

    const {icat}=req.query;
    const {page}=req.query;

    if(icat=="all"){

       
        const item_per_page = 10;
        const skip = (page - 1) * item_per_page;
        const NoOfBranches = await Branch.countDocuments();
        const NoOfPages = Math.ceil(NoOfBranches / item_per_page)
        const allBranch = await Branch.find({}).sort({ bnumber:1 }).limit(item_per_page).skip(skip);
    
    
    res.status(200).json({
        success: true,
        branches: allBranch,
        NoOfBranches:NoOfBranches,
        NoOfPages:NoOfPages
    })


    }
    else{

        const item_per_page = 10;
        const skip = (page - 1) * item_per_page;

        const allBranch1 = await Branch.find({bDist:icat})
        const allBranch = await Branch.find({bDist:icat}).sort({ bnumber:1 }).limit(item_per_page).skip(skip);
         
        const noOfBra=allBranch1.length;
        const NoOfPages = Math.ceil(noOfBra / item_per_page)
    
        res.status(200).json({
            success: true,
            branches: allBranch,
            NoOfBranches:noOfBra,
            NoOfPages:NoOfPages
        })



    }
    



})


exports.branchWithCode = AsyncError(async (req, res, next) => {

    //  const siteId=req.query.siteId ;
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);

    const {branchNumber}=req.query;


       
        const BranchWithCode = await Branch.find({bnumber:branchNumber}).limit(10)
    
    
    res.status(200).json({
        success: true,
        branches: BranchWithCode
    })


   
    



})




exports.deletingBranch = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allSites = await Branch.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingBranch = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const branch = await Branch.findOne({ _id: id });



    res.status(200).json({
        success: true,
        branch

    })



})


exports.updatingBranch = AsyncError(async (req, res, next) => {
    
    const {bnumber,tname,bDesc,blink,bDist}=req.body;

   
   
    
    const updatedSite = await Branch.findByIdAndUpdate(req.params.id,{
        bnumber,
        tname,
        bDesc,
        blink,
        bDist
       
       
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

const AsyncError=require("../Middelwares/AsyncError");
const Loads=require("../Model/loadModel")


exports.addLoads= AsyncError(async (req, res, next) => {


    const {lnumber,loads}=req.body;

    
   

    const savedLoads = await Loads.create({
        lnumber,
        loads
       
    })
    
    res.status(200).json({
        success: true,
        loads: savedLoads
    })



})



exports.gettingLoad = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const loads = await Loads.findOne({ lnumber: id });



    res.status(200).json({
        success: true,
        loads

    })



})


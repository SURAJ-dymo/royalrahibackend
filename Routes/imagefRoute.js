const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const{addImagef,allImagesf,deletingImagef,gettingImagef,updatingImagef}=require('../Controllers/imagefController')
const router=express.Router();

router.route("/add_imagef").post(isAuthenticatedUser,addImagef);
router.route("/all_imagesf").get(allImagesf);
router.route("/delete_imagef/:id").delete(deletingImagef);
router.route("/imagef/:id").get(gettingImagef);
 router.route("/imagef/:id").put(updatingImagef);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

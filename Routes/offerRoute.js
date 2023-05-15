const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const{addOffer,allOffers,deletingOffer,gettingOffer,updatingOffer}=require('../Controllers/offerController')
const router=express.Router();

router.route("/add_offer").post(isAuthenticatedUser,addOffer);
router.route("/all_offers").get(allOffers);
router.route("/delete_offer/:id").delete(deletingOffer);
router.route("/offer/:id").get(gettingOffer);
 router.route("/offer/:id").put(updatingOffer);
//  router.route("/imagecodewise/:designCode").get(ImageCodeWise);
//  router.route("/imagesfeaturewise").get(ImagesFeatureWise);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

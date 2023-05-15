const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addDist,allDist,deletingDist,gettingDist,updatingDist}=require("../Controllers/distController");
const router=express.Router();

router.route("/add_dist").post(isAuthenticatedUser,addDist);
router.route("/all_dists").get(allDist);
router.route("/delete_dist/:id").delete(deletingDist);
router.route("/dist/:id").get(gettingDist);
router.route("/dist/:id").put(updatingDist);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

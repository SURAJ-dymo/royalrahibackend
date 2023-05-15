const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addLoads,gettingLoad}=require("../Controllers/loadController");
const router=express.Router();

router.route("/add_loads").post(isAuthenticatedUser,addLoads);
// router.route("/all_dists").get(allDist);
// router.route("/delete_dist/:id").delete(deletingDist);
router.route("/loads/:id").get(gettingLoad);
// router.route("/dist/:id").put(updatingDist);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

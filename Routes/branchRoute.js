const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addBranch,allBranch,deletingBranch,gettingBranch,updatingBranch,branchWithCode}=require("../Controllers/branchControll");
const router=express.Router();

router.route("/add_branch").post(isAuthenticatedUser,addBranch);
router.route("/all_branches").get(allBranch);
router.route("/delete_branch/:id").delete(deletingBranch);
router.route("/branch/:id").get(gettingBranch);
router.route("/branch/:id").put(updatingBranch);
router.route("/branchWithCode").get(branchWithCode);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

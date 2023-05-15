const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addCategory,allCategories,deletingCategory,gettingCategory,updatingCategory}=require("../Controllers/categoryController");
const router=express.Router();

router.route("/add_category").post(isAuthenticatedUser,addCategory);
router.route("/all_categories").get(allCategories);
router.route("/delete_category/:id").delete(deletingCategory);
router.route("/category/:id").get(gettingCategory);
router.route("/category/:id").put(updatingCategory);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;

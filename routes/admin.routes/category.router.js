




const router = require("express").Router();
const {admin_category_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add event category n catefory table
router.post('/addCategory',admin_category_controller.addCategory);

//admin delete event category
router.post('/deleteCategory',admin_category_controller.deleteCategory);

//admin update event category in table
router.post('/updateCategory',admin_category_controller.updateCategory);

//admin get all categories from evetn categories table
router.post('/getCategories',admin_category_controller.getAllCategories)
  
//admin activate or deactive category

router.post('/updateCategoryStatus',admin_category_controller.updateCategoryStatus)

module.exports = router;



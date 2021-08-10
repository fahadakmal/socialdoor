const { json } = require("body-parser");

//to get all tagsA
exports.getAllCategories = async (req, res) => {
  const EventCategory = req.models.event_category_model;
  try {
    let categoryList = await EventCategory.find()
      .sort({ updatedAt: "desc" });
    res
      .status(200)
      .json({ status: true, message: "All List Fetched", categoryList });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to add tag
exports.addCategory = async (req, res) => {
  const EventCategory = req.models.event_category_model;
  try {
      const newCategory = new EventCategory(req.body);
      await newCategory.save();
      res
        .status(201)
        .json({
          status: true,
          message: "Category addedd successfully",
          newCategory: newCategory,
        });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//to delete tag
exports.deleteCategory = async (req, res) => {
  const id = req.body._id;
  const EventCategory = req.models.event_category_model;
  try {
    const category = await EventCategory.findByIdAndDelete(id);
    if (!category) {
      res.status(404).send({ status: false, message: "No Category found" });
    } else {
      res.json({
        success: true,
        message: req.body.category_name + " deleted successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update tag
exports.updateCategory = async (req, res) => {
  const _id=req.body._id;
  const parentId = req.body.parentId;
  const category_name=req.body.category_name;
  const EventCategory = req.models.event_category_model;

  try {
    const category = await EventCategory.findByIdAndUpdate(
      { _id },
      {parentId,category_name},
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Successfully updated", category });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update status
exports.updateCategoryStatus = async (req, res) => {
  const _id = req.body._id;
  const EventCategory = req.models.event_category_model;
  const categoryStatus = req.body.status;

  try {
    const category = await EventCategory.findByIdAndUpdate(
      { _id },
      { status: categoryStatus },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ status: false, message: "category not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: req.body.title + " updated successfully",
        category,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

const { json } = require("body-parser");

//to get all tagsA
exports.getAllRules = async (req, res) => {
  const EventRule = req.models.eventRuleModel;
  try {
    let rulesList = await EventRule.find()
      .sort({ updatedAt: "desc" });
    res
      .status(200)
      .json({ status: true, message: "All List Fetched", rulesList });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to add tag
exports.addRule = async (req, res) => {
  const EventRule = req.models.eventRuleModel;
  try {
      const newRule = new EventRule(req.body);
      await newRule.save();
      res
        .status(201)
        .json({
          status: true,
          message: "Rule addedd successfully",
          newRule: newRule,
        });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//to delete tag
exports.deleteRule = async (req, res) => {
  const id = req.body._id;
  const EventRule = req.models.eventRuleModel;
  try {
    const eventRule = await EventRule.findByIdAndDelete(id);
    if (!eventRule) {
      res.status(404).send({ status: false, message: "No Rule found" });
    } else {
      res.json({
        success: true,
        message: req.body.title + " deleted successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update tag
exports.updateRule = async (req, res) => {
  const _id=req.body._id;
  const title = req.body.title;
  const description=req.body.description;
  const EventRule = req.models.eventRuleModel;

  try {
    const eventRule = await EventRule.findByIdAndUpdate(
      { _id },
      {title,description},
      { new: true }
    );
    if (!eventRule) {
      return res
        .status(404)
        .json({ status: false, message: "Rule not found" });
    }
    res.json({ success: true, message: "Successfully updated", eventRule });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update status
exports.updateRuleStatus = async (req, res) => {
  const _id = req.body._id;
  const EventRule = req.models.eventRuleModel;
  const ruleStatus = req.body.status;

  try {
    const eventRule = await EventRule.findByIdAndUpdate(
      { _id },
      { status: ruleStatus },
      { new: true }
    );
    if (!eventRule) {
      return res
        .status(404)
        .json({ status: false, message: "category not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: req.body.title + " updated successfully",
        eventRule,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

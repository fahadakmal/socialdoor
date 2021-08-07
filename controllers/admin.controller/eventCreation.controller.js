const { json } = require("body-parser");

//to get all tagsA
exports.getAllEventCreation = async (req, res) => {
  const EventCareation = req.models.eventCreationModel;
  try {
    let eventCreationList = await EventCareation.find()
      .sort({ updatedAt: "desc" });
    res
      .status(200)
      .json({ status: true, message: "All List Fetched", eventCreationList });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to add tag
exports.addEventCreation = async (req, res) => {
  const EventCareation = req.models.eventCreationModel;
  try {
      const newEventCreation = new EventCareation(req.body);
      await newEventCreation.save();
      res
        .status(201)
        .json({
          success: true,
          message: "EventCareation addedd successfully",
          newCategory: newEventCreation,
        });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//to delete tag
exports.deleteEventCreation = async (req, res) => {
  const id = req.body._id;
  const EventCareation = req.models.eventCreationModel;
  try {
    const eventCreation = await EventCareation.findByIdAndDelete(id);
    if (!eventCreation) {
      res.status(404).send({ status: false, message: "No EventCareation found" });
    } else {
      res.json({
        success: true,
        message: req.body.eventCreationEntity + " deleted successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update tag
exports.updateEventCreation = async (req, res) => {
  const _id=req.body._id;
  const eventCreationEntity = req.body.eventCreationEntity;
  const eventCreationValue=req.body.eventCreationValue;
  const eventCreationValueType=req.body.eventCreationValueType;
  const EventCareation = req.models.eventCreationModel;

  try {
    const eventCreation = await EventCareation.findByIdAndUpdate(
      { _id },
      {eventCreationEntity,eventCreationValue,eventCreationValueType},
      { new: true }
    );
    if (!eventCreation) {
      return res
        .status(404)
        .json({ status: false, message: "EventCareation not found" });
    }
    res.json({ success: true, message: "Successfully updated", eventCreation });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update status
exports.updateCreationStatus = async (req, res) => {
  const _id = req.body._id;
  const EventCareation = req.models.eventCreationModel;
  const categoryStatus = req.body.status;

  try {
    const category = await EventCareation.findByIdAndUpdate(
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
        message: req.body.eventCreationEntity + " updated successfully",
        category,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

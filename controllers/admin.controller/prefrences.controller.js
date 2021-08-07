const { json } = require("body-parser");

//to get all tagsA
exports.getAllPrefrences = async (req, res) => {
  const EventPrefrence = req.models.eventPrefrenceModel;
  try {
    let eventPrefrencesList = await EventPrefrence.find()
      .sort({ updatedAt: "desc" });
    res
      .status(200)
      .json({ status: true, message: "All List Fetched", eventPrefrencesList });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to add tag
exports.addPrefrence = async (req, res) => {
  const EventPrefrence = req.models.eventPrefrenceModel;
  try {
      const eventPrefrence = new EventPrefrence(req.body);
      await eventPrefrence.save();
      res
        .status(201)
        .json({
          success: true,
          message: "Prefrence addedd successfully",
          eventPrefrence: eventPrefrence,
        });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//to delete tag
exports.deletePrefrence = async (req, res) => {
  const id = req.body._id;
  const EventPrefrence = req.models.eventPrefrenceModel;
  try {
    const eventPrefrence = await EventPrefrence.findByIdAndDelete(id);
    if (!eventPrefrence) {
      res.status(404).send({ status: false, message: "No Event Prefrence found" });
    } else {
      res.json({
        status: true,
        message: req.body.prefrenceKey + " deleted successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update tag
exports.updatePrefrence = async (req, res) => {
  const _id=req.body._id;
  const prefrenceKey = req.body.prefrenceKey;
  const prefrenceValue=req.body.prefrenceValue;
  const prefrenceImage=req.body.prefrenceImage;
  const EventPrefrence = req.models.eventPrefrenceModel;

  try {
    const eventPrefrence = await EventPrefrence.findByIdAndUpdate(
      { _id },
      {prefrenceKey,prefrenceValue,prefrenceImage},
      { new: true }
    );
    if (!eventPrefrence) {
      return res
        .status(404)
        .json({ status: false, message: "Event Prefrence not found" });
    }
    res.json({ success: true, message: "Successfully updated", eventPrefrence });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

//to update status
exports.updatePrefrenceStatus = async (req, res) => {
  const _id = req.body._id;
  const EventPrefrence = req.models.eventPrefrenceModel;
  const eventPrefrenceStatus = req.body.status;

  try {
    const eventPrefrence = await EventPrefrence.findByIdAndUpdate(
      { _id },
      { status: eventPrefrenceStatus },
      { new: true }
    );
    if (!eventPrefrence) {
      return res
        .status(404)
        .json({ status: false, message: "Prefrence not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: req.body.prefrenceKey + " updated successfully",
        eventPrefrence,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false,  message: error.message });
  }
};

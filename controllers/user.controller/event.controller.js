//to get all tagsA
exports.getEventCreation = async (req, res) => {
  const EventCareation = req.models.eventCreationModel;
  const EventRules = req.models.eventRuleModel;
  const EventPrefrences = req.models.eventPrefrenceModel;
  const EventAmenities = req.models.amenityModel;
  const EventCancellationPolicy = req.models.cancellationPolicyModel;
  const EventCategory = req.models.event_category_model;

  try {
    const eventCreationList = await EventCareation.find(
      { status: true },
      ""
    ).sort({ updatedAt: "desc" });
    const eventRulesList = await EventRules.find({ status: true }).sort({
      updatedAt: "desc",
    });
    const eventPrefrencesList = await EventPrefrences.find({
      status: true,
    }).sort({ updatedAt: "desc" });
    const eventAmenitiesList = await EventAmenities.find({
      status: true,
    }).sort({ updatedAt: "desc" });
    const eventCancellationPolicyList = await EventCancellationPolicy.find({
      status: true,
    }).sort({ updatedAt: "desc" });
    const eventCategoryList = await EventCategory.find({ status: true }).sort({
      updatedAt: "desc",
    });
    const eventCreationData = {
      eventChargesList: eventCreationList,
      eventRulesList,
      eventPrefrencesList,
      eventAmenitiesList,
      eventCancellationPolicyList,
      eventCategoryList,
    };

    res
      .status(200)
      .json({ status: true, message: "All List Fetched", eventCreationData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addEvent = async (req, res) => {
  const Event = req.models.eventModel;
  try {
    const reqBody = JSON.parse(req.body.data);
    const newEvent = new Event({
      title: reqBody.title,
      category: reqBody.category,
      hostedDate: reqBody.hostedDate,
      startTime: reqBody.startTime,
      endTime: reqBody.endTime,
      eventPhone: reqBody.eventPhone,
      eventEmailAddress: reqBody.eventEmailAddress,
      eventCharges: reqBody.eventCharges,
      host: reqBody.host,
      volume: reqBody.volume,
      rules: reqBody.rules,
      prefrences: reqBody.prefrences,
      amenities: reqBody.amenities,
      userInstructions: reqBody.userInstructions,
      cancelInstructions: reqBody.cancelInstructions,
      venue: reqBody.venue,
      description: reqBody.description,
      paypalToken: reqBody.paypalToken,
      eventThumbNail: req.files.eventThumbNail[0].key,
    });
    await newEvent.save();
    res.status(201).json({
      status: true,
      message: "Event addedd successfully",
      newEvent: newEvent,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  const { getFileStream } = require("../../helper/imageS3.helper");

  console.log(req.body);
  const reqBody = req.body;
  const cityName = reqBody.cityName;
  const Event = req.models.eventModel;
  try {
    let eventsList = await Event.find({
      "venue.city": cityName,
      hostedDate: { $gte: Date.now(),
      status:true },
    }).sort({ updatedAt: "desc" });
    res
      .status(200)
      .json({ status: true, message: "All List Fetched", eventsList });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getEventDetail = async (req, res) => {
  const eventId = req.body.eventId;
  const Event = req.models.eventModel;
  try {
    let eventData = await Event.find({ _id: eventId,  hostedDate: { $gte: Date.now()  }})
      .populate("rules")
      .populate("prefrences")
      .populate("amenities")
      .populate('category')
      .populate('host')
      ;
      if (!eventData) {
        return res
          .status(404)
          .json({ status: false, message: "Event  not found" });
      }    res
      .status(200)
      .json({ status: true, message: "Event Detail Fetched", eventData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

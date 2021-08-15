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
  console.log(req.body);
  const reqBody = req.body;
  const cityName = reqBody.cityName;
  const Event = req.models.eventModel;
  try {
    let eventsList = await Event.find(
      {
        "venue.city": cityName,
        hostedDate: { $gte: Date.now() },
        status: false,
      },
      {
        title: 1,
        eventThumbNail: 1,
        eventCharges: 1,
        hostedDate: 1,
        category: 1,
        finalisedMembers: 1,
        tags: 1,
      }
    )
      .populate("category", "category_name")
      .populate("finalisedMembers")
      .populate("tags", "tag_name")
      .sort({ updatedAt: "desc" });
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
    let eventData = await Event.find({
      _id: eventId,
      hostedDate: { $gte: Date.now() },
    })
      .populate("rules")
      .populate("prefrences")
      .populate("amenities")
      .populate("category")
      .populate("host");
    if (!eventData) {
      return res
        .status(404)
        .json({ status: false, message: "Event  not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Event Detail Fetched", eventData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addMediaInEventGallery = async (req, res) => {
  const Event = req.models.eventModel;
  const eventId = req.body.eventId;
  const newImageKey = req.files.gallery[0].key;
  try {
    const prevEventData = await Event.findById({ _id: eventId });
    prevEventData.eventGallery.push({ mediaKey: newImageKey });
    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: eventId },
      { eventGallery: prevEventData.eventGallery },
      { new: true }
    );
    if (!updatedEvent) {
      return res
        .status(404)
        .json({ status: false, message: "Event  not found" });
    }
    res.json({
      success: true,
      message: "Successfully updated",
      newImageKey: newImageKey,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteEventMedia = async (req, res) => {
  try {
    const { deleteMedia } = require("../../helper/imageS3.helper");
    const mediaKey = req.body.mediaKey;
    deleteMedia(req.body.mediaKey, function (data) {
      {
        if (data.status === false) {
          res.status(500).json({ status: false, message: data.message });
        }
        const Event = req.models.eventModel;
        const eventId = req.body.eventId;
        Event.findById({ _id: eventId })
          .then((eventData) => {
            const updatedList = eventData.eventGallery.filter(
              (eventMedia) => eventMedia.mediaKey !== mediaKey
            );
            Event.findByIdAndUpdate(
              { _id: eventId },
              { eventGallery: updatedList },
              { new: true }
            ).then((updatedEvent) => {
              if (!updatedEvent) {
                return res
                  .status(404)
                  .json({ status: false, message: "Event  not found" });
              }
              res.json({
                success: true,
                message: "Successfully Deleted",
                updatedList: updatedList,
              });
            }).catch((err)=>{
              res.status(500).json({ status: false, message: err.message });
            })
          })
          .catch((err) => {
            res.status(500).json({ status: false, message: err.message,kind:err.kind });

          });
      }
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

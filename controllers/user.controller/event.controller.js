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
  const { uploadFile } = require("../../helper/imageS3.helper");
  const fs=require('fs');
  const util=require('util');
  const unLinkFile=util.promisify(fs.unlink)
  const Event = req.models.eventModel;
  const reqBody=JSON.parse(req.body.data)
  const eventThumbNail = req.files.eventThumbNail[0];
  try {
    if (
      eventThumbNail.mimetype === "image/jpeg" ||
      eventThumbNail.mimetype === "image/png" &&
      eventThumbNail.size <= 1000000
    ) {
      const result = await uploadFile(eventThumbNail);
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
        payerId: reqBody.payerId,
        paymentId: reqBody.paymentId,
        eventThumbNail: result.key,
      });
      await newEvent.save();
      await unLinkFile(eventThumbNail.path)
      res.status(201).json({
        status: true,
        message: "Event addedd successfully",
        newEvent: newEvent,
      });
    } else {
      await unLinkFile(eventThumbNail.path)
      res
        .status(500)
        .json({
          status: false,
          message: "File should be image and size should be lower than 5 MB",
        });
    }
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
        status: true,
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
  const userId = req.body.userId;
  console.log("i m in");
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
      .populate("host")
      .populate({ path: "refralCodes", match: { userId: userId } })
      .populate({ path: "refralUsed", match: { refrerId: userId } });
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
            )
              .then((updatedEvent) => {
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
              })
              .catch((err) => {
                res.status(500).json({ status: false, message: err.message });
              });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ status: false, message: err.message, kind: err.kind });
          });
      }
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.shareEvent = async (req, res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const reverseUserId = userId.split("").reverse().join("");
  const reverseEventId = eventId.split("").reverse().join("");
  const refralCodeString = reverseUserId + reverseEventId;
  const Event = req.models.eventModel;
  const RefralCode = req.models.refralCodeModel;

  try {
    const dbRefralCode = await RefralCode.findOne({
      refralCodeString: refralCodeString,
    });
    if (dbRefralCode) {
      res.json({
        success: true,
        message: "Refral code already exist",
        refralCodeString: dbRefralCode,
      });
      return;
    }
    const newRefralCode = new RefralCode({
      userId: userId,
      eventId: eventId,
      refralCodeString: refralCodeString,
    });
    const refCode = await newRefralCode.save();
    if (!refCode) {
      res.json({
        success: false,
        message: "Unable to save new refral code",
      });
      return;
    }
    const eventSaved = await Event.findByIdAndUpdate(
      eventId,
      { $push: { refralCodes: refCode._id } },
      { new: true, useFindAndModify: false }
    );
    if (!eventSaved) {
      res.json({
        success: false,
        message: "Unable to save new code in event",
        refralCodeString: refCode,
      });
      return;
    }
    res.json({
      success: true,
      message: "Refral Code  Successfully saved in event",
      refralCodeString: refCode,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.applyRefralCode = async (req, res) => {
  const refralCode = req.body.refralCode;
  const RefralCode = req.models.refralCodeModel;

  try {
    const dbRefralCode = await RefralCode.findOne(
      {
        refralCodeString: refralCode,
      },
      { createdAt: 0, updatedAt: 0 }
    );

    console.log(dbRefralCode);
    if (!dbRefralCode) {
      res.status(201).json({
        status: true,
        message: "Refral Code Not Exist",
      });
      return;
    }
    res.status(201).json({
      status: true,
      message: "Refral Code Exist",
      refralCode: dbRefralCode,
      refralCodeExist: true,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addInRefralUsed = async (req, res) => {
  const RefralUsed = req.models.refralUsedModel;
  const Event = req.models.eventModel;
  const refralCode = req.body.refralCode;
  const refrerId = req.body.refrerId;
  const userId = req.body.userId;
  const eventId = req.body.eventId;

  try {
    console.log("i am in");
    const dbRefralUsed = await RefralUsed.findOne({ refralCode: refralCode });
    if (!dbRefralUsed) {
      const newRefralUsed = new RefralUsed({
        refralCode: refralCode,
        refrerId: refrerId,
        eventId: eventId,
        refralUsers: [userId],
        refralUsedCount: 1,
      });
      const addedRefralUsed = await newRefralUsed.save();
      if (!addedRefralUsed) {
        res.status(200).json({
          status: false,
          message: "Refral Code Not added",
        });
        return;
      } else {
        const addedInEvent = await Event.findByIdAndUpdate(
          { _id: eventId },
          {
            $push: { refralUsed: addedRefralUsed._id },
          }
        );
        if (!addedInEvent) {
          res.status(200).json({
            status: false,
            message: "Refral Code Not added in event",
          });
          return;
        }
        res.status(200).json({
          status: true,
          message: "Refral  added in successfully",
          refralData: addedRefralUsed,
        });
        return;
      }
    }
    const updatedRefralUsed = await RefralUsed.findOneAndUpdate(
      { refralCode: refralCode },
      {
        $push: { refralUsers: userId },
        refralUsedCount: dbRefralUsed.refralUsedCount + 1,
      },
      { new: true }
    );
    if (!updatedRefralUsed) {
      res.status(200).json({
        status: false,
        message: "Refral Code Not updated",
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Refral Code Successfully updated",
      refralData: updatedRefralUsed,
    });
    return;
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.joinEvent = () => {};




//to get all tagsA
exports.getEventCreation = async (req, res) => {
    const EventCareation = req.models.eventCreationModel;
    const EventRules = req.models.eventRuleModel;
    const EventPrefrences = req.models.eventPrefrenceModel;
    const EventAmenities = req.models.amenityModel;
    const EventCancellationPolicy = req.models.cancellationPolicyModel;
    const EventCategory = req.models.event_category_model;


    try {
      const eventCreationList = await EventCareation.find({"status":true},'')
        .sort({ updatedAt: "desc" });
        const eventRulesList = await EventRules.find({"status":true})
        .sort({ updatedAt: "desc" });
        const eventPrefrencesList = await EventPrefrences.find({"status":true})
        .sort({ updatedAt: "desc" });
        const eventAmenitiesList = await EventAmenities.find({"status":true})
        .sort({ updatedAt: "desc" });
        const eventCancellationPolicyList = await EventCancellationPolicy.find({"status":true})
        .sort({ updatedAt: "desc" });
        const eventCategoryList = await EventCategory.find({"status":true})
        .sort({ updatedAt: "desc" });
        const eventCreationData={
            eventChargesList:eventCreationList,
            eventRulesList,
            eventPrefrencesList,
            eventAmenitiesList,
            eventCancellationPolicyList,
            eventCategoryList,
        }

      res
        .status(200)
        .json({ status: true, message: "All List Fetched", eventCreationData });
    } catch (error) {
      res
        .status(500)
        .json({ status: false,  message: error.message });
    }
  };


  exports.addEvent=(req,res,next)=>{
   
  }


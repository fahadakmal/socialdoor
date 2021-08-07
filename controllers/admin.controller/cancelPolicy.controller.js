const { json } = require("body-parser");



//to get all tagsA  
exports.getAllcancelPolicies = async(req, res) => {
    const CancellationPolicy = req.models.cancellationPolicyModel;
    try {
        let policiesList=await CancellationPolicy.find().sort({'updatedAt': "desc"});
        res.status(200).json({"status":true,message:"All List Fetched",policiesList});
  } catch (error) {
    res.status(500).json({"status":false,"message":"Some Error Occured",error});
  }
};

//to add tag
exports.addCancelPolicy = async(req, res) => {
 
    const CancellationPolicy = req.models.cancellationPolicyModel;
  const title = req.body.title;
  const value = req.body.value;
  const description = req.body.description;

  try {
     let policy=await  CancellationPolicy.findOne({ title });
     if(policy)
     {
        if (policy) {
            return res.json({ success: false, message: "Cancellation Policy already exist" });
          }
     }else{
        const newPolicy = new CancellationPolicy({ title: title,description:description,value:value });
        await newPolicy.save();
        res.status(201).json({ success: true,message: "Cancellation Policy addedd successfully", newPolicy: newPolicy });

     }
    
  } catch (error) {
    res.status(500).json({"status":false,error,"message":"Some Error Occured"});
  }
};

//to delete tag
exports.deleteCancelPolicy = async (req, res) =>  {
  const id = req.body._id;
  const CancellationPolicy = req.models.cancellationPolicyModel;
  try {
     const policy= await CancellationPolicy.findByIdAndDelete(id);
     if (!policy) {
       res.status(404).send({status:false,"message":"No Policy found"});
     }else{
      res.json({ success: true, message: req.body.title + " deleted successfully" });

     }
  } catch (error) {
    res.status(500).json({"status":false,error,"message":"Some Error Occured"});
  }
};

//to update tag
exports.updateCancelPolicy = async(req, res) => {
  const _id = req.body._id;
  const title = req.body.title;
  const value = req.body.value;
  const description = req.body.description;
  const CancellationPolicy = req.models.cancellationPolicyModel;

  try {
   const policy=await CancellationPolicy.findByIdAndUpdate({_id}, {title,description},{new: true})
   if(!policy)
   {
    return res.status(404).json({"status":false,"message":"Policy not found"});

   }
   res.json({ success: true,"message":"Successfully updated", policy });

  
    
  } catch (error) {
    res.status(500).json({"status":false,error,"message":"Some Error Occured"});
  }
};

//to update status
exports.updateCancelPolicyStatus = async(req, res) => {
  const _id = req.body._id;
  const CancellationPolicy = req.models.cancellationPolicyModel;
  const policyStatus =req.body.status;

  try {
    const policy=await CancellationPolicy.findByIdAndUpdate({_id}, { status: policyStatus },{new: true})
    if(!policy)
    {
     return res.status(404).json({"status":false,"message":"Policy not found"});
 
    }
        res.status(200).json({ success: true, message: req.body.title + " updated successfully", policy});
  } catch (error) {
    res.status(500).json({"status":false,error,"message":"Some Error Occured"});
  }
};


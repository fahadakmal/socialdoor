const { json } = require("body-parser");



//to get all tags
exports.getAllAmenities = async(req, res) => {
    const Amenity = req.models.amenityModel;
    try {
        let tagsList=await Amenity.find().sort({'updatedAt': "desc"});
        res.status(200).json(tagsList);
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to add tag
exports.addAminity = async(req, res) => {
 
  const Amenity = req.models.amenityModel;
  const title = req.body.title;
  const description = req.body.description;

  try {
     let amenity=await  Amenity.findOne({ title });
     if(amenity)
     {
        if (Amenity) {
            return res.json({ success: false, message: "Amenity already exist" });
          }
     }else{
        const newAmenity = new Amenity({ title: title,description:description });
        await newAmenity.save();
        res.status(201).json({ success: true, amenity: newAmenity });

     }
    
  } catch (error) {
    res.status(500).json( error);
  }
};

//to delete tag
exports.deleteAminity = async (req, res) =>  {
  const id = req.body._id;
  const Amenity = req.models.amenityModel;
  try {
     const amenity= await Amenity.findByIdAndDelete(id);
     if (!amenity) {
       res.status(404).send("No Amenity found");
     }else{
      res.json({ success: true, message: req.body.title + " deleted successfully" });

     }
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to update tag
exports.updateAminity = async(req, res) => {
  const _id = req.body._id;
  const title = req.body.title;
  const description = req.body.description;

  const Amenity = req.models.amenityModel;

  try {
   const amenity=await Amenity.findByIdAndUpdate({_id}, {title,description},{new: true})
   if(!amenity)
   {
    return res.status(404).json({"status":false,"message":"Amenity not found"});

   }
   res.json({ success: true, amenity });

  
    
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to update status
exports.updateAminityStatus = async(req, res) => {
  const _id = req.body._id;
  const Amenity = req.models.amenityModel;
  const amenityStatus =req.body.status;

  try {
    const amenity=await Amenity.findByIdAndUpdate({_id}, { status: amenityStatus },{new: true})
    if(!amenity)
    {
     return res.status(404).json({"status":false,"message":"Amenity not found"});
 
    }
        res.status(200).json({ success: true, message: req.body.title + " updated successfully", amenity});
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};


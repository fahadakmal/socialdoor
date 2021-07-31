const { json } = require("body-parser");



//to get all tags
exports.getAllTags = (req, res) => {
  const Tag = req.models.tag_model;
  try {
    Tag.find().then((data) => {
      let tagsList = data.map((tag) => {
        return { tag_name: tag.tag_name, _id: tag._id };
      });
      res.status(200).json(tagsList);
    });
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to add tag
exports.addTag = (req, res) => {
  const Tag = req.models.tag_model;
  const tag_name = req.body.tag_name;
  try {
    Tag.findOne({ tag_name })
      .then((tag) => {
        if (tag) {
          return res.json({ success: false, message: "Tag already exist" });
        }
        const newTag = new Tag({ tag_name: tag_name });
        newTag
          .save()
          .then((tag) => {
            res.json({ success: true, tag: tag });
          })
          .catch((err) => {
            res.json({ success: false, err });
          });
      })
      .catch((err) => {
        res.json({ success: false, err: err });
      });
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to delete tag
exports.deleteTag = async (req, res) =>  {
  const id = req.body._id;
  const tagName = req.body.tag_name;
  const TagModel = req.models.tag_model;
  try {
     const tag= await TagModel.findByIdAndDelete(id)
     if (!tag) {
       res.status(404).send("No item found");
     }else{
      res.json({ success: true, message: tagName + " deleted successfully" });

     }
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

//to update tag
exports.updateTag = (req, res) => {
  const _id = req.body._id;
  const tagName = req.body.tag_name;
  const updatedTagName = req.body.updatedTagName;
  const TagModel = req.models.tag_model;

  try {
    TagModel.findByIdAndUpdate({_id}, { tag_name: updatedTagName })
      .then((data) => {
        console.log(data);
        res.json({ success: true, message: tagName + " updated successfully" });
      })
      .catch((err) => {
        res.status(500).json("Un Known Error Occured" + err);
      });
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};

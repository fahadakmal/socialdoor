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
//to get all tags
exports.getAllTags =async (req, res) => {
  const Tag = req.models.tag_model;
  try {
    let tagsList=await Tag.find({'status':true}).sort({'updatedAt': "desc"});
    res.status(200).json(tagsList);
  } catch (error) {
    res.status(500).json("Un Known Error Occured" + error);
  }
};
exports.getAllTags = (req, res) => {
  const Tag = req.models.tag_model;
  try {
    Tag.find().then(data => {
        let tagsList=data.map(tag =>{
            return {tag_name:tag.tag_name,_id:tag._id}
        })
        res.status(200).json(tagsList)

    });

  } catch (error) {
    res.status(500).json("Un Known Error Occured"+error);
  }
};
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

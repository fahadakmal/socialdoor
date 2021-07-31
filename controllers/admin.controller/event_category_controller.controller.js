
exports.getAllCategories=(req,res)=>
{
    const EventCategoryModel =req.models.event_category_model;
    try {
        EventCategoryModel.findAll();
        console.log('i am in');
        
    } catch (error) {
        res.status(500).json("Un Known Error Occured");
    }

}
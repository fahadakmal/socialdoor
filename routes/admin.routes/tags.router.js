
//admin add tags in db for event like trending or others
router.post('addTags');

//admin delete tags for event from fb like trending
router.post('deleteTags');

//admin update tags from db table like popolar
router.post('updateTags');

//admin get all tags from db  like popolar 
router.post('getTags');

//admin activate or deactivate tags
router.post('activateOrDeactivateTags');

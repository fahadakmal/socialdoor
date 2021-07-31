const router = require("express").Router();

const adminTagsRoutes = require("./tags.router");
const adminRulesRoutes=require('./rules.router');
const adminAmenitiesRoutes=require('./amenities.router');
const adminEventCategoryRoutes=require('./category.router');
const adminCancellationPolicyRoutes=require('./cancelPolicies.router');
const adminEventPrefrenceRoutes=require('./eventPrefrences.router');
const adminEventCreationRoutes=require('./eventCreation.router');


router.use("/tags", adminTagsRoutes);
router.use('/eventRules',adminRulesRoutes);
router.use('/amenities',adminAmenitiesRoutes);
router.use('/eventCategoey',adminEventCategoryRoutes);
router.use('/cancallationPolicy',adminCancellationPolicyRoutes);
router.use('/eventPrefrence',adminEventPrefrenceRoutes);
router.use('/eventCreation',adminEventCreationRoutes);
// router.use('/event',adminEventRoutes);
// router.use('/evenRequest',adminEventRequestRoutes);
// router.use('/eventReviews',adminEventReviewsRoutes);
// router.use('/eventStories',adminStoryRoutes);
// router.use('/featuredEntities',adminFeaturedEntitiesRoutes);
// router.use('/payment',adminPaymentRoutes);
// router.use('/refrals',adminRefralsRoutes);
// router.use('/users',adminUserRoutes);
// router.use('/notifications',adminNotificationRoutes);





module.exports = router;

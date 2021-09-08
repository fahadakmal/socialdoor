const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const address = new Schema({
  type: { type: String, required: true },
  home: { type: String, required: true },
  street: { type: String, required: true },
  floor: { type: String },
  city: { type: String, required: true },
  postal_code: { type: String, required: true },
  latitude: { type: Number },
  longitude:{type: Number}
});

const eventMedia=new Schema({
    status:{type:Boolean,default:true},
    mediaKey:{type:String,required:true}
})



  

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "EventCategory" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    hostedDate: { type: Date, default: Date.now(), required: true },
    startTime: { type: String },
    endTime: { type: String },
    eventPhone: { type: Number, required: true },
    eventEmailAddress: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, ref: "User" },
    volume: { type: Number, default: 0 },
    eventRequests: [{ type: Schema.Types.ObjectId, ref: "EventRequest" }],
    rules: [{ type: Schema.Types.ObjectId, ref: "Rule" }],
    prefrences: [{ type: Schema.Types.ObjectId, ref: "Prefrence" }],
    amenities: [{ type: Schema.Types.ObjectId, ref: "Amenity" }],
    userInstructions: [{ type: String }],
    cancellationPolicy: {
      type: Schema.Types.ObjectId,
      ref: "CancellationPolicy",
    },
    refralCodes: [{ type: Schema.Types.ObjectId, ref: "RefralCodes" }],
    refralUsed: [{ type: Schema.Types.ObjectId, ref: "RefralUsed" }],
    finalisedMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    eventWallet: { type: Schema.Types.ObjectId, ref: "EventWallet" },
    eventCharges: { type: Number, required: true },
    paymentToken: { type: String, required: true },
    payerId: { type: String, required: true },
    paymentId: { type: String, required: true },
    venue: [address],
    eventStatus: { type: Boolean, default: false },
    eventStories: [{ type: Schema.Types.ObjectId, ref: "EventStory" }],
    featured: { type: Schema.Types.ObjectId, ref: "Feature" },
    eventReviews: [{ type: Schema.Types.ObjectId, ref: "EventReview" }],
    eventPaymentDetails: {
      type: Schema.Types.ObjectId,
      ref: "EventPaymentDetail",
    },
    eventThumbNail: { type: String, required: true },
    eventGallery: [eventMedia],
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: null,
    },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("EventModel", eventSchema);

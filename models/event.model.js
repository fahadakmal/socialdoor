const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "EventCategory" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    hostedDate: { type: Date, default: Date.now(), required: true },
    startTime: { type: Date,},
    endTime: { type: Date,},
    eventPhone: { type: Number, required: true },
    eventEmailAddress: { type: email, required: true },
    host: { type: Schema.Types.ObjectId, ref: "User" },
    volume: { type: Number, default: 0 },
    eventRequests: [{ type: Schema.Types.ObjectId, ref: "EventRequest" }],
    rules: [{ type: Schema.Types.ObjectId, ref: "Rule" }],
    prefrences: [{ type: Schema.Types.ObjectId, ref: "Prefrence" }],
    amenities: [{ type: Schema.Types.ObjectId, ref: "Amenity" }],
    userInstructions:[{type:String}],
    cancellationPolicy: {
      type: Schema.Types.ObjectId,
      ref: "CancellationPolicy",
    },
    refralCode: [{ type: Schema.Types.ObjectId, ref: "RefralCode" }],
    refralUsed: [{ type: Schema.Types.ObjectId, ref: "RefralUsed" }],
    finalisedMembers: [{ type: Schema.Types.ObjectId, ref: "User" }], 
    eventWallet: { type: Schema.Types.ObjectId, ref: "EventWallet" },
    eventCharges: {type:Number,required:true },
    venue: { type: Schema.Types.ObjectId, ref: "Address" },
    eventStatus: { type: Boolean, default: false },
    eventStories: [{ type: Schema.Types.ObjectId, ref: "EventStory" }],
    featured: { type: Schema.Types.ObjectId, ref: "Feature" },
    eventReviews: [{ type: Schema.Types.ObjectId, ref: "EventReview" }],
    eventPaymentDetails: {
      type: Schema.Types.ObjectId,
      ref: "EventPaymentDetail",
    },
    eventThumbNail: { type: String, required: true },
    eventGallery: [{ type: Schema.Types.ObjectId, ref: "EventMedia" }],
    desc: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("EventModel", eventSchema);

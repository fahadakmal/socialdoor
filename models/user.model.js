const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const address = new Schema({
  type: { type: String, required: true },
  home: { type: String, required: true },
  street: { type: String, required: true },
  floor: { type: String },
  city: { type: String, required: true },
  postal_code: { type: String, required: true },
  coordinates: { type: String },
});



const otp_value_schema = new Schema({
  type: {type:String, default: "general"},
  otp: {type: String, require: true},
  expires_in: {type: Date, default:new Date(Date.now()+(60000*60*24))}
})


const resetPasswordTokenSchema= new Schema({
  token: {type: String, require: true},
  expires_in: {type: Date, default:new Date(Date.now()+(60000*60*24))}
})



// const otp_schema = new Schema({
//   phone: otp_value_schema,
//   email: otp_value_schema,
//   general: otp_value_schema
// })

const user_schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profileImage:{type: String,},
  address: [address],
  facebook: { type: String,default:""},
  google: { type: String,default:""},
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventSchema" }],
  hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventSchema" }],
  presentEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventSchema" }],
  favoriteEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventSchema" }],
  dob:{type:Date,},
  is_premium:{type:Schema.Types.ObjectId,ref:'Feature'},
  gender:{type:Number,},
  total_worth: { type: Number, default: 0 },
  email: { type: String, required: true ,    unique: true  },
  password: { type: String,  },
  phone: { type: String,},
  credit: { type: String, default: 0 },
  wallet: { type: String, default: 0 },
  paymentDetails:{type:String},
  favouriteCategories:[{type:mongoose.Schema.Types.ObjectId,ref:"categorySchema"}],
  comments:[{  type: Schema.Types.ObjectId,ref: 'Comment'}],
  rating:{type:Number,required:true},
  is_verified: { type: Boolean, default: false },
  is_email_verified: { type: Boolean, default: false },
  is_phone_verified: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  language: {type: String, default: "english"},
  resetPasswordToken:{type : String,required:false},
  resetPasswordExpires:{ type: Date,required:false },
  status:{typee:Boolean,default:true},
  otp: [otp_value_schema]
},{timestamps: true});


module.exports = new mongoose.model('User', user_schema);
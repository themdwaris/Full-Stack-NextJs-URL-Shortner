import mongoose from "mongoose";

const clcikStatsSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  ip: String,
  city: String,
  region: String,
  clickCount:{
    type:Number,
    default:1
  }
});

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalClicks: { type: Number, default: 0 },

    clickStats: [clcikStatsSchema],
  },
  { timestamps: true }
);

const URL = mongoose.models.Url || mongoose.model('Url',urlSchema)
export default URL

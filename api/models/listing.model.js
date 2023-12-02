import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    dateTitle:{
      type: String,
      required: true,
    },
    date:{
      type: String,
      required: true,
    },
    timeTitle:{
      type: String,
      required: true,
    },
    time:{
      type: String,
      required: true,
    },
    locationTitle:{
      type: String,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },

  }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
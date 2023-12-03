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
    date:{
      type: String,
      required: true,
    },
    time:{
      type: String,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    imageUrls:{
      type: Array,
      required: true,
    },
    userRef:{
      type: String,
      required: true,
    },

  }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
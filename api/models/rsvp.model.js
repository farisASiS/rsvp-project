import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    phone:{
      type: Number,
      required: true,
    },
    listingRef:{
      type: String,
      required: true,
    },


  }, {timestamps: true}
)

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

export default Rsvp;
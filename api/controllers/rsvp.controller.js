import Rsvp from "../models/rsvp.model.js";
import { errorHandler } from "../utils/error.js";

export const createRsvp = async (req, res, next) => {
  try {
    const rsvp = await Rsvp.create(req.body);
    return res.status(201).json(rsvp);
  } catch (error) {
    next(error);
    console.log(error);
  }
};




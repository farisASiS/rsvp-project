import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
    console.log(error)
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Acara tiada dalam rekod!'))
  }
  
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Anda hanya boleh hapus acara anda!'))
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Acara telah dihapuskan');
  } catch (error) {
    next(error)
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Acara tiada dalam rekod!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Anda hanya boleh kemaskini acara anda!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Acara tiada dalam rekod!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
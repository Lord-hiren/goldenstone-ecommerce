const ErrorHander = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../models/eventModel");
const cloudinary = require("cloudinary");

// Create Event
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "events",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    event,
  });
});

// Get All Events
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    success: true,
    events,
  });
});

// Get Event Details
exports.getEventDetails = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Event not found", 404));
  }

  res.status(200).json({
    success: true,
    event,
  });
});

// Update Event
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Event not found", 404));
  }

  // Handle Images
  if (req.body.images) {
    // Delete old images
    for (let i = 0; i < event.images.length; i++) {
      await cloudinary.v2.uploader.destroy(event.images[i].public_id);
    }

    const imagesLinks = [];
    const images = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    event,
  });
});

// Delete Event
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Event not found", 404));
  }

  // Delete Images
  for (let i = 0; i < event.images.length; i++) {
    await cloudinary.v2.uploader.destroy(event.images[i].public_id);
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

// Get Active Events
exports.getActiveEvents = catchAsyncErrors(async (req, res, next) => {
  const currentDate = new Date();

  const events = await Event.find({
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
  });

  res.status(200).json({
    success: true,
    events,
  });
});

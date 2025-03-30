const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter event title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter event description"],
  },
  startDate: {
    type: Date,
    required: [true, "Please enter event start date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please enter event end date"],
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: "End date must be after or equal to start date",
    },
  },
  discount: {
    type: Number,
    required: [true, "Please enter discount percentage"],
    min: [0, "Discount cannot be less than 0"],
    max: [100, "Discount cannot be more than 100"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update active status before saving
eventSchema.pre("save", function (next) {
  const now = new Date();
  this.active = now >= this.startDate && now <= this.endDate;
  next();
});

// Update active status before updating
eventSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.startDate || update.endDate) {
    const now = new Date();
    const startDate = update.startDate || this._update.startDate;
    const endDate = update.endDate || this._update.endDate;
    this._update.active = now >= startDate && now <= endDate;
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);

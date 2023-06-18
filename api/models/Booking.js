const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  place: {type: Schema.Types.ObjectId, require: true},
  checkIn: {type: Date, require: true},
  checkOut: {type: Date, require: true},
  numberOfGuests: Number,
  name: {type: String, require: true},
  phone: {type: String, require: true},
  price: Number,
});

const BookingModel = model("Booking", bookingSchema);

module.exports = BookingModel;
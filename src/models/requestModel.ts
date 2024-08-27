import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  requestedBy: {
    type: String,
    required: true,
    ref: "User",
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  department: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
export default Request;

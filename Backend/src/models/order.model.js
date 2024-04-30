import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({})

const Order = mongoose.model("Order",orderSchema);
export default Order;
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    "quantity": String,
    "marketName": String,
    "price": String,
});

TradesSchema.plugin(mongoosePaginate);
export default mongoose.model("Trades", TradesSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });

const tokenModel = mongoose.model("token", tokenSchema);


module.exports = tokenModel;

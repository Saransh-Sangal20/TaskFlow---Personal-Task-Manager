const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "in progress", "completed"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});  // schema for task model

const Task = mongoose.model("task", taskSchema);  // creating task model
module.exports = Task;  // exporting task model
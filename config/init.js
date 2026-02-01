// Task model initialization file
const mongoose = require("mongoose");
const Task = require("../models/task.js");

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/taskify");
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Some error while connecting to database");
        console.log(error);
    }
}
connect();

// sample data for Task model
const data = [
    {title: "School Assignment", description: "Complete math and science homework", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Grocery Shopping", description: "Buy vegetables, fruits, and dairy products", status: "completed", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Workout", description: "Go for a 30-minute run and do strength training", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Read Book", description: "Finish reading 'The Great Gatsby'", status: "completed", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Clean Room", description: "Organize desk and closet", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Pay Bills", description: "Pay electricity and internet bills online", status: "completed", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Call Mom", description: "Catch up with mom over the phone", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Meeting with Team", description: "Discuss project progress and next steps", status: "completed", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Doctor Appointment", description: "Annual health check-up", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Car Maintenance", description: "Take car for oil change and tire rotation", status: "completed", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Meditation", description: "Practice mindfulness meditation for 15 minutes", status: "pending", user: "697f7d9bbb0da69cf3babb43"},
    {title: "Plan Vacation", description: "Research destinations and book flights", status: "pending", user: "697f7d9bbb0da69cf3babb43"}
]

// inserting sample data into Task collection
Task.insertMany(data)
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});
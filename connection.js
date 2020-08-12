const mongoose = require('mongoose');

const URI = 'mongodb+srv://database:database@cluster0.6hrmq.mongodb.net/database?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
        })
        console.log('database connected');
    }


module.exports = connectDB;
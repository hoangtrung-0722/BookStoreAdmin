const mongoose = require('mongoose');

const uri = process.env.DB_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('mongoose connected');
    } catch (error) {
        console.error(error);
    }
}

mongoose.connection.on("error", err => {
    console.error(); ("err", err)
})

exports.mongoose = connectDB();
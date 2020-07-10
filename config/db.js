const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`Mongo DB connected successfully: ${conn.connection.host}`);
    } catch (error) {
            console.error(`Problem connecting to database: ${error}`);
            process.exit(1);
    }
}

module.exports = connectDB;
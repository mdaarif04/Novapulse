const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const instantconnect = await mongoose.connect(
          `${process.env.MONGO_URI}`
        );
        console.log(`Database Connected succesfully  ${instantconnect.connection.host}`);
        
        
    } catch (err) {
        console.log("Connection failed ", err);
        
    }

}
module.exports = connectDB;
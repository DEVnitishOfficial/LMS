import mongoose from "mongoose";

mongoose.set("strictQuery", false); // disabling strich features of mongoose

// database connection
const connectToDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/LMS");
  
    if(connection){
      console.log(`Connected to MongodDB at : ${connection.host}`)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

};

export default connectToDB;

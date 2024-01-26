import mongoose from "mongoose";

export const connectDatabase = () => {
  
  //  let DB_URI = "mongodb://127.0.0.1:27017/SHOPIT";
   let DB_URI = "mongodb+srv://lucky:lucky@shopit.kxmknjy.mongodb.net/SHOPIT?retryWrites=true&w=majority";


  if (process.env.NODE_ENV.trim() === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
  if (process.env.NODE_ENV.trim() === "PRODUCTION") DB_URI = process.env.DB_URI;

  // console.log(DB_URI)

  mongoose.connect(DB_URI).then((con) => {
    console.log(
      `MongoDB Database connected with HOST: ${con?.connection?.host}`
    );
  });
}; 
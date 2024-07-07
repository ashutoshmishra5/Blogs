import mongoose from 'mongoose';

// To fetch Blogs
const connection1 = {};

  export const connectDb1 = async () => {
    try {
      if(connection1.isConnected) {
        console.log("Using existing connection");
        return;
      }
      const db = await mongoose.connect(process.env.DATABASE_URL1);  
      connection1.isConnected = db.connections[0].readyState;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

// To fetch Comments
  const connection2 = {};

  
  export const connectDb2 = async () => {
    try {
      if(connection2.isConnected) {
        console.log("Using existing connection");
        return;
      }
      const db = await mongoose.connect(process.env.DATABASE_URL2);  
      connection2.isConnected = db.connections[0].readyState;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  
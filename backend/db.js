import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@chatapp-shard-00-00.amnd4.mongodb.net:27017,chatapp-shard-00-01.amnd4.mongodb.net:27017,chatapp-shard-00-02.amnd4.mongodb.net:27017/WHATSAPPCLONE?ssl=true&replicaSet=atlas-73qcqt-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Unable to connect ", error);
  }
};

export default Connection;

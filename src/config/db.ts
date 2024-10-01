import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI as string)
        ? console.log(`database connected successfully`)
        : console.log(`database connection failed`);
};

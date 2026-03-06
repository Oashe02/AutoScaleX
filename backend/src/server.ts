import app from "./app";
import dotenv from "dotenv";
import { connect } from "./database/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" server mai error:", error);
    }
};

startServer();
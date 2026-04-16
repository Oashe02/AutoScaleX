import app from "./app"
import dotenv from "dotenv"
import { connect } from "./database/db"
import { startExpirationWorker } from "./workers/expiration"
import { startPredictiveWorker } from "./workers/predictive"

dotenv.config()

const PORT = process.env.PORT || 5005

const startServer = async () => {
    try {
        await connect()
        startExpirationWorker()
        startPredictiveWorker()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error(" server mai error:", error)
    }
}

startServer()
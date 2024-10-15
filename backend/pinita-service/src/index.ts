import express from "express"
import compression from "compression"
import errorHandler from "errorhandler"
import bodyParser from "body-parser"
import { healthApiRouter } from "./routes/health/healthApiRoutes"
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(bodyParser.json())
app.use(errorHandler())

app.use('/api/v1', healthApiRouter)

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export { app, server }
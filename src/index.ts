import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = `${process.env.MONGO_URL}`


const app = express()

app.use(cors({
    credentials: true,
}))

app.use(cookieParser())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const server = http.createServer(app)

server.listen(8080, () => {
    console.log('server at http://localhost:8080')
})

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (err: Error) => {
    console.error(err)
})

app.use('/', router())
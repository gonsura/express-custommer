import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'


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

const mongoURL ='mongodb+srv://kuroy:upOGeyYeanMYCxUC@cluster0.9bd2zaf.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(mongoURL)
mongoose.connection.on('error', (err: Error) => {
    console.error(err)
})

app.use('/', router())
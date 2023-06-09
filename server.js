import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import multer from 'multer'
import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { deleteNamespace } from './controllers/deleteNamespace.js'
import { BadRequest } from './errors/BadRequest.js'
import { connectDB } from './db/connect.js'

/*
==========
Router imports
==========
*/
import queryRouter from './routes/queryQnARoute.js'
import uploadRouter from './routes/uploadRoute.js'
import chatRouter from './routes/chatRoute.js'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import flowRouter from './routes/flowRoute.js'
import dashboardRouter from './routes/dashboardRoute.js'

/*
==========
Middleware imports
==========
*/
import { customErrorHandler } from './middleware/customErrorHandler.js'
import { notfound } from './middleware/notFound.js'

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './docs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use('/docs', express.static(path.join(__dirname, 'uploadedDocs')))

/*
==========
Delete Endpoint
==========
*/
app.get('/delete', deleteNamespace)

/*
==========
Query Endpoint
==========
*/
app.use('/query', queryRouter)

/*
==========
Upload Endpoint
==========
*/
app.use('/upload', upload.array('files'), uploadRouter)

/*
==========
Chat Endpoint
==========
*/
app.use('/chat', chatRouter)

/*
==========
Auth Endpoint
==========
*/
app.use('/auth', authRouter)

/*
==========
User Endpoint
==========
*/
app.use('/user', userRouter)

/*
==========
Flow Endpoint
==========
*/
app.use('/flow', flowRouter)

/*
==========
Dashboard Endpoint
==========
*/
app.use('/dashboard', dashboardRouter)

/*
==========
Custom Error Handling Endpoint
==========
*/
app.use(customErrorHandler)
app.use(notfound)

/*
==========
Server up and running
==========
*/
const port = process.env.PORT

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port: ${port}...`)
    )
  } catch (error) {
    throw new BadRequest('Cannot Connect to db')
  }
}
start()

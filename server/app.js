
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './router/userRoutes.js'
import courseRouter from './router/courseRouter.js'
import ErrorMiddleWare from './middleware/errorMiddleWare.js';
config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}));

app.use(cookieParser()) //using cookieParser we are extracting token form the cookie(see authMiddleware.js)
app.use(morgan('dev'))

app.use('/ping', function(req,res){
    res.send('Pong')
})

// routes of 3 module

app.use('/api/v1/user',userRoutes)
app.use('api/v1/courses',courseRouter)

app.use('*', (req,res) => {
    res.status(404).send('OPPS!! 404 page not found')
})

app.use(ErrorMiddleWare)

export default app
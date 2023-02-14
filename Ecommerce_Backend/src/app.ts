import express from 'express'
import ErrorHandler from './libs/express/ErrorHandler'
import NotFound from './libs/express/NotFound'
import authRouter from './routes/auth.routes'
import cookieParser from 'cookie-parser'

import initRouter from './routes/init.routes'
import userRouter from './routes/user.routes'
import productRouter from './routes/products.routes'


const app = express()
//middelwares
app.use(express.json())
app.use(cookieParser())
// Routers
app.use(initRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/products',productRouter)


// Error Handlers
app.use(ErrorHandler)
app.use(NotFound)

export default app

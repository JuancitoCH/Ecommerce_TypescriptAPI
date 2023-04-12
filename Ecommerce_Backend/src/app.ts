import express from 'express'
import ErrorHandler from './libs/express/ErrorHandler'
import NotFound from './libs/express/NotFound'
import authRouter from './routes/auth.routes'
import cookieParser from 'cookie-parser'

import initRouter from './routes/init.routes'
import userRouter from './routes/user.routes'
import productRouter from './routes/products.routes'
import payRouter from './routes/pay.routes'
import cartRouter from './routes/cart.routes'
import salesRouter from './routes/sales.routes'

import cors from 'cors'

const app = express()
//middelwares
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173"],
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
// Routers
app.use(initRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/products',productRouter)
app.use('/pay',payRouter)
app.use('/cart',cartRouter)
app.use('/sales',salesRouter)


// Error Handlers
app.use(ErrorHandler)
app.use(NotFound)

export default app

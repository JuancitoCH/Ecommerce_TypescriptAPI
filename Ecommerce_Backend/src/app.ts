import express from 'express'
import ErrorHandler from './libs/express/ErrorHandler'
import NotFound from './libs/express/NotFound'
import authRouter from './routes/auth.routes'

import initRouter from './routes/init.routes'
import userRouter from './routes/user.routes'

const app = express()
app.use(express.json())
// Routers
app.use(initRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)

// Error Handlers
app.use(ErrorHandler)
app.use(NotFound)

export default app

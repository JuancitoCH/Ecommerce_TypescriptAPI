import express from 'express'
import ErrorHandler from './libs/express/ErrorHandler'
import NotFound from './libs/express/NotFound'
import initRouter from './routes/init.routes'

const app = express()

// Routers
app.use(initRouter)

// Error Handlers
app.use(ErrorHandler)
app.use(NotFound)

export default app

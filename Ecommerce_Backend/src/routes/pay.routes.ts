import { Router } from "express";
import { stripeController } from "../controller/stripe.controller";
import isLoged from "../middlewares/auth";

const payRouter = Router()

payRouter.post('/stripe/webhook',stripeController.webhook)
payRouter.post('/stripe/create-payment-intent',isLoged,stripeController.createPaymentIntent)



export default payRouter
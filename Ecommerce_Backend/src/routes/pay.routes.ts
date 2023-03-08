import { Router } from "express";
import { stripeController } from "../controller/stripe.controller";

const payRouter = Router()

payRouter.post('/stripe/webhook',stripeController.webhook)
payRouter.post('/stripe/create-payment-intent',stripeController.createPaymentIntent)



export default payRouter
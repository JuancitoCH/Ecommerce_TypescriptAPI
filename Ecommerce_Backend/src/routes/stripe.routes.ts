import { Router } from "express";
import { stripeController } from "../controller/stripe.controller";

const stripeRouter = Router()

stripeRouter.post('/webhook',stripeController.webhook)
stripeRouter.post('/create-payment-intent',stripeController.createPaymentIntent)



export default stripeRouter
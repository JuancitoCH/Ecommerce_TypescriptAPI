import { Request, Response, NextFunction } from "express"
import envs from "../config/envs";
import statusCodes, { ControllerResponse } from "../helpers/statusResponse";
import stripeImport from "stripe"
const stripe = new stripeImport(envs.stripe_sk as string,{apiVersion:"2022-11-15"});

// YA esta programado el weebhook y la creacion de pago
// por lo que falta los handlers de los eventos
// obtener los datos del cliente que quiere comprar
// al crear el payment intent guardamos el pedido y en el webhook de pago confirmado lo aceptamos
// cambiando el estado del pedido a true

export const stripeController = {
    webhook: (req: Request, res: Response, next: NextFunction) => {
        console.log("WebhookStripe")
        const stripe_body = req.body
        switch(stripe_body.type){

            case "payment_intent.succeeded":
                console.log("pago Realizado correctamente")
                console.log(stripe_body)
            case "payment_intent.created":
                console.log("Intento de creacion de pago creada")
        }

        return res.end()
    },
    createPaymentIntent:async (req: Request, res: Response, next: NextFunction) => {
        // const {datos} = req.body   
        console.log(req.body) 
        const paymentIntent = await stripe.paymentIntents.create({
            // amount: calculateOrderAmount(items),
            // amount are in cents
            amount: 2000,
            currency: "usd",
            description:"An arbitrary string attached to the object. Often useful for displaying to users.",
            automatic_payment_methods: {
              enabled: true,
            },
          });
        
          return res.status(200).json({
            datos:{items:[
                {
                    name:"arroz",
                    quatity:2,
                    amount:2000,
                },
            ]},
            clientSecret: paymentIntent.client_secret,
          });
    },
}
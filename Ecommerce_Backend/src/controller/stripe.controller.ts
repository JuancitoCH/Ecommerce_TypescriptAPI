import { Request, Response, NextFunction } from "express"
import stripe,{createRefund} from "../libs/stripe";
import SalesService from "../service/sales";
import { RequestUserData } from "../middlewares/auth";
import CartService from "../service/cart";
import { ErrorStatus } from "../errors/ErrorStatus";


// REORGANIZAR TODO QUE ES UN DESASTRE

// YA esta programado el weebhook y la creacion de pago
// por lo que falta los handlers de los eventos
// obtener los datos del cliente que quiere comprar
// al crear el payment intent guardamos el pedido y en el webhook de pago confirmado lo aceptamos
// cambiando el estado del pedido a true

// credit: Typescript documentation, src 
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export const stripeController = {
    webhook: (req: Request, res: Response, next: NextFunction) => {
        try{

            console.log("WebhookStripe")
            const stripe_body = req.body
            // console.log(stripe_body)
            // https://stripe.com/docs/api/events/types
            console.log("-------------")
            console.log(stripe_body.type)
            console.log("-------------")

            const StripeEventHandler={
                "payment_intent.succeeded":()=>{console.log("intento de pago Realizado correctamente")},
                "payment_intent.created":()=>{console.log("Intento de creacion de pago creada")},
                "charge.succeeded":async ()=>{
                    // console.log(stripe_body)
                    console.log("Charge success")
                    // detalles del cliente
                    // console.log(stripe_body.data.object.billing_details)
                    // detalle del producto
                    // console.log(stripe_body.data.object.metadata)
                    // TODO: Verificar que el stock este disponible aun
                    await CartService.clearCartUser(stripe_body.data.object.metadata.idUser)
                    await SalesService.salePaied(stripe_body.data.object.metadata.sale)
                    // gestionamos el stock y devolvemos el dinero si el stock queda en negativo
                    try{
                      await SalesService.salePaiedUpdateStock(stripe_body.data.object.metadata.sale)
                    }catch(e){
                      try{
                        let information = 'Server Error';
                        if((e as unknown as ErrorStatus).message.includes('stock')) {
                          information = "Stock of products not availabel, the refound must be confirmed, sorry for the inconvinient if an error ocurres please contact us";
                        }
                        await SalesService.update(stripe_body.data.object.metadata.sale,{
                          information:information,
                          statusPay:false
                        });
                        await createRefund(stripe_body.data.object.id,stripe_body.data.object.amount);
                      }catch(e){
                        throw e
                      }
                    }
                },
            }
            // Hacer un switch pa
            console.log(stripe_body.type)
            getProperty(StripeEventHandler,stripe_body.type)()
            // (StripeEventHandler)[stripe_body.type as string]    
            return res.end()
        }catch(e){next(e)}
    },
    createPaymentIntent:async (req: Request, res: Response, next: NextFunction) => {
        try{
            
            const payOneDetails = await SalesService.payOneProduct((req as RequestUserData).userData.id,req.body)
            const paymentIntent = await stripe.paymentIntents.create({
                // amount: calculateOrderAmount(items),
                // amount are in cents
                amount: payOneDetails.amount,
                currency: "usd",
                description:payOneDetails.description,
                metadata:payOneDetails.metadata,
                automatic_payment_methods: {
                  enabled: true,
                },
              });
              
              return res.status(200).json({
                data:payOneDetails,
                clientSecret: paymentIntent.client_secret,
              });
        }catch(e){next(e)}
    },
    createPaymentIntentCart:async (req: Request, res: Response, next: NextFunction) => {
        try{
            
            const payOneDetails = await SalesService.payCartProducts((req as RequestUserData).userData.id)
            const paymentIntent = await stripe.paymentIntents.create({
                // amount: calculateOrderAmount(items),
                // amount are in cents
                amount: payOneDetails.amount,
                currency: "usd",
                description:payOneDetails.description,
                metadata:payOneDetails.metadata,
                automatic_payment_methods: {
                  enabled: true,
                },
              });
              
              return res.status(200).json({
                data:payOneDetails,
                clientSecret: paymentIntent.client_secret,
              });
        }catch(e){next(e)}
    },
}
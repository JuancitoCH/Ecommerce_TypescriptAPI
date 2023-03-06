import { Request, Response, NextFunction } from "express"
import envs from "../config/envs";
import statusCodes, { ControllerResponse } from "../helpers/statusResponse";
import stripeImport from "stripe"
import { ProductReqBody } from "../interfaces/payment";
import { ErrorStatus } from "../errors/ErrorStatus";
import ProductsService from "../service/products";
const stripe = new stripeImport(envs.stripe_sk as string,{apiVersion:"2022-11-15"});

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
                "payment_intent.succeeded":()=>{console.log("pago Realizado correctamente")},
                "payment_intent.created":()=>{console.log("Intento de creacion de pago creada")},
                "charge.succeeded":()=>{
                    console.log("Charge succes")
                    console.log(stripe_body.data.object.billing_details)
                },
            }
            getProperty(StripeEventHandler,stripe_body.type)()
            // (StripeEventHandler)[stripe_body.type as string]    
            return res.end()
        }catch(e){next(e)}
    },
    createPaymentIntent:async (req: Request, res: Response, next: NextFunction) => {
        try{
            // const {datos} = req.body
            const product :ProductReqBody | undefined = req.body.product
            if(!product) throw new ErrorStatus("Invalid Products : you must include field product with at least id and quantity field",statusCodes.BADREQUEST)
            console.log(req.body)
            // Verificar campos de pasaje de datos
            // obtener el producto por id y obtener el precio
            // quantity valor absoluto
            const productDetails = await ProductsService.getOne({id:product.id})
            if(!productDetails) throw new ErrorStatus("Invalid Products : product not found",statusCodes.NOTFOUND)
            if(typeof(product.quantity) !== "number" 
            || product.quantity<1 
            || product.quantity > productDetails.stock) throw new ErrorStatus("Invalid Products : Product Quantity must be a number and not overpass the stock",statusCodes.BADREQUEST)
    
            const paymentIntent = await stripe.paymentIntents.create({
                // amount: calculateOrderAmount(items),
                // amount are in cents
                amount: productDetails.price * product.quantity,
                currency: "usd",
                description:"An arbitrary string attached to the object. Often useful for displaying to users.",
                // metadata:{
                    
                // },
                automatic_payment_methods: {
                  enabled: true,
                },
              });
              
            //   devolver todos los datos utiles
            // ej producto con su informacion completa
            // 
              return res.status(200).json({
                datos:{ items:[
                    {
                        name:"arroz",
                        quatity:2,
                        amount:2000,
                    },
                ]},
                clientSecret: paymentIntent.client_secret,
              });
        }catch(e){next(e)}
    },
}
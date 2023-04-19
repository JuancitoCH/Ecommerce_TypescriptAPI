import stripeImport from "stripe"
import envs from "../config/envs";
const stripe = new stripeImport(envs.stripe_sk as string,{apiVersion:"2022-11-15"});

async function createRefund(chargeId: string, amount: number) {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount,
    });
    return refund;
}

export default stripe
export {
    createRefund
}
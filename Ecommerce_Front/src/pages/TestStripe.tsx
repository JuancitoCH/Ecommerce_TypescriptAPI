import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useState, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";


const stripePromise = loadStripe("pk_test_51MbqdCLKDMuGcoFE8dxU8oQD1lViSS9Uf13TaIQL85PPV9ZdwCT2E6gVEnLvCtDpgI6WZ9VB3guUcUgXYTza9xLD00LJq3pW2F");
export default function TestStripe() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:4000/pay/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify({id:"63ebf6ede701357881a79a20",quantity:2}),
        mode:"cors",
      })
        .then(res => {console.log(res)
            return res
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            return data
        })
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
      
    };
    const options :StripeElementsOptions = {
      clientSecret,
      ...appearance,
    };
    return (
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        )}
      </div>
    );
}





import { useState } from "react";
import "./payments-form.styles.scss"
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from '../../store/user/user.selector'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/button.component";


const PaymentsForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setProcessingPayment] = useState(false) 

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return
        }

        setProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then((response) => response.json());

        // console.log(response);

        // const clientSecret = response.paymentIntent.client_secret;

        const { paymentIntent: { client_secret } } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        })

        setProcessingPayment(false)

        if(paymentResult.error) {
            alert(paymentResult.error.statusCode)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment succesful')
            }
        }


    }

    return <div className="paymentform-container">
        <form className="form-container" onSubmit={paymentHandler}>
            <h2>Credit card Payment</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType="inverted" type="submit" onClick={paymentHandler}>Pay now</Button>
        </form>
    </div>
}

export default PaymentsForm;
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import Button, { buttonTypeClasses } from "../button/button.component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentHandler = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => res.json());
    const {
      paymentIntent: { client_secret },
    } = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessing(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    }
    if (paymentResult.paymentIntent.status === "succeeded") {
      alert("payment successful");
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button
          isLoading={isProcessing}
          buttonType={buttonTypeClasses.inverted}>
          Pay Now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;

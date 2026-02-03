import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  // console.log(import.meta.env.VITE_PAYPAL_CLIENT_ID);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
        // "ASqLVKSWM85D8tGo151YxqNAEdK18_ZKb-csLqNLQdRrhbqV7xkPpz00wmyVKBB8Q_jWHDlw9JBtDCMy"
        import.meta.env.VITE_PAYPAL_CLIENT_ID
        // import.meta.env
        ,
          // "AZEJ1cjzQWQFvb9pBEdhkvjCmTYURxA7912-hwnLDXTEWVvK8qvXdGoQkoothZbN_l58EK4Kdp9A9VQM",
        currency: "USD",
        intent:"capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: parseFloat(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try{
            const details=await actions.order.capture()
            onSuccess(details);
          }catch(error){
            console.error(error);
          }
        }}
        onError={onError}
      />
      PayPalButton
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

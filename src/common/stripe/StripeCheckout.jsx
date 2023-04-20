import { Button } from 'antd'
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutForm = (props) => {

  const [product, setProduct] = useState({
    name: 'Servicio HR4HR',
    price: .5,
    description: 'Descripción del producto de ejemplo',
  });

  const handleToken = (token, addresses) => {
    console.log(token, addresses);
    // Aquí puedes enviar la información del pago a tu backend para que Stripe procese la transacción
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51IWFXAJGDuy80f8CuaarxDMviKl6icxhFEvJTODoPr0lcr3Oad4GOi4sT06YRk6CEtb2RJyhwLt0IFOCaf7p2TKQ00HH2VGFMU"
        token={handleToken}
        name={props.nombreEmpresa}
        amount={ props.totalPrice * 100}
        billingAddress
        shippingAddress
        currency='MXN'
      >
        <Button>Pagar</Button>
      </StripeCheckout>
    </div>
  );
};

export default StripeCheckoutForm;

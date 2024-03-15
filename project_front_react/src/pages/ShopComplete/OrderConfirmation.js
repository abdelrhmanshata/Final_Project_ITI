import React from 'react';
import "./ShopComplete.css"

import { FaCheckCircle } from 'react-icons/fa';
import OrderItem from './OrderItem';
import Grid from './Grid';
const OrderReceived = () => {
    const orderDetails = {
        orderNumber: 21706,
        products: [
          { name: 'Hoodie', quantity: 2, price: 59.00 },
          
        ],
        total: 109.95,
        paymentMethod: 'Check payments',
      };
  return (
    <div className="woocommerce-order-received">
         <div className="centered-content">
        <FaCheckCircle  className='icon' />
        <h1 className="entry-title">Order Received</h1>
      </div>
      <div className="entry-content">
        <div className="woocommerce">
          <div className="woocommerce-order">
            <p className="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
              Thank you. Your order has been received.
            </p>
            
   
            <Grid orderDetails={orderDetails}  />
            
    
    
    </div>
    <OrderItem orderDetails={orderDetails}  />
          </div>
        </div>
      </div>
   
  );
};

export default OrderReceived;

import React from 'react';

const OrderItem = ({ orderDetails }) => {
  return (
    <div className='container bg-white'>
        <section className="woocommerce-order-details">
          <h2 className="woocommerce-order-details__title">Order details</h2>
          <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
            <thead>
              <tr>
                <th className="woocommerce-table__product-name product-name">Product</th>
                <th className="woocommerce-table__product-quantity product-quantity">Quantity</th>
                <th className="woocommerce-table__product-table product-total">Total</th>
              </tr>
            </thead>

            <tbody>
              {orderDetails.products.map((product, index) => (
                <tr key={index} className="woocommerce-table__line-item order_item">
                  <td className="woocommerce-table__product-name product-name">
                    {product.name}
                  </td>
                  <td className="woocommerce-table__product-quantity product-quantity">
                    {product.quantity}
                  </td>
                  <td className="woocommerce-table__product-total product-total">
                    ${product.price}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th scope="row">Payment method:</th>
                <td colSpan="2">{orderDetails.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Total:</th>
                <td colSpan="2">${orderDetails.total}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>
  );
};

export default OrderItem;

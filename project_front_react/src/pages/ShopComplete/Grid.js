

const Grid = ({ orderDetails }) => {
    return(
<div className="order-details-grid">
<div className="order-detail">
  <h2>Order number:</h2>
  <p><strong>{orderDetails.orderNumber}</strong></p>
  </div>

  <div className="order-detail">
  <h2>Date:</h2>
  <p><strong>November 16, 2020</strong></p>
  </div>
  <div className="order-detail">
  <h2>Payment method:</h2>
  <p><strong>{orderDetails.paymentMethod}</strong></p>
</div>
<div className="order-detail">
  <h2>Total:</h2>
  <p><strong>{orderDetails.total}</strong></p>
</div>
</div>
    )
}
export default Grid;

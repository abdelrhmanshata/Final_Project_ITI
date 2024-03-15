
import { Link } from "react-router-dom";
import OrderReceived from "./OrderConfirmation";

export default function ShopComplete(){
   
    return(
        <div >
        <Link to="/" className="back-button">Back to Home</Link>
        <div>
          <OrderReceived />
        </div>
      </div>
   
    );
}
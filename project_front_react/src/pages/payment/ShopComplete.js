import { useNavigate, useParams } from "react-router-dom";
import OrderReceived from "./OrderConfirmation";
import { Button } from "@mui/material";

export default function ShopComplete() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        className="mt-5 ms-5"
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </Button>

      <div>
        <OrderReceived params={params} />
      </div>
    </div>
  );
}

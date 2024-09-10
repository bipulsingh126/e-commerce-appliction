import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useCart } from "../context/Cart.jsx";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //handle remove
  const handleRemove = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/v1/product/braintree/token'
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout title={"Cart Page"}>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-3 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length > 1
              ? `${cart?.length} items in your cart  ${
                  auth?.token ? "" : "Please login to add items to your cart"
                }`
              : "Your Cart is empty"}
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          {cart?.map((p) => (
            <div className="row m-2 p-3 card flex-row" key={p._id}>
              <div className="col-md-4">
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="img-fluid m-2"
                  width={"200px"}
                  height={"200px"}
                />
              </div>
              <div className="col-md-8">
                <h5>{p.name}</h5>
                <p>{p.description.substring(0, 30)}...</p>
                <h4>₹{p.price}</h4>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 text-center">
          <h4>Cart Summary</h4>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total Price : {totalPrice()}</h4>
          {auth?.user?.address ? (
            <div className="mb-3">
              <h4>Current Address </h4>
              <h5> {auth?.user?.address}</h5>

              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Please login to checkout
                </button>
              )}
            </div>
          )}

          <div className="mt-2">
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={!loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Loading..." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

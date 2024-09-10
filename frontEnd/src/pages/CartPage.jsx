import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useCart } from "../context/Cart.jsx";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import { toast } from "react-hot-toast";
import axios from "axios";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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

  // payment integration
  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PxQsGAV766sEG05jVboUNrdxYryhjuGhNLVfdX63aRhJ1Gy6OShfa6ckauVf8KKCKrPmYgvNtH8Cbr2qZ6Cyq3n00GbCCZR05"
      );
      const body = {
        products: cart,
        user: auth?.user,
      };
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/checkout-payment",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        toast.error(result.error.message);
      }
      
    } catch (error) {
      console.log("Stripe payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PxQsGAV766sEG05jVboUNrdxYryhjuGhNLVfdX63aRhJ1Gy6OShfa6ckauVf8KKCKrPmYgvNtH8Cbr2qZ6Cyq3n00GbCCZR05"
      );
      const body = {
        products: cart,
        user: auth?.user,
      };
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/checkout-payment",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        toast.error(result.error.message);
      }
      // Ensure the order is saved in the database
      await axios.post(
        "http://localhost:5000/api/v1/auth/orders",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/dashboard/user/order");
    } catch (error) {
      console.log(error);
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
            <button className="btn btn-success" onClick={makePayment}>
              Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

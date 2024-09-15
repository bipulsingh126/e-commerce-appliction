import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //initalp details

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  //get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related product
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-3">
        <div className="col-md-6 ">
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height={"300"}
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1>Product Details</h1>
          <h5>Product Name: {product.name}</h5>
          <h5>Product Price: {product.price}</h5>
          <h5>Product Description: {product.description}</h5>
          <h5>Product Category: {product.category?.name}</h5>
          <h5>Shipping: {product.shipping ? "Yes" : "No"}</h5>
          <h5>Available Quantity: {product.quantity}</h5>
          <button className="btn btn-primary ms-1">Add to Cart</button>
        </div>
        <hr />
        <div className="row">
          <h1>Related Product</h1>
          {relatedProduct.length < 1 ? (
            <h4>No related product found</h4>
          ) : (
            <div className="d-flex flex-wrap justify-content-between ">
              {relatedProduct?.map((p) => (
              <div
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
                className="text-decoration-none text-dark"
              >
                <div className="card m-3" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">₹{p.price}</p>
                    <button className="btn btn-secondary ms-1">
                      {" "}
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;

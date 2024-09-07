import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getALlProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  //lifecycle method
  useEffect(() => {
    getALlProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}  className="text-decoration-none text-dark" >
                <div className="card m-3" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

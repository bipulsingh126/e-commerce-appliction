import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const getProductBycat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.categorys);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductBycat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center">{category?.name}</h1>
        <h1 className="text-center">{product?.length} Products Found</h1>
        <div className=" d-flex flex-wrap">
          {product.map((p) => (
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
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    {" "}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;

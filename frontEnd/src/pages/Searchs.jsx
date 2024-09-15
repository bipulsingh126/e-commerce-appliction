import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/Serach.jsx";
const Searchs = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Result"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results?.length < 1
              ? "No product found"
              : `Found ${values?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((p) => (
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
                    <button className="btn btn-primary ms-1">
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
      </div>
    </Layout>
  );
};

export default Searchs;

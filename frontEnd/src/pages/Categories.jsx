import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import UseCategory from "../Hook/UseCategory.jsx";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = UseCategory();
  return (
    <Layout title={"Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6" key={c._id} mt-5 mb-3 gx-3 gy-3>
              <Link
                className="text-light text-decoration-none btn btn-primary"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

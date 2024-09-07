import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState([]);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");
  //get single product

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );
      setId(data?.product?._id);
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setQuantity(data?.product?.quantity);
      setShipping(data?.product?.shipping);
      setCategory(data?.product?.category._id);
      setPhoto(data?.product?.photo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // handle cretae product preview
  const createPreviewUrl = () => {
    if (file) {
      return null;
    }
    try {
      const url = URL.createObjectURL(photo);
      return url;
    } catch (error) {
      console.log(error);
      toast.error("Error in creating preview url");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //handle update product

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Error details:", error.response?.data || error.message);
      toast.error("Error in updating product");
    }
  };

  //handle delete product
  const handleDelete = async () => {
    let answer = window.prompt("are you sure you want to delete this product?");
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
      }
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting product");
    }
  };

  return (
    <Layout title={"Dashbord- Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-primary  col-md-10">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={createPreviewUrl()}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:5000/api/v1/product/product-photo/${id}`}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3 ">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter product description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter product price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter product quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <select
                  bordered={false}
                  showSearch
                  type="text"
                  size="large"
                  value={shipping}
                  placeholder="select shipping"
                  onChange={(e) => setShipping(e.target.value)}
                  className="form-control"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="btn btn-primary"
                >
                  Update Product
                </button>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="btn btn-danger ms-2 "
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

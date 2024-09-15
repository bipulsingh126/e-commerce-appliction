import { useEffect, useState } from "react";
import axios from "axios";

export default function UseCategory() {
  const [categories, setCategories] = useState([]);

  //get categories

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/category/get-category`
      );
      setCategories(data?.categorys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}

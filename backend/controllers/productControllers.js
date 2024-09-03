import { Product } from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';

const createProduct = async (req, res) => {
    try {
        const { name, slug, price, description, category, shipping, quantity } = req.fields
        const { photo } = req.files;
        //validition
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' });
            case !price:
                return res.status(500).send({ error: 'Price is Required' });
            case !description:
                return res.status(500).send({ error: 'Description is Required' });
            case !category:
                return res.status(500).send({ error: 'Category is Required' });
            case photo && photo.size > 100000:
                return res.status(500).send({ error: 'photo is Required 1mb' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' });
        }
        const products = new Product({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Product are not created"
        })
    }
}

// getproduct conntroller

const getProduct = async (req, res) => {
    try {
        //loading time to product images not responing
        const products = await Product.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All get Product Successfully",
            products,
            totalcount: products.length
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Gatting Product",
            error
        })
    }
}

//get single product

const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select("-photo").populate('category');

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Single Product Retrieved Successfully",
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Single Product",
            error: error.message
        });
    }
}

const productPhoto = async (req, res) => {
    try {
        const products = await Product.findById(req.params.pid).select("photo");
        if (products.photo.data) {
            res.set("Content-type", products.photo.contentType);
            return res.status(200).send(products.photo.data);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Getting Product Photo",
            error: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
            products
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Deleting Product",
            error: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, slug, price, description, category, shipping, quantity } = req.fields
        const { photo } = req.files;
        //validition
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' });
            case !price:
                return res.status(500).send({ error: 'Price is Required' });
            case !description:
                return res.status(500).send({ error: 'Description is Required' });
            case !category:
                return res.status(500).send({ error: 'Category is Required' });
            case photo && photo.size > 100000:
                return res.status(500).send({ error: 'photo is Required 1mb' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' });
        }
        const products = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated successfully',
            products
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Updating Product",
            error: error.message
        })
    }
}



export { createProduct, getProduct, getSingleProduct, productPhoto, deleteProduct, updateProduct };
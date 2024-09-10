import { Product } from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';
import { Category } from '../models/categoryModel.js';
import braintree from 'braintree';
import stripe from 'stripe';

const stripeInstance = stripe("sk_test_51PxQsGAV766sEG05q908zQ6GXZlyZlgTY9JCCx1gvuEQWBemhSTNMaPvTMs0DVm0HXTpyCz31vGTLUPjqQ2RpKbg00NykHMp4W");






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

//product filter

const productFilters = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) {
            args.category = checked;
        }
        if (radio.length) {
            args.price = { $gte: radio[0], $lte: radio[1] };
        }
        const products = await Product.find(args);
        res.status(200).send({
            success: true,
            message: "All Category List",
            products
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error While Filtering Product",
            error: error.message
        })
    }
}

//product count

const productCount = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
            message: "Product count"
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: " Error while getting product count",
            error: error.message
        })
    }
}

//product per page

const productPerPage = async (req, res) => {
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await Product.find({}).select("-photo").skip((page - 1) * perpage).limit(perpage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
            total: products.length,
            message: "Product per page"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while getting product per page",
            error: error.message
        })
    }
}

//search product
const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await Product.find({
            $or: [
                {
                    name: { $regex: keyword, $options: "i" },
                },
                {
                    description: { $regex: keyword, $options: "i" },
                }
            ]
        }).select("-photo")
        res.status(200).send({
            success: true,
            message: "All search product",
            result
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: "Error while searching product",
            error: error.message
        })
    }
}

//similar product
const similarProduct = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate('category');
        res.status(200).send({
            success: true,
            message: "All similar product",
            products
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: "Error while getting similar product",
            error: error.message
        })
    }
}


//product by category
const productByCategory = async (req, res) => {
    try {
        const categorys = await Category.findOne({ slug: req.params.slug });
        const products = await Product.find({ category: categorys._id }).populate('category')
        res.status(200).send({
            success: true,
            message: "All product by category",
            products,
            categorys
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: "Error while getting product by category",
            error: error.message
        })
    }
}






//checkout payment
const checkoutPayment = async (req, res) => {
    try {
        const { products, user } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
            customer_email: user.email,
        });

        res.status(200).json({ id: session.id });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while checkout payment",
            error: error.message
        })
    }
}



export { checkoutPayment, createProduct, getProduct, getSingleProduct, productPhoto, deleteProduct, updateProduct, productFilters, productCount, productPerPage, searchProduct, similarProduct, productByCategory };
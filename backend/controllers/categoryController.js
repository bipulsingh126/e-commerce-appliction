import { Category } from "../models/categoryModel.js";
import slugify from 'slugify';
const createCategoryControllers = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({
                message: 'Name is required'
            })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            })
        }
        const categorys = await new Category({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            categorys
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        })

    }
}

//categroy update

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const categorys = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            categorys
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "category not updated"
        })

    }
}
//get all category
const categoryController = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).send({
            success: true,
            message: "Gating all categories...",
            categories
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while geting all categories"
        })

    }
}


//single category

const singleCategory = async (req, res) => {
    try {

        const categorys = await Category.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            categorys,
            message: " Get single category successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while gatting single category"
        })

    }
}


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            massage: "Delete Category Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category "
        })

    }
}

export { createCategoryControllers, updateCategory, categoryController, singleCategory, deleteCategory };
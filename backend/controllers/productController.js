const ProductModel = require('../models/productModel');

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
    let query = req.query.keyword?{ name : { 
        $regex: req.query.keyword,
        $options: "i"
     }}:{}
    const products = await ProductModel.find(query);
  
    res.json({
        success: true,
        products
    })
}

//Get Single Product API - /api/v1/product/:id
exports.getSingleProducts = async (req, res, next) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })  
    }catch (error) {
        res.status(404).json({
            success: false,
            // message: error.message
            message: 'Unable to get Product with that ID'
        })
    }
}
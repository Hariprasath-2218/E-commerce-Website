const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');

//Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)
    // console.log(amount, 'AMOUNT')
    const status = 'pending';

    // console.log(req.body, 'DATA');

    const order = await OrderModel.create({cartItems,amount,status})

    //Updating product stock
    cartItems.forEach( async (item) => {
        const product = await ProductModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
    })

    res.json({
        success: true,
        order
    })
} 
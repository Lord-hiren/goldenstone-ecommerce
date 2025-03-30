const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found"));
  }

  res.json({
    success: true,
    order,
  });
});

// Get Logged In User Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.json({
    success: true,
    orders,
  });
});

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("Order has already been delivered"));
  }

  if (req.body.orderStatus === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorHander("Product not found");
  }

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found"));
  }

  await Order.deleteOne({ _id: req.params.id });

  res.json({
    success: true,
    message: "Order deleted successfully",
  });
});

// Get Monthly Income
exports.getMonthlyIncome = catchAsyncErrors(async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: { createdAt: { $gte: previousMonth } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.json({
    success: true,
    income,
  });
});

// Get Order Stats
exports.getOrderStats = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  const stats = {
    total: orders.length,
    processing: orders.filter((order) => order.orderStatus === "Processing")
      .length,
    shipped: orders.filter((order) => order.orderStatus === "Shipped").length,
    delivered: orders.filter((order) => order.orderStatus === "Delivered")
      .length,
    totalAmount: orders.reduce((total, order) => total + order.totalPrice, 0),
  };

  res.json({
    success: true,
    stats,
  });
});

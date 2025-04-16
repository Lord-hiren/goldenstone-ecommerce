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
    user_id,
    discount,
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
    user: user_id,
    discount,
  });

  res.json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById({ _id: req.params.id });

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
  const orders = await Order.find({ user: req.body.id });

  res.json({
    success: true,
    orders,
  });
});

// Get Single Order for admin
exports.getSingleOrderAdmin = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById({ _id: req.params.id });

  if (!order) {
    return next(new ErrorHander("Order not found"));
  }

  res.json({
    success: true,
    order,
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

  const currentStatus = order.orderStatus;
  const newStatus = req.body.orderStatus;

  // Define allowed status transitions
  const statusFlow = {
    Processing: ["Packed", "Canceled"],
    Packed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
    Canceled: [], // Canceled orders cannot be updated
  };

  // Check if the transition is valid
  if (!statusFlow[currentStatus].includes(newStatus)) {
    return res.json({
      succes: false,
      message: `Invalid status transition from ${currentStatus} to ${newStatus}`,
    });
  }

  // If moving to "Shipped", update stock
  if (newStatus === "Shipped") {
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity);
    }
  }

  // Set new status and timestamps
  order.orderStatus = newStatus;
  if (newStatus === "Delivered") {
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

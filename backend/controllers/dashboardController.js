const ErrorHander = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

// Get Dashboard Stats
exports.getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Calculate total sales
  const orders = await Order.find();
  const totalSales = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  // Calculate out of stock products
  const outOfStock = await Product.countDocuments({ stock: 0 });
  const lowStock = await Product.countDocuments({
    stock: { $gt: 0, $lte: 10 },
  });

  // Calculate month over month growth
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const previousMonth = new Date(lastMonth);
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  const lastMonthOrders = await Order.find({
    createdAt: { $gte: lastMonth },
  });
  const previousMonthOrders = await Order.find({
    createdAt: { $gte: previousMonth, $lt: lastMonth },
  });

  const lastMonthSales = lastMonthOrders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );
  const previousMonthSales = previousMonthOrders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );
  const salesGrowth = previousMonthSales
    ? ((lastMonthSales - previousMonthSales) / previousMonthSales) * 100
    : 0;

  const lastMonthOrderCount = lastMonthOrders.length;
  const previousMonthOrderCount = previousMonthOrders.length;
  const orderGrowth = previousMonthOrderCount
    ? ((lastMonthOrderCount - previousMonthOrderCount) /
        previousMonthOrderCount) *
      100
    : 0;

  res.status(200).json({
    success: true,
    stats: {
      totalSales,
      totalOrders,
      totalProducts,
      totalUsers,
      outOfStock,
      lowStock,
      salesGrowth,
      orderGrowth,
    },
  });
});

// Get Sales Chart Data
exports.getSalesChartData = catchAsyncErrors(async (req, res, next) => {
  const months = [];
  const salesData = [];

  // Get last 6 months of sales data
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleString("default", { month: "short" });
    months.push(month);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthOrders = await Order.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const monthSales = monthOrders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    salesData.push(monthSales);
  }

  res.status(200).json({
    success: true,
    data: {
      months,
      values: salesData,
    },
  });
});

// Get Orders Chart Data
exports.getOrdersChartData = catchAsyncErrors(async (req, res, next) => {
  const months = [];
  const ordersData = [];

  // Get last 6 months of orders data
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleString("default", { month: "short" });
    months.push(month);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    ordersData.push(monthOrders);
  }

  res.status(200).json({
    success: true,
    data: {
      months,
      values: ordersData,
    },
  });
});

// Get Stock Status Chart Data
exports.getStockStatusData = catchAsyncErrors(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const outOfStock = await Product.countDocuments({ stock: 0 });
  const lowStock = await Product.countDocuments({
    stock: { $gt: 0, $lte: 10 },
  });
  const inStock = totalProducts - outOfStock - lowStock;

  res.status(200).json({
    success: true,
    data: [
      { name: "In Stock", y: inStock },
      { name: "Low Stock", y: lowStock },
      { name: "Out of Stock", y: outOfStock },
    ],
  });
});

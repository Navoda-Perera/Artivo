const Order = require('../models/Order');

// @desc  Create order
// @route POST /api/orders
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, subtotal, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ success: false, message: 'No order items' });

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// @desc  Get logged-in user's orders
// @route GET /api/orders/mine
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// @desc  Get single order
// @route GET /api/orders/:id
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    // Allow owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// @desc  Get all orders (admin)
// @route GET /api/orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    next(err);
  }
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, ...(status === 'Delivered' ? { isDelivered: true, deliveredAt: Date.now() } : {}) },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

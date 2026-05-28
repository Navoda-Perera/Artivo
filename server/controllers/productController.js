const Product = require('../models/Product');

// @desc  Get all products (with filters, search, pagination)
// @route GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const { category, pieceType, color, search, sort, page = 1, limit = 12 } = req.query;

    const query = {};
    if (category) query.category = category;
    if (pieceType) query.pieceType = pieceType;
    if (color) query.colors = { $in: [color] };
    if (search) query.name = { $regex: search, $options: 'i' };

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
    };
    const sortBy = sortOptions[sort] || { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortBy).skip(skip).limit(Number(limit));

    res.json({ success: true, count: total, page: Number(page), pages: Math.ceil(total / limit), products });
  } catch (err) {
    next(err);
  }
};

// @desc  Get single product
// @route GET /api/products/:id
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc  Create product (admin)
// @route POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc  Update product (admin)
// @route PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

// @desc  Get featured products
// @route GET /api/products/featured
exports.getFeatured = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

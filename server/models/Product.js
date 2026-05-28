const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        'Sri Lankan Heritage',
        'Modern',
        'Portraits & Figures',
        'Nautical & Coastal',
        'Horses',
        'Elephants',
        'Abstract',
        'Nature',
        'Cityscape',
        'Floral',
      ],
    },
    pieceType: {
      type: String,
      required: true,
      enum: [
        'Single Canvas',
        '2-Piece Set',
        '3-Piece Triptych',
        '4-Piece Set',
        '5-Piece Set',
      ],
    },
    sizes: [
      {
        label: { type: String },   // e.g. "Small", "Medium", "Large"
        dimensions: { type: String }, // e.g. "30x40 cm"
        price: { type: Number },
      },
    ],
    colors: [{ type: String }],     // dominant colours e.g. ["gold","navy"]
    stock: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

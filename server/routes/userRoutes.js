const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getProfile,
  updateProfile,
  toggleWishlist,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getAllUsers);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/wishlist/:productId', protect, toggleWishlist);

module.exports = router;

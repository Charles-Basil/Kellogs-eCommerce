import express from 'express';
import {
  getUserCart,
  addToCart,
  removeFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getUserCart)
  .post(protect, addToCart);

router.route('/:itemId').delete(protect, removeFromCart);

export default router;

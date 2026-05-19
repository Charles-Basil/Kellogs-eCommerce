import express from 'express';
import {
  getDashboardStats,
  getUsers,
  getOrders,
  updateOrderStatus,
  deleteUser,
} from '../controllers/adminController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/stats').get(protect, admin, getDashboardStats);
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id/status').put(protect, admin, updateOrderStatus);

export default router;

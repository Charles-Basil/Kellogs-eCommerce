import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// For logged in users, we sync cart with backend. For guests, we could just use local state.
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, { withCredentials: true });
    return response.data.cart; // assumes { success: true, cart: { items: [...] } }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (itemData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, itemData, { withCredentials: true });
    return response.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/${itemId}`, { withCredentials: true });
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const initialState = {
  items: [], // Array of cart items
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false, // For controlling the cart drawer
  status: 'idle',
  error: null,
};

const calculateTotals = (state) => {
    state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    // Assumes item has product object with price
    state.totalAmount = state.items.reduce((total, item) => {
        const price = item.product?.discountPrice || item.product?.price || 0;
        return total + (price * item.quantity);
    }, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    addItemLocal: (state, action) => {
      const { product, quantity, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity, size, color });
      }
      calculateTotals(state);
    },
    removeItemLocal: (state, action) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
      calculateTotals(state);
    },
    updateQuantityLocal: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size && item.color === color
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      calculateTotals(state);
    },
    // Guest cart fallback logic can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
        calculateTotals(state);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
        calculateTotals(state);
        state.isOpen = true; // Auto open cart on add
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
        calculateTotals(state);
      });
  },
});

export const { toggleCart, openCart, closeCart, clearCart, addItemLocal, removeItemLocal, updateQuantityLocal } = cartSlice.actions;
export default cartSlice.reducer;

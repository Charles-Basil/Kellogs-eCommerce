"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openCart, addItemLocal } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";

export default function ProductPage({ params }: { params: { slug?: string } }) {
  // Next app-router params are available synchronously in this client component.
  const slug = params?.slug ?? "1";

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');

  // Mock product database
  const productsDb = {
    "1": {
      id: "1",
      name: "Minimalist Urban Jacket",
      price: 129.99,
      description: "Elevate your streetwear game with our signature Minimalist Urban Jacket. Crafted from premium water-resistant materials, this jacket offers a perfect blend of style and functionality. Features include a hidden hood, multiple utility pockets, and a sleek matte finish.",
      images: ["/images/product-1.jpg", "/images/product-1.jpg", "/images/product-1.jpg"],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Olive', 'Navy'],
      stock: 10,
      reviews: 124,
      rating: 4.8
    },
    "2": {
      id: "2",
      name: "Essential Cotton Tee",
      price: 34.99,
      description: "The ultimate basic. Our Essential Cotton Tee is knit from ultra-soft long-staple cotton that wears beautifully over time. Featuring a classic crewneck design and relaxed fit, it's the perfect foundation for any minimalist wardrobe.",
      images: ["/images/product-2.jpg", "/images/product-2.jpg", "/images/product-2.jpg"],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Grey'],
      stock: 50,
      reviews: 86,
      rating: 4.6
    },
    "3": {
      id: "3",
      name: "Premium Leather Sneakers",
      price: 189.99,
      description: "Clean, architectural footwear designed for all-day comfort. Handmade from buttery-soft Nappa leather, these sneakers feature subtle stitching, clean profiles, and a durable Italian rubber cupsole. Versatile enough to pair with suits or denim.",
      images: ["/images/product-3.jpg", "/images/product-3.jpg", "/images/product-3.jpg"],
      sizes: ['8', '9', '10', '11'],
      colors: ['White', 'Black'],
      stock: 5,
      reviews: 215,
      rating: 4.9
    },
    "4": {
      id: "4",
      name: "Oversized Hoodie",
      price: 79.99,
      description: "Cozy up in style. This oversized hoodie is cut from 450gsm heavy brushed loopback cotton fleece. Featuring dropped shoulders, double-layered hood without drawcords for a clean aesthetic, and robust ribbed trims.",
      images: ["/images/product-4.jpg", "/images/product-4.jpg", "/images/product-4.jpg"],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Grey', 'Black', 'Taupe'],
      stock: 20,
      reviews: 94,
      rating: 4.7
    },
    "5": {
      id: "5",
      name: "Classic Denim Jeans",
      price: 89.99,
      description: "A timeless cut in premium Japanese selvedge denim. These jeans feature a mid-rise fit that sits comfortably on the waist, straight-leg silhouette, and authentic copper hardware. Built to break in beautifully and mold to your body.",
      images: ["/images/product-5.jpg", "/images/product-5.jpg", "/images/product-5.jpg"],
      sizes: ['30', '32', '34', '36'],
      colors: ['Denim Blue', 'Black'],
      stock: 15,
      reviews: 142,
      rating: 4.5
    },
    "6": {
      id: "6",
      name: "Heavyweight Sweatpants",
      price: 59.99,
      description: "Engineered comfort for everyday lounge and street wear. Crafted from heavy-grade cotton fleece, featuring deep side pockets, a secure back zip-pocket, and adjustable internal flat cotton drawcords for custom fit.",
      images: ["/images/product-6.jpg", "/images/product-6.jpg", "/images/product-6.jpg"],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Grey', 'Black', 'Navy'],
      stock: 30,
      reviews: 73,
      rating: 4.8
    }
  };

  const product = productsDb[slug] || productsDb["1"];
  const [activeImage, setActiveImage] = useState(product.images[0]);

  const getColorBgClass = (color) => {
    const map = {
      'Black': 'bg-black',
      'Olive': 'bg-green-800',
      'Navy': 'bg-blue-900',
      'White': 'bg-white border border-gray-200 dark:bg-zinc-100',
      'Grey': 'bg-gray-400',
      'Denim Blue': 'bg-blue-600',
      'Taupe': 'bg-[#8B8589]'
    };
    return map[color] || 'bg-gray-400';
  };

  const handleAddToCart = () => {
    dispatch(addItemLocal({ 
      product: { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.images[0] 
      }, 
      quantity, 
      size: selectedSize, 
      color: selectedColor 
    }));
    dispatch(openCart());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-24 sm:w-24 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === img ? 'border-black dark:border-white' : 'border-transparent'}`}
              >
                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] w-full bg-gray-100 dark:bg-zinc-900 rounded-2xl overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-heading font-black mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold">₦{product.price}</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="flex text-black dark:text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span>({product.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6 border-t border-gray-100 dark:border-zinc-800 pt-6">
            <h3 className="font-semibold mb-3">Color: <span className="font-normal text-gray-500">{selectedColor}</span></h3>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-black dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
                >
                  <span className={`w-8 h-8 rounded-full ${getColorBgClass(color)}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Size</h3>
              <button className="text-sm text-gray-500 underline hover:text-black dark:hover:text-white">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg border font-medium transition-all ${selectedSize === size ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center gap-2 rounded-lg font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            
            <button 
              onClick={() => dispatch(toggleWishlist(product))}
              className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Heart 
                size={24} 
                className={wishlistItems.some(item => item.id === product.id) ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>

          <div className="border border-gray-100 dark:border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Truck className="text-gray-400" size={24} />
              <div>
                <h4 className="font-semibold text-sm">Free Global Shipping</h4>
                <p className="text-sm text-gray-500">On all orders over $150</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-gray-400" size={24} />
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-sm text-gray-500">Your data is safe with us</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

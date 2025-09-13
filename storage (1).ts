import { type User, type InsertUser, type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getTrendingProducts(): Promise<Product[]>;
  
  getCategories(): Promise<Category[]>;
  
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      { name: "Electronics", description: "Latest tech gadgets", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43", itemCount: 6 },
      { name: "Fashion", description: "Trendy clothing and accessories", image: "https://images.unsplash.com/photo-1445205170230-053b83016050", itemCount: 4 },
      { name: "Home & Garden", description: "Everything for your home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", itemCount: 3 },
      { name: "Sports", description: "Athletic gear and equipment", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", itemCount: 2 },
      { name: "Books", description: "Knowledge and entertainment", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570", itemCount: 1 },
      { name: "Health & Beauty", description: "Personal care products", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348", itemCount: 2 }
    ];

    categoryData.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    // Seed products
    const productData: InsertProduct[] = [
      { name: "Premium Headphones", description: "High-quality audio experience", price: "199.99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", category: "Electronics", inStock: true },
      { name: "Smart Watch Pro", description: "Advanced fitness tracking", price: "299.99", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", category: "Electronics", inStock: true },
      { name: "Vintage Camera", description: "Classic photography", price: "449.99", image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a", category: "Electronics", inStock: true },
      { name: "Gaming Laptop", description: "High-performance gaming", price: "1299.99", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", category: "Electronics", inStock: true },
      { name: "Running Shoes", description: "Premium athletic footwear", price: "89.99", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", category: "Fashion", inStock: true },
      { name: "Wireless Earbuds", description: "True wireless audio", price: "129.99", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df", category: "Electronics", inStock: true },
      { name: "Travel Backpack", description: "Durable & lightweight", price: "59.99", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", category: "Fashion", inStock: true },
      { name: "Mechanical Keyboard", description: "RGB gaming keyboard", price: "149.99", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a", category: "Electronics", inStock: true },
      { name: "Coffee Mug Set", description: "Ceramic coffee mugs", price: "24.99", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", category: "Home & Garden", inStock: true },
      { name: "LED Desk Lamp", description: "Adjustable brightness", price: "39.99", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "Home & Garden", inStock: true },
      { name: "Latest Smartphone", description: "Premium flagship model", price: "799.99", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", category: "Electronics", inStock: true },
      { name: "Pro Tablet", description: "Perfect for creativity", price: "599.99", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0", category: "Electronics", inStock: true },
      { name: "Yoga Mat", description: "Non-slip exercise mat", price: "29.99", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", category: "Sports", inStock: true },
      { name: "Water Bottle", description: "Stainless steel bottle", price: "19.99", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8", category: "Sports", inStock: true },
      { name: "Skincare Set", description: "Complete skincare routine", price: "79.99", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03", category: "Health & Beauty", inStock: true },
      { name: "Face Mask Set", description: "Hydrating face masks", price: "34.99", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b", category: "Health & Beauty", inStock: true },
      { name: "Programming Book", description: "Learn modern development", price: "49.99", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c", category: "Books", inStock: true },
      { name: "Indoor Plant", description: "Green monstera plant", price: "34.99", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b", category: "Home & Garden", inStock: true },
      { name: "Casual T-Shirt", description: "Comfortable cotton tee", price: "19.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "Fashion", inStock: true },
      { name: "Denim Jeans", description: "Classic blue jeans", price: "69.99", image: "https://images.unsplash.com/photo-1542272604-787c3835535d", category: "Fashion", inStock: true }
    ];

    productData.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getTrendingProducts(): Promise<Product[]> {
    const products = Array.from(this.products.values());
    return products.slice(0, 8); // Return first 8 as trending
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return { ...item, product };
    });
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values())
      .find(cartItem => cartItem.productId === item.productId && cartItem.sessionId === item.sessionId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...item, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    });
  }
}

export const storage = new MemStorage();

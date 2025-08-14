import { Dish } from './dish';

export interface CartItem {
  dish: Dish;
  count: number;
}

export class CartModel {
  private items: CartItem[] = [];
  private static instance: CartModel;

  private constructor() {}

  public static getInstance(): CartModel {
    if (!CartModel.instance) {
      CartModel.instance = new CartModel();
    }
    return CartModel.instance;
  }

  // 添加菜品到购物车
  addDish(dish: Dish, count: number = 1): void {
    const existingItem = this.items.find(item => item.dish.id === dish.id);
    if (existingItem) {
      existingItem.count += count;
    } else {
      this.items.push({ dish, count });
    }
    this.saveToStorage();
  }

  // 从购物车移除菜品
  removeDish(dishId: string): void {
    this.items = this.items.filter(item => item.dish.id !== dishId);
    this.saveToStorage();
  }

  // 更新菜品数量
  updateDishCount(dishId: string, count: number): void {
    const item = this.items.find(item => item.dish.id === dishId);
    if (item) {
      item.count = count;
      this.saveToStorage();
    }
  }

  // 获取购物车所有商品
  getItems(): CartItem[] {
    return [...this.items];
  }

  // 获取购物车商品总数
  getTotalCount(): number {
    return this.items.reduce((sum, item) => sum + item.count, 0);
  }

  // 获取总价
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.dish.price * item.count), 0);
  }

  // 清空购物车
  clear(): void {
    this.items = [];
    this.saveToStorage();
  }

  // 保存到本地存储
  private saveToStorage(): void {
    try {
      wx.setStorageSync('cart', this.items);
    } catch (e) {
      console.error('保存购物车数据失败', e);
    }
  }

  // 从本地存储加载
  loadFromStorage(): void {
    try {
      const data = wx.getStorageSync('cart');
      if (data) {
        this.items = data;
      }
    } catch (e) {
      console.error('读取购物车数据失败', e);
    }
  }
}
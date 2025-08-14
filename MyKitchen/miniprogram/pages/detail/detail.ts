import { mockDishes } from '../../mock/data';
import { CartModel } from '../../models/cart';

Page({
  data: {
    dish: null as any,
    count: 1
  },

  onLoad(options: any) {
    const { id } = options;
    const dish = mockDishes.find(d => d.id === id);
    if (dish) {
      this.setData({ dish });
    }
  },

  handleCountChange(e: any) {
    this.setData({ count: e.detail });
  },

  addToCart() {
    const { dish, count } = this.data;
    if (!dish) return;
    
    const cart = CartModel.getInstance();
    cart.addDish(dish, count);
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
import { CartModel } from '../../models/cart';

Page({
  data: {
    cartItems: [] as any[],
    totalPrice: 0
  },

  onLoad() {
    this.loadCartData();
  },

  loadCartData() {
    const cart = CartModel.getInstance();
    const items = cart.getItems();
    this.setData({
      cartItems: items,
      totalPrice: cart.getTotalPrice()
    });
  },

  handleCountChange(e: any) {
    const { id } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    const cart = CartModel.getInstance();
    cart.updateDishCount(id, value);
    this.loadCartData();
  },

  removeItem(e: any) {
    const { id } = e.currentTarget.dataset;
    const cart = CartModel.getInstance();
    cart.removeDish(id);
    this.loadCartData();
  },

  submitOrder() {
    const cart = CartModel.getInstance();
    
    if (cart.getTotalCount() === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '确认订单',
      content: `总计: ¥${this.data.totalPrice}`,
      success: (res) => {
        if (res.confirm) {
          cart.clear();
          wx.showToast({
            title: '订单提交成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' });
          }, 1500);
        }
      }
    });
  }
});
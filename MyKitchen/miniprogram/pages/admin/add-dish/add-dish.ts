import { mockCategories } from '../../../mock/data';

Page({
  data: {
    formData: {
      name: '',
      category: mockCategories[0].id,
      price: 0,
      description: '',
      image: 'https://via.placeholder.com/200x150?text=菜品图片'
    },
    categories: mockCategories,
    imageUploading: false
  },

  onLoad() {
    this.setData({
      'formData.category': this.data.categories[0].id
    });
  },

  handleInputChange(e: any) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },

  handleImageUpload() {
    this.setData({ imageUploading: true });
    
    // 模拟图片上传
    setTimeout(() => {
      this.setData({
        'formData.image': 'https://via.placeholder.com/200x150?text=上传的图片',
        imageUploading: false
      });
    }, 1500);
  },

  submitForm() {
    const { formData } = this.data;
    
    if (!formData.name || !formData.price) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
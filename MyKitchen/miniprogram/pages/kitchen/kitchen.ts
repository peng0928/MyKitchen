// pages/kitchen-list/kitchen-list.ts
Page({
  data: {
    kitchenList: [],
    OrikitchenList: [
      {
        id: 1,
        name: "阳光厨房",
        image: "https://tdesign.gtimg.com/mobile/demos/example1.png",
        memberCount: 5,
        rating: 4.8
      },
      {
        id: 2,
        name: "温馨小厨",
        image: "https://tdesign.gtimg.com/mobile/demos/example2.png",
        memberCount: 3,
        rating: 4.5
      },
      {
        id: 3,
        name: "美食工坊",
        image: "https://tdesign.gtimg.com/mobile/demos/example3.png",
        memberCount: 7,
        rating: 4.9
      },
      {
        id: 4,
        name: "快乐烹饪空间",
        image: "https://tdesign.gtimg.com/mobile/demos/example4.png",
        memberCount: 4,
        rating: 4.6
      },
      {
        id: 5,
        name: "家庭共享厨房",
        image: "https://tdesign.gtimg.com/mobile/demos/example5.png",
        memberCount: 6,
        rating: 4.7
      }
    ],
    filteredKitchenList: [], // filtered list for search
    activeTab: 'my',
    showAddDialog: false,          // ★ 控制弹窗显示
    newKitchenName: '',            // ★ 弹窗输入框内容
  },

  // 返回上一页
  handleBack() {
    wx.navigateBack()
  },

  // 跳转到厨房详情
  goToKitchenDetail(e: any) {
    const { id } = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({ url: '/pages/order/order' });
  },
  handleSearchInput(e:any ) {
    const keyword = e.detail.value.trim().toLowerCase();
    console.log(keyword)
    if (!keyword) {
      this.setData({ kitchenList: this.data.OrikitchenList });
      return;
    }
    
    const filtered = this.data.OrikitchenList.filter(item => 
      item.name.toLowerCase().includes(keyword)
    );
    this.setData({ kitchenList: filtered });
  },
  goToCreateKitchen() {
    wx.navigateTo({
      url: '/pages/create-kitchen/create-kitchen'
    });
  },
  switchTab(e:any) {
    const tab = e.detail.value;
    console.log(e)
    this.setData({
      activeTab: tab,
    });
  },
  onLoad() {
    this.setData({ kitchenList: this.data.OrikitchenList });
  },
   /* ★ 新增：点击“＋”按钮 */
   onAddTap() {
    this.setData({ showAddDialog: true });
  },
  /* ★ 弹窗输入双向绑定 */
  onNameInput(e: any) {
    this.setData({ newKitchenName: e.detail.value });
  },
  /* ★ 确认创建 */
  onConfirmAdd() {
    const name = this.data.newKitchenName.trim();
    if (!name) return;              // 简单判空
    const newKitchen = {
      id: Date.now(),
      name,
      image: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      memberCount: 1,
      rating: 5
    };
    const updated = [newKitchen, ...this.data.OrikitchenList];
    this.setData({
      OrikitchenList: updated,
      kitchenList: updated,
      newKitchenName: '',
      showAddDialog: false
    });
  },
  /* ★ 取消/关闭弹窗 */
  onCancelAdd() {
    this.setData({ showAddDialog: false, newKitchenName: '' });
  },
})
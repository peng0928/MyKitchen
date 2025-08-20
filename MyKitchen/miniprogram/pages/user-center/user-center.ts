Page({
  data: {
    avatarUrl: "", // 用户头像
    userInfo: {
      nickName: "张三",
      code: "FDZ10086",
      bio: "干饭不积极，思想有问题。",
    },
    stat: {
      follow: 128,
      fans: 345,
      moment: 58,
    },
    overlayVisible: false,
  },

  onShow() {
    // 可从全局或缓存同步最新数据
    const url = wx.getStorageSync("avatarUrl");
    if (url) this.setData({ avatarUrl: url });
  },

  /* 头像点击放大 */
  onAvatarTap() {
    this.setData({ overlayVisible: true });
  },

  /* 关闭 overlay */
  closeOverlay() {
    this.setData({ overlayVisible: false });
  },

  /* 选图并裁剪上传 */
  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sizeType: ["compressed"],
      crop: { aspectRatio: 1 },
      success: (res) => {
        const tempPath = res.tempFiles[0].tempFilePath;
        // 这里调用你的上传接口
        this.uploadAvatar(tempPath);
      },
    });
  },

  /* 模拟上传 */
  uploadAvatar(path) {
    wx.showLoading({ title: "上传中" });
    // 真实环境用 wx.uploadFile
    setTimeout(() => {
      this.setData({ avatarUrl: path });
      wx.setStorageSync("avatarUrl", path);
      wx.hideLoading();
      this.closeOverlay();
      wx.showToast({ title: "头像已更新" });
    }, 800);
  },

  /* 其他交互 */
  goSetting() {
    wx.navigateTo({ url: "/pages/setting/index" });
  },

  logout() {
    wx.showModal({
      title: "提示",
      content: "确定退出登录？",
      success: (res) => {
        if (res.confirm) {
          // 清缓存、回登录页
          wx.clearStorageSync();
          wx.reLaunch({ url: "/pages/login/index" });
        }
      },
    });
  },
});

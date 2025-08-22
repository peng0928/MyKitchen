import Message from "tdesign-miniprogram/message/index";
import { auth, user_update } from "../../utils/api";

Page({
  data: {
    avatarUrl: "", // 用户头像
    userInfo: {
      name: "张三",
      fid: "FDZ10086",
      desc: "干饭不积极，思想有问题。",
    },
    stat: {
      follow: 128,
      fans: 345,
      moment: 58,
    },
    overlayVisible: false,
  },
  async userInfo() {
    const response = await auth();
    const avatar_url = response.avatar_url;
    this.setData({ userInfo: response });
    if (avatar_url) {
      this.setData({ avatarUrl: avatar_url });
    } else {
      const url = wx.getStorageSync("avatarUrl");
      if (url) this.setData({ avatarUrl: url });
    }
  },

  async onShow() {
    // 可从全局或缓存同步最新数据
    await this.userInfo();
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
    Message.info({ context: this, content: "退出成功" });
    wx.clearStorageSync();
    setTimeout(() => wx.navigateTo({ url: "/pages/index/index" }), 1500);
  },
  /* 2. 点击“同步头像”文字行 */
  syncAvatar() {
    this.chooseAndSaveAvatar();
  },
  chooseAndSaveAvatar() {
    wx.getUserProfile({
      desc: "用于展示您的微信头像",
      success: (res) => {
        console.log(res);
        const url = res.userInfo.avatarUrl; // 关键：微信头像地址
        this.setData({ avatarUrl: url });
        wx.setStorageSync("avatarUrl", url); // 本地缓存
      },
      fail: () => {
        wx.showToast({ title: "需要授权才能获取头像", icon: "none" });
      },
    });
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
      },
    });
  },
  async onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail;
    console.log(avatarUrl);
    // this.setData({ avatarUrl: avatarUrl });
    // wx.setStorageSync("avatarUrl", avatarUrl); // 本地缓存
    await user_update({ avatar_url: avatarUrl });
    await this.userInfo();
  },
});

import Message from "tdesign-miniprogram/message/index";
import { request } from "../../utils/request";
Page({
  data: {
    isLogging: false,
    agree: false,
    IsOk: false,
    phoneError: false,
    pwdError: false,
    phoneNumber: "",
    pwdIcon: "browse-off",
    username: "",
    password: "",
  },
  onPhoneInput(e: any) {
    const val = e.detail.value;
    const { phoneError } = this.data;
    const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
    this.setData({
      phoneNumber: val,
    });
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
  },
  pwdInput(e: any) {
    const val = e.detail.value;
    this.setData({
      password: val,
      pwdError: false,
    });
  },
  onAgreeChange(e: any) {
    console.log(e);
    this.setData({ agree: e.detail.checked });
  },
  async onGetPhone(e: any) {
    console.log(e);
    if (!this.data.agree) {
      Message.error({
        context: this,
        offset: [20, 32],
        content: "请先勾选协议",
      });
      return;
    }
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      Message.error({ context: this, content: "获取手机号失败" });
      this.setData({ IsOk: false });
      console.log(this.data);
      return;
    }

    this.setData({ isLogging: true });

    try {
      // 1. 把 code 发给云函数 / 后端
      const { code } = e.detail; // 微信返回的动态 code
      const cloud = wx.cloud;
      const { phoneNumber } = await cloud.callFunction({
        name: "getPhone",
        data: { code },
      });

      // 2. 拿手机号去登录/注册
      const loginRes = await wx.cloud.callFunction({
        name: "login",
        data: { phone: phoneNumber },
      });

      // 3. 把会话 token 存全局
      wx.setStorageSync("token", loginRes.result.token);

      Message.success({ context: this, content: "登录成功" });
      setTimeout(() => wx.switchTab({ url: "/pages/index/index" }), 1500);
    } catch (err) {
      console.error(err);
      Message.error({ context: this, content: "登录失败，请重试" });
    } finally {
      this.setData({ isLogging: false });
    }
  },
  inputTrigger(e: any) {
    console.log(e);
  },
  switchPwd() {
    console.log("switchPwd");
    this.setData({ IsOk: false });
  },
  onUsernameInput(e: WechatMiniprogram.Input) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput(e: WechatMiniprogram.Input) {
    this.setData({ password: e.detail.value });
  },
  async login() {
    const { phoneNumber, password } = this.data;
    if (!password) {
      this.setData({
        pwdError: true,
      });
      Message.warning({ context: this, content: "请输入密码" });
      return;
    }
    if (!phoneNumber) {
      this.setData({
        phoneError: true,
      });
      Message.warning({ context: this, content: "请输入手机号" });
      return;
    }

    try {
      const res = await request<{ access_token: string }>({
        url: "/auth/login",
        method: "POST",
        data: { username: phoneNumber, password: password },
      });
      wx.setStorageSync("token", res.access_token);
      Message.success({ context: this, content: "登录成功" });
      setTimeout(() => {
        wx.reLaunch({ url: "/pages/index/index" });
      }, 1500);
    } catch (err: any) {
      Message.error({ context: this, content: err.detail || "登录失败" });
    }
  },
});

// pages/home/home.js
import { auth } from "../../utils/api";
const imageCdn = "https://tdesign.gtimg.com/mobile/demos";
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

Page({
  data: {
    currentTab: "home", // 底部导航当前选中项
    recommendList: [
      {
        id: 1,
        name: "红烧排骨",
        image:
          "https://pic640.weishi.qq.com/6wsz5JKd7-2nKV89JiDC54ifl0mXuzMb6VxRF.jpg",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 2,
        name: "红烧排骨红烧排骨红烧排骨红烧排骨红烧排骨红烧排骨",
        image:
          "https://img1.baidu.com/it/u=1604178178,534306847&fm=253&app=138&f=JPEG?w=500&h=653",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 11,
        name: "红烧排骨",
        image:
          "https://pic640.weishi.qq.com/6wsz5JKd7-2nKV89JiDC54ifl0mXuzMb6VxRF.jpg",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 12,
        name: "红烧排骨",
        image:
          "https://img1.baidu.com/it/u=1126187458,1736952758&fm=253&app=138&f=JPEG?w=500&h=625",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 13,
        name: "红烧排骨",
        image:
          "https://img2.baidu.com/it/u=3568111225,568556509&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 14,
        name: "红烧排骨",
        image:
          "https://img2.baidu.com/it/u=3603785451,347959206&fm=253&fmt=auto&app=138&f=JPEG?w=1010&h=500",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 16,
        name: "红烧排骨",
        image: "https://tdesign.gtimg.com/mobile/demos/example2.png",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
      {
        id: 22,
        name: "红烧排骨",
        image: "https://tdesign.gtimg.com/mobile/demos/example2.png",
        price: 38,
        sales: 256,
        tags: ["招牌", "热销"],
      },
    ],
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    swiperList,
    leftColumnList: [] as any[], // 左列数据
    rightColumnList: [] as any[], // 右列数据
    backTopTheme: "round",
    backTopText: "顶部",
    scrollTop: 0,
    access_token: "",
  },
  onPageScroll(e) {
    this.setData({ scrollTop: e.scrollTop });
  },
  // 切换底部导航
  async handleTabChange(e) {
    const { value } = e.detail;
    this.setData({ currentTab: value });
    if (!this.data.access_token) {
      wx.navigateTo({ url: "/pages/login/login" });
    } else {
      const response = await auth();
      if (!response.username) {
        return;
      }
    }
    if (value === "order") {
      wx.navigateTo({ url: "/pages/order/order" });
    } else if (value === "menu") {
      wx.navigateTo({ url: "/pages/meun-list/menu" });
    } else if (value === "mine") {
      // wx.navigateTo({ url: '/pages/login/login' });
      wx.navigateTo({ url: "/pages/user-center/user-center" });
    } else if (value === "kitchen") {
      wx.navigateTo({ url: "/pages/kitchen/kitchen" });
    }
  },
  onShow() {
    console.log("onShow");
    this.setData({ currentTab: "home" });
  },
  onLoad() {
    // 初始化时分配数据到两列
    this.distributeItems();
    const access_token = wx.getStorageSync("token");
    this.setData({ access_token: access_token });
  },
  // 分配数据到左右两列
  distributeItems() {
    const left: any[] = [];
    const right: any[] = [];

    // 简单交替分配（可根据实际高度计算更复杂的分配逻辑）
    this.data.recommendList.forEach((item, index) => {
      if (index % 2 === 0) {
        left.push(item);
      } else {
        right.push(item);
      }
    });

    this.setData({
      leftColumnList: left,
      rightColumnList: right,
    });
  },
  onChange() {},
  onToTop(e: any) {
    console.log(e);
    this.triggerEvent("to-top", e);
  },
  toDetail(e) {
    console.log(e);
    const title = e.currentTarget.dataset.item.name;
    wx.navigateTo({ url: "/pages/menu-detail/menu-detail?title=" + title });
  },
});

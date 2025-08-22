import Toast from "tdesign-miniprogram/toast/index";

Page({
  data: {
    detail: {},
    collected: false,
    stepsCurrent: 0,
    activeStickyIndex: 0, // 当前吸顶的步骤
    steps: [],
    activeTab: "intro", // 默认菜品介绍
  },

  async onLoad(query) {
    const id = Number(query.id);
    await this.fetchDetail(id);
  },

  /* 拉取详情（模拟） */
  async fetchDetail(id: number) {
    wx.showLoading({ title: "加载中" });
    // 模拟接口
    const mock = {
      id,
      title: "香辣鸡翅",
      cover:
        "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
      author: "干饭小厨",
      date: "2025-08-21",
      intro:
        "外酥里嫩的香辣鸡翅，一口下去满是幸福感！香辣过瘾，配饭下酒两相宜。",
      ingredients: [
        { name: "鸡翅中", amount: "10 只" },
        { name: "干辣椒", amount: "5 根" },
        { name: "蒜末", amount: "1 勺" },
        { name: "生抽", amount: "1 勺" },
      ],
      steps: [
        {
          title: "腌制",
          desc: "鸡翅洗净划刀，加料酒、生抽、辣椒粉腌制 30 分钟。",
        },
        { title: "煎制", desc: "锅中热油，将鸡翅煎至两面金黄。" },
        { title: "调味", desc: "加入蒜末、干辣椒炒香，撒芝麻出锅。" },
      ],
      tips: ["煎鸡翅时中小火防止外焦里生", "腌制时间越长越入味"],
    };
    this.setData({ detail: mock });
    wx.hideLoading();
  },

  onPageScroll(e) {
    const query = this.createSelectorQuery();
    query.selectAll(".step-section").boundingClientRect();
    query.exec((res) => {
      if (!res[0]) return;
      const scrollTop = e.scrollTop + 100; // 提前量
      let idx = 0;
      res[0].forEach((rect: any, i: number) => {
        if (scrollTop >= rect.top) idx = i;
      });
      if (idx !== this.data.activeStickyIndex) {
        this.setData({ activeStickyIndex: idx });
      }
    });
  },

  /* 切换标签 */
  onTabChange(e: WechatMiniprogram.TabsChange) {
    this.setData({ activeTab: e.detail.value });
  },

  /* 收藏 */
  toggleCollect() {
    const collected = !this.data.collected;
    this.setData({ collected });
    Toast({
      context: this,
      selector: "#t-toast",
      message: collected ? "已收藏" : "已取消",
    });
  },

  /* 分享 */
  onShareAppMessage() {
    return {
      title: `饭搭子 · ${this.data.detail?.title}`,
      path: `/pages/menu-detail/index?id=${this.data.detail?.id}`,
    };
  },
});

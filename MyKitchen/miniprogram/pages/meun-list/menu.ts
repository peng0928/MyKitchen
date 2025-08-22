import { MenuItem, TabKey, fetchMenuAPI } from "./model";
import Toast from "tdesign-miniprogram/toast/index";

interface Data {
  activeTab: TabKey;
  list: MenuItem[];
  showDelete: boolean;
  deleteId?: number;
}

Page<
  Data,
  {
    onTabChange(e: WechatMiniprogram.TabsChange): void;
    fetchData(tab: TabKey): Promise<void>;
    addMenu(): void;
    editMenu(e: WechatMiniprogram.TouchEvent<{ item: MenuItem }>): void;
    deleteMenu(e: WechatMiniprogram.TouchEvent<{ id: number }>): void;
    doDelete(): void;
    closeDelete(): void;
    toggleCollect(e: WechatMiniprogram.TouchEvent<{ id: number }>): void;
  }
>({
  data: {
    activeTab: "my",
    list: [],
    showDelete: false,
  },

  onLoad() {
    this.fetchData("my");
  },

  /* 切换 Tab */
  onTabChange(e) {
    const tab = e.detail.value as TabKey;
    this.setData({ activeTab: tab });
    this.fetchData(tab);
  },

  /* 拉取数据 */
  async fetchData(tab) {
    wx.showLoading({ title: "加载中" });
    const list = await fetchMenuAPI(tab);
    this.setData({ list });
    wx.hideLoading();
  },

  /* 新增菜单 */
  addMenu() {
    wx.navigateTo({ url: "/pages/menu-edit/index" });
  },

  /* 编辑菜单 */
  editMenu(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/menu-edit/index?id=${item.id}` });
  },

  /* 删除相关 */
  deleteMenu(e) {
    this.setData({ showDelete: true, deleteId: e.currentTarget.dataset.id });
  },
  closeDelete() {
    this.setData({ showDelete: false });
  },
  doDelete() {
    const id = this.data.deleteId!;
    this.setData({
      list: this.data.list.filter((i) => i.id !== id),
      showDelete: false,
    });
    Toast({ context: this, selector: "#t-toast", message: "已删除" });
  },

  /* 收藏/取消收藏 */
  toggleCollect(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.list.map((i) =>
      i.id === id ? { ...i, collected: !i.collected } : i
    );
    this.setData({ list });
    Toast({
      context: this,
      selector: "#t-toast",
      message: list.find((i) => i.id === id)!.collected ? "已收藏" : "已取消",
    });
  },

  /* 下拉刷新 */
  onPullDownRefresh() {
    this.fetchData(this.data.activeTab).finally(() => wx.stopPullDownRefresh());
  },

  /* 分享卡片 */
  onShareAppMessage(e) {
    const id = e.target!.dataset.id as number;
    const item = this.data.list.find((i) => i.id === id)!;
    return {
      title: `饭搭子菜单：${item.title}`,
      path: `/pages/menu-detail/index?id=${id}`,
      imageUrl: item.cover || "../../images/logo.png",
    };
  },
});

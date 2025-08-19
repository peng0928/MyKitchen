interface CategoryItem {
  label: string;
  image: string;
}

interface Category {
  label: string;
  title: string;
  icon: string;
  badgeProps: {
    dot?: boolean;
    count?: number;
  };
  items: CategoryItem[];
}

interface PageData {
  sideBarIndex: number;
  scrollTop: number;
  categories: Category[];
  navbarHeight: number;
}

interface PageInstance {
  offsetTopList: number[];
  lastScrollTop: number;
  data: PageData;
  onLoad: () => void;
  onSideBarChange: (e: { detail: { value: number } }) => void;
  onScroll: (e: { detail: { scrollTop: number } }) => void;
}

Page({
  offsetTopList: [],
  lastScrollTop: 0,
  data: {
    sideBarIndex: 1,
    scrollTop: 0,
    categories: [
      {
        label: '招牌菜',
        title: '招聘拿手菜',
        icon: 'app',
        badgeProps: {},
        items: new Array(6).fill(null).map((_, index) => ({
          label: '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
      {
        label: '特色荤菜',
        title: '美味荤菜',
        icon: 'app',
        badgeProps: {
          dot: true,
        },
        items: new Array(6).fill(null).map((_, index) => ({
          label: index % 3 === 2 ? '最多六个文字' : '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
      {
        label: '绿叶菜',
        title: '清香绿叶菜',
        icon: 'app',
        badgeProps: {},
        items: new Array(9).fill(null).map((_, index) => ({
          label: index % 3 === 2 ? '最多六个文字' : '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
      {
        label: '海鲜🦞',
        title: '新鲜美味海鲜',
        icon: 'app',
        badgeProps: {
          count: 6,
        },
        items: new Array(6).fill(null).map((_, index) => ({
          label: index % 3 === 2 ? '最多六个文字' : '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
      {
        label: '饮料',
        title: '饮料🥤',
        icon: 'app',
        badgeProps: {},
        items: new Array(6).fill(null).map((_, index) => ({
          label: '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
      {
        label: '主食',
        title: '主食🍚',
        icon: 'app',
        badgeProps: {},
        items: new Array(3).fill(null).map((_, index) => ({
          label: '标题文字',
          image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        })),
      },
    ],
    navbarHeight: 0,
    cart:[],
    cartCount: 0
  },

  onLoad() {
    this.getCustomNavbarHeight();
  },
  getCustomNavbarHeight() {
    const query = wx.createSelectorQuery();
    query.select('.custom-navbar').boundingClientRect();
    query.exec((res) => {
      const { height = 0 } = res[0] || {};
      this.setData({ navbarHeight: height });
    });
  },

  onSideBarChange(e:any) {
    const { value } = e.detail;
    console.log('---', value);
    this.setData({ sideBarIndex: value, scrollTop: 0 });
  },
  handleBack() {
    wx.navigateBack()
  },
  onScroll(e:any) {
    const { scrollTop } = e.detail;
    const threshold = 50; // 下一个标题与顶部的距离
    const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop;

    // 动态调整阈值：向下滚动时增大阈值，向上时减小
    const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 1.5;

    // 使用二分查找优化查找效率
    const findNearestIndex = (arr, target) => {
      let left = 0;
      let right = arr.length - 1;
      let result = 0;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target + dynamicThreshold) {
          result = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return result;
    };

    const newIndex = findNearestIndex(this.offsetTopList, scrollTop);

    if (newIndex !== this.data.sideBarIndex) {
      this.setData({ sideBarIndex: newIndex });
    }
  },
  onTabsChange(){},
  onTabsClick(){},
  addToCart(e:any) {
    const cargo = e.currentTarget.dataset.cargo;
    const updateCart = [...this.data.cart, cargo]
    this.setData({
      cart: updateCart,
      cartCount: updateCart.length
    });
    console.log(this.data.cart)

  },
  
  // 去结算
  goCheckout() {
    wx.navigateTo({
      url: '/pages/checkout/checkout'
    });
  },
});
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
        items: new Array(12).fill(null).map((_, index) => ({
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
        items: new Array(9).fill(null).map((_, index) => ({
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
  },

  onLoad() {
    const query = wx.createSelectorQuery().in(this);
    const { sideBarIndex } = this.data;
    
    query.selectAll('.title').boundingClientRect();
    query.select('.custom-navbar').boundingClientRect();
    
    query.exec((res) => {
      console.log(res)
      const [rects,  navbarHeight] = res;
      this.offsetTopList = rects.map((item) => item.top - navbarHeight);
      this.setData({ 
        navbarHeight, 
        scrollTop: this.offsetTopList[sideBarIndex] 
      });
    });
  },
  handleBack() {
    wx.navigateBack()
  },
  onSideBarChange(e: { detail: { value: number } }) {
    const { value } = e.detail;
    this.setData({ 
      sideBarIndex: value, 
      scrollTop: this.offsetTopList[value] 
    });
  },

  onScroll(e: { detail: { scrollTop: number } }) {
    const { scrollTop } = e.detail;
    const threshold = 100; // 下一个标题与顶部的距离
    const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop;

    // 动态调整阈值
    const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 0.8;

    // 使用二分查找优化查找效率
    const findNearestIndex = (arr: number[], target: number): number => {
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

});
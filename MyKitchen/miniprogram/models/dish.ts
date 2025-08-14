// 菜品数据类型
export interface Dish {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
}

// 分类数据类型
export interface Category {
  id: string;
  name: string;
}
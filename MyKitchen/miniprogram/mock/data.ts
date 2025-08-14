import { Dish, Category } from '../models/dish';

// 模拟分类数据
export const mockCategories: Category[] = [
  { id: 'c1', name: '热菜' },
  { id: 'c2', name: '凉菜' },
  { id: 'c3', name: '汤类' },
  { id: 'c4', name: '主食' },
];

// 模拟菜品数据
export const mockDishes: Dish[] = [
  {
    id: 'd1',
    name: '红烧肉',
    price: 38,
    description: '经典家常菜，肥而不腻',
    image: 'https://example.com/dish1.jpg',
    category: 'c1'
  },
  {
    id: 'd2',
    name: '清蒸鱼',
    price: 45,
    description: '鲜嫩可口，营养丰富',
    image: 'https://example.com/dish2.jpg',
    category: 'c1'
  },
  {
    id: 'd3',
    name: '凉拌黄瓜',
    price: 12,
    image: 'https://example.com/dish3.jpg',
    category: 'c2'
  },
  {
    id: 'd4',
    name: '西红柿鸡蛋汤',
    price: 15,
    image: 'https://example.com/dish4.jpg',
    category: 'c3'
  },
  {
    id: 'd5',
    name: '米饭',
    price: 2,
    image: 'https://example.com/dish5.jpg',
    category: 'c4'
  }
];
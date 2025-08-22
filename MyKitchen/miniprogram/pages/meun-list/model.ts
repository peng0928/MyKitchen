export interface MenuItem {
  id: number;
  title: string;
  date: string;
  cover?: string;
  isPublic: boolean;
  collected: boolean;
}

export type TabKey = "my" | "liked" | "fav";

/** 模拟接口 */
export async function fetchMenuAPI(tab: TabKey): Promise<MenuItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mock: Record<TabKey, MenuItem[]> = {
        my: [
          {
            id: 1,
            title: "减脂一周餐",
            date: "2025-08-20",
            isPublic: true,
            collected: false,
          },
          {
            id: 2,
            title: "周末火锅局",
            date: "2025-08-18",
            isPublic: false,
            collected: false,
          },
        ],
        liked: [
          {
            id: 3,
            title: "低卡便当合集",
            date: "2025-08-19",
            isPublic: true,
            collected: true,
          },
        ],
        fav: [
          {
            id: 3,
            title: "低卡便当合集",
            date: "2025-08-19",
            isPublic: true,
            collected: true,
          },
        ],
      };
      resolve(mock[tab] ?? []);
    }, 400);
  });
}

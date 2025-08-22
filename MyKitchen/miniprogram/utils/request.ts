// utils/request.ts
const BASE_URL = "http://localhost:12025"; // 开发用，上线改成 https 域名

interface RequestOptions {
  url: string;
  method?: "GET" | "POST";
  data?: any;
  needAuth?: boolean;
}

export function request<T = any>(options: RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    const header: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.needAuth) {
      const token = wx.getStorageSync("token");
      if (token) {
        header["Authorization"] = `Bearer ${token}`;
      }
    }

    wx.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else if (res.statusCode === 401) {
          wx.removeStorageSync("token");
          wx.navigateTo({ url: "/pages/login/login" });
          reject({ detail: "登录过期" });
        } else {
          reject(res.data || { detail: "请求失败" });
        }
      },
      fail: reject,
    });
  });
}

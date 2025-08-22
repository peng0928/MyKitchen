import { request } from "./request";

export async function auth() {
  const url = "/auth/me";
  return await request({
    url: url,
    method: "GET",
    needAuth: true,
  });
}

export async function user_update(kwargs: any) {
  const url = "/user/update";
  return await request({
    url: url,
    method: "POST",
    needAuth: true,
    data: kwargs,
  });
}

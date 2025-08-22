import requests

authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImZpZCI6IkZEWjY2NzgzMzIiLCJleHAiOjE3NTY0NTY4MzB9.HZ5z_nT5gbvevJ3tSb2Hq-x8nGQB6UMQiPMK15kq1gM"
headers = {
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "http://0.0.0.0:12025/docs",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    "accept": "application/json",
    "authorization": f"bearer {authorization}"
}


def test_auth_me():
    url = "http://0.0.0.0:12025/auth/me"
    # url = "http://0.0.0.0:12025/user/update"
    response = requests.get(url, headers=headers, verify=False, )
    print(response.text)
    print(response)


if __name__ == '__main__':
    test_auth_me()

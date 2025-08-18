// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },

  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    
    getUserProfile() {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    
    handleLogin() {
      if (!this.data.userInfo.nickName) {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none'
        })
        return
      }
      
      // 这里添加实际的登录逻辑
      wx.showLoading({
        title: '登录中...',
      })
      
      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 登录成功后跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        })
      }, 1500)
    },
    
    handleLogout() {
      this.setData({
        userInfo: {
          avatarUrl: defaultAvatarUrl,
          nickName: '',
        },
        hasUserInfo: false
      })
    },
    
    navigateToForgotPassword() {
      wx.navigateTo({
        url: '/pages/forgot-password/forgot-password'
      })
    },
    
    navigateToRegister() {
      wx.navigateTo({
        url: '/pages/register/register'
      })
    },
    
    onLoad() {
      // 检查本地存储中是否有用户信息
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.setData({
          userInfo,
          hasUserInfo: true
        })
      }
    }
  }
})
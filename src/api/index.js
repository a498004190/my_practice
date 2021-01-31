import ajax from './ajax'
const BASE_URL = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 获取食品分类列表
export const GoodsCateGory = () => ajax(`${BASE_URL}/index_category`)
// 根据经纬度获取商铺列表
export const ShopList = (latitude, longitude) => ajax(`${BASE_URL}/shops/`, {latitude, longitude})
// 根据经纬度和关键字搜索商铺列表
export const SearchShops = (keyword, geohash) => ajax(`${BASE_URL}/search_shops/`, {keyword, geohash})
// 获取一次性验证码
export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
// 用户名密码登陆
export const loginPwd = (name, pwd, captcha) => ajax(`${BASE_URL}/login_pwd`, {name, pwd, captcha}, 'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`, {phone})
// 手机号验证码登陆
export const loginSms = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
// 用户登出
export const logOut = () => ajax(`${BASE_URL}/logout`)

export const reqShopGoods = () => ajax(`/shopgoods`)

export const reqShopInfo = () => ajax(`/shopinfo`)

export const reqShopRatings = () => ajax(`/shopratings`)

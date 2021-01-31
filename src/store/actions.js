import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPLIST,
  UPDATE_USERINFO,
  REST_USERINFO,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  ADD_FOOD_COUNT,
  JIAN_FOOD_COUNT,
  REST_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  GoodsCateGory,
  reqAddress,
  ShopList,
  reqSendCode,
  reqUserInfo,
  logOut,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings,
  SearchShops
} from '../api'
export default {
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)

    if (result.code === 0) {
      const { address } = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  async getCateGories ({commit}) {
    const result = await GoodsCateGory()
    if (result.code === 0) {
      const { data } = result
      commit(RECEIVE_CATEGORIES, data)
    }
  },

  async getShopList ({commit, state}) {
    const result = await ShopList(state.latitude, state.longitude)
    if (result.code === 0) {
      const { data } = result
      commit(RECEIVE_SHOPLIST, data)
    }
  },

  async sendCode({commit}, payload) {
    await reqSendCode(payload)
  },

  updateUserinfo ({commit}, payload) {
    commit(UPDATE_USERINFO, payload)
  },

  async getUserinfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const { data } = result
      commit(UPDATE_USERINFO, data)
    }
  },

  async logOut ({commit}) {
    const result = await logOut()
    if (result.code === 0) {
      commit(REST_USERINFO)
    }
  },

  async getShopinfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const { data } = result
      commit(RECEIVE_SHOPINFO, data)
    }
  },

  async getShopgoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const { data } = result
      commit(RECEIVE_SHOPGOODS, data)
      callback && callback()
    }
  },

  updateCartFoods ({commit}, { isAdd, food }) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, food)
    } else {
      commit(JIAN_FOOD_COUNT, food)
    }
  },

  clearCart ({commit}) {
    commit(REST_CART)
  },

  async getRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const { data } = result
      commit(RECEIVE_SHOPRATINGS, data)
      callback && callback()
    }
  },

  async getSearchShops ({ commit, state }, keywords) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await SearchShops(keywords, geohash)
    if (result.code === 0) {
      const {data} = result
      commit(RECEIVE_SEARCH_SHOPS, data)
    }
  }

}

import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPLIST,
  RECEIVE_CAPTCHA,
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
export default {
  [RECEIVE_ADDRESS] (state, payload) {
    state.address = payload
  },
  [RECEIVE_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [RECEIVE_SHOPLIST] (state, payload) {
    state.shoplist = payload
  },
  [RECEIVE_CAPTCHA] (state, payload) {
    state.captchaImg = payload
  },
  [UPDATE_USERINFO] (state, payload) {
    state.userinfo = payload
  },
  [REST_USERINFO] (state) {
    state.userinfo = {}
  },
  [RECEIVE_SHOPINFO] (state, payload) {
    state.shopinfo = payload
  },
  [RECEIVE_SHOPGOODS] (state, payload) {
    state.shopgoods = payload
  },
  [RECEIVE_SHOPRATINGS] (state, payload) {
    state.shopratings = payload
  },
  [ADD_FOOD_COUNT] (state, food) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [JIAN_FOOD_COUNT] (state, food) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [REST_CART] (state) {
    state.cartFoods.forEach(food => { food.count = 0 })
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS] (state, payload) {
    state.search_shops = payload
  }
}

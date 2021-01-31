export default {
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count , 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price , 0)
  },
  positiveSize (state) {
    /* return state.shopratings.filter(rating => {
      if (rating.rateType === 1) return rating
    }).length */
    return state.shopratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0) , 0)
  }
}

<template>
  <section class="msite">
    <HeaderTop class="msite_header" :title="address">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">
          <router-link to="/userinfo" v-if="userinfo._id">
            <i class='iconfont icon-geren'></i>
          </router-link>
          <router-link to="/login" v-else>登录|注册</router-link>
        </span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categories.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="`${baseImageUrl}/${category.image_url}`">
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="swiper-container" v-else>
        <img src="./images/msite_back.svg" alt="blank">
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper from 'swiper'
  import "swiper/dist/css/swiper.min.css"
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'MSite',
    data() {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted() {
      this.$store.dispatch('getCateGories')
    },
    computed: {
      ...mapState(['address', 'categories', 'userinfo']),

      categoryArr() {
        const {
          categories
        } = this
        let arr = []
        let minArr = []
        categories.forEach((v, index) => {
          if (minArr.length === 8) {
            minArr = []
          }
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(v)

          /* if (minArr.length === 8) {
             arr.push(minArr)
             minArr = []
           }
           if (categories.length - 1 === index){
             arr.push(minArr)
           }
           minArr.push(v) */
        })
        return arr
      }
    },
    components: {
      HeaderTop,
      ShopList
    },
    watch: {
      categories() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  &.msite //首页
  width 100% .msite_header background-color #02a774 position fixed z-index 100 left 0 top 0 width 100% height 45px .header_search position absolute left 15px top 50% transform translateY(-50%) width 10% height 50% .icon-sousuo font-size 25px color #fff .header_title position absolute top 50% left 50% transform translate(-50%, -50%) width 50% color #fff text-align center .header_title_text font-size 20px color #fff display block .header_login font-size 14px color #fff position absolute right 15px top 50% transform translateY(-50%) .header_login_text color #fff a color #fff .msite_nav bottom-border-1px(#e4e4e4) margin-top 45px height 200px background #fff .swiper-container width 100% height 100% .swiper-wrapper width 100% height 100% .swiper-slide display flex justify-content center align-items flex-start flex-wrap wrap .link_to_food width 25% .food_container display block width 100% text-align center padding-bottom 10px font-size 0 img display inline-block width 50px height 50px span display block width 100% text-align center font-size 13px color #666 .swiper-pagination>span.swiper-pagination-bullet-active background #02a774

</style>

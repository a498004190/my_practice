<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginway }" @click="tabClick(true)">短信登录</a>
          <a href="javascript:;" :class="{on: !loginway}" @click="tabClick(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginway }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="formMess.phone">
              <button :disabled="!checkPhone"  class="get_verification" :class="{on: checkPhone}" @click.prevent="getCode()">
                {{ seconds > 0 ? `已发送(${seconds}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="formMess.captchaDX">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginway}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="formMess.name">
              </section>
              <section class="login_verification">
                <input :type="pwdtype" maxlength="8" placeholder="密码" v-model="formMess.pwd">
                <div class="switch_button" :class="pwdState ? 'on' : 'off'" @click="tabPwd">
                  <div class="switch_circle" :class="pwdState ? 'on' : 'off'"></div>
                  <span class="switch_text"></span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="formMess.captchaPWD">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="onsubmit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
import { Toast } from 'mint-ui'
import { loginPwd, loginSms } from '../../api'
export default {
  name: 'Login',
  data () {
    return {
      formMess: {
        phone: '',
        name: '',
        pwd: '',
        captchaDX: '',
        captchaPWD: ''
      },
      loginway: true,
      seconds: 0,
      pwdState: false,
      pwdtype: 'password'
    }
  },
  computed: {
    ...mapState(['captchaImg', 'userinfo']),
    checkPhone () {
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.formMess.phone)
    }
  },
  methods: {
    tabClick (value) {
      this.formMess.phone = ''
      this.formMess.name = ''
      this.formMess.pwd = ''
      this.formMess.captcha = ''
      if (value !== this.loginway) {
        this.loginway = !this.loginway
      }
    },
    getCode () {
      if (this.seconds === 0) {
        this.seconds = 30
        this.timer = setInterval(() => {
          return this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)

        this.$store.dispatch('sendCode', this.formMess.phone)
      }
    },
    tabPwd () {
      this.pwdState = !this.pwdState
      if (this.pwdState) {
        this.pwdtype = 'text'
      } else {
        this.pwdtype = 'password'
      }
    },
    getCaptcha () {
      this.$refs.captcha.src = "http://localhost:3000/captcha?" + Date.now()
    },
    toastMsg (msg) {
      Toast({
        message: msg,
        duration: 1000
      })
    },
    async onsubmit () {
      let result
      if (this.loginway) {
        if (!this.checkPhone) {
          this.toastMsg('手机不正确')
          return;
        } else if (!/^\d{6}$/.test(this.formMess.captchaDX)) {
          this.toastMsg('验证码不正确')
          return;
        }
        const {phone, captchaDX} = this.formMess
        result = await loginSms(phone, captchaDX)
      } else {
        if (!this.formMess.name || !this.formMess.pwd) {
          this.toastMsg('用户名或密码不能为空')
          return;
        } else if (!this.formMess.captchaPWD) {
          this.toastMsg('验证码不能为空')
          return;
        }
        const {name, pwd, captchaPWD} = this.formMess
        result = await loginPwd(name, pwd, captchaPWD)
      }

      if (this.seconds) {
        this.seconds = 0
        clearInterval(this.timer)
      }

      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('updateUserinfo', user)
        this.$router.replace('/profile')
      } else {
        this.getCaptcha()
        this.toastMsg(result.msg)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.on
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s
                &.on
                  transform translateX(27px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>

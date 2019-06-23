<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button @click="handleGetcode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '17660471520',
        code: ''
      },
      captchaObj: null
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleGetcode() {
      const { mobile } = this.form
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          },
          captchaObj => {
            this.captchaObj = captchaObj
            captchaObj
              .onReady(function() {
                captchaObj.verify()
              })
              .onSuccess(function() {
                console.log('验证成功了！')
              })
              .onError(function() {

              })
          }
        )
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(./login_bg.jpg);
  background-size: cover;
  .form-wrap {
    background-color: #fff;
    padding: 30px 50px 30px 50px;
    border-radius: 8px;
    .form-head {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      img {
        width: 285px;
      }
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>

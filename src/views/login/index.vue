<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <el-form ref='ruleForm' :model='form' :rules='rules'>
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button @click="handleGetcode" :disabled="!!codeTimer || codeLoading">
                {{ codeTimer ? `剩余 ${codeSeconds} 秒` : '获取验证码' }}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox v-model="form.agree"></el-checkbox>
            <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="handleLogin" :loading="hasLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import '@/vendor/gt'
const initCodeSeconds = 60
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '17660471520',
        code: '246810',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      captchaObj: null,
      hasLoading: false,
      codeTimer: null,
      codeSeconds: initCodeSeconds,
      sendMobile: '',
      codeLoading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }
        this.submitLogin()
      })
    },
    submitLogin() {
      this.hasLoading = true
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.form
      }).then(data => {
        window.localStorage.setItem('user_info', JSON.stringify(data))
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.hasLoading = false
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        if (err.response.status === 400) {
          this.$message.error('登录失败，手机号或验证码错误')
        }
        this.hasLoading = false
      })
    },
    handleGetcode() {
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        if (this.captchaObj) {
          if (this.form.mobile !== this.sendMobile) {
            document.removeChild(document.querySelector('.geetest_panel'))
            this.showGeetest()
          } else {
            this.captchaObj.verify()
          }
        } else {
          this.showGeetest()
        }
      })
    },
    showGeetest() {
      this.codeLoading = true
      this.$http({
        method: 'GET',
        url: `/captchas/${this.form.mobile}`
      }).then(data => {
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
              .onReady(() => {
                this.sendMobile = this.form.mobile
                captchaObj.verify()
                this.codeLoading = false
              })
              .onSuccess(() => {
                const {
                  geetest_challenge: challenge,
                  geetest_seccode: seccode,
                  geetest_validate: validate
                } = captchaObj.getValidate()
                this.$http({
                  method: 'GET',
                  url: `/sms/codes/${this.form.mobile}`,
                  params: {
                    challenge,
                    seccode,
                    validate
                  }
                }).then(data => {
                  this.codeCountDown()
                })
              })
          }
        )
      })
    },
    codeCountDown() {
      this.codeTimer = window.setInterval(() => {
        this.codeSeconds--
        if (this.codeSeconds <= 0) {
          this.codeSeconds = initCodeSeconds
          window.clearInterval(this.codeTimer)
          this.codeTimer = null
        }
      }, 1000)
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
a {
  text-decoration: none;
  color: skyblue
}
.el-checkbox {
  margin-right: 5px;
}
</style>

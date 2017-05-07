import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { decrypt, doValidatePwd } from '~utils/ljsign'

export default {
  data() {
    return {
      filename: '',
      password: '',
      filenameError: '',
      wallet: {},
      success: false
    }
  },

  validations: {
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    }
  },

  methods: {
    login() {
      try {
        const privateKey = decrypt(this.wallet['privateKeyEncrypted'], this.password)
        const result = doValidatePwd(privateKey, this.wallet['publicKey'])

        if (result) {
          this.wallet['privateKey'] = privateKey
          this.$store.dispatch('LOGIN', this.wallet).then(() => {
            delete this.wallet
            this.$message.success('验证成功!')
            this.$router.push('/admin')
          })
        } else {
          this.$message.error('验证失败,请检查文件格式与密码重试!')
        }
      } catch (e) {
        this.$message.error('验证失败,请检查文件格式与密码重试!')
      }
    },
    readFile(file) {
      const reader = new window.FileReader()
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result)
          if (this.checkFile(data, file.name)) this.wallet = data
        } catch (err) {
          this.filenameError = '文件格式错误！'
          this.filename = ''
        }
      }
      reader.readAsText(file)
    },
    checkFile(file, filename) {
      if (!file.hasOwnProperty('publicKey') || !file.hasOwnProperty('publicKeyCompressed') ||
          !file.hasOwnProperty('privateKeyEncrypted') || !file.hasOwnProperty('address') || !/json/.test(filename)) return !1
      this.filename = filename
      this.filenameError = ''
      return true
    },
    selectAll(e) {
      setTimeout(() => e.target.select(), 0)
    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters['loggedIn']
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loggedIn ? next() : next({ path: '/login' })
    })
  }
}
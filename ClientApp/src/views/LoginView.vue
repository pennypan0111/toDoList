<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '../stores/auth.js'
import BoInput from '../components/BoInput.vue'

const router = useRouter()
const Account = ref('')
const Password = ref('')
const authStore = useAuthStore()

// TODO: 待串接登入驗證 API，並按需求修改以下判斷條件及欲處理之動作
function handleLogin() {
  if (Account.value === 'admin' && Password.value === '123') {
    authStore.login()
    router.replace({ path: '/home' })
  } else {
    ElMessage.error('帳密輸入錯誤')
  }
}

function handleRegister() {
  ElMessageBox.alert('目前尚未開放註冊功能，敬啟期待！', 'Oops!!', {
    confirmButtonText: 'OK'
  })
}
</script>

<template>
  <div class="login-page">

    <div class="left-top-area">
      <div class="img-box">
        <img src="../../public/logo.png" class="w-100">
      </div>
      <div class="app-name">To Do List</div>
    </div>

    <div class="right-bottom-area">
      <div class="login-info">
        <div class="login-title">- Login -</div>
        <BoInput label="帳號" placeholder="請輸入帳號" v-model="Account"></BoInput>
        <BoInput label="密碼" placeholder="請輸入密碼" type="password" v-model="Password"></BoInput>
        <el-button class="w-100 mt-3 custom-button" @click="handleLogin">登入</el-button>
      </div>
      <div>尚未建立帳號? 請點選 <a class="register-title" @click="handleRegister">註冊</a></div>
    </div>

  </div>
</template>

<style lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  background: $primary;

  .left-top-area {
    height: calc(100vh - 60%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .img-box {
      width: 150px;
    }
    .app-name {
      color: $white;
      font-size: 2.2rem;
      margin-top: 20px;
    }
  }

  .right-bottom-area {
    width: 100%;
    height: calc(100vh - 40%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-width: 250px;
    padding: 0 50px;
    background: $white;
    border-top-left-radius: 40px;

    .login-info {
      width: 100%;

      .login-title {
        text-align: center;
        color: $gray-400;
        font-size: 1.4rem;
        padding-bottom: 20px;
      }

      .el-button, .el-button:focus, .el-button:hover {
        color: $white;
        border-color: $primary;
        background-color: $primary;
        border-radius: 50px;
      }
    }

    .register-title {
      color: $blue;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 996px) {
  .login-page {
    display: flex;

    .left-top-area {
      width: 100%;
      height: 100vh;
    }

    .right-bottom-area {
      justify-content: center;
      width: 100%;
      height: 100vh;
      padding: 0 100px;
      border-radius: 0;

      .login-info {
        margin-bottom: 50px;
      }

    }
  }
}
</style>

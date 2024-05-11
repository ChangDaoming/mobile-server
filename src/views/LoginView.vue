<template>
  <div class="login-container">
    <div class="login-container-box">
      <el-form
        :model="formData"
        :rules="rules"
        hide-required-asterisk
        status-icon
        ref="formRef"
        class="login-container-box-form"
      >
        <!-- 头像 -->
        <div class="login-container-box-form-avatar"></div>
        <!-- 用户名 -->
        <p class="login-container-box-form-title">移动应用开发后台管理系统</p>
        <el-form-item prop="username" class="login-container-box-form-username">
          <el-input
            v-model="formData.username"
            type="text"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <icon-ep-User />
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password" class="login-container-box-form-password">
          <el-input
            v-model="formData.password"
            type="password"
            show-password
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <icon-ep-Lock />
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item class="login-container-box-form-btn">
          <el-button
            class="login-container-box-form-btn-submit"
            type="primary"
            :disabled="formData.password.length > 5 ? false : true"
            @click="handleLogin(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../http/api'
export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const formRef = ref(null)
    const formData = ref({
      username: 'test01',
      password: '123456'
    })
    const rules = ref({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
      ]
    })

    const handleLogin = async (e) => {
      if (!e) return
      if (!formData.value.username) {
        ElMessage.error('请输入用户名')
        return
      }
      if (!formData.value.password) {
        ElMessage.error('请输入密码')
        return
      }
      const res = await login(formData.value)
      if (res.code === 200) {
        localStorage.setItem('token', res.token) // 保存token到本地
        ElMessage.success(res.message)
        router.push('/home') // 登录成功后跳转到首页
      } else {
        ElMessage.error(res.message)
        // 清空表单
        formRef.value.resetFields()
      }
    }

    return {
      formRef,
      formData,
      rules,
      handleLogin,
      router
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/loginBG.jpg);
  min-width: 23.4375rem;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &-box {
    margin: 0 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28.125rem;
    // height: 18.75rem;
    background-color: #fff;
    border-radius: 0.625rem;
    box-shadow: 0.125rem 0.125rem 1.875rem rgba(78, 2, 82, 0.8);
    box-sizing: border-box;
    &-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1.25rem 0;
      &-avatar {
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 50%;
        background-image: url(../assets/login.jpeg);
        background-size: cover;
        background-position: center;
        margin-bottom: 1.5625rem;
      }
      &-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5625rem;
      }
      &-username,
      &-password {
        margin-bottom: 1.5625rem;
        width: 12.5rem;
      }
      &-btn {
        width: 12.5rem;
        &-submit {
          width: 100%;
          background-color: #595ff8;
        }
      }
    }
  }
}
@media (min-width: 375px) and (max-width: 765px) {
  .login-container .login-container-box {
    background-color: initial;
  }
  .login-container .login-container-box-form-title {
    color: #f7f3ff;
  }
}
</style>

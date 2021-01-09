<template>
  <main class="login-block">
    <img src="@/assets/images/logo.svg" alt="popso" />
    <form class="login_auth" @submit.prevent="submitHandler">
      <input
        v-model="controls.login"
        placeholder="Логин"
        class="login_auth-input"
        type="text"
        required
      />
      <input
        v-model="controls.password"
        placeholder="Пароль"
        class="login_auth-input"
        type="text"
        required
      />
      <app-button :button="button" />
    </form>
  </main>
</template>

<script>
import AppButton from '@/components/SingleComponents/Button'
export default {
  layout: 'login',
  components: {
    AppButton,
  },
  data: () => ({
    controls: {
      login: '',
      password: '',
    },
    button: { text: 'Войти' },
  }),
  methods: {
    submitHandler() {
      this.$router.push('/')
    },
  },
  head: {
    title: `Войти`,
  },
}
</script>

<style lang="scss" scoped>
.login-block {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login_auth {
  margin-top: 60px;
  display: flex;
  flex-flow: column;

  &-input {
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    width: 358px;
    margin-bottom: 20px;
    color: #9496a6;
    padding: 12px 20px;
  }
}
@media (max-width: 360px) {
  .login_auth-input {
    width: 296px;
  }
}
</style>

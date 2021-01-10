<template>
  <main class="login-block">
    <img src="@/assets/images/logo.svg" alt="popso" />
    <form class="login_auth" @submit.prevent="submitHandler">
      <div class="formInput">
        <input
          v-model.trim="$v.login.$model"
          :class="{ 'input--error': $v.login.$error }"
          placeholder="Логин"
          class="login_auth-input"
          type="text"
        />
        <div v-if="!$v.login.required && $v.login.$dirty" class="error">
          Пожалуйста заполните поле
        </div>
        <div v-if="!$v.login.minLength && $v.login.$dirty" class="error">
          Минимальное значение
          {{ $v.login.$params.minLength.min }} символов
        </div>
      </div>
      <div class="formInput">
        <input
          v-model="$v.password.$model"
          :class="{ 'input--error': $v.password.$error }"
          placeholder="Пароль"
          class="login_auth-input"
          type="password"
        />
        <div v-if="!$v.password.required && $v.password.$dirty" class="error">
          Пожалуйста заполните поле
        </div>
        <div v-if="!$v.password.minLength && $v.password.$dirty" class="error">
          Минимальное значение
          {{ $v.password.$params.minLength.min }} символов
        </div>
      </div>
      <div class="formInput">
        <input
          v-model.trim="$v.repeatPassword.$model"
          :class="{ 'input--error': $v.repeatPassword.$error }"
          placeholder="Подтверждение пароля"
          class="login_auth-input"
          type="password"
        />
        <div
          v-if="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty"
          class="error"
        >
          Пароль не совпадают
        </div>
      </div>
      <app-button :button="button" />
    </form>
    <nuxt-link class="nuxtLink" to="/login">уже есть аккаунт</nuxt-link>
  </main>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import AppButton from '@/components/SingleComponents/Button'
export default {
  middleware: ['auth'],
  layout: 'login',
  validations: {
    login: {
      required,
      minLength: minLength(2),
    },
    password: {
      required,
      minLength: minLength(4),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  components: {
    AppButton,
  },
  data: () => ({
    login: '',
    password: '',
    repeatPassword: '',
    button: { text: 'Создать' },
  }),
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      } else {
        try {
          await this.$store.dispatch('auth/create', {
            login: this.login,
            password: this.repeatPassword,
          })
          this.$router.push('/')
        } catch (e) {}
      }
    },
  },
  head: {
    title: `Регистрация`,
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

    color: #9496a6;
    padding: 12px 20px;
  }
}
.formInput {
  position: relative;
  margin-bottom: 25px;
}

.input--error {
  border: 1px solid #ce0707;
}

.error {
  position: absolute;
  color: red;
  font-size: 10px;
}
.nuxtLink {
  margin: 10px;
  color: #177de5;
  text-decoration: none;
  border-bottom: 1px solid rgba(23, 125, 229, 0.4);
  font-size: 12px;
}
@media (max-width: 360px) {
  .login_auth-input {
    width: 296px;
  }
}
</style>

<template>
  <div class="container">
    <h6 class="pageTitle">Мой профиль</h6>
    <div class="pageContent">
      <form class="fromProfile" @submit.prevent="submitHandler">
        <div class="BigGroup">
          <div class="group">
            <input
              v-model.trim="$v.FirstName.$model"
              type="text"
              :class="{ 'input--error': $v.FirstName.$error }"
            />
            <span class="bar"></span>
            <label>Имя</label>
            <div
              v-if="!$v.FirstName.required && $v.FirstName.$dirty"
              class="error"
            >
              Пожалуйста заполните поле
            </div>
            <div
              v-if="!$v.FirstName.minLength && $v.FirstName.$dirty"
              class="error"
            >
              Минимальное значение
              {{ $v.FirstName.$params.minLength.min }} символов
            </div>
          </div>

          <div class="group">
            <input
              v-model.trim="$v.LastName.$model"
              :class="{ 'input--error': $v.LastName.$error }"
              type="text"
            />
            <span class="bar"></span>
            <label>Фамилия </label>
            <div
              v-if="!$v.LastName.required && $v.LastName.$dirty"
              class="error"
            >
              Пожалуйста заполните поле
            </div>
            <div
              v-if="!$v.LastName.minLength && $v.LastName.$dirty"
              class="error"
            >
              Минимальное значение
              {{ $v.LastName.$params.minLength.min }} символов
            </div>
          </div>
        </div>
        <div class="BigGroup">
          <div class="group">
            <input v-model="$v.password.$model" type="password" />
            <span class="bar"></span>
            <label>Сменить пароль</label>
            <div
              v-if="!$v.password.required && $v.password.$dirty"
              class="error"
            >
              Пожалуйста заполните поле
            </div>
            <div
              v-if="!$v.password.minLength && $v.password.$dirty"
              class="error"
            >
              Минимальное значение
              {{ $v.password.$params.minLength.min }} символов
            </div>
          </div>
          <div class="group">
            <input v-model="$v.login.$model" type="text" />
            <span class="bar"></span>
            <label>Сменить логин</label>
            <div v-if="!$v.login.required && $v.login.$dirty" class="error">
              Пожалуйста заполните поле
            </div>
            <div v-if="!$v.login.minLength && $v.login.$dirty" class="error">
              Минимальное значение
              {{ $v.login.$params.minLength.min }} символов
            </div>
          </div>
        </div>
        <app-button class="AppBtn" :button="button" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '@/components/SingleComponents/Button'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  middleware: ['auth'],
  components: {
    AppButton,
  },
  head: {
    title: `Мой профиль`,
  },
  validations: {
    FirstName: {
      required,
      minLength: minLength(2),
    },
    LastName: {
      required,
      minLength: minLength(3),
    },
    login: {
      required,
      minLength: minLength(2),
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },
  data: () => ({
    FirstName: '',
    password: null,
    LastName: '',
    login: '',

    button: { text: 'Сохранить' },
  }),
  watch: {
    user() {
      this.setUser()
    },
  },
  async mounted() {
    await this.$store.dispatch('auth/FeatchInfo')
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      } else {
        const FormData = {
          login: this.login,
          FirstName: this.FirstName,
          LastName: this.LastName,
          password: this.password || null,
        }
        try {
          await this.$store.dispatch('auth/updateUser', {
            FormData,
          })
          this.$router.push('/')
        } catch (e) {}
      }
    },
    setUser() {
      this.FirstName = this.user.FirstName
      this.LastName = this.user.LastName
      this.login = this.user.login
    },
  },
}
</script>

<style lang="scss" scoped>
.error {
  position: absolute;
  color: red;
  font-size: 10px;
}
.AppBtn {
  width: 202px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.fromProfile {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 19px;
}

.BigGroup {
  display: flex;
  flex-flow: column;
}

/* form starting stylings ------------------------------- */
.group {
  position: relative;
  margin-bottom: 60px;
}

input {
  font-size: 16px;
  padding: 10px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
  color: #6f849c;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 0px;
  top: 15px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -15px;
  font-size: 14px;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 360px;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: #6f849c;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
.input--error {
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  border-bottom: 1px solid red;
}

@media (max-width: 991px) {
  .fromProfile {
    flex-flow: column;
  }
  .AppBtn {
    width: 100%;
  }
}
@media screen and (max-width: 450px) {
  .bar {
    width: 255px;
  }
}
</style>

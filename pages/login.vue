
<template>
  <div v-if="false">
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
  <div
    v-else
    class="
      flex flex-col
      justify-center
      align-center
      w-full
      mx-auto
      lg:max-w-7xl
      h-screen
    "
  >
    <div
      class="
        add-store-container
        w-full
        rounded
        shadow-md
        flex flex-col
        bg-gray-200
      "
    >
      <h1 class="text-4xl text-center pt-5 text-gray-600">Login</h1>

      <div class="input w-full flex flex-col justify-center mt-3">
        <div class="input w-full px-5">
          <input
            type="url"
            class="w-full rounded shadow-md text-gray-700 p-3 mt-3"
            v-model="login.username"
            placeholder="Usuário"
          />
        </div>
      </div>
      <div class="input w-full flex flex-col justify-center my-3">
        <div class="input w-full px-5">
          <input
            type="password"
            class="w-full rounded shadow-md text-gray-700 p-3 my-3"
            v-model="login.password"
            placeholder="Senha"
          />
        </div>
      </div>
      <div class="button px-5">
        <button
          class="w-full rounded shadow-md text-white bg-blue-400 p-3 mb-3"
          @click="userLogin()"
        >
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        await this.$auth.setUser(response.data.user)

        this.$router.push('/')
      } catch (err) {
        this.showErrorAlert('Usuário ou senha inválidos')
      }
    },
    showErrorAlert(msg) {
      this.$swal.fire({
        position: 'center',
        icon: 'error',
        title: msg,
        showConfirmButton: true,
        // timer: 1500,
      })
    },
  },
}
</script>

<style>
</style>

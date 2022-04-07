<template>
  <div
    class="
      flex flex-col
      justify-center
      align-center
      w-full
      my-5
      px-5
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
      <div class="logo w-full flex flex-row justify-center mt-5">
        <svg
          class="text-8xl text-gray-600"
          style="width: 128px; height: 128px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21.41,11.58L12.41,2.58C12.04,2.21 11.53,2 11,2H4A2,2 0 0,0 2,4V11C2,11.53 2.21,12.04 2.59,12.41L3,12.81C3.9,12.27 4.94,12 6,12A6,6 0 0,1 12,18C12,19.06 11.72,20.09 11.18,21L11.58,21.4C11.95,21.78 12.47,22 13,22C13.53,22 14.04,21.79 14.41,21.41L21.41,14.41C21.79,14.04 22,13.53 22,13C22,12.47 21.79,11.96 21.41,11.58M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M10,19H7V22H5V19H2V17H5V14H7V17H10V19Z"
          />
        </svg>
      </div>
      <div class="input w-full flex flex-col justify-center my-3">
        <div class="legend text-center text-lg">Endereço da Loja Shopify</div>
        <div class="input w-full px-5">
          <input
            type="url"
            class="w-full rounded shadow-md text-gray-700 p-3 mt-3"
            v-model="url"
          />
        </div>
      </div>
      <div class="button px-5">
        <button
          class="w-full rounded shadow-md text-white bg-blue-400 p-3 mb-3"
          @click="addStore()"
        >
          Incluir Loja
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddStorePage',
  data() {
    return {
      url: '',
    }
  },

  methods: {
    async addStore() {
      if (!this.isValidUrl(this.url)) {
        this.showErrorAlert('O endereço da loja é inválido')
        return
      }
      const parse_url = new URL(this.url)

      this.$nuxt.$loading.start()
      this.$axios
        .$post('/store', { url: parse_url.origin })
        .then((response) => {
          if (response.status == 0) {
            this.showErrorAlert(response.message)
          } else {
            this.showSuccessAlert('Loja cadastrada')
          }
        })
        .catch((error) =>
          this.showErrorAlert('Ocorreu um erro.Tente novamente mais tarde')
        )
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
    isValidUrl(url) {
      try {
        const parse_url = new URL(url)

        return true
      } catch (error) {
        return false
      }
    },
    showSuccessAlert(msg) {
      this.$swal.fire({
        position: 'center',
        icon: 'success',
        title: msg,
        showConfirmButton: true,
        // timer: 1500,
      })
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

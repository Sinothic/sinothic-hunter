<template>
  <div class="store-sales w-full lg:max-w-7xl my-5 mx-auto">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nome do Produto</th>
            <th scope="col" class="px-6 py-3">Total Faturado</th>
            <th scope="col" class="px-6 py-3">Total de Vendas</th>
            <th scope="col" class="px-6 py-3">
              <NuxtLink
                :to="`/stores`"
                class="
                  font-medium
                  text-blue-600
                  dark:text-blue-500
                  text-right
                  hover:underline
                "
                >Voltar
              </NuxtLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="
              bg-white
              border-b
              dark:bg-gray-800 dark:border-gray-700
              hover:bg-gray-50
              dark:hover:bg-gray-600
            "
          >
            <th
              scope="row"
              class="
                px-6
                py-4
                font-medium
                text-gray-900
                dark:text-white
                whitespace-nowrap
              "
            >
              {{ product.title }}
            </th>

            <td class="px-6 py-4">{{ product._sum.price | formatDBtoReal }}</td>
            <td class="px-6 py-4">{{ product._count.price }}</td>
            <td class="px-6 py-4 text-right">
              <a
                :href="store.url + '/products/' + product.handle"
                class="
                  font-medium
                  text-blue-600
                  dark:text-blue-500
                  hover:underline
                "
                target="_blank"
                >Ver no site</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      store: {},
    }
  },
  filters: {
    formatDBtoReal: function (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return 'R$ ' + value
    },
  },
  methods: {
    async getStoreInformation() {
      const { id } = this.$route.params
      this.store = await this.$axios.$get(`/store/${id}`)
    },
  },
  mounted() {
    // this.$fetch()
    this.getStoreInformation()
  },
  async fetch() {
    const { id } = this.$route.params
    this.products = await this.$axios
      .$get(`/store/${id}/sales`)
      .then((response) => response)
  },
}
</script>

<style>
</style>

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
            <th scope="col" class="px-6 py-3 max-w-md truncate">
              Nome do Produto
            </th>
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
                max-w-lg
                truncate
              "
            >
              {{ product.title }}
            </th>

            <td class="px-6 py-4">{{ product.sum | formatDBtoReal }}</td>
            <td class="px-6 py-4">{{ product.count }}</td>
            <td class="px-6 py-4 text-right">
              <a
                :href="product.url + '/products/' + product.handle"
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
  name: 'ProductSalesByPage',
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
  methods: {},
  mounted() {
    // this.$fetch()
    // this.getStoreInformation()
  },
  async fetch() {
    const { page } = this.$route.params

    this.products = await this.$axios
      .$get(`/products/sales/page/${page}`)
      .then((response) => response)
  },
}
</script>

<style>
</style>

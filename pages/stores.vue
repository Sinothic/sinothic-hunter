<template>
  <div class="div w-full lg:max-w-7xl my-5 mx-auto">
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
            <th scope="col" class="px-6 py-3">URL</th>
            <th scope="col" class="px-6 py-3">Faturamento</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Remover</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Ver Site</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Vendas</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(store, index) in stores"
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
              {{ store._id.store[0].url }}
            </th>

            <td class="px-6 py-4">{{ store.total_sales | formatDBtoReal }}</td>
            <td class="px-6 py-4">
              <button
                @click="
                  removeStore(
                    store._id.store[0]._id.$oid,
                    store._id.store[0].url
                  )
                "
              >
                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                  />
                </svg>
              </button>
            </td>
            <td class="px-6 py-4 text-right">
              <a
                :href="store._id.store[0].url"
                class="
                  font-medium
                  text-blue-600
                  dark:text-blue-500
                  hover:underline
                "
                target="_blank"
                >Ver site</a
              >
            </td>
            <td class="px-6 py-4 text-right">
              <NuxtLink
                :to="`/store/${store._id.store[0]._id.$oid}`"
                class="
                  font-medium
                  text-blue-600
                  dark:text-blue-500
                  hover:underline
                "
                >Pedidos
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'StorePage',
  data() {
    return {
      stores: [],
    }
  },
  methods: {
    async removeStore(storeId: number, url: string) {
      try {
        const result = await this.$swal.fire({
          title: `Tem certeza que deseja remover a loja: ${url}`,
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: 'Remover',
          denyButtonText: `Cancelar`,
        })

        if (result.isConfirmed) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()
            await this.$axios.delete(`/store/${storeId}`)
            this.stores = await this.$axios.$get('/stores')
            this.$nuxt.$loading.finish()
          })
        }
      } catch (error) {
        this.$swal.fire({
          title: 'Error',
          text: 'Ocorreu um erro ao deletar essa loja',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        this.$nuxt.$loading.finish()
      }
    },
  },
  filters: {
    formatDBtoReal: function (value: any) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return 'R$ ' + value
    },
  },
  async mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      this.stores = await this.$axios.$get('/stores')
      this.$nuxt.$loading.finish()
    })
  },
})
</script>

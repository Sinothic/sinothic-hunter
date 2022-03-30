<template>
  <div class="w-full lg:max-w-7xl mx-auto">
    <!-- FORM SECTION  -->
    <section class="flex items-center mx-5">
      <div class="w-full mt-5 bg-gray-100 rounded shadow-md p-4 mx-auto">
        <label class="text-gray-600 text-lg" for="url_input">
          Endereço da Loja
        </label>
        <input
          v-model="url"
          class="w-full rounded shadow-md p-3 mt-3"
          type="url"
          name="url"
          id="url_input"
          placeholder="https://shopifystore.com.br"
        />
        <button
          class="
            w-full
            bg-blue-400
            rounded
            shadow-md
            text-white
            font-bold
            p-3
            mt-3
          "
          :disabled="is_watching ? true : false"
          :class="{ disabled: is_watching }"
          @click="search"
        >
          Consultar
        </button>
        <button
          class="
            w-full
            bg-red-400
            rounded
            shadow-md
            text-white
            font-bold
            p-3
            mt-3
          "
          :class="{ 'animate-pulse': is_watching }"
          @click="watch"
          v-show="products.length > 0"
        >
          {{
            this.is_watching ? 'Para Monitoramento' : 'Iniciar Monitoramento'
          }}
        </button>
      </div>
    </section>
    <!-- ------------  -->
    <!-- LIST SECTION -->
    <section>
      <div
        v-for="product in products"
        :key="product.id"
        class="
          flex flex-col
          item-list
          rounded
          shadow-md
          m-5
          bg-gray-100
          p-3
          sm:flex-row
        "
      >
        <div
          class="flex flex-col justify-center badge"
          @click="toggleSalesList(product)"
          v-show="getSalesNumber(product)"
        >
          <div class="badge-ping animate-ping"></div>
          <span class="badge-number"> {{ product | getSalesNumber }} </span>
        </div>
        <div class="badge-list" v-if="product.show_sales_list == true">
          <div @click="toggleSalesList(product)" class="close-button">X</div>
          <span
            class="badge-list-item"
            v-for="(sale, index) in product.sales"
            :key="index"
          >
            {{ sale.updated_at | timeAgo }}
          </span>
        </div>
        <div class="time w-full flex flex-col justify-center sm:w-1/4">
          <span class="m-auto"> {{ product.elapsed_time }} </span>
        </div>
        <div class="foto flex flex-row justify-center my-2">
          <img class="h-20 rounded" :src="product.image_url" alt="" />
        </div>
        <div class="product-info w-full px-5 sm:w-1/2">
          <div class="product-name">{{ product.title }}</div>
          <div class="product-price">R$ {{ product.price }}</div>
        </div>
        <div class="flex flex-col w-full justify-center sm:w-1/4">
          <button
            class="
              button
              w-full
              bg-blue-400
              rounded
              shadow-md
              text-white
              font-bold
              p-3
              mt-3
            "
            @click="openNewWindow(product.url)"
          >
            Ver no site
          </button>
        </div>
      </div>
    </section>
    <!-- ------------ -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://www.izilife.com.br',
      products: [],
      watched_products: [],
      is_watching: false,
      timer_id: null,
      timer_interval_seconds: 10,
    }
  },
  filters: {
    getSalesNumber: function (product) {
      if (!product) {
        return 0
      }
      return product.hasOwnProperty('sales') ? product.sales.length : 0
    },
    timeAgo(updated_at) {
      function isPlurals(metric) {
        return metric > 1 ? 's' : ''
      }

      const now = new Date()
      const last_update = new Date(updated_at)
      const time_in_seconds = Math.round(
        (now.getTime() - last_update.getTime()) / 1000
      )

      let displayed_time = ''

      if (time_in_seconds <= 59) {
        displayed_time = `${time_in_seconds} segundo${isPlurals(
          time_in_seconds
        )} atrás`
      } else if (time_in_seconds <= 3599) {
        const minutes = Math.round(time_in_seconds / 60)
        displayed_time = `${minutes} minuto${isPlurals(minutes)} atrás`
        //
      } else if (time_in_seconds <= 86399) {
        const hours = Math.round(time_in_seconds / 3600)
        displayed_time = `${hours} hora${isPlurals(hours)} atrás`
        //
      } else {
        const days = Math.round(time_in_seconds / 86400)
        displayed_time = `${days} dia${isPlurals(days)} atrás`
        //
      }

      return displayed_time
    },
  },
  methods: {
    isPlurals(metric) {
      return metric > 1 ? 's' : ''
    },
    sortByDateAsc(p1, p2) {
      const d1 = new Date(p1.updated_at)
      const d2 = new Date(p2.updated_at)

      if (d1 < d2) {
        return -1
      } else if (d1 > d2) {
        return 1
      } else {
        return 0
      }
    },
    async toggleSalesList(product) {
      if (!product.hasOwnProperty('show_sales_list')) {
        product.show_sales_list = true
        await this.$nextTick()
        this.$forceUpdate()
        return
      }
      product.show_sales_list = !product.show_sales_list
      await this.$nextTick()
      this.$forceUpdate()
    },
    getSalesNumber: function (product) {
      if (!product) {
        return 0
      }
      return product.hasOwnProperty('sales') ? product.sales.length : 0
    },
    search() {
      let parsed_url = ''
      try {
        parsed_url = new URL(this.url)
      } catch (error) {
        this.$swal.fire({
          title: 'Endereço Inválido!',
          text: 'O endereço informado não é válido. Verifique e tente novamente',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        return
      }

      const params = {
        url: parsed_url.origin,
      }
      if (this.is_watching == false) {
        this.$nuxt.$loading.start()
      }
      this.$axios.$get('/products', { params }).then((response) => {
        this.products = this.compare(response)

        if (this.is_watching == false) {
          this.$nuxt.$loading.finish()
        }
      })
    },
    watch() {
      if (this.is_watching == false) {
        this.is_watching = true
        this.watched_products = [...this.products]
        this.timer_id = setInterval(
          this.search,
          this.timer_interval_seconds * 1000
        )
      } else {
        clearInterval(this.timer_id)
        this.is_watching = false
        this.watched_products = []
      }
    },
    compare(products) {
      if (this.is_watching == false) {
        return products
      }

      this.watched_products = this.watched_products.map((watched_product) => {
        let fresh_product = products.filter(
          (product) => watched_product.id == product.id
        )

        fresh_product =
          fresh_product.length > 0 ? fresh_product[0] : fresh_product

        if (
          new Date(fresh_product.updated_at).getTime() !=
          new Date(watched_product.updated_at).getTime()
        ) {
          if (!watched_product.hasOwnProperty('sales')) {
            watched_product.sales = []
          }
          watched_product.sales.unshift(fresh_product)
          watched_product.updated_at = fresh_product.updated_at
        }

        watched_product = { ...watched_product, ...fresh_product }
        return watched_product
      })

      return this.watched_products
    },
    openNewWindow(url) {
      window.open(url, '_blank')
    },
  },
}
</script>

<style>
button.disabled {
  background-color: #d5d5d5;
}

.badge {
  display: flex;
  position: absolute;
  width: 30px;
  height: 30px;
  background: #f87171;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.badge .badge-ping {
  position: absolute;
  width: 25px;
  height: 25px;
  background: #f87171;
  border-radius: 50%;
}

.badge .badge-number {
  color: #fff;
  font-weight: 600;
}

.badge-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translateY(35px);
  width: 150px;
  height: fit-content;
  background-color: #f87171;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
}

.badge-list .close-button {
  display: flex;
  justify-content: center;
  position: absolute;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  width: 25px;
  height: 25px;
  top: -30px;
  left: 125px;
  border-radius: 50%;
  border: 1px solid #000;
}

.badge-list-item {
  display: block;
}
</style>

<template>
  <div
    v-if="this.$auth.user"
    :class="{ Folded: folded }"
    class="side-bar absolute bg-gray-200 h-screen p-5 shadow-md"
  >
    <div
      @click="$emit('fold-sidebar')"
      class="side-bar close flex flex-row justify-center"
    >
      <svg style="width: 48px; height: 48px" viewBox="0 0 48 48">
        <path
          fill="currentColor"
          d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        />
      </svg>
    </div>
    <!-- LOJAS CADASTRADAS -->
    <div @click="$emit('fold-sidebar')" class="side-item">
      <div class="icon">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z"
          />
        </svg>
      </div>
      <NuxtLink to="/stores">Lojas Cadastradas</NuxtLink>
    </div>
    <!-- ---------------- -->
    <!-- CADASTRAR LOJAS -->
    <div @click="$emit('fold-sidebar')" class="side-item">
      <div class="icon">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 4V6H20V4M4 7L3 12V14H4V20H13C12.95 19.66 12.92 19.31 12.92 18.95C12.92 17.73 13.3 16.53 14 15.53V14H15.54C16.54 13.33 17.71 12.96 18.91 12.96C19.62 12.96 20.33 13.09 21 13.34V12L20 7M6 14H12V18H6M18 15V18H15V20H18V23H20V20H23V18H20V15"
          />
        </svg>
      </div>
      <NuxtLink to="/store/add">Cadastrar Loja</NuxtLink>
    </div>
    <!-- --------------- -->
    <!-- Produtos -->
    <div @click="$emit('fold-sidebar')" class="side-item">
      <div class="icon">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z"
          />
        </svg>
      </div>
      <NuxtLink to="/product/sales">Produtos</NuxtLink>
    </div>
    <!-- --------------- -->

    <!-- Shopify Inspector -->
    <div @click="$emit('fold-sidebar')" class="side-item">
      <div class="icon">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
          />
        </svg>
      </div>
      <NuxtLink to="/">Shopify Inspector</NuxtLink>
    </div>
    <!-- --------------- -->
    <!-- SAIR / LOGOUT -->
    <div @click="logout()" class="side-item">
      <div class="icon">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z"
          />
        </svg>
      </div>
      <NuxtLink to="/">Sair</NuxtLink>
    </div>
    <!-- --------------- -->
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  emits: ['fold-sidebar'],
  props: ['folded'],
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
</style>

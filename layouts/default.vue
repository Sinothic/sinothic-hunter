<template>
  <div class="w-full">
    <SideBar :folded="folded" @fold-sidebar="handleFoldSidebar" />
    <nav class="w-full p-5 bg-blue-400 shadow-md">
      <div class="w-full flex flex-row justify-between lg:max-w-7xl mx-auto">
        <!-- HAMBURGER MENU -->
        <div
          v-if="this.$auth.user"
          class="
            flex flex-col
            justify-content
            items-center
            nav-hamburger-icon
            justify-content justify-items-center
          "
        >
          <svg
            @click="unfoldSidebar()"
            class="text-white"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </svg>
        </div>
        <!-- -------------- -->
        <!-- SITE NAME -->
        <NuxtLink to="/">
          <span class="text-white text-2xl lg:max-w-7xl">
            Sinothic Hunter - Shopify Inspector
          </span>
        </NuxtLink>
        <!-- --------- -->
        <!-- AVATAR  -->
        <div class="flex flex-col justify-content items-center user-info">
          <div class="avatar text-white">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"
              />
            </svg>
          </div>
          <div v-if="this.$auth.user" class="name text-white">
            {{ this.$auth.user.name }}
          </div>
          <div v-else class="name text-white">
            <NuxtLink to="/login">Login </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <Nuxt />
  </div>
</template>
<script>
import SideBar from '../components/SideBar.vue'
export default {
  components: { SideBar },
  name: 'HeaderComponent',
  data() {
    return {
      folded: true,
    }
  },
  methods: {
    handleFoldSidebar() {
      console.log('Handled')
      this.folded = true
    },
    unfoldSidebar() {
      this.folded = false
    },
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

html,
body {
  height: 100%;
}
div.side-item {
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  color: rgb(55 65 81);
}

div.side-bar.Folded {
  left: -207px;
  transition: 1s;
}

div.side-item .icon {
  padding: 0 5px 0 5px;
}
.side-bar {
  z-index: 9998;
}
</style>

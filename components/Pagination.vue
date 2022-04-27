<template>
  <div class="pagination w-max flex flex-row m-3 rounded-full">
    <!-- <div class="first border border-solid border-blue-400 p-2"><< Primeiro</div> -->
    <div
      @click="$emit('click-previous')"
      class="
        previous
        select-none
        cursor-pointer
        shadow-md
        border border-solid border-blue-400
        rounded-l-full
        p-2
      "
    >
      Anterior
    </div>
    <div
      v-for="page in pages"
      :key="page"
      @click="$emit('change-page', { page: page })"
      class="page-btn"
      :class="{ active: currentPage == page }"
    >
      {{ page }}
    </div>
    <div
      @click="$emit('click-next')"
      class="
        next
        select-none
        cursor-pointer
        shadow-md
        border border-l-0 border-solid
        rounded-r-full
        border-blue-400
        p-2
      "
    >
      Próximo
    </div>
    <!-- <div class="last border border-solid border-blue-400 p-2">Último >></div> -->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: Array,
    currentPage: Number,
  },
  data() {
    return {
      internalPages: [],
    }
  },
  emits: ['click-previous', 'change-page', 'click-next'],
}
</script>

<style >
@layer components {
  .page-btn {
    @apply border border-l-0 border-solid border-blue-400 shadow-md py-2 w-10 text-center self-center cursor-pointer select-none;
  }

  .active {
    @apply bg-blue-400 text-white;
  }
}
</style>

<template>
  <Pagination 
    :activePage="activePage" 
    :totalPages="totalPages" 
    :padding="padding"
    @update:activePage="updateActivePage"
  >
    <PaginationButtonFirstPage 
      v-slot="{ disabled, selectFirstPageEvents }"
    >
      <button
        :disabled="disabled"
        v-on="selectFirstPageEvents"
        :class="{'disabled': disabled}"
      >
        First
      </button>
    </PaginationButtonFirstPage>

    <PaginationButtonPreviousPage 
      v-slot="{ disabled, selectPreviousPageEvents}"
    >
      <button
        :disabled="disabled"
        v-on="selectPreviousPageEvents"
        :class="{'disabled': disabled}"
      >
        Prev
      </button>
    </PaginationButtonPreviousPage>

    <PaginationPagesList v-slot="{ pages }">
      <PaginationPagesListButton 
        v-slot="{ isActive, selectCurrentPageEvents }" 
        :page="page" 
        v-for="page in pages" 
        :key="page" 
      > 
        <button :class="{'active': isActive }" v-on="selectCurrentPageEvents" >
          {{ page }}
        </button>
      </PaginationPagesListButton>
    </PaginationPagesList>

    <PaginationButtonNextPage 
      v-slot="{ disabled, selectNextPageEvents }"
    >
      <button
        :disabled="disabled"
        v-on="selectNextPageEvents"
        :class="{'disabled': disabled}"
      >
        Next
      </button>
    </PaginationButtonNextPage>

    <PaginationButtonLastPage 
      v-slot="{ disabled, selectLastPageEvents }"
    >
      <button
        :disabled="disabled"
        v-on="selectLastPageEvents"
        :class="{'disabled': disabled}"
      >
        Last
      </button>
    </PaginationButtonLastPage>
  </Pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { 
    Pagination,
    PaginationPagesList,
    PaginationPagesListButton,
    PaginationButtonFirstPage,
    PaginationButtonPreviousPage,
    PaginationButtonNextPage,
    PaginationButtonLastPage,
} from './components/Pagination';

export default defineComponent({
  components: {
    Pagination,
    PaginationPagesList,
    PaginationPagesListButton,
    PaginationButtonFirstPage,
    PaginationButtonPreviousPage,
    PaginationButtonNextPage,
    PaginationButtonLastPage,
  },

  setup() {
    const activePage = ref(1);
    const totalPages = ref(10);
    const padding = ref(3);

    function updateActivePage(page: number) {
      activePage.value = page;
    }

    return {
      activePage,
      totalPages,
      padding,
      updateActivePage,
    }
  }
})
</script>

<style scoped>
.active {
  background-color: aqua;
}

.disabled {
  background-color: brown;
}
</style>

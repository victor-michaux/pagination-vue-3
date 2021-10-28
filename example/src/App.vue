<template>
    <Pagination
        :active-page="activePage"
        :total-pages="totalPages"
        :padding="padding"
        @update:activePage="updateActivePage"
    >
        <PaginationButtonFirstPage
            v-slot="{ disabled, selectFirstPageEvents }"
        >
            <button
                :disabled="disabled"
                :class="{'disabled': disabled}"
                v-on="selectFirstPageEvents"
            >
                First
            </button>
        </PaginationButtonFirstPage>

        <PaginationButtonPreviousPage
            v-slot="{ disabled, selectPreviousPageEvents}"
        >
            <button
                :disabled="disabled"
                :class="{'disabled': disabled}"
                v-on="selectPreviousPageEvents"
            >
                Prev
            </button>
        </PaginationButtonPreviousPage>

        <PaginationPagesList v-slot="{ pages }">
            <PaginationPagesListButton
                v-for="page in pages"
                v-slot="{ isActive, selectCurrentPageEvents }"
                :key="page"
                :page="page"
            >
                <button
                    :class="{'active': isActive }"
                    v-on="selectCurrentPageEvents"
                >
                    {{ page }}
                </button>
            </PaginationPagesListButton>
        </PaginationPagesList>

        <PaginationButtonNextPage
            v-slot="{ disabled, selectNextPageEvents }"
        >
            <button
                :disabled="disabled"
                :class="{'disabled': disabled}"
                v-on="selectNextPageEvents"
            >
                Next
            </button>
        </PaginationButtonNextPage>

        <PaginationButtonLastPage
            v-slot="{ disabled, selectLastPageEvents }"
        >
            <button
                :disabled="disabled"
                :class="{'disabled': disabled}"
                v-on="selectLastPageEvents"
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
} from '../../src/components/Pagination';

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
        const padding = ref(2);

        function updateActivePage(page: number) {
            activePage.value = page;
        }

        return {
            activePage,
            totalPages,
            padding,
            updateActivePage,
        };
    },
});
</script>

<style scoped>
.active {
  background-color: aqua;
}

.disabled {
  background-color: brown;
}
</style>

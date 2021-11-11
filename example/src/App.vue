<template>
    <Pagination
        :active-page="activePage"
        :total-pages="totalPages"
        :padding="padding"
        class="flex gap-x-2"
        @update:activePage="updateActivePage"
    >
        <PaginationButtonPreviousPage
            v-slot="{ disabled, selectPreviousPageEvents}"
        >
            <button
                :disabled="disabled"
                :class="{'invisible': disabled}"
                class="h-12 w-12 flex items-center justify-center bg-white hover:bg-blue-100 text-blue-800 rounded-full border border-blue-100 shadow cursor-pointer"
                v-on="selectPreviousPageEvents"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
        </PaginationButtonPreviousPage>

        <PaginationPagesList
            v-slot="{ pages }"
            class="flex gap-x-2"
        >
            <PaginationPagesListButton
                v-for="page in pages"
                v-slot="{ isActive, selectCurrentPageEvents }"
                :key="page"
                :page="page"
            >
                <button
                    :class="[
                        isActive
                            ? 'bg-blue-800 hover:bg-blue-900 text-white border-blue-800 hover:border-blue-900'
                            : 'bg-white hover:bg-blue-100 text-blue-800 border-blue-100'
                    ]"
                    class="h-12 w-12 flex items-center justify-center font-semibold text-lg border shadow rounded-full transition-all transform duration-250 ease-in-out"
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
                :class="{'invisible': disabled}"
                class="h-12 w-12 flex items-center justify-center bg-white hover:bg-blue-100 text-blue-800 rounded-full border border-blue-100 shadow cursor-pointer"
                v-on="selectNextPageEvents"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </PaginationButtonNextPage>
    </Pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
    Pagination,
    PaginationPagesList,
    PaginationPagesListButton,
    PaginationButtonPreviousPage,
    PaginationButtonNextPage,
} from '../../src/components/Pagination';

export default defineComponent({
    components: {
        Pagination,
        PaginationPagesList,
        PaginationPagesListButton,
        PaginationButtonPreviousPage,
        PaginationButtonNextPage,
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

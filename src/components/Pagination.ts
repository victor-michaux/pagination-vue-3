import {
    defineComponent, h, provide, inject, InjectionKey, Slots, toRefs, ref, Ref, watch, VNodeArrayChildren,
} from 'vue';
import { Paginator } from '@victor-michaux/pagination';

type State = Ref<Paginator>;

const PaginationContext = Symbol('PaginationContext') as InjectionKey<State>;

function usePaginationContext(component: string): State {
    const context = inject(PaginationContext, null);

    if (context === null) {
        throw new Error(`<${component} /> is missing a parent <Pagination /> component.`);
    }

    return context;
}

function getDefaultSlot(slots: Slots, scope: Object|null = null): VNodeArrayChildren {
    return slots.default ? slots.default(scope ?? {}) : [];
}

export const Pagination = defineComponent({
    name: 'Pagination',

    props: {
        activePage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        padding: {
            type: Number,
            required: true,
        },
    },

    emits: ['update:activePage'],

    setup(props, { slots, emit }) {
        const { activePage, totalPages, padding } = toRefs(props);

        function onActivePageUpdated(page: number) {
            emit('update:activePage', page);
        }

        const paginator = ref(new Paginator(activePage.value, totalPages.value, onActivePageUpdated, padding.value));

        watch(activePage, (newValue) => {
            paginator.value.activePage = newValue;
        });

        watch(totalPages, (newValue) => {
            paginator.value.totalPages = newValue;
        });

        watch(padding, (newValue) => {
            paginator.value.padding = newValue;
        });

        provide(PaginationContext, paginator);

        return () => h('ul', getDefaultSlot(slots));
    },
});

export const PaginationPagesList = defineComponent({
    name: 'PaginationPagesList',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationPagesList');

        const scope = {
            pages: paginator.value.pages,
        };

        return () => h('ul', getDefaultSlot(slots, scope));
    },
});

export const PaginationPagesListButton = defineComponent({
    name: 'PaginationPagesListButton',

    props: {
        page: {
            type: Number,
            required: true,
        },
    },

    emits: ['update:activePage'],

    setup(props, { slots }) {
        const { page } = toRefs(props);

        const paginator = usePaginationContext('PaginationPagesListButton');

        const scope = {
            isActive: paginator.value.activePage === page.value,
            selectCurrentPageEvents: {
                click: () => paginator.value.selectPage(page.value),
            },
        };

        return () => h('li', getDefaultSlot(slots, scope));
    },
});

export const PaginationButtonFirstPage = defineComponent({
    name: 'PaginationButtonFirstPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonFirstPage');

        const scope = {
            disabled: paginator.value.activePage === 1,
            selectFirstPageEvents: {
                click: () => paginator.value.selectFirstPage(),
            },
        };

        return () => h('li', getDefaultSlot(slots, scope));
    },
});

export const PaginationButtonPreviousPage = defineComponent({
    name: 'PaginationButtonPreviousPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonPreviousPage');

        const scope = {
            disabled: paginator.value.activePage === 1,
            selectPreviousPageEvents: {
                click: () => paginator.value.selectPreviousPage(),
            },
        };

        return () => h('li', getDefaultSlot(slots, scope));
    },
});

export const PaginationButtonNextPage = defineComponent({
    name: 'PaginationButtonNextPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonNextPage');

        const scope = {
            disabled: paginator.value.activePage === paginator.value.totalPages,
            selectNextPageEvents: {
                click: () => paginator.value.selectNextPage(),
            },
        };

        return () => h('li', getDefaultSlot(slots, scope));
    },
});

export const PaginationButtonLastPage = defineComponent({
    name: 'PaginationButtonLastPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonLastPage');

        const scope = {
            disabled: paginator.value.activePage === paginator.value.totalPages,
            selectLastPageEvents: {
                click: () => paginator.value.selectLastPage(),
            },
        };

        return () => h('li', getDefaultSlot(slots, scope));
    },
});
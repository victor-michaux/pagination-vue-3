import {
    defineComponent, h, provide, inject, InjectionKey, Slot, toRefs, ref, Ref, watch,
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

        const defaultSlot = slots.default as Slot;

        provide(PaginationContext, paginator);

        return () => h('ul', defaultSlot());
    },
});

export const PaginationPagesList = defineComponent({
    name: 'PaginationPagesList',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationPagesList');

        const defaultSlot = slots.default as Slot;

        return () => h('ul', defaultSlot({
            pages: paginator.value.pages,
        }));
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

        const defaultSlot = slots.default as Slot;

        return () => h('li', defaultSlot({
            isActive: paginator.value.activePage === page.value,
            selectCurrentPageEvents: {
                click: () => paginator.value.selectPage(page.value),
            },
        }));
    },
});

export const PaginationButtonFirstPage = defineComponent({
    name: 'PaginationButtonFirstPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonFirstPage');

        const defaultSlot = slots.default as Slot;

        return () => h('li', defaultSlot({
            disabled: paginator.value.activePage === 1,
            selectFirstPageEvents: {
                click: () => paginator.value.selectFirstPage(),
            },
        }));
    },
});

export const PaginationButtonPreviousPage = defineComponent({
    name: 'PaginationButtonPreviousPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonPreviousPage');

        const defaultSlot = slots.default as Slot;

        return () => h('li', defaultSlot({
            disabled: paginator.value.activePage === 1,
            selectPreviousPageEvents: {
                click: () => paginator.value.selectPreviousPage(),
            },
        }));
    },
});

export const PaginationButtonNextPage = defineComponent({
    name: 'PaginationButtonNextPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonNextPage');

        const defaultSlot = slots.default as Slot;

        return () => h('li', defaultSlot({
            disabled: paginator.value.activePage === paginator.value.totalPages,
            selectNextPageEvents: {
                click: () => paginator.value.selectNextPage(),
            },
        }));
    },
});

export const PaginationButtonLastPage = defineComponent({
    name: 'PaginationButtonLastPage',

    setup(props, { slots }) {
        const paginator = usePaginationContext('PaginationButtonLastPage');

        const defaultSlot = slots.default as Slot;

        return () => h('li', defaultSlot({
            disabled: paginator.value.activePage === paginator.value.totalPages,
            selectLastPageEvents: {
                click: () => paginator.value.selectLastPage(),
            },
        }));
    },
});

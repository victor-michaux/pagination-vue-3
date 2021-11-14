import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'PaginationVue3',
            fileName: (format) => `pagination-vue-3.${format}.js`,
        },
    },
});

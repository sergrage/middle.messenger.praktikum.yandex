import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path';

export default defineConfig({
    // root: './src',
    publicDir: "./src/static",
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    })],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
            },
        },
    },
});

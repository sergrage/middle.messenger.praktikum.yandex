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
                chat: resolve(__dirname, 'src/pages/Chat/index.html'),
                profile: resolve(__dirname, 'src/pages/Profile/index.html'),
                editProfile: resolve(__dirname, 'src/pages/EditProfile/index.html'),
                editPassword: resolve(__dirname, 'src/pages/EditPassword/index.html'),
                register: resolve(__dirname, 'src/pages/Register/index.html'),
                login: resolve(__dirname, 'src/pages/Login/index.html'),
                noteFound: resolve(__dirname, 'src/pages/404/index.html'),
                serverError: resolve(__dirname, 'src/pages/500/index.html'),
            },
        },
    },
});

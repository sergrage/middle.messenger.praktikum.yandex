import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path';

export default defineConfig({
    // root: './src',
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    })],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                chat: resolve(__dirname, 'src/pages/Chat/chat.hbs'),
                profile: resolve(__dirname, 'src/pages/Profile/profile.hbs'),
                editProfile: resolve(__dirname, 'src/pages/EditProfile/editProfile.hbs'),
                editPassword: resolve(__dirname, 'src/pages/EditPassword/editPassword.hbs'),
                register: resolve(__dirname, 'src/pages/Register/register.hbs'),
                login: resolve(__dirname, 'src/pages/Login/login.hbs'),
                noteFound: resolve(__dirname, 'src/pages/404/404.hbs'),
                serverError: resolve(__dirname, 'src/pages/500/500.hbs'),
            },
        },
    },
});

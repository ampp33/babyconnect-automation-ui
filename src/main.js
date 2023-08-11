import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import ImageUpload from './components/ImageUpload'
import ReviewBeforeSubmit from './components/ReviewBeforeSubmit'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'ImageUpload',
            component: ImageUpload
        },
        {
            path: '/review',
            name: 'ReviewBeforeSubmit',
            component: ReviewBeforeSubmit
        }
    ]
});

createApp(App).use(router).mount('#app')
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/categories') {
        return navigateTo('/categories/Python'); // 리다이렉트 경로
    }
});

<template>
    <NuxtHeader/>
    <div id="error" v-if="error.statusCode === 404">
        <div>
            <span id="error_code">{{ error.statusCode }}</span>
            <span id="error_text">Page Not Found</span>
            <UButton id="home_btn" @click="handleError">go Home</UButton>
        </div>
    </div>
    <div id="error" v-if="error.statusCode === 403">
        <span id="error_code">{{ error.statusCode }}</span>
        <span id="error_text">Page Not Found</span>
        <UButton id="home_btn" @click="handleError">go Home</UButton>
    </div>
    <div id="error" v-if="error.statusCode === 500">
        <span id="error_code">{{ error.statusCode }}</span>
        <span id="error_text">Page Not Found</span>
        <UButton id="home_btn" @click="handleError">go Home</UButton>
    </div>
    <NuxtFooter/>
</template>
<script setup="setup" lang="ts">
    import type {NuxtError}
    from '#app'

    const props = defineProps({
        error: Object as() => NuxtError
    })

    const handleError = () => clearError({redirect: '/'})
</script>
<style scoped="scoped" lang="scss">
    #error {
        max-width: 1400px;
        margin: 0 auto;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 10px;
        min-height: calc(100vh - 50px);
        div{
            margin-top: 5%;
        }
        #error_code {
            font-family: 'NanumSquareNeo-heavybold';
            font-size: 7rem;
            display: block;
            text-align: center;
        }
        #error_text {
            font-family: 'NanumSquareNeo-heavybold';
            font-size: 2rem;
            display: block;
            text-align: center;
        }
        #home_btn {
            display: block;
            margin: 30px auto 0;
            font-family: 'NanumSquareNeo-extrabold';
            font-size: 1rem;
        }
    }
</style>
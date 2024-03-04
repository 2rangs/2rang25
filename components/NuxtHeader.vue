<template>
<header>
<div id="header_logo">
    <NuxtLink id="page_link" to="/">2Rang25</NuxtLink>
</div>
<nav>
    <NuxtLink id="page_link" to="/gallary">Gallary</NuxtLink>
    <NuxtLink id="page_link" to="/blog">Blog</NuxtLink>
    <NuxtLink id="page_link" to="/project">Project</NuxtLink>
    <NuxtLink id="page_link" to="/about">About</NuxtLink>
</nav>
</header>
</template>
<script setup="setup" lang="ts">


</script>
<style scoped lang="scss">
    header{
        font-family: 'NanumSquareNeo-extrabold';
        max-width: 1400px;
        width: 100%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        #header_logo{
            font-size: 1.5rem;
            line-height: 45px;
            text-align: center;
            width: 50%;
            max-width: 150px;
        }
        nav {
            width: 60%;
            max-width: 500px;
            display: flex;
            text-align: center;
            line-height: 45px;
            #page_link {
                font-size: 1rem;
                display: block;
                width: 25%;
                max-width: 200px;
            }
        }
    }
    
</style>
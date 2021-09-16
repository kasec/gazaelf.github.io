<template>
    <main>
        <post-container :categories="['blog', 'thoughts']"></post-container>
    </main>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import postContainer from '../components/post-container/index.vue'
    console.log('starting server');
    
    useHead({
        // Can be static or computed
        title: "Welcome to Azael Landing",
        meta: [
            {
                name: `description`,
                content: "Now you can see watch every thing that I post about tech/ web development",
            },
        ],
    })

</script>
<style lang="postcss" scoped>
main {
    @apply w-full h-5/6 overflow-auto;
}
</style>
<template>
    <v-btn
        flat
        :class="{
            'white--text': isHome && $store.getters.isOnTop,
            'red--text': !isHome || !$store.getters.isOnTop,
            'text--darken-3': !isHome || !$store.getters.isOnTop
        }"
        :to="{ path: '/register' }"
    >
        <b>Buat Akun</b>
    </v-btn>
</template>

<script>
export default {
    computed: {
        isHome() {
            return this.$route.name === 'Home';
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>

<template>
    <v-menu
        attach
        bottom
        left
        offset-y
        max-height="400"
    >
        <v-btn
            slot="activator"
            flat
            :class="{
                'white--text': isHome && $store.getters.isOnTop,
                'red--text': !isHome || !$store.getters.isOnTop,
                'text--darken-3': !isHome || !$store.getters.isOnTop
            }"
        >
            <b>Donasi</b>
            <v-icon 
                right
            >
                fa-angle-down
            </v-icon>
        </v-btn>

        <v-list
            dense
        >
            <item 
                v-for="(donate, i) in donates"
                :key="`donate-${i}`"
                v-bind="donate"
            >
            </item>
        </v-list>
    </v-menu>
</template>

<script>
import Item from '@/components/ListItem'

export default {
    components: {
        Item: Item
    },
    data: () => ({
        donates: [
            {
                to: '/',
                text: 'Item pertama'
            },
            {
                to: '/',
                text: 'Item kedua'
            },
            {
                to: '/',
                text: 'Item ketiga'
            },
            {
                to: '/',
                text: 'Item keempat'
            }
        ]
    }),
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

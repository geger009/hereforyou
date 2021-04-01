<template>
    <v-list-group
        append-icon="fa-angle-down"
    >
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-title
                    class="red--text text--darken-3 font-weight-bold"
                >
                    Donasi
                </v-list-tile-title>
            </v-list-tile>
        </template>

        <item 
            v-for="(donate, i) in donates"
            :key="`donate-${i}`"
            v-bind="donate"
        >
        </item>
    </v-list-group>
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
    })
}
</script>

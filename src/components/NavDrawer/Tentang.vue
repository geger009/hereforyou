<template>
    <v-list-group
        append-icon="fa-angle-down"
    >
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-title
                    class="red--text text--darken-3 font-weight-bold"
                >
                    Tentang
                </v-list-tile-title>
            </v-list-tile>
        </template>

        <item 
            v-for="(about, i) in abouts"
            :key="`about-${i}`"
            v-bind="about"
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
        abouts: [
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

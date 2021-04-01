<template>
    <v-list-group
        append-icon="fa-angle-down"
    >
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-title
                    class="red--text text--darken-3 font-weight-bold"
                >
                    Relawan
                </v-list-tile-title>
            </v-list-tile>
        </template>

        <item 
            v-for="(volunteer, i) in volunteers"
            :key="`volunteer-${i}`"
            v-bind="volunteer"
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
        volunteers: [
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

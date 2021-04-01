<template>
    <v-list-tile
        ripple
        :to="path"
        class="unset-link-decoration"
    >
        <v-list-tile-content>
            <v-list-tile-title>
                <span 
                    v-text="text"
                    class="red--text text--darken-3"
                />
            </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        to: {
            type: String,
            default: undefined
        }
    },
    computed: {
        path() {
            if (!this.to) return this.to

            return {
                path: `${this.to}`
            }
        }
    }
}
</script>

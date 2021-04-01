<template>
    <v-btn
        icon
        class="red--text text--darken-3"
        @click='OpenCloseNav'
    >
        <v-icon>fa-bars</v-icon>
    </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            OpenCloseNav: 'OpenAndCloseNav'
        })
    }
}
</script>

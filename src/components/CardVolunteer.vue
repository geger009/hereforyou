<template>
    <v-flex
        xs12
        sm6
        md3
        class="pa-2"
    >
        <v-card
            style="width: 100%; min-width: 150px; max-width: 300px; height: 100%;"
            class="mx-auto elevation-8"
        >
            <v-layout
                align-center
                justify-center
                class="py-2"
            >
                <v-avatar
                    size="150"
                    color="grey lighten-4"
                >
                    <img 
                        :src="profilePicture" 
                        alt="avatar"
                    >
                </v-avatar>
            </v-layout>

            <h2
                class="mt-2 text-xs-center red--text text--darken-3 font-weight-bold"
            >
                {{ name }}
            </h2>

            <v-card-text
                class="text-xs-center"
            >
                <v-icon left>fa-map-marked</v-icon>
                {{ province + " - " + city }}
            </v-card-text>

            <v-layout
                row
                align-center
                justify-center
                class="px-4 pb-4"
            >
                <v-flex
                    xs6 
                >
                    <v-layout
                        wrap
                        align-center
                        justify-center
                    >
                        <v-flex
                            xs12
                            class="text-xs-center"
                        >
                            <v-icon>fa-medal</v-icon>
                        </v-flex>
                        <v-flex
                            xs12
                            class="text-xs-center"
                        >
                            {{ appreciation }} Apresiasi
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex
                    xs6
                >
                    <v-layout
                        wrap
                        align-center
                        justify-center
                    >
                        <v-flex
                            xs12
                            class="text-xs-center"
                        >
                            <v-icon>fa-calendar-check</v-icon>
                        </v-flex>
                        <v-flex
                            xs12
                            class="text-xs-center"
                        >
                            {{ activities.length }} Aktivitas
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-card-actions>
                <v-btn
                    block
                    round
                    class="amber darken-3 white--text mb-3"
                    @click="$router.push({ path: `/profile/${id}`})"
                >
                    Detail
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
import IndoRegion from "@/utils/indonesia-region"

export default {
    props: {
        id: {
            type: String,
            default: ''
        },
        profilePicture: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        appreciation: {
            type: Number,
            default: 0
        },
        activities: {
            type: Array,
            default: [],
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px;
}
.v-btn {
    text-transform: unset !important;
}
</style>
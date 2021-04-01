<template>
    <v-flex
        xs6
        md3
        class="pa-2"
    >
        <v-card
            style="width: 100%; min-width: 150px; max-width: 300px; height: 100%;"
            class="mx-auto elevation-8"
        >
            <v-img
                :src="imgSrc"
                height="180px"
            >
            </v-img>

            <v-card-title
                class="red--text text--darken-3 font-weight-bold"
            >
                {{ name }}
            </v-card-title>

            <v-divider/>

            <v-card-text>
                <div>
                    Bersama

                    <span 
                        class="red--text text--darken-3"
                    >
                        {{ organization }}
                    </span>
                </div>
                <div>
                    Tanggal
                    <span 
                        class="red--text text--darken-3"
                    >
                        {{ startDate }}
                    </span>
                </div>
                <div>
                    Diikuti
                    <span 
                        class="red--text text--darken-3"
                    >
                        {{ countVolunteers }} Relawan
                    </span>
                </div>
            </v-card-text>

            <v-divider/>

            <v-card-actions>
                <v-btn
                    block
                    round
                    class="amber darken-3 white--text mb-3"
                    @click="$router.push({ path: `/activity/${id}`})"
                >
                    Detail
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        organization: {
            type: String,
            default: ''
        },
        startDate: {
            type: String,
            default: ''
        },
        countVolunteers: {
            type: Number,
            default: 0
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

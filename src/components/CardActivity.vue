<template>
    <v-flex
        xs12
        sm6
        md4
        class="pa-2"
    >
        <v-card
            hover
            style="width: 100%; min-width: 250px; max-width: 300px; height: 100%;"
            class="mx-auto"
        >
            <v-img
                :src="imgSrc"
                height="200px"
            >
                <v-container 
                    fill-height 
                    fluid
                    class="pa-2"
                >
                    <v-layout 
                        fill-height
                    >
                        <v-flex 
                            xs12 
                            align-end 
                            flexbox
                        >
                            <v-chip 
                                small 
                                text-color="white"
                                class="caption red darken-3"
                            >
                                {{ category }}
                            </v-chip>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>

            <v-toolbar
                dense
                flat
                class="transparent"
            >
                <v-toolbar-title>
                    <h3 
                        class="font-weight-bold subheading red--text text--darken-3"
                    >
                        {{ name }}
                    </h3>
                </v-toolbar-title>
            </v-toolbar>

            <div
                class="px-2"
            >
                <v-divider/>
            </div>

            <div
                class="pa-3"
            >
                Bersama 
                <span class="ml-3 font-weight-bold">{{ organization }}</span>
            </div>

            <v-flex
                xs12
                class="pa-3"
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div
                                    style="width: 50px;"
                                    class="text-xs-center"
                                >
                                    <p
                                        class="mb-0"
                                    >
                                        <v-icon large>far fa-calendar</v-icon>
                                    </p>
                                    <p 
                                        class="mb-0 body-2"
                                    >
                                        {{ duration }}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p class="ml-3 mb-0 font-weight-bold">Waktu</p>
                                    <p class="ml-3 mb-0">{{ startDate }}</p>
                                    <p class="ml-3 mb-0" v-if="endDate !== startDate">{{ endDate }}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </v-flex>

            <div
                class="px-2"
            >
                <v-divider/>
            </div>

            <div
                class="pa-3"
            >
                <v-icon left>fa-map-marked</v-icon>
                {{ province + " - " + city}}
            </div>

            <div
                class="px-2"
            >
                <v-divider/>
            </div>

            <div
                class="pa-3"
            >
                <span class="font-weight-bold">Batas Registrasi</span>
                <span class="ml-3">{{ finalRegistrationDate }}</span>
            </div>

            <v-card-actions>
                <v-btn
                    round
                    block
                    class="amber darken-3 white--text mb-3"
                    @click="$router.push({ path: `/activity/${id}`})"
                >
                    Jadi Relawan
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
        province: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            default: ''
        },
        duration: {
            type: String,
            default: ''
        },
        startDate: {
            type: String,
            default: ''
        },
        endDate: {
            type: String,
            default: ''
        },
        finalRegistrationDate: {
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
    border-radius: 10px !important;
}
.v-btn {
    text-transform: unset !important;
}
</style>

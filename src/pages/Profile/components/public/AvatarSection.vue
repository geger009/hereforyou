<template>
    <v-flex
        xs12
    >
        <v-layout
            wrap
            align-center
        >
            <v-flex
                xs12
                md4
            >
                <v-layout
                    align-center
                    justify-center
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
            </v-flex>
            <v-flex
                xs12
                md8
            >
                <v-layout
                    wrap
                >
                    <v-flex
                        xs12
                    >
                        <h1
                            class="font-weight-bold my-2"
                            :class="{
                                'headline': $vuetify.breakpoint.mdAndUp,
                                'subheading': $vuetify.breakpoint.smAndDown,
                                'text-xs-center': $vuetify.breakpoint.smAndDown,
                            }"
                        >
                            {{ name }}
                        </h1>
                    </v-flex>
                    <!--TODO: tanggal lahir dan Profesi untuk volunteer-->
                    <v-flex
                        xs12
                    >
                        <v-card
                            class="pa-2 elevation-8 mb-2"
                        >
                            <v-layout
                                row
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
                                            {{ activity }} Aktivitas
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-layout
                            row
                        >
                            <v-flex
                                :class="{
                                    'xs6': userRole === 'organization',
                                    'xs12': userRole === 'volunteer',
                                    'pr-2': userRole === 'organization'
                                }"
                            >
                                <v-btn
                                    round
                                    block
                                    class="amber darken-3 white--text mb-3"
                                >
                                    Beri Apresiasi
                                </v-btn>
                            </v-flex>
                            <v-flex
                                xs6
                                class="pl-2"
                                v-if="userRole === 'organization'"
                            >
                                <!-- TODO: Button invite -->
                                <v-btn
                                    round
                                    block
                                    class="amber darken-3 white--text mb-3"
                                >
                                    Undang Relawan
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        profilePicture: {
            type: String,
            default: ''
        },
        appreciation: {
            type: Number,
            default: 0
        },
        activity: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapGetters({
            userRole: 'userRole'
        })
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

<template>
    <v-layout>
        <v-flex
            xs3
            class="text-xs-center"
        >
            <v-layout
                wrap
                align-center
                justify-center
                style="height: 100px;"
            >
                <v-flex
                    xs12
                >
                    <div
                        style="cursor: pointer;"
                        @click="gotoProfilePage"
                    >
                        <v-icon
                            large
                            class="red--text text--darken-3"
                        >
                            fa-user
                        </v-icon>
                        <h3 class="subheading red--text text--darken-3">Ubah Profil</h3>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex
            xs3
            class="text-xs-center"
        >
            <v-layout
                wrap
                align-center
                justify-center
                style="height: 100px;"
            >
                <v-flex
                    xs12
                >
                    <div
                        style="cursor: pointer;"
                        @click="gotoActivitiesPage"
                    >
                        <v-icon
                            large
                            class="red--text text--darken-3"
                        >
                            fa-search
                        </v-icon>
                        <h3 class="subheading red--text text--darken-3">Cari Aktivitas</h3>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex
            xs3
            class="text-xs-center"
        >
            <v-layout
                wrap
                align-center
                justify-center
                style="height: 100px;"
            >
                <v-flex
                    xs12
                >
                    <div
                        style="cursor: pointer;"
                        @click="gotoDonationPage"
                    >
                        <v-icon
                            large
                            class="red--text text--darken-3"
                        >
                            fa-hand-holding-heart
                        </v-icon>
                        <h3 class="subheading red--text text--darken-3">Donasi</h3>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex
            xs3
            class="text-xs-center"
        >
            <v-layout
                wrap
                align-center
                justify-center
                style="height: 100px;"
            >
                <v-flex
                    xs12
                >
                    <div
                        style="cursor: pointer;"
                        @click="gotoNotifPage"
                    >
                        <v-badge color="amber darken-3">
                            <template v-slot:badge>
                                <span>5</span>
                            </template>
                            <v-icon
                                large
                                class="red--text text--darken-3"
                            >
                                fa-lightbulb
                            </v-icon>
                        </v-badge>
                        <h3 class="subheading red--text text--darken-3">Notifikasi</h3>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    methods: {
        gotoProfilePage() {
            this.$router.push('/myprofile');
        },
        gotoActivitiesPage() {
            this.$router.push('/activities');
        },
        gotoDonationPage() {
            this.$router.push('/donation');
        },
        gotoNotifPage() {
            this.$router.push('/notifications');
        }
    }
}
</script>


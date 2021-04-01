<template>
    <v-menu
        attach
        bottom
        left
        offset-y
        max-height="400"
    >
        <v-btn
            slot="activator"
            flat
            class='red--text text--darken-3'
        >
            <v-avatar size="32px">
                <img 
                    :src="profilePicture"
                    alt="avatar"
                >
            </v-avatar>

            <span class="ml-2"><b>{{ userName }}</b></span>
        </v-btn>

        <v-list
            dense
        >
            <v-list-tile
                ripple
                class="unset-link-decoration"
                @click="gotoDashboardPage"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            Dashboard
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider 
                v-if="userRole !== 'admin'"
            />

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="userRole !== 'admin'"
                @click="gotoProfilePage"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            Profile
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="userRole !== 'admin'"
                @click="userRole === 'volunteer' ? gotoActivitiesPage() : gotoCreateNewPage()"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            {{ userRole === 'volunteer' ? 'Cari Aktivitas' : 'Buat Aktivitas' }}
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="userRole !== 'admin'"
                @click="userRole === 'volunteer' ? gotoDonationPage() : gotoVolunteersPage()"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            {{ userRole === 'volunteer' ? 'Donasi' : 'Cari Relawan' }}
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="userRole !== 'admin'"
                @click="gotoProfilePage"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            Notifikasi
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider/>

            <v-list-tile
                ripple
                @click="logoutUser"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            Keluar
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider
                v-if="userRole !== 'admin'"
            />

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="userRole !== 'admin'"
                @click="gotoOurTeamPage"
            >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span 
                            class="red--text text--darken-3"
                        >
                            Team HereForYou
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({
            userName: 'userName',
            userRole: 'userRole',
            profilePicture: 'profilePicture'
        })
    },
    methods: {
        gotoDashboardPage() {
            if (this.userRole === 'admin') {
                this.$router.push('/admin/dashboard');
            } else {
                this.$router.push('/dashboard');
            }
        },
        gotoProfilePage() {
            this.$router.push('/myprofile');
        },
        gotoActivitiesPage() {
            this.$router.push('/activities');
        },
        gotoDonationPage() {
            this.$router.push('/donation');
        },
        gotoCreateNewPage() {
            this.$router.push('/create_activity');
        },
        gotoVolunteersPage() {
            this.$router.push('/volunteers');
        },
        gotoNotifPage() {
            this.$router.push('/notifications');
        },
        gotoOurTeamPage() {
            this.$router.push('/ourteam');
        },
        logoutUser() {
            if (this.userRole === 'admin') {
                this.$store.dispatch('SignOutAdmin');
            } else {
                this.$store.dispatch('SignOutUser');
            }
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>

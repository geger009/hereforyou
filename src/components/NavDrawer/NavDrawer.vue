<template>
    <v-navigation-drawer
        app
        right
        temporary
        v-model="isOpen"
    >
        <v-toolbar 
            flat 
            class="transparent"
            v-if="isLogin"
        >
            <v-list
                class="pa-0"
            >
                <v-list-tile 
                    avatar
                >
                    <v-list-tile-avatar>
                        <img 
                            :src="profilePicture"
                            alt="avatar"
                        >
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title
                            class="red--text text--darken-3 font-weight-bold"
                        >
                            {{ userName }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list>
            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin"
                @click="gotoDashboardPage"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Dashboard
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider 
                v-if="isLogin && userRole !== 'admin'"
            />

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin && userRole !== 'admin'"
                @click="gotoProfilePage"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Profil
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin && userRole !== 'admin'"
                @click="userRole === 'volunteer' ? gotoActivitiesPage() : gotoCreateNewPage()"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        {{ userRole === 'volunteer' ? 'Cari Aktivitas' : 'Buat Aktivitas' }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin && userRole !== 'admin'"
                @click="userRole === 'volunteer' ? gotoDonationPage() : gotoVolunteersPage()"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        {{ userRole === 'volunteer' ? 'Donasi' : 'Cari Relawan' }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin && userRole !== 'admin'"
                @click="gotoNotifPage"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Notifikasi
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <!-- <v-divider/>
            
            <relawan/>

            <organisasi/>

            <donasi/>

            <tentang/> -->

            <v-divider/>

            <v-list-tile
                ripple
                :to="{ path: '/login' }"
                class="unset-link-decoration"
                v-if="!isLogin"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Masuk
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                :to="{ path: '/register' }"
                class="unset-link-decoration"
                v-if="!isLogin"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Buat Akun
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                ripple
                class="unset-link-decoration"
                v-if="isLogin"
                @click="logoutUser"
            >
                <v-list-tile-content>
                    <v-list-tile-title
                        class="red--text text--darken-3 font-weight-bold"
                    >
                        Keluar
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
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        isOpen: {
            get() {
                return this.$store.state.navState
            },
            set(state) {
                if (state != this.$store.state.navState) {
                    this.$store.dispatch('OpenAndCloseNav');
                }
            }
        },
        ...mapGetters({
            isLogin: 'isLogin',
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

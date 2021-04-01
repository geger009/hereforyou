<template>
    <v-toolbar
        app
        :class="{
            'px-5': $vuetify.breakpoint.mdAndUp,
            'transparent': isHome && isTopAndDesktop,
            'elevation-0': isHome && isTopAndDesktop,
            'white': !isHome || isNotTopOrMobile, 
            'elevation-4': !isHome || isNotTopOrMobile
        }"
        clipped-right
    >
        <div
            style="cursor: pointer;"
            @click="backToHome"
            class="px-2 elevation-6 title-box red darken-3"
            v-if="isHome && isTopAndDesktop"
        >
            <span
                class="display-1 white--text"
            >
                <b><i>HereForYou</i></b>
            </span>
        </div>

        <span
            style="cursor: pointer;"
            class="headline red--text text--darken-3 mr-4"
            v-if="!isHome || isNotTopOrMobile"
            @click="backToHome"
        >
            <b><i>HereForYou</i></b>
        </span>

        <!-- Relawan -->
        <!-- <relawan v-if="$vuetify.breakpoint.mdAndUp"/> -->

        <!-- Organisasi -->
        <!-- <organisasi v-if="$vuetify.breakpoint.mdAndUp"/> -->

        <!-- Donasi -->
        <!-- <donasi v-if="$vuetify.breakpoint.mdAndUp"/> -->

        <!-- Tentang -->
        <!-- <tentang v-if="$vuetify.breakpoint.mdAndUp"/> -->

        <v-spacer/>

        <!-- Login -->
        <masuk v-if="$vuetify.breakpoint.mdAndUp && !isLogin"/>

        <!-- Sign up -->
        <buat-akun v-if="$vuetify.breakpoint.mdAndUp && !isLogin"/>

        <!-- User Menu Button -->
        <user-menu v-if="$vuetify.breakpoint.mdAndUp && isLogin"/>

        <!-- Menu Button -->
        <menu-button v-if="$vuetify.breakpoint.smAndDown"/>
    </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

import Masuk from '@/components/ToolBar/Masuk';
import BuatAkun from '@/components/ToolBar/BuatAkun';
import UserMenu from '@/components/ToolBar/UserMenu';
import MenuButton from '@/components/ToolBar/Menu';

export default {
    components: {
        Masuk: Masuk,
        BuatAkun: BuatAkun,
        UserMenu: UserMenu,
        MenuButton: MenuButton
    },
    computed: {
        isTopAndDesktop() {
            return this.$store.getters.isOnTop && this.$vuetify.breakpoint.mdAndUp;
        },
        isNotTopOrMobile() {
            return !this.$store.getters.isOnTop || this.$vuetify.breakpoint.smAndDown
        },
        isHome() {
            return this.$route.name === 'Home';
        },
        ...mapGetters({
            isLogin: 'isLogin',
            userRole: 'userRole'
        })
    },
    methods: {
        backToHome() {
            if (this.isLogin) {
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
.title-box {
    width: 220px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
</style>

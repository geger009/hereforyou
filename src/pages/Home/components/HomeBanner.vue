<template>
    <v-flex 
        xs12
    >
        <div
            style="width: 100vw; height: 100vh; position: relative; overflow: hidden;"
        >
            <div
                id="home-banner"
                style="width: 100vw; height: 100vh; position: absolute; background-image: url('https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_banner.jpg?alt=media&token=c5f1c94d-6d18-432c-bb81-2df97f723f81'); background-size: cover; background-repeat: no-repeat; background-position: center; transition: all .2s;"
            ></div>
        </div>
        <v-layout
            align-center
            column
            justify-center
            style="top: 0; left: 0; width: 100vw; height: 100vh; position: absolute;"
        >
            <!-- <h1 
                class="display-3 font-weight-thin mb-3 white--text"
                :class="{
                    'display-2': $vuetify.breakpoint.smAndDown
                }"
            >
                HereForYou
            </h1>
            <h4 
                class="headline mb-3 white--text"
                :class="{
                    'title': $vuetify.breakpoint.smAndDown
                }"
            >
                Memudahkan dalam aksi baikmu
            </h4> -->
            <img
                class="ma-2"
                v-if="$vuetify.breakpoint.mdAndUp"
                src="https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_logo_landscape.png?alt=media&token=69849b5b-01d7-4bf8-848f-0c97130cbbac"
                height="200px"
            />
            <img
                class="ma-2"
                v-if="$vuetify.breakpoint.smAndDown"
                src="https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_logo_potrait.png?alt=media&token=a4f0e6f8-3a1a-408e-88b3-2933de246aa8"
                height="280px"
            />
            <v-btn 
                large 
                round
                color="warning"
                class="white--text elevation-6 mt-3"
                :to="{ path: '/register' }"
            >
                Gabung Sekarang
            </v-btn>
            <!-- <v-btn 
                large 
                round
                color="warning"
                class="white--text elevation-6"
                @click="sendEmail"
            >
                Gabung Sekarang
            </v-btn> -->
        </v-layout>
    </v-flex>
</template>

<script>
import Helper from '@/utils/helper';

export default {
    methods: {
        sendEmail() {
            Helper.sendEmail({
                type: 0,
                name: 'Test User'
            })
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>

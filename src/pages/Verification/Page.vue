<template>
    <v-container
        fluid
        class="px-0 py-5 mx-0"
        style="min-height: 100vh;"
    >
        <v-layout
            align-center
            column
            justify-center
            class="py-5"
        >
            <v-card
                flat
                class="mx-auto pa-4 transparent"
                style="width: 100%; min-width: 300px; max-width: 450px;"
            >
                <div
                    v-if="userRole === 'volunteer'"
                >
                    <h2
                        class="display-2 text-xs-center red--text text--darken-3"
                    >
                        Verifikasi Akun Anda
                    </h2>

                    <div
                        class="pa-2"
                    >
                        <v-divider/>
                    </div>

                    <p
                        class="red--text text--darken-3"
                    >
                        Silakan cek email Anda. Kami telah mengirimkan email verifikasi ke {{ email }}. Klik tombol 'Kirim Ulang' di bawah jika Anda belum menerima email verifikasi.
                    </p>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            color="red darken-3"
                            class="white--text font-weight-bold"
                            @click="resendEmailVerification"
                        >
                            Kirim Ulang
                        </v-btn>
                    </v-card-actions>
                </div>

                <div
                    v-if="userRole === 'organization'"
                >
                    <h2
                        class="display-2 text-xs-center red--text text--darken-3"
                    >
                        Akun Anda Sedang Diverifikasi
                    </h2>

                    <div
                        class="pa-2"
                    >
                        <v-divider/>
                    </div>

                    <p
                        class="red--text text--darken-3"
                    >
                        Akun Anda sedang dalam proses verifikasi oleh admin. Mohon tunggu akun Anda terverifikasi paling lambat 3 hari dan silakan coba login.
                    </p>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            round
                            color="red darken-3"
                            class="white--text font-weight-bold"
                            @click="$router.go(-1)"
                        >
                            Kembali
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            email: 'userEmail',
            loading: 'isLoading',
            userRole: 'userTmpRole',
        })
    },
    methods: {
        resendEmailVerification() {
            this.$store.dispatch('SendVerification');
        }
    }
}
</script>


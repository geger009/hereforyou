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
                <h2
                    class="display-2 text-xs-center red--text text--darken-3"
                >
                    Lupa Password
                </h2>

                <div
                    class="pa-2"
                >
                    <v-divider/>
                </div>

                <v-layout 
                    row
                    class="mx-auto"
                    style="width: 100%; min-width: 300px; max-width: 450px;"
                    v-if="feedbackText"
                >
                    <v-flex xs12>
                        <alert-box 
                            @dismissed="onDismissed" 
                            :text="feedbackText"
                            :color="feedbackColor"
                        />
                    </v-flex>
                </v-layout>

                <v-form 
                    class="pt-5 pb-3 px-3"
                    ref="recoveryForm" 
                    v-model="valid"
                >
                    <p
                        class="red--text text--darken-3"
                    >
                        Silakan masukan alamat email Anda yang terdaftar untuk mereset password.
                    </p>
                    
                    <v-text-field 
                        :disabled="loading"
                        prepend-icon="fa-at" 
                        label="Email" 
                        type="text"
                        color="red darken-3" 
                        v-model="email"
                        :rules="rules.emailRequired"
                    >
                    </v-text-field>
                </v-form>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        round
                        :disabled="loading"
                        :loading="loading"
                        color="red darken-3"
                        class="white--text font-weight-bold"
                        @click="$router.go(-1)"
                    >
                        Batal
                    </v-btn>

                    <v-btn
                        round
                        :disabled="!valid || loading"
                        :loading="loading"
                        color="red darken-3"
                        class="white--text font-weight-bold"
                        @click="sendResetPassword"
                    >
                        Reset
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            valid: 'false',
            email: '',
            loading: false,
            feedbackText: null,
            feedbackColor: 'error',
            rules: {
				emailRequired: [
					v => !!v || 'Email harus diisi!',
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus valid!'
				]
			}
        }
    },
    methods: {
        sendResetPassword() {
            this.loading = true;
            const auth = firebase.auth();
            auth.sendPasswordResetEmail(this.email)
            .then(
                () => {
                    // Email sent.
                    this.loading = false;
                    this.$ref.recoveryForm.reset();
                    this.feedbackText = 'Link reset password telah dikirim ke email Anda.';
                    this.feedbackColor = 'success';
                }
            )
            .catch(
                error => {
                    // An error happened.
                    this.loading = false;
                    this.$ref.recoveryForm.reset();
                    this.feedbackText = 'Terjadi kesalahan pada proses, silakan coba kembali nanti.';
                    this.feedbackColor = 'error';
                }
            );
        },
        onDismissed() {
            this.feedbackText = null;
            this.feedbackColor = 'error';
        }
    }
}
</script>

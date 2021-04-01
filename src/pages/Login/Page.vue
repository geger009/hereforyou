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
                    Masuk
                </h2>

                <div
                    class="pa-2"
                >
                    <v-divider/>
                </div>

                <v-layout 
                    row
                    v-if="authError"
                >
                    <v-flex xs12>
                        <alert-box 
                            @dismissed="onDismissed" 
                            :text="authError.message"
                        />
                    </v-flex>
                </v-layout>

                <v-form 
                    class="pt-5 pb-3 px-3"
                    ref="loginForm" 
                    v-model="valid"
                    @submit="checkEnter($event)"
                >
                    <v-text-field 
                        prepend-icon="fa-at" 
                        label="Email" 
                        type="text"
                        color="red darken-3" 
                        v-model="email"
                        :rules="rules.emailRequired"
                    >
                    </v-text-field>

                    <v-text-field 
                        prepend-icon="fa-lock" 
                        :append-icon="showPass ? 'fa-eye' : 'fa-eye-slash'"
                        label="Password" 
                        :type="showPass ? 'text' : 'password'"
                        color="red darken-3" 
                        v-model="password"
                        :rules="[rules.required]"
                        @click:append="showPass = !showPass"
                    >
                    </v-text-field>
                    
                    <v-layout
                        row
                        align-center
                    >
                        <!-- <v-flex
                            xs6
                        >
                            <v-checkbox
                                color="red darken-3"
                                v-model="rememberUser"
                                label="Ingat Saya"
                            ></v-checkbox>
                        </v-flex> -->
                        <v-flex
                            xs6
                            offset-xs6
                        >
                            <p
                                style="cursor: pointer;"
                                class="ma-0 subheading text-xs-right red--text text--darken-3"
                                @click="gotoRecoveryPage"
                            >
                                Lupa Password?
                            </p>
                        </v-flex>
                    </v-layout>

                    <v-card
                        flat
                        class="transparent"
                    >
                        <v-card-actions>
                            <v-spacer/>
                            <!-- <v-btn
                                ref="btnSubmit"
                                round
                                :disabled="!valid || loading"
                                :loading="loading"
                                color="red darken-3"
                                class="white--text font-weight-bold"
                                @click="loginUser"
                            >
                                Masuk
                            </v-btn> -->
                            <v-btn
                                round
                                :disabled="!valid || loading"
                                :loading="loading"
                                color="red darken-3"
                                class="white--text font-weight-bold"
                                type="submit"
                            >
                                Masuk
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-card>
            <v-card
                flat
                class="mx-auto px-4 transparent"
                style="width: 100%; min-width: 300px; max-width: 450px;"
            >
                <div
                    class="px-3"
                >
                    Belum punya akun?
                    <span
                        class="red--text text--darken-3 font-weight-bold"
                        style="cursor: pointer;"
                        @click="gotoRegistPage"
                    >
                        Daftar Sekarang!
                    </span>
                </div>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    mounted() {
        /* document.addEventListener('keyup', (event) => {
            if (event.keyCode == 13) {
                if (this.valid)
                    this.$refs.btnSubmit.click();
            }
        }); */
    },
    data() {
        return {
            valid: false,
            rememberUser: false,
            showPass: false,
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Password harus diisi!',
				emailRequired: [
					v => !!v || 'Email harus diisi!',
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus valid!'
				]
			}
        }
    },
    computed: {
        ...mapGetters({
            user: 'user',
            loading: 'isLoading',
            authError: 'authError'
        })
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                let isEmpty = false;
                for (let key in value) {
                    if (value[key] === 'empty') {
                        isEmpty = true;
                        break;
                    }
                }
                if (isEmpty) {
                    this.$router.push('/myprofile');
                } else {
                    this.$router.push('/dashboard');
                }
            }
        }
    },
    methods: {
        gotoRegistPage() {
            this.$router.push('/register');
        },
        gotoRecoveryPage() {
            this.$router.push('/recovery');
        },
        loginUser() {
            const payload = {
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('SignInUser', payload);
        },
        onDismissed() {
            this.$store.dispatch('ClearAuthError');
        },
        checkEnter(event) {
            event.preventDefault();
            this.loginUser();
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>

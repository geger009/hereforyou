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
                    Masuk sebagai Admin
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

                    <v-card
                        flat
                        class="transparent"
                    >
                        <!-- <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                round
                                :disabled="!valid || loading"
                                :loading="loading"
                                color="red darken-3"
                                class="white--text font-weight-bold"
                                @click="loginAdmin"
                            >
                                Masuk
                            </v-btn>
                        </v-card-actions> -->
                        <v-card-actions>
                            <v-spacer/>
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
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            showPass: false,
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
            loading: 'isLoading',
            user: 'user',
            authError: 'authError'
        })
    },
    watch: {
        user (value) {
            if (value !== null && value.role === 'admin') {
                this.$router.push('/admin/dashboard');
            }
        }
    },
    methods: {
        loginAdmin() {
            const payload = {
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('SignInAdmin', payload);
        },
        onDismissed() {
            this.$store.dispatch('ClearAuthError');
        },
        checkEnter(event) {
            event.preventDefault();
            this.loginAdmin();
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
.form-container {
    width: 100%;
    min-width: 300px;
    max-width: 450px;
    height: 800px;
    position: relative;
    overflow: hidden;
}
.form-box {
    position: absolute;
}
.email {
    left: 0px;
    width: 100%;
    transition: all .4s;
}
.password {
    left: 450px;
    width: 100%;
    transition: all .4s;
}
</style>
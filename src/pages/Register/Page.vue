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
                    Daftar
                </h2>

                <div
                    class="pa-2"
                >
                    <v-divider/>
                </div>
                
                <h3
                    class="text-xs-center red--text text--darken-3 pt-2"
                >
                    Sebagai
                </h3>
            </v-card>

            <v-btn-toggle 
                v-model="registerAs" 
                mandatory
                class="elevation-0 transparent"
            >
                <v-btn 
                    flat
                    color="red darken-3"
                    class="white--text font-weight-bold"
                >
                    <v-icon left>fa-user</v-icon>
                    Relawan
                </v-btn>
                <v-btn 
                    flat
                    color="red darken-3"
                    class="white--text font-weight-bold"
                >
                    <v-icon left>fa-users</v-icon>
                    Organisasi
                </v-btn>
            </v-btn-toggle>

            <v-layout 
                row
                class="mx-auto"
                style="width: 100%; min-width: 300px; max-width: 450px;"
                v-if="authError"
            >
                <v-flex xs12>
                    <alert-box 
                        @dismissed="onDismissed" 
                        :text="authError.message"
                    />
                </v-flex>
            </v-layout>

            <div
                id="form-boxs"
                class="form-container"
            >
                <div 
                    id="relawan-box"
                    class="pa-4 relawan form-box"
                >
                    <v-form 
                        class="px-3"
                        ref="userForm" 
                        v-model="validUser"
                        @submit="onRegisterUser($event)"
                    >
                        <v-subheader>Data Akun</v-subheader>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            prepend-icon="fa-at" 
                            label="Email*" 
                            type="text"
                            color="red darken-3" 
                            v-model="emailUser"
                            :rules="rules.emailRequired"
                        >
                        </v-text-field>

                        <v-text-field 
                            prepend-icon="fa-lock" 
                            label="Password*" 
                            type="password"
                            color="red darken-3" 
                            v-model="passwordUser"
                            :rules="[rules.required, rules.minPassCount]"
                        >
                        </v-text-field>

                        <v-text-field 
                            prepend-icon="fa-lock" 
                            label="Konfirmasi Password*" 
                            type="password"
                            color="red darken-3" 
                            v-model="confPasswordUser"
                            :rules="[confUserPass]"
                        >
                        </v-text-field>

                        <v-subheader>Data Pribadi</v-subheader>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            prepend-icon="fa-user" 
                            label="Nama Lengkap*" 
                            type="text"
                            color="red darken-3" 
                            v-model="nameUser"
                            :rules="[rules.required]"
                        >
                        </v-text-field>

                        <v-card
                            flat
                            class="transparent"
                            style="width: 100%;"
                        >
                            <p class="mt-2 mx-4 pl-4">
                                Dengan mendaftar, Anda telah menyetujui syarat dan ketentuan.
                            </p>
                            <v-card-actions>
                                <v-spacer/>
                                <!-- <v-btn
                                    round
                                    :disabled="!validUser || loading"
                                    :loading="loading"
                                    color="red darken-3"
                                    class="white--text font-weight-bold"
                                    @click="onRegisterUser"
                                >
                                    Daftar
                                </v-btn> -->
                                <v-btn
                                    round
                                    :disabled="!validUser || loading"
                                    :loading="loading"
                                    color="red darken-3"
                                    class="white--text font-weight-bold"
                                    type="submit"
                                >
                                    Daftar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>

                    <!-- <v-card
                        flat
                        class="transparent"
                        style="width: 100%;"
                    >
                        <p class="mt-2 mx-4 pl-4">
                            Dengan mendaftar, Anda telah menyetujui syarat dan ketentuan.
                        </p>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                round
                                :disabled="!validUser || loading"
                                :loading="loading"
                                color="red darken-3"
                                class="white--text font-weight-bold"
                                @click="onRegisterUser"
                            >
                                Daftar
                            </v-btn>
                        </v-card-actions>
                    </v-card> -->

                    <v-card
                        flat
                        class="pt-3 px-4 transparent"
                        style="width: 100%;"
                    >
                        <div
                            class="px-4"
                        >
                            Sudah punya akun?
                            <span
                                class="red--text text--darken-3 font-weight-bold"
                                style="cursor: pointer;"
                                @click="gotoLoginPage"
                            >
                                Silakan Login!
                            </span>
                        </div>
                    </v-card>
                </div>
                <div 
                    id="organisasi-box"
                    class="pa-4 organisasi form-box"
                >
                    <v-form 
                        class="px-3"
                        ref="orgForm" 
                        v-model="validOrg"
                        @submit="onRegisterUser($event)"
                    >
                        <v-subheader>Data Akun</v-subheader>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            prepend-icon="fa-at" 
                            label="Email*" 
                            type="text"
                            color="red darken-3" 
                            v-model="emailOrg"
                            :rules="rules.emailRequired"
                        >
                        </v-text-field>

                        <v-text-field 
                            prepend-icon="fa-lock" 
                            label="Password*" 
                            type="password"
                            color="red darken-3" 
                            v-model="passwordOrg"
                            :rules="[rules.required, rules.minPassCount]"
                        >
                        </v-text-field>

                        <v-text-field 
                            prepend-icon="fa-lock" 
                            label="Konfirmasi Password*" 
                            type="password"
                            color="red darken-3" 
                            v-model="confPasswordOrg"
                            :rules="[confOrgPass]"
                        >
                        </v-text-field>

                        <v-subheader>Data Organisasi</v-subheader>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            prepend-icon="fa-user" 
                            label="Nama Organisasi*" 
                            type="text"
                            color="red darken-3" 
                            v-model="nameOrg"
                            :rules="[rules.required]"
                        >
                        </v-text-field>

                        <v-autocomplete
                            label="Provinsi*"
                            :items="provinces"
                            item-text="name"
                            item-value="id"
                            v-model="province"
                            color="red darken-3"
                            :rules="[rules.required]"
                        >
                        </v-autocomplete>

                        <v-autocomplete
                            label="Kabupaten/Kota*"
                            :items="regencies"
                            item-text="name"
                            item-value="id"
                            v-model="regency"
                            color="red darken-3"
                            :rules="[rules.required]"
                        >
                        </v-autocomplete>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            prepend-icon="fa-map-marker-alt"
                            label="Alamat*" 
                            type="text"
                            color="red darken-3" 
                            v-model="address"
                            :rules="[rules.required]"
                        >
                        </v-text-field>

                        <v-text-field 
                            clearable
                            clear-icon="fa-backspace"
                            :prepend-icon="phoneType === 0 ? 'fa-phone' : 'fa-mobile-alt'"
                            :label="phoneType === 0 ? 'Telepon*' : 'Mobile*'"
                            :mask="phoneType === 0 ? '###-#####' : '####-####-#####'"
                            :placeholder="phoneType === 0 ? 'XXX-XXXXX' : 'XXXX-XXXX-XXXXX'"
                            type="text"
                            color="red darken-3" 
                            v-model="phoneNumber"
                            @click:prepend="changeNumberType"
                            :rules="[rules.required]"
                        >
                        </v-text-field>

                        <v-textarea
                            label="Deskripsi*"
                            placeholder="Deskripsikan organisasi Anda..."
                            v-model="description"
                            color="red darken-3" 
                            :no-resize="true"
                            :rules="[rules.required]"
                        ></v-textarea>

                        <v-card
                            flat
                            class="transparent"
                            style="width: 100%;"
                        >
                            <p class="mt-2 mx-4 pl-4">
                                Dengan mendaftar, Anda telah menyetujui syarat dan ketentuan.
                            </p>
                            <v-card-actions>
                                <v-spacer/>
                                <!-- <v-btn
                                    round
                                    :disabled="!validOrg || loading"
                                    :loading="loading"
                                    color="red darken-3"
                                    class="white--text font-weight-bold"
                                    @click="onRegisterUser"
                                >
                                    Daftar
                                </v-btn> -->
                                <v-btn
                                    round
                                    :disabled="!validOrg || loading"
                                    :loading="loading"
                                    color="red darken-3"
                                    class="white--text font-weight-bold"
                                    type="submit"
                                >
                                    Daftar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                    
                    <!-- <v-card
                        flat
                        class="transparent"
                        style="width: 100%;"
                    >
                        <p class="mt-2 mx-4 pl-4">
                            Dengan mendaftar, Anda telah menyetujui syarat dan ketentuan.
                        </p>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                round
                                :disabled="!validOrg || loading"
                                :loading="loading"
                                color="red darken-3"
                                class="white--text font-weight-bold"
                                @click="onRegisterUser"
                            >
                                Daftar
                            </v-btn>
                        </v-card-actions>
                    </v-card> -->
                    
                    <v-card
                        flat
                        class="pt-3 px-4 transparent"
                        style="width: 100%;"
                    >
                        <div
                            class="px-4"
                        >
                            Sudah punya akun?
                            <span
                                class="red--text text--darken-3 font-weight-bold"
                                style="cursor: pointer;"
                                @click="gotoLoginPage"
                            >
                                Silakan Login!
                            </span>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import IndoRegion from '@/utils/indonesia-region'

export default {
    data() {
        return {
            registerAs: 0,
            validUser: false,
            nameUser: '',
            emailUser: '',
            passwordUser: '',
            confPasswordUser: '',
            validOrg: false,
            nameOrg: '',
            emailOrg: '',
            passwordOrg: '',
            confPasswordOrg: '',
            provinces: IndoRegion.provinces,
            province: 0,
            regencies: [],
            regency: 0,
            address: '',
            phoneType: 0,
            phoneNumber: '',
            description: '',
            rules: {
                required: value => !!value || 'Kolom harus diisi!',
                minPassCount: value => (!!value && value.length > 8) || 'Password harus lebih dari 8 karakter.',
				emailRequired: [
					v => !!v || 'Email harus diisi!',
					v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus valid!'
				]
			}
        }
    },
    computed: {
        confUserPass() {
            return this.passwordUser !== this.confPasswordUser ? 'Password tidak cocok!' : true;
        },
        confOrgPass() {
            return this.passwordOrg !== this.confPasswordOrg ? 'Password tidak cocok!' : true;
        },
        ...mapGetters({
            user: 'user',
            loading: 'isLoading',
            authError: 'authError'
        })
    },
    watch: {
        registerAs(val) {
            if (val === 0) {
                //sebagai relawan
                let relawanBox = document.getElementById('relawan-box');
                relawanBox.style.left = '0px';
                let organisasiBox = document.getElementById('organisasi-box');
                organisasiBox.style.left = '450px';

                document.getElementById('form-boxs').style.height = (relawanBox.offsetHeight + 20) + 'px';

                this.$refs.userForm.reset();
                this.$refs.orgForm.reset();
            } else if (val === 1) {
                //sebagai organisasi
                let relawanBox = document.getElementById('relawan-box');
                relawanBox.style.left = '-450px';
                let organisasiBox = document.getElementById('organisasi-box');
                organisasiBox.style.left = '0px';

                document.getElementById('form-boxs').style.height = (organisasiBox.offsetHeight + 20) + 'px';

                this.$refs.orgForm.reset();
                this.$refs.userForm.reset();
            }
        },
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/dashboard');
            }
        },
        province (value) {
            if (value !== 0) {
                this.regencies = IndoRegion.regencies.filter(item => item.province_id === value);
            }
        }
    },
    methods: {
        gotoLoginPage() {
            this.$router.push('/login');
        },
        changeNumberType() {
            switch (this.phoneType) {
                case 0:
                    this.phoneType = 1;
                    this.phoneNumber = '';
                break;
                case 1:
                    this.phoneType = 0;
                    this.phoneNumber = '';
                break;
            }
        },
        onRegisterUser(e) {
            e.preventDefault();
            
            if (this.registerAs === 0) {
                const payload = {
                    email: this.emailUser,
                    password: this.passwordUser,
                    role: 'volunteer',
                    name: this.nameUser,
                }

                this.$store.dispatch('SignUpUser', payload);
            } else if (this.registerAs === 1) {
                const payload = {
                    email: this.emailOrg,
                    password: this.passwordOrg,
                    role: 'organization',
                    name: this.nameOrg,
                    province: this.province,
                    city: this.regency,
                    address: this.address,
                    phones: [
                        { type: this.phoneType, number:this.phoneNumber }
                    ],
                    description: this.description
                }

                this.$store.dispatch('SignUpOrganization', payload);
            }
        },
        onDismissed() {
            this.$store.dispatch('ClearAuthError');
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
.relawan {
    left: 0px;
    width: 100%;
    transition: all .4s;
}
.organisasi {
    left: 450px;
    width: 100%;
    transition: all .4s;
}
</style>

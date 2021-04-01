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
                style="width: 100%; min-width: 300px; max-width: 960px;"
                class="mx-auto transparent"
            >
                <v-alert
                    :value="isEmpty"
                    type="info"
                >
                    Segera lengkapi profil Anda, agar kesempatan menjadi relawan lebih besar.
                </v-alert>

                <v-form
                    ref="profileForm"
                    v-model="valid"
                >
                    <v-layout
                        wrap
                        class="pa-3"
                    >
                        <v-flex
                            xs12
                        >
                            <v-subheader>
                                Data diri
                            </v-subheader>
                        </v-flex>
                        
                        <v-flex
                            xs12
                        >
                            <v-divider/>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <v-flex
                            xs12
                            sm4
                        >
                            <v-layout
                                wrap
                                fill-height
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-layout
                                        align-center
                                        justify-center
                                    >
                                        <v-avatar
                                            size="150"
                                            color="grey lighten-4"
                                        >
                                            <img 
                                                :src="profilePicture" 
                                                alt="avatar"
                                            >
                                        </v-avatar>
                                    </v-layout>
                                </v-flex>
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-layout
                                        align-center
                                        justify-center
                                    >
                                        <input 
                                            type="file"
                                            style="display: none"
                                            accept="image/png, image/jpeg"
                                            ref="fileInput"
                                            @change="onFilePicked"
                                        >

                                        <v-btn
                                            round
                                            class="white--text"
                                            color="red darken-3"
                                            @click="onPickFile"
                                        >
                                            Unggah foto
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        
                        <v-flex
                            xs12
                            sm8
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                                v-if="userRole === 'volunteer'"
                            >
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Nama" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.name"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-autocomplete
                                        label="Jenis Kelamin"
                                        :items="genders"
                                        v-model="editUser.gender"
                                        color="red darken-3"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Profesi" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.profesi"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-menu
                                        ref="bornDateMenu"
                                        v-model="bornDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                color="red darken-3" 
                                                v-model="editUser.bornDate"
                                                label="Tanggal Lahir"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            ref="bornPicker"
                                            v-model="editUser.bornDate" 
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            color="red darken-3"
                                            @change="$refs.bornDateMenu.save(editUser.bornDate)"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                                v-if="userRole === 'organization'"
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Nama" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.name"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-menu
                                        ref="bornDateMenu"
                                        v-model="bornDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                color="red darken-3" 
                                                v-model="editUser.bornDate"
                                                label="Tanggal Berdiri"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            ref="bornPicker"
                                            v-model="editUser.bornDate" 
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            color="red darken-3"
                                            @change="$refs.bornDateMenu.save(editUser.bornDate)"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-textarea
                                        label="Deskripsi diri"
                                        v-model="editUser.description"
                                        color="red darken-3" 
                                        :no-resize="true"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-autocomplete
                                        :label="userRole === 'volunteer' ? 'Ketertarikan Utama' : 'Fokus Utama'" 
                                        :items="interestsList"
                                        item-text="text"
                                        item-value="id"
                                        v-model="interest_1"
                                        color="red darken-3"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-autocomplete
                                        :label="userRole === 'volunteer' ? 'Ketertarikan Tambahan' : 'Fokus Tambahan'"
                                        :disabled="interest_1 === 0"
                                        :items="interestsList"
                                        item-text="text"
                                        item-value="id"
                                        v-model="interest_2"
                                        color="red darken-3"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                            v-if="userRole === 'organization'"
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Website" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.website"
                                        placeholder="http://www.contoh.com"
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Administrator" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.adminName"
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Administrator Email" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.adminEmail"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="pa-3"
                    >
                        <v-flex
                            xs12
                        >
                            <v-subheader>
                                Domisili
                            </v-subheader>
                        </v-flex>
                        
                        <v-flex
                            xs12
                        >
                            <v-divider/>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-autocomplete
                                        label="Provinsi"
                                        :items="provinces"
                                        item-text="name"
                                        item-value="id"
                                        v-model="province"
                                        color="red darken-3"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-autocomplete
                                        label="Kabupaten/Kota"
                                        :items="regencies"
                                        item-text="name"
                                        item-value="id"
                                        v-model="regency"
                                        color="red darken-3"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        label="Alamat" 
                                        type="text"
                                        color="red darken-3" 
                                        v-model="editUser.address"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="pa-3"
                    >
                        <v-flex
                            xs12
                        >
                            <v-subheader>
                                Kontak
                            </v-subheader>
                        </v-flex>
                        
                        <v-flex
                            xs12
                        >
                            <v-divider/>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <v-flex
                            xs12
                        >
                            <v-btn
                                round
                                :loading="loading"
                                class="white--text"
                                color="red darken-3"
                                @click="addNewNumber"
                            >
                                Tambah Nomor
                            </v-btn>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                :justify-center="phones.length === 0"
                            >
                                <v-flex
                                    xs12
                                    v-if="phones.length === 0"
                                >
                                    <i>Tidak ada nomor terdaftar.</i>
                                </v-flex>

                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                    v-for="(item, index) in phones"
                                    :key="`phoneNum-${index}`"
                                >
                                    <v-text-field 
                                        :prepend-icon="item.type === 0 ? 'fa-phone' : 'fa-mobile-alt'"
                                        :label="item.type === 0 ? 'Telepon' : 'Mobile'"
                                        append-outer-icon="fa-trash-alt"
                                        :mask="item.type === 0 ? '###-#####' : '####-####-#####'"
                                        :placeholder="item.type === 0 ? 'XXX-XXXXX' : 'XXXX-XXXX-XXXXX'"
                                        type="text"
                                        color="red darken-3" 
                                        v-model="item.number"
                                        @click:prepend="changeNumberType(index)"
                                        @click:append-outer="deleteThisNumber(index)"
                                        @blur="importNumberData"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        class="pa-4 mt-3"
                    >
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="white--text"
                            color="red darken-3"
                            @click="updateUserData"
                        >
                            Simpan perubahan
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"
import { mapGetters } from 'vuex';

export default {
    mounted() {
        if (this.user !== null && this.user !== undefined) {
            let isEmpty = false;
            for (let key in this.user) {
                if (this.user[key] === 'empty') {
                    isEmpty = true;
                    break;
                }
            }
            this.isEmpty = isEmpty;
        }
    },
    data() {
        return {
            valid: false,
            genders: [ 'Laki-laki', 'Perempuan' ],
            provinces: IndoRegion.provinces,
            province: 0,
            regencies: [],
            regency: 0,
            interestsList: InterestsList,
            interest_1: 0,
            interest_2: 0,
            phones: [],
            bornDateMenu: false,
            profilePicture: '',
            image: null,
            isEmpty: false
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            user: 'user',
            userRole: 'userRole'
        }),
        editUser () {
            let retData = {};

            if (this.userRole === 'volunteer') {
                retData = { 
                    name: this.user.name !== 'empty' ? this.user.name : '',
                    gender: this.user.gender !== 'empty' ? this.user.gender : '',
                    profesi: this.user.profesi !== 'empty' ? this.user.profesi : '',
                    bornDate: this.user.bornDate !== 'empty' ? this.user.bornDate : '',
                    description: this.user.description !== 'empty' ? this.user.description : '',
                    province: this.user.province !== 'empty' ? this.user.province : '',
                    city: this.user.city !== 'empty' ? this.user.city : '',
                    address: this.user.address !== 'empty' ? this.user.address : '',
                    phones: this.user.phones !== 'empty' ? this.user.phones : [],
                    interests: this.user.interests !== 'empty' ? this.user.interests : [],
                    profilePicture: this.user.profilePicture !== 'empty' ? this.user.profilePicture : ''
                }
            } else if (this.userRole === 'organization') {
                retData = { 
                    name: this.user.name !== 'empty' ? this.user.name : '',
                    bornDate: this.user.bornDate !== 'empty' ? this.user.bornDate : '',
                    adminName: this.user.adminName !== 'empty' ? this.user.adminName : '',
                    adminEmail: this.user.adminEmail !== 'empty' ? this.user.adminEmail : '',
                    description: this.user.description !== 'empty' ? this.user.description : '',
                    province: this.user.province !== 'empty' ? this.user.province : '',
                    city: this.user.city !== 'empty' ? this.user.city : '',
                    address: this.user.address !== 'empty' ? this.user.address : '',
                    phones: this.user.phones !== 'empty' ? this.user.phones : [],
                    website: this.user.website !== 'empty' ? this.user.website : '',
                    interests: this.user.interests !== 'empty' ? this.user.interests : [],
                    profilePicture: this.user.profilePicture !== 'empty' ? this.user.profilePicture : ''
                }
            }

            this.province = retData.province;
            this.regency = retData.city;

            if (retData.interests.length > 0) {
                if (retData.interests[0] !== null && retData.interests[0] !== undefined) {
                    this.interest_1 = retData.interests[0];
                }

                if (retData.interests[1] !== null && retData.interests[1] !== undefined) {
                    this.interest_2 = retData.interests[1];
                }
            }

            if (retData.phones.length > 0) {
                this.phones = retData.phones;
            }

            this.profilePicture = retData.profilePicture;

            return retData;
        }
    },
    watch: {
        bornDateMenu (value) {
            value && setTimeout(() => (this.$refs.bornPicker.activePicker = 'YEAR'));
        },
        province (value) {
            if (value !== 0) {
                this.regencies = IndoRegion.regencies.filter(item => item.province_id === value);
                this.editUser.province = value;
            }
        },
        regency (value) {
            if (value !== 0) {
                this.editUser.city = value;
            }
        },
        interest_1 (value) {
            if (value !== 0) {
                if (this.editUser.interests === '' || this.editUser.interests === ' ') {
                    this.editUser.interests = [];
                }

                if (this.editUser.interests[0] !== null && this.editUser.interests[0] !== undefined) {
                    this.editUser.interests[0] = value;
                } else {
                    this.editUser.interests.push(value);
                }
            }
        },
        interest_2 (value) {
            if (value !== 0) {
                if (this.editUser.interests[1] !== null && this.editUser.interests[1] !== undefined) {
                    this.editUser.interests[1] = value;
                } else {
                    this.editUser.interests.push(value);
                }
            }
        }
    },
    methods: {
        onPickFile() {
            this.$refs.fileInput.click();
        },
        onFilePicked(event) {
            const file = event.target.files[0];
            let fileName = file.name;

            if (fileName.lastIndexOf('.') <= 0) {
                // TODO: message error
                return
            }

            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.profilePicture = fileReader.result;
            });

            fileReader.readAsDataURL(file);
            this.image = file;
        },
        addNewNumber() {
            if (this.phones.find(item => item.number === '')) {
                return;
            }
            
            this.phones.push({ type: 0, number:'' });
        },
        changeNumberType(index) {
            if (this.phones[index].type === 0) {
                this.phones[index].type = 1;
                this.phones[index].number = '';
            } else {
                this.phones[index].type = 0;
                this.phones[index].number = '';
            }
        },
        deleteThisNumber(index) {
            let currentNumber = this.phones[index].number;

            this.phones = this.phones.filter(item => item.number !== currentNumber);
            this.importNumberData();
        },
        importNumberData () {
            this.editUser.phones = [];
            for (let phone in phones) {
                if (phone.number != '' && phone.number != ' ') {
                    this.editUser.phones.push(phone);
                }
            }
        },
        updateUserData () {
            let dataChanged = false;
            let payload = {};
            let retData = {};

            if (this.userRole === 'volunteer') {
                retData = { 
                    name: this.user.name !== 'empty' ? this.user.name : '',
                    gender: this.user.gender !== 'empty' ? this.user.gender : '',
                    profesi: this.user.profesi !== 'empty' ? this.user.profesi : '',
                    bornDate: this.user.bornDate !== 'empty' ? this.user.bornDate : '',
                    description: this.user.description !== 'empty' ? this.user.description : '',
                    province: this.user.province !== 'empty' ? this.user.province : '',
                    city: this.user.city !== 'empty' ? this.user.city : '',
                    address: this.user.address !== 'empty' ? this.user.address : '',
                    phones: this.user.phones !== 'empty' ? this.user.phones : [],
                    interests: this.user.interests !== 'empty' ? this.user.interests : [],
                }
            } else if (this.userRole === 'organization') {
                retData = { 
                    name: this.user.name !== 'empty' ? this.user.name : '',
                    bornDate: this.user.bornDate !== 'empty' ? this.user.bornDate : '',
                    adminName: this.user.adminName !== 'empty' ? this.user.adminName : '',
                    adminEmail: this.user.adminEmail !== 'empty' ? this.user.adminEmail : '',
                    description: this.user.description !== 'empty' ? this.user.description : '',
                    province: this.user.province !== 'empty' ? this.user.province : '',
                    city: this.user.city !== 'empty' ? this.user.city : '',
                    address: this.user.address !== 'empty' ? this.user.address : '',
                    phones: this.user.phones !== 'empty' ? this.user.phones : [],
                    website: this.user.website !== 'empty' ? this.user.website : '',
                    interests: this.user.interests !== 'empty' ? this.user.interests : [],
                }
            }

            for (let key in retData) {
                if (retData[key] !== this.editUser[key]) {
                    dataChanged = true;
                    break;
                }
            }

            if (this.image) {
                dataChanged = true;
            }
            
            if (dataChanged) {
                if (this.userRole === 'volunteer') {
                    payload = {
                        data: {
                            id: this.user.id,
                            name: this.editUser.name !== '' && this.editUser.name !== ' ' ? this.editUser.name : 'empty',
                            gender: this.editUser.gender !== '' && this.editUser.gender !== ' ' ? this.editUser.gender : 'empty',
                            profesi: this.editUser.profesi !== '' && this.editUser.profesi !== ' ' ? this.editUser.profesi : 'empty',
                            bornDate: this.editUser.bornDate !== '' && this.editUser.bornDate !== ' ' ? this.editUser.bornDate : 'empty',
                            description: this.editUser.description !== '' && this.editUser.description !== ' ' ? this.editUser.description : 'empty',
                            province: this.editUser.province !== '' && this.editUser.province !== ' ' ? this.editUser.province : 'empty',
                            city: this.editUser.city !== '' && this.editUser.city !== ' ' ? this.editUser.city : 'empty',
                            address: this.editUser.address !== '' && this.editUser.address !== ' ' ? this.editUser.address : 'empty',
                            phones: this.editUser.phones.length > 0 ? this.editUser.phones : 'empty',
                            interests: this.editUser.interests.length > 0 ? this.editUser.interests : 'empty',
                        },
                        image: this.image
                    }
                } else if (this.userRole === 'organization') {
                    payload = {
                        data: {
                            id: this.user.id,
                            name: this.editUser.name !== '' && this.editUser.name !== ' ' ? this.editUser.name : 'empty',
                            bornDate: this.editUser.bornDate !== '' && this.editUser.bornDate !== ' ' ? this.editUser.bornDate : 'empty',
                            adminName: this.editUser.adminName !== '' && this.editUser.adminName !== ' ' ? this.editUser.adminName : 'empty',
                            adminEmail: this.editUser.adminEmail !== '' && this.editUser.adminEmail !== ' ' ? this.editUser.adminEmail : 'empty',
                            description: this.editUser.description !== '' && this.editUser.description !== ' ' ? this.editUser.description : 'empty',
                            province: this.editUser.province !== '' && this.editUser.province !== ' ' ? this.editUser.province : 'empty',
                            city: this.editUser.city !== '' && this.editUser.city !== ' ' ? this.editUser.city : 'empty',
                            address: this.editUser.address !== '' && this.editUser.address !== ' ' ? this.editUser.address : 'empty',
                            phones: this.editUser.phones.length > 0 && this.editUser.phones !== ' ' ? this.editUser.phones : 'empty',
                            website: this.editUser.website !== '' && this.editUser.website !== ' ' ? this.editUser.website : 'empty',
                            interests: this.editUser.interests.length > 0 ? this.editUser.interests : 'empty',
                        },
                        image: this.image
                    }
                }

                this.$store.dispatch('UpdateProfile', payload);
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

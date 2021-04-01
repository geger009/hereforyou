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
                <v-form
                    ref="createActivityForm"
                    v-model="valid"
                    class="mb-3"
                >
                    <v-layout
                        wrap
                        class="pa-3"
                    >
                        <v-flex
                            xs12
                        >
                            <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
                                Buat Aktivitas
                            </h2>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-text-field 
                                label="Nama Kegiatan*" 
                                type="text"
                                color="red darken-3" 
                                v-model="name"
                                :rules="[rules.required]"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-autocomplete
                                label="Kategori Kegiatan*"
                                :items="interestsList"
                                item-text="text"
                                item-value="id"
                                v-model="category"
                                color="red darken-3"
                                :rules="[rules.required]"
                            >
                            </v-autocomplete>
                        </v-flex>

                        <v-flex
                            xs12
                            sm6
                        >
                            <v-menu
                                ref="startDateMenu"
                                v-model="startDateMenu"
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
                                        v-model="startDate"
                                        label="Tanggal Mulai*"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                    v-model="startDate" 
                                    no-title 
                                    color="red darken-3"
                                    @input="startDateMenu = false"
                                >
                                    <!-- <v-spacer></v-spacer>
                                    <v-btn flat color="red darken-3" @click="startDateMenu = false">Cancel</v-btn>
                                    <v-btn flat color="red darken-3" @click="$refs.startDateMenu.save(startDate)">OK</v-btn> -->
                                </v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex
                            xs12
                            sm6
                        >
                            <!-- <v-menu
                                ref="endDateMenu"
                                v-model="endDateMenu"
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
                                        v-model="endDate"
                                        label="Tanggal Berakhir"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                    v-model="endDate" 
                                    no-title 
                                    color="red darken-3"
                                    @input="endDateMenu = false"
                                >
                                </v-date-picker>
                            </v-menu> -->

                            <v-layout
                                row
                                justify-center
                                align-center
                            >
                                <v-flex
                                    xs6
                                    class="pl-2"
                                >
                                    <v-text-field 
                                        :prepend-icon="useDays === true ? 'fa-dot-circle' : 'fa-circle'"
                                        :readonly="!useDays"
                                        label="Jumlah Hari*"
                                        mask="###"
                                        type="text"
                                        color="red darken-3" 
                                        v-model="daysCount"
                                        :rules="[rules.required]"
                                        @click:prepend="changeDurationType(0)"
                                        @input="checkDayValue"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs6
                                    class="pl-2"
                                >
                                    <v-text-field 
                                        :prepend-icon="useHours === true ? 'fa-dot-circle' : 'fa-circle'"
                                        :readonly="!useHours"
                                        label="Jumlah Jam*"
                                        mask="##"
                                        type="text"
                                        color="red darken-3" 
                                        v-model="hoursCount"
                                        :rules="[rules.required]"
                                        @click:prepend="changeDurationType(1)"
                                        @input="checkHourValue"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-menu
                                ref="finalRegistrationDateMenu"
                                v-model="finalRegistrationDateMenu"
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
                                        v-model="finalRegistrationDate"
                                        label="Batas Registrasi*"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                    v-model="finalRegistrationDate" 
                                    no-title 
                                    color="red darken-3"
                                    @input="finalRegistrationDateMenu = false"
                                >
                                    <!-- <v-spacer></v-spacer>
                                    <v-btn flat color="red darken-3" @click="startDateMenu = false">Cancel</v-btn>
                                    <v-btn flat color="red darken-3" @click="$refs.startDateMenu.save(startDate)">OK</v-btn> -->
                                </v-date-picker>
                            </v-menu>
                        </v-flex>

                        <v-flex
                            xs12
                            sm6
                            :class="{
                                'pr-2': $vuetify.breakpoint.smAndUp
                            }"
                        >
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
                        </v-flex>

                        <v-flex
                            xs12
                            sm6
                            :class="{
                                'pl-2': $vuetify.breakpoint.smAndUp
                            }"
                        >
                            <v-autocomplete
                                label="Kabupaten/Kota*"
                                :items="regencies"
                                item-text="name"
                                item-value="id"
                                v-model="city"
                                color="red darken-3"
                                :rules="[rules.required]"
                            >
                            </v-autocomplete>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-text-field 
                                label="Alamat*" 
                                type="text"
                                color="red darken-3" 
                                v-model="address"
                                :rules="[rules.required]"
                            >
                            </v-text-field>
                        </v-flex>

                        <!--TODO: upload picture -->
                        <v-flex
                            xs12
                            class="mb-2"
                        >
                            <v-img 
                                :src="imgSrc"
                                width="300"
                            >
                            </v-img>
                        </v-flex>

                        <v-flex
                            xs12
                            class="mb-3"
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
                        </v-flex>

                        <v-flex
                            xs12
                            class="mb-4"
                        >
                            <v-subheader
                                class="mb-2"
                            >
                                Deskripsi Kegiatan
                            </v-subheader>

                            <tiptap-vuetify
                                v-model="description"
                                :extensions="extensions"
                            />
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-btn
                                round
                                class="white--text red darken-3"
                                @click="$router.go(-1)"
                            >
                                Kembali
                            </v-btn>

                            <v-btn
                                round
                                class="amber darken-3 white--text"
                                @click="createActivity"
                                :disabled="completed"
                            >
                                Buat Aktivitas
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"
import { mapGetters } from 'vuex';
import Helper from "@/utils/helper"

export default {
    components: {
        TiptapVuetify: TiptapVuetify
    },
    data() {
        return {
            valid: false,
            completed: false,
            extensions: [
                new Heading({
                    levels: [1, 2, 3]
                }),
                new Bold(),
                new Italic(),
                new Strike(),
                new Underline(),
                new Paragraph(),
                new BulletList(),
                new OrderedList(),
                new ListItem(),
                new Blockquote(),
                new HardBreak(), // Shift + Enter
                new HorizontalRule(),
                new History()
            ],
            name: '',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fdefault_activity.png?alt=media&token=8afbd220-bfae-4722-a58a-1cf02d60201e',
            category: 0,
            interestsList: InterestsList,
            startDate: null,
            startDateMenu: false,
            useDays: true,
            daysCount: 0,
            useHours: false,
            hoursCount: 0,
            provinces: IndoRegion.provinces,
            province: 0,
            regencies: [],
            city: 0,
            address: '',
            finalRegistrationDate: null,
            finalRegistrationDateMenu: false,
            image: null,
            description: `
                <h2>Deskripsi kegiatan</h2>
                <p>Penjelasan singkat tentang kegiatan.</p>
                <h2>Tugas Relawan</h2>
                <ol>
                    <li>Tugas Relawan</li>
                </ol>
                <h2>Perlu Dipersiapkan</h2>
                <ol>
                    <li>Obat-obatan</li>
                </ol>
                <h2>Informasi Tambahan</h2>
                <p>Segala informasi tambahan yang dianggap penting</p>
            `,
            rules: {
                required: value => !!value || 'Kolom harus diisi!'
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    watch: {
        province (value) {
            if (value !== 0) {
                this.regencies = IndoRegion.regencies.filter(item => item.province_id === value);
            }
        },
        valid (value) {
            if (value == true && this.startDate != null && this.finalRegistrationDate != null && this.description != '') {
                this.completed = true;
            } else {
                this.completed = false;
            }
        },
        startDate (value) {
            if (value != null && this.valid == true && this.finalRegistrationDate != null && this.description != '') {
                this.completed = true;
            } else {
                this.completed = false;
            }
        },
        finalRegistrationDate (value) {
            if (value != null && this.valid == true && this.startDate != null && this.description != '') {
                this.completed = true;
            } else {
                this.completed = false;
            }
        },
        description (value) {
            if (value != '' && this.valid == true && this.startDate != null && this.finalRegistrationDate != null) {
                this.completed = true;
            } else {
                this.completed = false;
            }
        }
    },
    methods: {
        checkDayValue() {
            if (this.daysCount < 0) {
                this.daysCount = 0;
            } else if (this.daysCount > 365) {
                this.daysCount = 365;
            }
        },
        checkHourValue() {
            if (this.hoursCount < 0) {
                this.hoursCount = 0;
            } else if (this.hoursCount > 24) {
                this.hoursCount = 24;
            }
        },
        changeDurationType(_type) {
            switch(_type) {
                case 0:
                    this.useDays = true;
                    this.useHours = false;
                break;
                case 1:
                    this.useDays = false;
                    this.useHours = true;
                break;
            }

            this.daysCount = 0;
            this.hoursCount = 0;
        },
        createActivity() {
            const [startYear, startMonth, startDay] = this.startDate.split('-');
            let endDate = new Date();
            endDate.setFullYear(parseInt(startYear));
            endDate.setMonth(parseInt(startMonth));
            endDate.setDate(parseInt(startDay));
            
            if (this.useDays) {
                endDate = Helper.addDays(endDate, this.daysCount);
            }

            let durationStr = this.useDays === true ? this.daysCount + ' hari' : this.hoursCount + ' jam';

            const payload = {
                data: {
                    name: this.name,
                    imgSrc: this.imgSrc,
                    organization: this.user.name,
                    category: this.category,
                    startDate: this.startDate,
                    endDate: endDate.toISOString().substr(0,10),
                    duration: durationStr,
                    province: this.province,
                    city: this.city,
                    address: this.address,
                    description: this.description,
                    finalRegistrationDate: this.finalRegistrationDate,
                    status: 'pending'
                },
                image: this.image
            }

            this.$store.dispatch('CreateActivity', payload);
        },
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
                this.imgSrc = fileReader.result;
            });

            fileReader.readAsDataURL(file);
            this.image = file;
        }
    }
}
</script>

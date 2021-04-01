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
                <v-layout
                    wrap
                    class="pa-3"
                >
                    <v-flex
                        xs12
                        class="pa-2 my-2"
                    >
                        <v-img
                            :src="imgSrc"
                            height="300px"
                        >
                        </v-img>
                    </v-flex>

                    <v-flex
                        xs12
                        class="pa-2 my-2"
                    >
                        <h1 
                            class="font-weight-bold headline red--text text--darken-3"
                        >
                            {{ name }}
                        </h1>
                    </v-flex>

                    <v-flex
                        xs12
                        class="pa-2 my-2"
                    >
                        Bersama 
                        <span class="font-weight-bold">{{ organization }}</span>
                    </v-flex>

                    <v-flex
                        xs12
                        class="pa-2 my-2"
                    >
                        <p class="mb-1 font-weight-bold">Kategori</p>
                        <p class="mb-1">{{ category }}</p>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-layout
                            wrap
                            fill-height
                        >
                            <v-flex
                                xs12
                                sm6
                                class="pa-2 my-2"
                            >
                                <p class="mb-1 font-weight-bold">Waktu</p>
                                <p class="mb-1">{{ startDate }}</p>
                                <p class="mb-1" v-if="endDate !== startDate">{{ endDate }}</p>
                            </v-flex>

                            <v-flex
                                xs12
                                sm6
                                class="pa-2 my-2"
                            >
                                <p class="mb-1 font-weight-bold">Durasi</p>
                                <p class="mb-1">{{ duration }}</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-layout
                            wrap
                            fill-height
                        >
                            <v-flex
                                xs12
                                sm6
                                class="pa-2 my-2"
                            >
                                <p class="mb-1 font-weight-bold">Tempat</p>
                                <p class="mb-1">{{ province + " - " + city }}</p>
                                <p class="mb-1">{{ address }}</p>
                            </v-flex>

                            <v-flex
                                xs12
                                sm6
                                class="pa-2 my-2"
                            >
                                <p class="mb-1 font-weight-bold">Batas Registrasi</p>
                                <p class="mb-1">{{ finalRegistrationDate }}</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex
                        xs12
                        class="pa-2 my-2"
                    >
                        <div v-html="description"></div>
                    </v-flex>

                    <v-divider
                        v-if="userRole === 'volunteer'"
                    />

                    <v-flex
                        xs12
                        v-if="userRole === 'volunteer'"
                    >
                        <v-btn
                            round
                            class="amber darken-3 white--text mb-3"
                            :disabled="registered"
                            @click="joinDialog = true"
                        >
                            {{ registered === false ? 'Jadi Relawan' : 'Sudah Mendaftar' }}
                        </v-btn>
                    </v-flex>
                </v-layout>

                <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
                    Daftar Relawan
                </h2>

                <v-layout
                    row
                    wrap
                    class="pa-3"
                >
                    <v-flex
                        xs12
                        class="mb-3"
                    >
                        <v-toolbar dense flat color="transparent" class="px-0">
                            <v-spacer></v-spacer>
                            <v-text-field 
                                class="mr-2 mb-2" 
                                color="red darken-3" 
                                v-model="search" 
                                append-icon="fa-search" 
                                label="Cari Relawan" 
                                single-line 
                                hide-details 
                            >
                            </v-text-field>
                            <v-btn 
                                v-if="userRole === 'organization'"
                                icon
                                class="red--text text--darken-3" 
                                active-class="v-btn--active white--text red darken-3" 
                                :disabled="exporting || (showVolunteers.length === 0)" 
                                @click="fileNameDialog = true"
                            >
                                <v-icon>fa-file-download</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-data-table
                            :headers="headers"
                            :items="showVolunteers"
                            class="elevation-8"
                            :loading="loading"
                            :search="search"
                            :rows-per-page-items="rowrules"
                            style="width: 100%; border-radius: 10px; overflow: hidden;"
                        >
                            <template v-slot:items="props">
                                <td>{{ props.item.username }}</td>
                                <td>{{ props.item.useremail }}</td>
                                <td>{{ props.item.userprovince }}</td>
                                <td>{{ props.item.usercity }}</td>
                                <td>{{ props.item.useraddress }}</td>
                                <td>
                                    <v-btn
                                        round
                                        color="info"
                                        text-color="white"
                                        @click="$router.push({ path: `/profile/${props.item.uid}`});"
                                    >
                                        Profil
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-card>

            <v-dialog
                v-model="joinDialog" 
                fullscreen
                hide-overlay 
                transition="dialog-bottom-transition"
            >
                <v-form
                    ref="joinActivityForm"
                    v-model="valid"
                >
                    <v-card>
                        <v-toolbar dark class="red darken-3">
                            <v-btn icon dark @click="cancelJoinAct">
                                <v-icon>fa-times</v-icon>
                            </v-btn>
                            <v-toolbar-title>Daftar Aktivitas</v-toolbar-title>
                        </v-toolbar>

                        <v-layout
                            wrap
                            class="pa-3"
                        >
                            <v-flex
                                xs12
                                class="pa-2 my-2"
                            >
                                <h1 
                                    class="font-weight-bold headline red--text text--darken-3"
                                >
                                    {{ name }}
                                </h1>
                            </v-flex>

                            <v-flex
                                xs12
                                class="pa-2 my-2"
                            >
                                Bersama
                                <span class="font-weight-bold">{{ organization }}</span>
                            </v-flex>

                            <v-flex
                                xs12
                                class="pa-2 my-2"
                            >
                                <p
                                    class="subheading"
                                >
                                    Mengapa Anda tertarik untuk menjadi relawan pada aktivitas ini?
                                </p>
                                <tiptap-vuetify
                                    v-model="question_1"
                                    :extensions="extensions"
                                    placeholder="- Tulis Jawaban -"
                                />
                            </v-flex>

                            <v-flex
                                xs12
                                class="pa-2 my-2"
                            >
                                <p
                                    class="subheading"
                                >
                                    Mengapa Anda adalah relawan yang tepat untuk aktivitas ini?
                                </p>
                                <tiptap-vuetify
                                    v-model="question_2"
                                    :extensions="extensions"
                                    placeholder="- Tulis Jawaban -"
                                />
                            </v-flex>

                            <v-flex
                                xs12
                                class="pa-2 my-2"
                            >
                                <p
                                    class="subheading"
                                >
                                    Apakah Anda siap jika diharuskan untuk mengikuti training terlebih dahulu? (jika ada)
                                </p>
                                <tiptap-vuetify
                                    v-model="question_3"
                                    :extensions="extensions"
                                    placeholder="- Tulis Jawaban -"
                                />
                            </v-flex>
                        </v-layout>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                round
                                :disabled="loading"
                                class="red darken-3 white--text"
                                @click="cancelJoinAct"
                            >
                                Batal
                            </v-btn>
                            <v-btn
                                round
                                :disabled="!valid || loading"
                                :loading="loading"
                                class="red darken-3 white--text"
                                @click="sendJoinActReq"
                            >
                                Kirim Pendaftaran
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>

            <v-dialog 
                v-model="fileNameDialog" 
                max-width="450px" 
                persistent
            >
				<v-card
                    class="v-card__Dlg pa-3"
                >
					<v-text-field 
                        autofocus
                        label="Nama File" 
                        type="text"
                        color="red darken-3" 
                        v-model="fileName"
                    >
                    </v-text-field>
                    
				    <v-card-actions class="px-3">
                        <v-btn
                            round
                            class="red darken-3 white--text"
                            @click="fileNameDialog = false"
                        >
                            Batal
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="fileName === '' || fileName === ' '"
                            class="amber darken-3 white--text"
                            @click="downloadVolsList"
                        >
                            Unduh
                        </v-btn>
				    </v-card-actions>
				</v-card>
            </v-dialog>

            <v-dialog 
                v-model="progressDialog" 
                max-width="450px" 
                persistent
            >
				<v-card
                    class="v-card__Dlg"
                >
					<v-card-title>
						<span class="headline">Mohon tunggu...</span>
					</v-card-title>
				    <v-card-actions class="px-3">
                        <v-progress-linear 
                            color="red"
                            indeterminate
                        ></v-progress-linear>
				    </v-card-actions>
				</v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import { mapGetters } from 'vuex';
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"
import XLSX from 'xlsx'
import Blob from 'blob'
import FileSaver from 'file-saver'

export default {
    components: {
        TiptapVuetify: TiptapVuetify
    },
    mounted() {
        this.$store.dispatch('GetActivity', { id: this.$route.params.activity_id })
    },
    data() {
        return {
            fileName: '',
            fileNameDialog: false,
            exporting: false,
            progressDialog: false,
            //join
            valid: false,
            joinDialog: false,
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
            question_1: '',
            question_2: '',
            question_3: '',
            ///
            id: '',
            name: '',
            imgSrc: '',
            organization: '',
            category: '',
            startDate: '',
            endDate: '',
            duration: '',
            province: '',
            city: '',
            address: '',
            description: '',
            finalRegistrationDate: '',
            registered: false,
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            categories: InterestsList,
            registeredVolunteers: [],
            search: '',
            headers:[
                { text: 'Nama Relawan', value: 'username', sortable: true },
                { text: 'Email', value: 'useremail', sortable: false },
                { text: 'Provinsi', value: 'userprovince', sortable: false },
                { text: 'Kota/Kabupaten', value: 'usercity', sortable: false },
                { text: 'Alamat', value: 'useraddress', sortable: false },
                { text: '', value: 'action', sortable: false }
            ],
            rowrules: [
				100,
                500,
                1000,
				{ 
					"text": "$vuetify.dataIterator.rowsPerPageAll",
					"value": -1
				}
            ],
            showVolunteers: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            user: 'user',
            userRole: 'userRole',
            activity: 'activity',
            volunteerReq: 'volunteerReq'
        })
    },
    watch: {
        activity (value) {
            if (value !== null) {
                this.id = value.id;
                this.name = value.name;
                this.organization = value.organization;
                this.imgSrc = value.imgSrc;
                this.category = this.categories.find(item => item.id === value.category).text;
                this.startDate = value.startDate;
                this.endDate = value.endDate;
                this.duration = value.duration;
                this.province = this.provinces.find(item => item.id === value.province).name;
                this.city = this.regencies.find(item => item.id === value.city).name;
                this.address = value.address;
                this.description = value.description;
                this.finalRegistrationDate = value.finalRegistrationDate;
                this.registeredVolunteers = value.registeredVolunteers === 'empty' ? [] : value.registeredVolunteers;

                /* if (this.userRole === 'volunteer') {
                    this.registered = this.user.activities.find(item => item === this.id) ? true : false;
                } */

                this.$store.dispatch('GetVolunteerRequest');
            }
        },
        volunteerReq (value) {
            if (value !== null) {
                this.showVolunteers = [];

                if (!value.find(item => item.aid === this.id)) return;

                let byActivity = value.filter(item => item.aid === this.id);

                if (this.userRole === 'volunteer') {
                    this.registered = byActivity.find(item => item.uid === this.user.id) ? true : false;
                }
                
                let temp = byActivity.filter(item => item.status !== 'pending');
                for (let i = 0; i < temp.length; i++) {
                    let data = {
                        uid: temp[i].uid,
                        aid: temp[i].aid,
                        username: temp[i].username,
                        activityname: temp[i].activityname,
                        organization: temp[i].organization,
                        useremail: temp[i].useremail,
                        question_1: temp[i].question_1,
                        question_2: temp[i].question_2,
                        question_3: temp[i].question_3,
                        userprovince: temp[i].userprovince !== 'empty' ? this.provinces.find(item => item.id === temp[i].userprovince).name : '',
                        usercity: temp[i].usercity !== 'empty' ? this.regencies.find(item => item.id === temp[i].usercity).name : '',
                        useraddress: temp[i].useraddress !== 'empty' ? temp[i].useraddress : '',
                        userphones: temp[i].userphones !== 'empty' ? temp[i].userphones : '',
                        userProfilePicture: temp[i].userProfilePicture,
                        status: temp[i].status,
                    }
                    
                    this.showVolunteers.push(data);
                }
            }
        }
    },
    methods: {
        cancelJoinAct() {
            this.question_1 = '';
            this.question_2 = '';
            this.question_3 = '';

            this.joinDialog = false;
        },
        sendJoinActReq() {
            let data = {
                uid: this.user.id,
                aid: this.id,
                username: this.user.name,
                activityname: this.name,
                organization: this.organization,
                useremail: this.user.email,
                question_1: this.question_1,
                question_2: this.question_2,
                question_3: this.question_3,
                userprovince: this.user.province,
                usercity: this.user.city,
                useraddress: this.user.address,
                userphones: this.user.phones,
                userProfilePicture: this.user.profilePicture
            }

            this.$store.dispatch('SendJoinRequest', data)
            .then(
                () => {
                    this.joinDialog = false;
                    this.$router.push('/dashboard');
                }
            )
        },
        downloadVolsList() {
            this.fileNameDialog = false;

            this.exporting = true;
			this.progressdialog = true;

            let expOrg = [];

            for (let i = 0; i < this.showVolunteers.length; i++) {
                let data = {
                    No: i + 1,
                    Activity_ID: this.showVolunteers[i].aid !== 'empty' ? this.showVolunteers[i].aid : '',
                    Activity_Name: this.showVolunteers[i].activityname !== 'empty' ? this.showVolunteers[i].activityname : '',
                    Organization_Name: this.showVolunteers[i].organization !== 'empty' ? this.showVolunteers[i].organization : '',
                    Volunteer_ID: this.showVolunteers[i].uid !== 'empty' ? this.showVolunteers[i].uid : '',
                    Volunteer_Name: this.showVolunteers[i].username !== 'empty' ? this.showVolunteers[i].username : '',
                    Volunteer_Email: this.showVolunteers[i].useremail !== 'empty' ? this.showVolunteers[i].useremail : '',
                    Volunteer_Province: this.showVolunteers[i].userprovince !== 'empty' ? this.showVolunteers[i].userprovince : '',
                    Volunteer_City: this.showVolunteers[i].usercity !== 'empty' ? this.showVolunteers[i].usercity : '',
                };

                data.Volunteer_Address = this.showVolunteers[i].useraddress !== 'empty' ? this.showVolunteers[i].useraddress : '';

                //phones
                if (this.showVolunteers[i].userphones !== 'empty') {
                    data.Volunteer_Phones = "";
                    for (let j = 0; j < this.showVolunteers[i].userphones.length; j++) {
                        data.Volunteer_Phones += this.showVolunteers[i].userphones[j].number;
                        if (j < this.showVolunteers[i].userphones.length - 1) {
                            data.Volunteer_Phones += " | ";
                        }
                    }
                }

                expOrg.push(data);
            }

            let WSfaqs = XLSX.utils.json_to_sheet(expOrg);
            let WBfaqs = XLSX.utils.book_new();
            
            XLSX.utils.book_append_sheet(WBfaqs, WSfaqs, 'Volunteers');
            
            let wopts = { bookType:'xlsx', bookSST:false, type:'array' };
            let WBout = XLSX.write(WBfaqs, wopts);

            let currentDate = new Date();
            let strDate = currentDate.toString();

            FileSaver.saveAs(new Blob([WBout], {type:"application/octet-stream"}), this.fileName.slice(0, 24).replace(/\s/g, "_") + ".xlsx");
            
            this.fileName = '';
            this.exporting = false;
			this.progressdialog = false;
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px !important;
}
.v-btn {
    text-transform: unset !important;
}
</style>

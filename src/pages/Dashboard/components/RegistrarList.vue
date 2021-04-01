<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Pendaftar
        </h2>

        <v-layout
            wrap
            class="pa-3"
        >
            <v-flex 
                xs12 
                class="mb-2"
            >
                <v-toolbar
                    dense 
                    flat 
                    color="transparent" 
                    class="px-0"
                >
                    <v-select 
                        class="mt-2 mr-2" 
                        color="red darken-3" 
                        :items="activitiesList"
                        item-text="name"
                        item-value="id"
                        v-model="activity_id" 
                        label="Aktivitas"
                    >
                    </v-select>

                    <v-spacer/>
                </v-toolbar>
            </v-flex>

            <v-flex
                xs12
            >
                <v-data-table 
                    :headers="headers"
                    :items="registrarList" 
                    style="width: 100%; border-radius: 10px; overflow: hidden;"
                    class="elevation-8"
                    :loading="loading"
                    :rows-per-page-items="rowrules"
                >
                    <template v-slot:items="props">
                        <td>
                            <v-avatar
                                size="36px"
                            >
                                <v-img
                                    :src="props.item.userProfilePicture"
                                    alt="Avatar"
                                >
                                </v-img>
                            </v-avatar>
                        </td>
                        <td>{{ props.item.username }}</td>
                        <td>{{ props.item.useremail }}</td>
                        <td>
                            <v-layout
                                row
                                justify-end
                            >
                                <v-btn
                                    round
                                    color="info"
                                    text-color="white"
                                    @click="$router.push({ path: '/profile/' + props.item.uid })"
                                >
                                    Profile
                                </v-btn>
                                <v-btn
                                    round
                                    color="warning"
                                    text-color="white"
                                    @click="setVolunteer(props.item)"
                                >
                                    Proses
                                </v-btn>
                            </v-layout>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>

            <v-dialog
                v-model="volDialog" 
                fullscreen
                hide-overlay 
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar dark class="red darken-3">
                        <v-btn icon dark @click="cancelProcess">
                            <v-icon>fa-times</v-icon>
                        </v-btn>
                        <v-toolbar-title>Proses Relawan</v-toolbar-title>
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
                                {{ selectedItem.username }}
                            </h1>
                        </v-flex>

                        <v-flex
                            xs12
                            class="pa-2 my-2"
                        >
                            Bersama
                            <span class="font-weight-bold">{{ selectedItem.organization }}</span>
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
                            
                            <div v-html="selectedItem.question_1"></div>
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
                            
                            <div v-html="selectedItem.question_2"></div>
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
                            
                            <div v-html="selectedItem.question_3"></div>
                        </v-flex>
                    </v-layout>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processVol('reject')"
                        >
                            Tolak
                        </v-btn>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processVol('accept')"
                        >
                            Terima
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
import Helper from '@/utils/helper';
import { mapGetters } from 'vuex';

export default {
    methods() {
        this.$store.dispatch('GetActivitiesList');
    },
    data() {
        return {
            volDialog: false,
            activity_id: null,
            activitiesList: [],
            allRegistrar: [],
            registrarList: [],
            headers: [
                { text: '', value: 'userProfilePicture', sortable: false },
                { text: 'Nama Relawan', value: 'username', sortable: true },
                { text: 'Email Relawan', value: 'useremail', sortable: false },
                { text: '', value: 'action', sortable: false }
            ],
            selectedItem: {
                id: '',
                uid: '',
                aid: '',
                username: '',
                activityname: '',
                organization: '',
                useremail: '',
                question_1: '',
                question_2: '',
                question_3: '',
                userprovince: '',
                usercity: '',
                useraddress: '',
                userphones: '',
                userProfilePicture: '',
                status: '',
            },
            rowrules: [
				10,
				25,
                50,
                100,
				{ 
					"text": "$vuetify.dataIterator.rowsPerPageAll",
					"value": -1
				}
			],
        }
    },
    computed: {
        ...mapGetters({
            userName: 'userName',
            loading: 'isLoading',
            activities: 'activities',
            volunteerReq: 'volunteerReq'
        })
    },
    watch: {
        activities (value) {
            if (value === null) return;
            
            const currentDate = new Date();
            this.activitiesList = [];
            
            if (!value.find(item => item.organization !== this.userName)) return;

            let byOrganization = value.filter(item => item.organization === this.userName);

            const onProgress = byOrganization.filter(item => item.finalRegistrationDate > currentDate.toISOString().substr(0, 10));
            onProgress.sort(Helper.compareValues('name'));

            this.activitiesList = [ ...onProgress ];

            this.activity_id = this.activitiesList[0].id;

            this.$store.dispatch('GetVolunteerRequest');
        },
        volunteerReq (value) {
            if (value === null) return;

            this.allRegistrar = [];
            if (!value.find(item => item.aid === this.activity_id)) return;

            let byAcitivity = value.filter(item => item.aid === this.activity_id);

            let pendingList = value.filter(item => item.status === 'pending');
            pendingList.sort(Helper.compareValues('name'));

            this.allRegistrar = [ ...pendingList ];

            this.registrarList = [];

            if (!this.allRegistrar.find(item => item.aid === this.activity_id)) return;

            this.registrarList = this.allRegistrar.filter(item => item.aid === this.activity_id);
        },
        activity_id (value) {
            if (value === null) return;

            this.registrarList = [];

            if (!this.allRegistrar.find(item => item.aid === this.activity_id)) return;

            this.registrarList = this.allRegistrar.filter(item => item.aid === this.activity_id);
        }
    },
    methods: {
        setVolunteer(item) {
            this.selectedItem = {};
            this.selectedItem = { ...item };
            this.volDialog = true;
        },
        cancelProcess() {
            this.selectedItem = {
                id: '',
                uid: '',
                aid: '',
                username: '',
                activityname: '',
                organization: '',
                useremail: '',
                question_1: '',
                question_2: '',
                question_3: '',
                userprovince: '',
                usercity: '',
                useraddress: '',
                userphones: '',
                userProfilePicture: '',
                status: '',
            }
            this.volDialog = false;
        },
        processVol(status) {
            this.selectedItem.status = status;

            this.$store.dispatch('VerifyVolunteer', this.selectedItem)
            .then(
                () => {
                    this.selectedItem = {
                        id: '',
                        uid: '',
                        aid: '',
                        username: '',
                        activityname: '',
                        organization: '',
                        useremail: '',
                        question_1: '',
                        question_2: '',
                        question_3: '',
                        userprovince: '',
                        usercity: '',
                        useraddress: '',
                        userphones: '',
                        userProfilePicture: '',
                        status: '',
                    };
                    this.volDialog = false;

                    this.$store.dispatch('GetActivitiesList');
                }
            )
            .catch(
                () => {
                    this.selectedItem = {
                        id: '',
                        uid: '',
                        aid: '',
                        username: '',
                        activityname: '',
                        organization: '',
                        useremail: '',
                        question_1: '',
                        question_2: '',
                        question_3: '',
                        userprovince: '',
                        usercity: '',
                        useraddress: '',
                        userphones: '',
                        userProfilePicture: '',
                        status: '',
                    };

                    this.volDialog = false;
                }
            )
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px;
}
.v-btn {
    text-transform: unset !important;
}
</style>

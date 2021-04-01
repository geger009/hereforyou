<template>
    <div>
        <v-layout
            class="pa-3"
        >
            <v-data-table
                :items="showActivities"
                class="elevation-8"
                hide-actions
                hide-headers
                style="width: 100%; border-radius: 10px; overflow: hidden;"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.organization }}</td>
                    <td>{{ props.item.startDate }}</td>
                    <td>{{ provinces.find(item => item.id === props.item.province).name }}</td>
                    <td>{{ regencies.find(item => item.id === props.item.city).name }}</td>
                    <td>{{ props.item.address }}</td>
                    <td>
                        <v-layout
                            row
                            justify-end
                        >
                            <v-btn
                                round
                                color="warning"
                                text-color="white"
                                @click="setActivity(props.item)"
                            >
                                Proses
                            </v-btn>
                        </v-layout>
                    </td>
                </template>
            </v-data-table>

            <v-dialog
                v-model="actDialog" 
                fullscreen
                hide-overlay 
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar dark class="red darken-3">
                        <v-btn icon dark @click="cancelProcessAct">
                            <v-icon>fa-times</v-icon>
                        </v-btn>
                        <v-toolbar-title>Proses Aktivitas</v-toolbar-title>
                    </v-toolbar>

                    <v-layout
                        wrap
                        class="pa-3"
                    >
                        <v-flex
                            xs12
                            class="pa-2 my-2"
                        >
                            <v-img
                                :src="selectedItem.imgSrc"
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
                                {{ selectedItem.name }}
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
                                    <p class="mb-1">{{ selectedItem.startDate }}</p>
                                    <p class="mb-1" v-if="selectedItem.endDate !== selectedItem.startDate">{{ selectedItem.endDate }}</p>
                                </v-flex>

                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2 my-2"
                                >
                                    <p class="mb-1 font-weight-bold">Durasi</p>
                                    <p class="mb-1">{{ selectedItem.duration }}</p>
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
                                    <p class="mb-1">{{ selectedItem.address }}</p>
                                </v-flex>

                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2 my-2"
                                >
                                    <p class="mb-1 font-weight-bold">Batas Registrasi</p>
                                    <p class="mb-1">{{ selectedItem.finalRegistrationDate }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                            class="pa-2 my-2"
                        >
                            <div v-html="selectedItem.description"></div>
                        </v-flex>
                    </v-layout>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processAct('reject')"
                        >
                            Tolak
                        </v-btn>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processAct('accept')"
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
import { mapGetters } from 'vuex';

import IndoRegion from "@/utils/indonesia-region"
import Categories from "@/utils/interests"

export default {
    mounted() {
        //CHECK AGAIN
        this.$store.dispatch('GetActivitiesList');
    },
    data() {
        return {
            selectedItem: {
                id: '',
                name: '',
                imgSrc: '',
                organization: '',
                category: 0,
                startDate: '',
                endDate: '',
                duration: '',
                province: '',
                city: '',
                address: '',
                description: '',
                finalRegistrationDate: '',
                status: '',
                created_at: ''
            },
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            categories: Categories,
            province: '',
            city: '',
            category: '',
            actDialog: false,
            showActivities: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            activities: 'activities'
        })
    },
    watch: {
        activities (value) {
            if (value !== null) {
                this.showActivities = [];

                if (!value.find(item => item.status === 'pending')) return;

                const pendingAct = value.filter(item => item.status === 'pending');

                for (let i = 0; i < pendingAct.length; i++) {
                    this.showActivities.push(pendingAct[i]);
                }
            }
        }
    },
    methods: {
        setActivity(item) {
            this.selectedItem = item;
            this.province = this.provinces.find(data => data.id === this.selectedItem.province).name;
            this.city = this.regencies.find(data => data.id === this.selectedItem.city).name;
            this.category = this.categories.find(data => data.id === this.selectedItem.category).text;
            this.actDialog = true;
        },
        cancelProcessAct() {
            this.province = '';
            this.city = '';
            this.category = '';
            this.selectedItem = {
                id: '',
                name: '',
                imgSrc: '',
                organization: '',
                category: 0,
                startDate: '',
                endDate: '',
                duration: '',
                province: '',
                city: '',
                address: '',
                description: '',
                finalRegistrationDate: '',
                status: '',
                created_at: ''
            };
            this.actDialog = false;
        },
        processAct(status) {
            this.selectedItem.status = status;

            this.$store.dispatch('ConfirmationActivity', this.selectedItem)
            .then(
                () => {
                    this.province = '';
                    this.city = '';
                    this.category = '';
                    this.selectedItem = {
                        id: '',
                        name: '',
                        imgSrc: '',
                        organization: '',
                        category: 0,
                        startDate: '',
                        endDate: '',
                        duration: '',
                        province: '',
                        city: '',
                        address: '',
                        description: '',
                        finalRegistrationDate: '',
                        status: '',
                        created_at: ''
                    };
                    this.actDialog = false;

                    this.$store.dispatch('GetActivitiesList');
                }
            )
            .catch(
                () => {
                    this.province = '';
                    this.city = '';
                    this.category = '';
                    this.selectedItem = {
                        id: '',
                        name: '',
                        imgSrc: '',
                        organization: '',
                        category: 0,
                        startDate: '',
                        endDate: '',
                        duration: '',
                        province: '',
                        city: '',
                        address: '',
                        description: '',
                        finalRegistrationDate: '',
                        status: '',
                        created_at: ''
                    };
                    this.actDialog = false;
                }
            )
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>

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
                <div
                    v-if="showActivitiesList.length > 0"
                >
                    <v-layout
                        wrap
                        class="py-3"
                    >
                        <v-flex
                            xs12
                            sm6
                            class="pa-2"
                        >
                            <v-autocomplete
                                label="Berdasarkan Provinsi"
                                :items="filterProvinces"
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
                                label="Berdasarkan Kabupaten/Kota"
                                :items="filterRegencies"
                                item-text="name"
                                item-value="id"
                                v-model="city"
                                color="red darken-3"
                            >
                            </v-autocomplete>
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                    >
                        <card-activity
                            v-for="(item, index) in showActivitiesList"
                            :key="`newest-activity-${index}`"
                            v-bind="item"
                        />
                    </v-layout>

                    <v-layout
                        wrap
                        class="py-3"
                    >
                        <v-toolbar 
                            dense 
                            flat 
                            color="transparent" 
                            class="px-0"
                        >
                            <v-btn
                                flat
                                class="transparent red--text text--darken-3"
                                @click="showActivities(currentPage - 1);"
                                v-if="showPrev"
                            >
                                <v-icon 
                                    left 
                                    color="red--text text--darken-3"
                                >
                                    fa-angle-left
                                </v-icon>
                                Sebelumnya
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                                flat
                                class="transparent red--text text--darken-3"
                                @click="showActivities(currentPage + 1);"
                                v-if="showNext"
                            >
                                Selanjutnya
                                <v-icon 
                                    left 
                                    color="red--text text--darken-3"
                                >
                                    fa-angle-right
                                </v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-layout>
                </div>

                <div 
                    class="text-xs-center mb-2"
                    v-if="loading"
                >
                    <v-progress-circular
                        :size="70"
                        :width="7"
                        color="red"
                        indeterminate
                        class="mx-auto"
                    >
                    </v-progress-circular>
                </div>

                <p
                    class="red--text text--darken-3 text-xs-center"
                    v-if="showActivitiesList.length === 0"
                >
                    Tidak ada Aktivitas terdaftar
                </p>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import CardActivity from '@/components/CardActivity'
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"

import { mapGetters } from 'vuex'

export default {
    mounted() {
        this.filterProvinces = [
            {
                "id": "0",
                "name": "Semua Provinsi"
            },
            ...this.provinces
        ];


        this.filterRegencies = [
            {
                "id": "0",
                "name": "Semua Kabupaten/Kota"
            }
        ];

        this.$store.dispatch('GetActivitiesList');
    },
    components: {
        CardActivity: CardActivity
    },
    data() {
        return {
            showActivitiesList: [],
            currentPage: -1,
            startPage: 0,
            endPage: 0,
            perPage: 15,
            nextEnd: 0,
            showPrev: false,
            showNext: false,
            firstOpen: true,
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            filterProvinces: [],
            filterRegencies: [],
            province: "0",
            city: "0",
            categories: InterestsList,
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
            if (value === null) return;

            this.firstOpen = true;
            this.showActivities(0, 0);
        },
        province (value) {
            this.firstOpen = true;
            
            if (value === "0") {
                this.filterRegencies = [];
                this.filterRegencies = [
                    {
                        "id": "0",
                        "name": "Semua Kabupaten/Kota"
                    }
                ]
                this.city = "0";
                this.showActivities(0, 0);
            } else {
                this.filterRegencies = [];
                this.filterRegencies = [
                    {
                        "id": "0",
                        "name": "Semua Kabupaten/Kota"
                    },
                    ...this.regencies.filter(item => item.province_id === this.province)
                ]
                this.city = "0";
                this.showActivities(0, 1);
            }
        },
        city (value) {
            this.firstOpen = true;
                
            if (value === "0") {
                if (this.province !== "0") {
                    this.showActivities(0, 1);
                } else {
                    this.showActivities(0, 0);
                }
            } else {
                this.showActivities(0, 2);
            }
        }
    },
    methods: {
        showActivities(page, type) {
            if (page < 0) return;

            const currentDate = new Date();
            const acceptedAct = this.activities.filter(item => item.status === 'accept');
            const onProgressAct = acceptedAct.filter(item => item.finalRegistrationDate >= currentDate.toISOString().substr(0, 10));

            if (page == 0 && this.firstOpen) {
                this.firstOpen = false;
                this.startPage = 0;
                this.endPage = this.perPage;
                this.nextEnd = this.endPage;
            } else {
                let nextPage = (this.currentPage < page) ? true : false;

                if (nextPage) {
                    this.startPage = this.endPage;
                    this.endPage += this.nextEnd;
                } else {
                    this.endPage = this.startPage;
                    this.startPage -= this.nextEnd;
                }
            }

            if (onProgressAct.length < this.perPage) {
                this.showPrev = false;
                this.showNext = false;
            } else {
                this.showPrev = true;
                this.showNext = true;
            }

            if (this.endPage >= onProgressAct.length) {
                this.endPage = onProgressAct.length;
                this.nextEnd = this.endPage;
                this.showNext = false;
            } else {
                this.nextEnd = this.perPage;
            }

            if (this.startPage <= 0) {
                this.startPage = 0;
                this.showPrev = false;
            }

            this.currentPage = page;

            let tempActivitiesList = [];
            for (let i = this.startPage; i < this.endPage; i++) {
                let data = {
                    id: onProgressAct[i].id,
                    name: onProgressAct[i].name,
                    organization: onProgressAct[i].organization,
                    imgSrc: onProgressAct[i].imgSrc,
                    category: this.categories.find(item => item.id === onProgressAct[i].category).text,
                    startDate: onProgressAct[i].startDate,
                    endDate: onProgressAct[i].endDate,
                    duration: onProgressAct[i].duration,
                    province: this.provinces.find(item => item.id === onProgressAct[i].province).name,
                    city: this.regencies.find(item => item.id === onProgressAct[i].city).name,
                    address: onProgressAct[i].address,
                    description: onProgressAct[i].description,
                    finalRegistrationDate: onProgressAct[i].finalRegistrationDate,
                    registeredVolunteers: onProgressAct[i].registeredVolunteers === 'empty' ? [] : onProgressAct[i].registeredVolunteers,
                    status: onProgressAct[i].status,
                    created_at: onProgressAct[i].created_at
                }

                tempActivitiesList.push(data);
            }

            this.showActivitiesList = [];
            switch (type) {
                case 0: {
                    this.showActivitiesList = [
                        ...tempActivitiesList
                    ];
                }
                break;
                case 1: {
                    this.showActivitiesList = [
                        ...tempActivitiesList.filter(item => item.province === this.provinces.find(item => item.id === this.province).name)
                    ];
                }
                break;
                case 2: {
                    this.showActivitiesList = [
                        ...tempActivitiesList.filter(item => item.city === this.regencies.find(item => item.id === this.city).name)
                    ];
                }
                break;
            }
        }
    }
}
</script>

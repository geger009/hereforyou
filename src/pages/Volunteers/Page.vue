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
                <!-- TODO: toolbar for searching -->
                <div
                    v-if="showVolunteersList.length > 0"
                >
                    <v-layout
                        wrap
                        class="py-3"
                    >
                        <v-flex
                            xs12
                            sm4
                            class="pa-2"
                        >
                        </v-flex>
                        <v-flex
                            xs12
                            sm4
                            class="pa-2"
                        >
                        </v-flex>
                        <v-flex
                            xs12
                            sm4
                            class="pa-2"
                        >
                        </v-flex>
                    </v-layout>

                    <v-layout
                        wrap
                    >
                        <card-volunteer
                            v-for="(item, index) in showVolunteersList"
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
                                @click="showVolunteers(currentPage - 1);"
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
                                @click="showVolunteers(currentPage + 1);"
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
                    v-if="showVolunteersList.length === 0"
                >
                    Tidak ada relawan
                </p>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import CardVolunteer from '@/components/CardVolunteer'
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"

import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('GetVolunteersList');
    },
    components: {
        CardVolunteer: CardVolunteer
    },
    data() {
        return {
            showVolunteersList: [],
            currentPage: -1,
            startPage: 0,
            endPage: 0,
            perPage: 20,
            nextEnd: 0,
            showPrev: false,
            showNext: false,
            firstOpen: true,
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            categories: InterestsList,
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            volunteers: 'volunteers',
        })
    },
    watch: {
        volunteers (value) {
            if (value === null) return;

            this.firstOpen = true;
            this.showVolunteers(0);
        }
    },
    methods: {
        showVolunteers(page) {
            if (page < 0) return;

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

            if (this.volunteers.length < this.perPage) {
                this.showPrev = false;
                this.showNext = false;
            } else {
                this.showPrev = true;
                this.showNext = true;
            }

            if (this.endPage >= this.volunteers.length) {
                this.endPage = this.volunteers.length;
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

            this.showVolunteersList = [];

            for (let i = this.startPage; i < this.endPage; i++) {
                let data = {
                    id: this.volunteers[i].id,
                    uid: this.volunteers[i].uid,
                    role: this.volunteers[i].role,
                    name: this.volunteers[i].name,
                    email: this.volunteers[i].email,
                    gender: this.volunteers[i].gender,
                    profesi: this.volunteers[i].profesi,
                    bornDate: this.volunteers[i].bornDate,
                    description: this.volunteers[i].description,
                    province: this.volunteers[i].province !== "empty" ? this.provinces.find(item => item.id === this.volunteers[i].province).name : '',
                    city: this.volunteers[i].city !== "empty" ? this.regencies.find(item => item.id === this.volunteers[i].city).name : '',
                    address: this.volunteers[i].address,
                    phones: this.volunteers[i].phones,
                    interests: this.volunteers[i].interests,
                    profilePicture: this.volunteers[i].profilePicture,
                    appreciation: this.volunteers[i].appreciation,
                    activities: this.volunteers[i].activities === 'empty' ? [] : this.volunteers[i].activities,
                    created_at: this.volunteers[i].created_at
                }

                this.showVolunteersList.push(data);
            }
        }
    }
}
</script>

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
                    justify-center
                >
                    <v-flex
                        xs12
                        md6
                        class="pa-2"
                    >
                        <material-chart-card
                            v-if="orgRender"
                            :data="monthlyOrgChart.data"
                            :options="monthlyOrgChart.options"
                            color="info"
                            type="Line"
                        >
                            <h4 class="title font-weight-bold">Organisasi</h4>
                            <!-- <p class="category d-inline-flex font-weight-light">
                                <v-icon
                                    color="green"
                                    small
                                    left
                                >
                                    fa-arrow-up
                                </v-icon>
                                <span class="green--text">55%</span>&nbsp;
                                increase in today's sales
                            </p> -->

                            <template slot="actions">
                                <v-spacer />
                                <p 
                                    class="caption grey--text text-xs-right"
                                    style="cursor: pointer;"
                                    @click="gotoPage('/admin/organizations')"
                                >
                                    Lihat Selengkapnya
                                    <v-icon
                                        color="grey"
                                        small
                                    >
                                        fa-arrow-right
                                    </v-icon>
                                </p>
                            </template>
                        </material-chart-card>
                    </v-flex>

                    <v-flex
                        xs12
                        md6
                        class="pa-2"
                    >
                        <material-chart-card
                            v-if="volRender"
                            :data="monthlyVolChart.data"
                            :options="monthlyVolChart.options"
                            color="warning"
                            type="Line"
                        >
                            <h4 class="title font-weight-bold">Relawan</h4>
                            <!-- <p class="category d-inline-flex font-weight-light">
                                <v-icon
                                    color="green"
                                    small
                                    left
                                >
                                    fa-arrow-up
                                </v-icon>
                                <span class="green--text">55%</span>&nbsp;
                                increase in today's sales
                            </p> -->

                            <template slot="actions">
                                <v-spacer />
                                <p 
                                    class="caption grey--text text-xs-right"
                                    style="cursor: pointer;"
                                    @click="gotoPage('/admin/volunteers')"
                                >
                                    Lihat Selengkapnya
                                    <v-icon
                                        color="grey"
                                        small
                                    >
                                        fa-arrow-right
                                    </v-icon>
                                </p>
                            </template>
                        </material-chart-card>
                    </v-flex>
                </v-layout>

                <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
                    Daftar Permohonan
                </h2>

                <v-btn-toggle 
                    v-model="showReq" 
                    mandatory
                    class="elevation-0 transparent ml-2 my-2"
                >
                    <v-btn 
                        flat
                        color="red darken-3"
                        class="white--text font-weight-bold"
                    >
                        <v-icon left>fa-users</v-icon>
                        Organisasi
                    </v-btn>
                    <v-btn 
                        flat
                        color="red darken-3"
                        class="white--text font-weight-bold"
                    >
                        <v-icon left>fa-hands-helping</v-icon>
                        Aktivitas
                    </v-btn>
                </v-btn-toggle>

                <organization-request-join
                    v-if="showReq === 0"
                />

                <activity-request-create
                    v-if="showReq === 1"
                />
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import MaterialChartCard from '@/components/MaterialChartCard'
import OrganizationRequestJoin from './components/OrganizationRequestJoin'
import ActivityRequestCreate from './components/ActivityRequestCreate'

export default {
    components: {
        MaterialChartCard: MaterialChartCard,
        OrganizationRequestJoin: OrganizationRequestJoin,
        ActivityRequestCreate: ActivityRequestCreate
    },
    mounted() {
        this.$store.dispatch('GetVolunteersList');
        this.$store.dispatch('GetOrganizationsList');
    },
    data() {
        return {
            showReq: 0,
            orgRender: false,
            volRender: false,
            identifiers: [
                new Date().getFullYear() + "-01",
                new Date().getFullYear() + "-02",
                new Date().getFullYear() + "-03",
                new Date().getFullYear() + "-04",
                new Date().getFullYear() + "-05",
                new Date().getFullYear() + "-06",
                new Date().getFullYear() + "-07",
                new Date().getFullYear() + "-08",
                new Date().getFullYear() + "-09",
                new Date().getFullYear() + "-10",
                new Date().getFullYear() + "-11",
                new Date().getFullYear() + "-12"
            ],
            monthlyOrgChart: {
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
                    series: [
                        []
                    ]
                },
                options: {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            },
            monthlyVolChart: {
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
                    series: [
                        []
                    ]
                },
                options: {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            },
        }
    },
    computed: {
        ...mapGetters({
            volunteers: 'volunteers',
            organizations: 'organizations'
        })
    },
    watch: {
        volunteers (value) {
            if (value !== null) {
                const currentDate = new Date();

                for (let i = 0; i < (currentDate.getMonth() + 1); i++) {
                    const tmpVol = value.filter(item => item.created_at.includes(this.identifiers[i]));
                    this.monthlyVolChart.data.series[0].push(tmpVol.length);
                }

                this.monthlyVolChart.options.high = Math.max(...this.monthlyVolChart.data.series[0]) + 2;

                this.volRender = true;
            }
        },
        organizations (value) {
            if (value !== null) {
                const currentDate = new Date();

                for (let i = 0; i < (currentDate.getMonth() + 1); i++) {
                    const tmpOrg = value.filter(item => item.created_at.includes(this.identifiers[i]));
                    this.monthlyOrgChart.data.series[0].push(tmpOrg.length);
                }

                this.monthlyOrgChart.options.high = Math.max(...this.monthlyOrgChart.data.series[0]) + 2;

                this.orgRender = true;
            }
        }
    },
    methods: {
        gotoPage(strPath) {
            this.$router.push(strPath);
        }
    }
}
</script>

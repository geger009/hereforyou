<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Aktivitas
        </h2>

        <v-layout
            class="pa-3"
        >
            <v-data-table 
                :headers="headers"
                :items="showActivities" 
                style="width: 100%; border-radius: 10px; overflow: hidden;"
                class="elevation-8"
                :loading="loading"
                :rows-per-page-items="rowrules"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.startDate }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.organization }}</td>
                    <td>{{ provinces.find(item => item.id === props.item.province).name + " - " + regencies.find(item => item.id === props.item.city).name }}</td>
                    <td>
                        {{ props.item.totalVolunteer }}
                    </td>
                    <td>
                        <v-layout
                            row
                            justify-end
                        >
                            <v-btn
                                round
                                color="warning"
                                text-color="white"
                                @click="$router.push({ path: `/activity/${props.item.id}`})"
                            >
                                Detail
                            </v-btn>
                        </v-layout>
                    </td>
                </template>
            </v-data-table>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IndoRegion from "@/utils/indonesia-region"

export default {
    mounted() {
        this.$store.dispatch('GetActivitiesList');
    },
    data() {
        return{
            loading: true,
            showActivities: [],
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            headers: [
                { text: 'Tanggal Aktivitas', value: 'startDate', sortable: true },
                { text: 'Nama Aktivitas', value: 'name', sortable: true },
                { text: 'Nama Organisasi', value: 'organization', sortable: false },
                { text: 'Provinsi - Kota/Kabupaten', value: 'privince_city', sortable: false },
                { text: 'Jumlah Relawan', value: 'totalVolunteer', sortable: false },
                { text: '', value: 'action', sortable: false }
            ],
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
            activities: 'activities',
            user: 'user'
        })
    },
    watch: {
        activities (value) {
            if (value === null) return;

            this.showActivities = [];

            if (value.find(item => item.status !== 'pending')) {
                const notPendingAct = value.filter(item => item.status !== 'pending');

                if (this.user.role === 'volunteer') {
                    let acts = this.user.activities === 'empty' ? [] : this.user.activities
                    for (let i = 0; i < acts.length; i++) {
                        if (notPendingAct.find(item => item.id === acts[i])) {
                            let compileAct = {
                                ...notPendingAct.find(item => item.id === acts[i])
                            };

                            compileAct.privince_city = this.provinces.find(item => item.id === compileAct.province).name + " - " + this.regencies.find(item => item.id === compileAct.city).name
                            compileAct.totalVolunteer = compileAct.registeredVolunteers === 'empty' ? 0 + " Relawan" : compileAct.registeredVolunteers.length + " Relawan";

                            this.showActivities.push(compileAct);
                        }
                    }
                } else if (this.user.role === 'organization') {
                    for (let i = 0; i < notPendingAct.length; i++) {
                        if (notPendingAct[i].organization === this.user.name) {
                            let compileAct = {
                                ...notPendingAct[i]
                            };

                            compileAct.privince_city = this.provinces.find(item => item.id === compileAct.province).name + " - " + this.regencies.find(item => item.id === compileAct.city).name
                            compileAct.totalVolunteer = compileAct.registeredVolunteers === 'empty' ? 0 + " Relawan" : compileAct.registeredVolunteers.length + " Relawan";

                            this.showActivities.push(compileAct);
                        }
                    }
                }
            }
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>
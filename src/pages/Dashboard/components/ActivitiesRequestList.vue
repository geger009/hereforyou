<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Permohonan Aktivitas
        </h2>

        <v-layout
            class="pa-3"
        >
            <v-data-table
                :items="showActivities"
                :loading="loading"
                class="elevation-8"
                hide-actions
                hide-headers
                style="width: 100%; border-radius: 10px; overflow: hidden;"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ categories.find(item => item.id === props.item.category).text }}</td>
                    <td>{{ provinces.find(item => item.id === props.item.province).name + "-" + regencies.find(item => item.id === props.item.city).name }}</td>
                    <td>{{ props.item.startDate }}</td>
                    <td>
                        <span
                            class="amber--text text--darken-3"
                        >
                            Menunggu
                        </span>
                    </td>
                </template>
            </v-data-table>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Helper from '@/utils/helper';
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"

export default {
    mounted() {
        this.$store.dispatch('GetActivitiesList');
    },
    data() {
        return {
            loading: true,
            showActivities: [],
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            categories: InterestsList
        }
    },
    computed: {
        ...mapGetters({
            activities: 'activities',
            userName: 'userName'
        })
    },
    watch: {
        activities (value) {
            if (value === null) return;
            
            this.showActivities = [];

            if (value.find(item => item.name === this.userName)) {
                let byOrganization = value.filter(item => item.name === this.userName);

                this.showActivities = byOrganization.filter(item => item.status === 'pending');
                this.showActivities.sort(Helper.compareValues('created_at', 'desc'));
            }
            this.loading = false;
        }
    }
}
</script>

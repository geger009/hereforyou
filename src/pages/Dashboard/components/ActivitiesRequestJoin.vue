<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Permohonan Bergabung
        </h2>

        <v-layout
            class="pa-3"
        >
            <v-data-table
                :items="showActivities"
                class="elevation-8"
                hide-actions
                hide-headers
                :loading="loading"
                style="width: 100%; border-radius: 10px; overflow: hidden;"
            >
                <template v-slot:items="props">
                    <td class='font-weight-bold'>
                        {{ props.item.activityname }}
                        <span
                            class='font-weight-regular'
                        >
                            bersama
                        </span>
                        {{ props.item.organization }}
                    </td>
                    <td
                        class="text-xs-right"
                    >
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

export default {
    mounted() {
        this.$store.dispatch('GetVolunteerRequest');
    },
    data() {
        return {
            loading: true,
            showActivities: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'user',
            volunteerReq: 'volunteerReq'
        })
    },
    watch: {
        volunteerReq (value) {
            if (value === null) return;
            
            this.showActivities = [];
            
            if (value.find(item => item.uid === this.user.id)) {
                let byVolunteer = value.filter(item => item.uid === this.user.id);
                
                this.showActivities = byVolunteer.filter(item => item.status === 'pending');
                this.showActivities.sort(Helper.compareValues('created_at', 'desc'));
            }
            this.loading = false;
        }
    }
}
</script>

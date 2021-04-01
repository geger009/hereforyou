<template>
    <v-flex
        xs12
        align-center
        class="pa-4 amber darken-3"
        v-if="showActivities.length > 0"
    >
        <h2 class="display-2 white--text text-xs-center mb-4">
            Aktivitas
        </h2>

        <div 
            class="text-xs-center mb-2"
            v-if="loading"
        >
            <v-progress-circular
                :size="70"
                :width="7"
                color="white"
                indeterminate
                class="mx-auto"
            >
            </v-progress-circular>
        </div>

        <v-layout
            wrap
        >
            <card-activity-small
                v-for="(item, index) in showActivities"
                :key="`newest-activity-${index}`"
                v-bind="item"
            />
        </v-layout>

        <v-flex
            xs12
            text-xs-center
            class="py-3"
        >
            <v-btn
                round
                large
                class="red darken-3 white--text"
                @click="$router.push({ path: '/login' })"
                v-if="showActivities > 4"
            >
                <span class="title">Lihat Semua Aktivitas</span>
            </v-btn>
        </v-flex>
    </v-flex>
</template>

<script>
import CardActivitySmall from '@/components/CardActivitySmall'
import Helper from '@/utils/helper';

import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('GetActivitiesList');
    },
    components: {
        CardActivitySmall: CardActivitySmall,
    },
    data() {
        return {
            loading: true,
            showActivities: []
        }
    },
    computed: {
        ...mapGetters({
            activities: 'activities'
        })
    },
    watch: {
        activities (value) {
            if (value === null) return;

            this.showActivities = [];
            if (value.find(item => item.status === 'accept')) {
                const acceptedAct = value.filter(item => item.status === 'accept');
                acceptedAct.sort(Helper.compareValues('created_at', 'desc'));

                for (var i = 0; i < acceptedAct.length; i++) {
                    if (i == 4) break;

                    const data = {
                        ...acceptedAct[i],
                        countVolunteers: acceptedAct[i].registeredVolunteers === 'empty' ? 0 : acceptedAct[i].registeredVolunteers.length
                    }
                    this.showActivities.push(data);
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

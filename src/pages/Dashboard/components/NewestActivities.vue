<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Aktivitas Terbaru
        </h2>
        
        <v-layout
            wrap
            class="pa-3"
        >
            <v-flex
                xs12
            >
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

                <v-layout
                    wrap
                >
                    <card-activity-small
                        v-for="(item, index) in showActivities"
                        :key="`newest-activity-${index}`"
                        v-bind="item"
                    />
                </v-layout>
            </v-flex>

            <v-flex
                xs12
                text-xs-right
                class="py-3"
            >
                <v-btn
                    round
                    class="red darken-3 white--text"
                    @click="$router.push({ path: '/activities'})"
                    v-if="showActivities > 4"
                >
                    Lihat Semua Aktivitas
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
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

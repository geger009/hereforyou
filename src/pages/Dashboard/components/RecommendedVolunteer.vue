<template>
    <div>
        <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
            Rekomendasi Relawan
        </h2>

        <v-layout
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
                    <card-volunteer-small
                        v-for="(item, index) in recVolunteers"
                        :key="`recommend-volunteer-${index}`"
                        v-bind="item"
                    />
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import CardVolunteerSmall from '@/components/CardVolunteerSmall'
import Helper from '@/utils/helper';
import IndoRegion from "@/utils/indonesia-region"

import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('GetVolunteersList');
    },
    components: {
        CardVolunteerSmall: CardVolunteerSmall
    },
    data() {
        return {
            loading: true,
            recVolunteers: []
        }
    },
    computed: {
        ...mapGetters({
            volunteers: 'volunteers',
            user: 'user'
        })
    },
    watch: {
        volunteers (value) {
            if (value === null) return;
            
            if (!value.find(item => item.province === this.user.province)) return;

            let some = value.filter(item => item.province === this.user.province);
            this.recVolunteers = [];
            for (let i = 0; i < some.length; i++) {
                if (i == 4) {
                    break;
                }
                let temp = {
                    id: some[i].id,
                    profilePicture: some[i].profilePicture,
                    name: some[i].name,
                    province: IndoRegion.provinces.find(item => item.id === some[i].province).name,
                    city: IndoRegion.regencies.find(item => item.id === some[i].city).name,
                    appreciation: some[i].appreciation
                }
                this.recVolunteers.push(temp);
            }
            this.recVolunteers.sort(Helper.compareValues('appreciation', 'desc'));
            this.loading = false;
        }
    }
}
</script>

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
                <!-- Schedule -->
                <v-layout
                    wrap
                    class="pa-3"
                    justify-center
                >
                    <v-flex
                        xs12
                        sm7
                        class="pa-2"
                    >
                        <v-card
                            class="elevation-8"
                            style="height: 100px; overflow: hidden;"
                        >
                            <toolbar-volunteer v-if="userRole === 'volunteer'" />
                            <toolbar-organization v-if="userRole === 'organization'" />
                        </v-card>
                    </v-flex>
                    <v-flex
                        xs12
                        sm5
                        class="pa-2"
                    >
                        <v-card
                            class="elevation-8"
                            style="height: 100px; overflow: hidden;"
                        >
                            <v-layout>
                                <v-flex
                                    xs5
                                    style="flex-basis: 100px; max-width: 100px;"
                                >
                                    <v-layout
                                        wrap
                                        align-center
                                        justify-center
                                        style="width: 100px; height: 100px;"
                                    >
                                        <v-flex
                                            xs12
                                            class="red--text text--darken-3 text-xs-center"
                                        >
                                            <h2 class="display-2">{{ day }}</h2>
                                            <h3 class="subheading">{{ months[month] }}</h3>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex
                                    v-if="todayActivity !== 'none'"
                                    xs7
                                    class="pa-2 red--text text--darken-3"
                                >
                                    <h3 class='ml-2 mb-2'>{{todayActivity.name}}</h3>
                                    <p class='ml-2 mb-0 caption'>{{todayActivity.organization}}</p>
                                    <p class='ml-2 mb-0 caption'>{{todayActivity.address !== 'empty' ? todayActivity.address : "-"}}</p>
                                </v-flex>
                                <v-flex
                                    v-if="todayActivity === 'none'"
                                    xs7
                                    class="pa-2 red--text text--darken-3"
                                    align-self-center
                                >
                                    <h3 class='ml-2 mb-2'>Tidak ada Aktivitas</h3>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Volunteer Area -->

                <!-- New push activity -->
                <newest-activities
                    v-if="userRole === 'volunteer'"
                />
                
                <!-- Requested activities list -->
                <activities-request-join
                    v-if="userRole === 'volunteer'"
                />

                <!-- Activities Request List -->
                <activities-request-list
                    v-if="userRole === 'organization'"
                />
                
                <!-- Registrar List -->
                <registrar-list
                    v-if="userRole === 'organization'"
                />

                <!-- Activities List -->
                <activities-list/>

                <!-- Recommended Activities List -->
                <recommended-activities
                    v-if="userRole === 'volunteer'"
                />
                
                <!-- Organization Area -->

                <!-- Recommended Volunteer -->
                <recommended-volunteer
                    v-if="userRole === 'organization'"
                />
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import ActivitiesList from './components/ActivitiesList'

import ToolbarVolunteer from './components/ToolbarVolunteer'
import NewestActivities from './components/NewestActivities'
import ActivitiesRequestJoin from './components/ActivitiesRequestJoin'
import RecommendedActivities from './components/RecommendedActivities'

import ToolbarOrganization from './components/ToolbarOrganization'
import ActivitiesRequestList from './components/ActivitiesRequestList'
import RegistrarList from './components/RegistrarList'
import RecommendedVolunteer from './components/RecommendedVolunteer'

import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('GetActivitiesList');
    },
    components: {
        ActivitiesList: ActivitiesList,
        ToolbarVolunteer: ToolbarVolunteer,
        NewestActivities: NewestActivities,
        ActivitiesRequestJoin: ActivitiesRequestJoin,
        RecommendedActivities: RecommendedActivities,
        ToolbarOrganization: ToolbarOrganization,
        ActivitiesRequestList: ActivitiesRequestList,
        RegistrarList: RegistrarList,
        RecommendedVolunteer: RecommendedVolunteer
    },
    computed: {
        ...mapGetters({
            userRole : 'userRole',
            activities: 'activities'
        })
    },
    data() {
        return {
            todayActivity: 'none',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
            day: new Date().getDay(),
            month: new Date().getMonth(),
        }
    },
    watch: {
        activities (value) {
            if (value === null) return;

            this.todayActivity = 'none';
            
            const currentDate = new Date().toISOString().substr(0, 10);

            if (value.find(item => item.startDate === currentDate)) {
                this.todayActivity = value.find(item => item.startDate === currentDate);
            }
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px;
}
.v-btn {
    text-transform: unset !important;
}
</style>

<template>
    <v-container
        fluid
        class="pa-0 mx-0"
    >
        <v-layout
            wrap
        >
            <!-- Home Banner -->
            <home-banner/>

            <!-- About -->
            <home-about/>

            <!-- Aktivitas -->
            <home-activity/>

            <!-- Team -->
            <home-team/>
            
        </v-layout>
    </v-container>
</template>

<script>
import HomeBanner from './components/HomeBanner'
import HomeAbout from './components/HomeAbout'
import HomeActivity from './components/HomeActivity'
import HomeTeam from './components/HomeTeam'

export default {
    components: {
        HomeBanner: HomeBanner,
        HomeAbout: HomeAbout,
        HomeActivity: HomeActivity,
        HomeTeam: HomeTeam
    }    
}
</script>


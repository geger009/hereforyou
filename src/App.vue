<template>
	<v-app v-scroll='checkScroll'>
		<v-content
			class="pa-0"
		>
			<router-view/>

			<foot-bar/>
		</v-content>

		<!-- Navigation Drawer -->
		<nav-drawer/>

		<!-- Tool bar -->
		<tool-bar/>

		<!-- Notif -->
		<v-snackbar v-model="snackbars.active" :color="snackbars.color" top>
			{{ snackbars.message }}
			<v-btn dark flat @click="snackbars.active = false" >
				Close
			</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
/**
 * Component Import
 */
import NavDrawer from '@/components/NavDrawer/NavDrawer';
import ToolBar from '@/components/ToolBar/ToolBar';
import FootBar from '@/components/FootBar/FootBar';
import { mapGetters } from 'vuex';

export default {
	name: 'App',
	components: {
		NavDrawer: NavDrawer,
		ToolBar: ToolBar,
        FootBar: FootBar
	},
	data () {
		return {
			//
		}
	},
	computed: {
		...mapGetters({
			snackbars: 'snackbars'
		})
	},
	methods: {
		checkScroll(e) {
            if (window.scrollY > 50) {
                this.$store.dispatch('CheckOnTop', { value: false });
            } else {
                this.$store.dispatch('CheckOnTop', { value: true });
			}
			
			if (document.getElementById('home-banner') != null && document.getElementById('home-banner') != undefined) {
				document.getElementById('home-banner').style.top = (window.scrollY / 3) + 'px';
			}
		}
	}
}
</script>

<style>
.unset-link-decoration > a {
	color: inherit !important;
	text-decoration: unset !important;
}

.box-maxw-650 {
	width: 100%;
	max-width: 650px;
}

.fa-sm {
    font-size: .875em !important;
}
</style>

import Vue from "vue";
import './plugins/tiptap-vuetify';
import './plugins/vuetify';
import './plugins/chartlist';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/firebase/';
import firebase from 'firebase';
import AlertBox from "./components/AlertBox";

/**
 * Font Noto Sans JP
 */
import './stylus/main.styl';

Vue.config.productionTip = false;

Vue.component('alert-box', AlertBox);

new Vue({
	router,
	store,
	render: h => h(App),
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('AutoSignIn', user);
			}
		})
	}
}).$mount("#app");

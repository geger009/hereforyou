import Vue from "vue";
import Router from "vue-router";
import scrollBehavior from './utils/scroll-behavior';
import Root from "@/views/Root";
import AdminRoot from "@/views/AdminRoot"
import Helper from './utils/helper';

Vue.use(Router);

export default new Router({
	base: '/',
	mode: 'history',
	scrollBehavior,
	routes: [
		{
			path: '/',
			component: Root,
			children: [
				{
					path: '',
					name: 'Home',
					component: () => import(
						/* webpackChunkName: "Home" */
						'@/pages/Home/Page.vue'
					)
				},
				{
					path: '/login',
					name: 'Login',
					component: () => import(
						/* webpackChunkName: "Login" */
						'@/pages/Login/Page.vue'
					)
				},
				{
					path: '/recovery',
					name: 'Recovery',
					component: () => import(
						/* webpackChunkName: "Recovery" */
						'@/pages/Recovery/Page.vue'
					)
				},
				{
					path: '/register',
					name: 'Register',
					component: () => import(
						/* webpackChunkName: "Register" */
						'@/pages/Register/Page.vue'
					)
				},
				{
					path: '/verification',
					name: 'Verification',
					component: () => import(
						/* webpackChunkName: "Verification" */
						'@/pages/Verification/Page.vue'
					)
				},
				{
					path: '/dashboard',
					name: 'Dashboard',
					component: () => import(
						/* webpackChunkName: "Dashboard" */
						'@/pages/Dashboard/Page.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/notifications',
					name: 'Notifications',
					component: () => import(
						/* webpackChunkName: "Notifications" */
						'@/pages/Notifications/Page.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/ourteam',
					name: 'OurTeam',
					component: () => import(
						/* webpackChunkName: "OurTeam" */
						'@/pages/OurTeam/Page.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/myprofile',
					name: 'Profile',
					component: () => import(
						/* webpackChunkName: "Profile" */
						'@/pages/Profile/Page.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/profile/:profile_id',
					name: 'PublicProfile',
					component: () => import(
						/* webpackChunkName: "PublicProfile" */
						'@/pages/Profile/Public.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/volunteers',
					name: 'Volunteers',
					component: () => import(
						/* webpackChunkName: "Volunteers" */
						'@/pages/Volunteers/Page.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/activities',
					name: 'Activities',
					component: () => import(
						/* webpackChunkName: "Activities" */
						'@/pages/Activities/Page.vue'
					)
				},
				{
					path: '/activity/:activity_id',
					name: 'Activity',
					component: () => import(
						/* webpackChunkName: "Activity" */
						'@/pages/Activities/Details.vue'
					),
					beforeEnter: Helper.isUser
				},
				{
					path: '/create_activity',
					name: 'CreateActivity',
					component: () => import(
						/* webpackChunkName: "CreateActivity" */
						'@/pages/Activities/CreateActivity.vue'
					),
					beforeEnter: Helper.isOrganization
				},
				{
					path: '/edit_activity/:activity_id',
					name: 'EditActivity',
					component: () => import(
						/* webpackChunkName: "EditActivity" */
						'@/pages/Activities/EditActivity.vue'
					),
					beforeEnter: Helper.isOrganization
				}
				//TODO: Donation
			]
		},
		{
			path: '/admin',
			component: AdminRoot,
			children: [
				{
					path: 'login',
					name: 'AdminLogin',
					component: () => import(
						/* webpackChunkName: "AdminLogin" */
						'@/pages/AdminLogin/Page.vue'
					)
				},
				//TODO: Dashboard, Organization List, Volunteer List
				{
					path: 'dashboard',
					name: 'AdminDashboard',
					component: () => import(
						/* webpackChunkName: "AdminDashboard" */
						'@/pages/AdminDashboard/Page.vue'
					),
					beforeEnter: Helper.isAdmin
				},
				{
					path: 'organizations',
					name: 'AdminOrganizations',
					component: () => import(
						/* webpackChunkName: "AdminOrganizations" */
						'@/pages/AdminOrganizations/Page.vue'
					),
					beforeEnter: Helper.isAdmin
				},
				{
					path: 'volunteers',
					name: 'AdminVolunteers',
					component: () => import(
						/* webpackChunkName: "AdminVolunteers" */
						'@/pages/AdminVolunteers/Page.vue'
					),
					beforeEnter: Helper.isAdmin
				},
				{
					path: 'donations',
					name: 'AdminDonations',
					component: () => import(
						/* webpackChunkName: "AdminDonations" */
						'@/pages/AdminDonations/Page.vue'
					),
					beforeEnter: Helper.isAdmin
				}
			]
		}
	]
});
